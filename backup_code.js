
function scrapeProfile() {
  if (request.action === "SCRPAING STARTED") {
    if (confirm(request.action) == true) {
      var inputBox = document.getElementsByClassName(
        "search-global-typeahead__input"
      );
      if (inputBox && inputBox.length > 0) {
        if (inputBox[0].value.trim() === "") {
          inputBox[0].value = "php developer";
          var enterEvent = new KeyboardEvent("keydown", {
            key: "Enter",
            keyCode: 13,
          });
          inputBox[0].dispatchEvent(enterEvent);
        }
      }

      function observeResults() {
        var liElements = document.querySelectorAll(
          ".reusable-search__result-container"
        );
        if (liElements.length > 0) {
          setTimeout(() => {
            window.scrollTo({
              top: 1000,
              behavior: "smooth",
            });
          }, 2000);
          console.log(liElements);

          liElements.forEach(function (liElement) {
            var nameElement = liElement.querySelector(
              ".entity-result__title-text a"
            );
            var spanElement = nameElement.querySelector(
              'span[aria-hidden="true"]'
            );
            var spanText = spanElement ? spanElement.textContent.trim() : "";
            console.log(spanText);
            var post = liElement.querySelector(
              ".entity-result__primary-subtitle"
            );
            post = post ? post.textContent.trim() : "";
            console.log(post);
            var location = liElement.querySelector(
              ".entity-result__secondary-subtitle"
            );
            location = location ? location.textContent.trim() : "";
            console.log(location);
            var others = liElement.querySelector(".entity-result__summary");
            others = others ? others.textContent.trim() : "";
            console.log(others);
          });
        } else {
          // var message={
          //     action:'SCRAPING FINISHED'
          // };
          // chrome.tabs.query({active:true,currenWindow:true},function(tabs){
          //     chrome.tabs.sendMessage(tabs[0].id, message);
          // }
          // );
        }
      }

      function observeDOMChanges() {
        var observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            var addedNodes = mutation.addedNodes;
            for (var i = 0; i < addedNodes.length; i++) {
              var node = addedNodes[i];
              if (
                node.classList &&
                node.classList.contains("reusable-search__result-container")
              ) {
                observeResults();
              }
            }
          });
        });

        observer.observe(document, { childList: true, subtree: true });
      }

      clickPeopleButton();

      function clickPeopleButton() {
        const button = document.querySelector(
          "#search-reusables__filters-bar > ul > li:nth-child(2) > button"
        );

        console.log(button);
        if (button) {
          button.click();
          setTimeout(function () {
            observeDOMChanges();
            scrapeNextPage();
          }, 1000);
        } else {
          setTimeout(clickPeopleButton, 1000);
        }
      }

      function scrapeNextPage() {
        var observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            var addedNodes = mutation.addedNodes;
            for (var i = 0; i < addedNodes.length; i++) {
              var node = addedNodes[i];
              if (
                node.classList &&
                node.classList.contains("artdeco-pagination__button--next")
              ) {
                var nextPageButton = document.querySelector(
                  "button.artdeco-pagination__button--next"
                );
                if (nextPageButton) {
                  nextPageButton.click();
                  setTimeout(function () {
                    observeDOMChanges();
                    scrapeNextPage();
                  }, 1000);
                }
                return;
              }
            }
          });
        });

        observer.observe(document, { childList: true, subtree: true });
      }
    }
  }
}

$("#loginForm").submit(async function (event) {
  event.preventDefault();
  const logindata = {
    email: $("#email").val(),
    password: $("#password").val(),
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify(logindata),
  };

  try {
    const response = await fetch(
      "http://44.201.145.32/api/login",
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    console.log(responseData);
    console.log(responseData.status);

    if (responseData.status) {
      //login successfull
      if (confirm("LOGIN SUCCESSFULL....CLICK OKAY FOR FURTHER ACTION")) {
        $("#loginForm").trigger("reset");

        //push two buttons in the html

        $("#loginForm").css({ display: "none" });

        $(".utility").css({ display: "block" });
        console.log("fgfdg");
      } else {
        alert("CANCEL BUTTON SELECTED ");
        $("#loginForm").trigger("reset");
      }
    } else {
      alert("INVALID CREDETAILS ..PLEASE TRY AGAIN....");
      $("#loginForm").trigger("reset");
    }
  } catch (error) {
    if (confirm("LOGIN FAILED: " + error.message) == true) {
      if (confirm("Please Try Again") == true) {
        $("#loginForm").trigger("reset");
      }
    }
  }
});