// popup.js

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  var currentUrl = tabs[0].url;
  var __linkedin_check_flag = currentUrl.includes("linkedin");
  if (__linkedin_check_flag) {
    //inject the contentscript js file ,
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "INJECT_CONTENT_SCRIPT" },
      function (response) {
        console.log(response);
        var __flag_farewell = response.farewell;
        if (__flag_farewell == "DISABLE DOM CONTENT") {
          $("body").html(
            "<h1 class='not-linkedin-message'>No profile present please login to Linkedin</h1>"
          );
        } else {
          //this is the section in which i have to work
          //here goes the login code to actually
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
                if (
                  confirm("LOGIN SUCCESSFULL....CLICK OKAY FOR FURTHER ACTION")
                ) {
                  $("#loginForm").trigger("reset");

                  //push two buttons in the html

                  $("#loginForm").css({ display: "none" });

                  $(".utility").css({ display: "block" });
                  $(".people").on("click", function () {
                    //before enabling the scraping ..enable an input box to to give the message to content
                    var text = prompt("prompt", "Please enter text to search");
                    // alert(text)
                    if (text) {
                      // chrome.tabs.sendMessage(
                      //   tabs[0].id,
                      //   {
                      //     action: "QUERY TO ENTER IN TEXT FIELD",
                      //     data: text,
                      //   },
                      //   function (response) {
                      //     console.log(response);
                      //   }
                      // );
                      console.log(text);
                      //sedn the text to extension to searhc in the input box
                      $(".wait_icon").css({ display: "block" });
                      $(".utility").css({ display: "none" });
                    } else {
                    }

                    //sedn message to content script to scrape the people section data
                  });

                  $(".profie").on("click", function () {
                    $(".wait_icon").css({ display: "block" });
                    //sedn message to content script to scrape the people section data
                  });
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
        }
      }
    );
  } else {
    //send message to popup js to not dislay any login page
    console.log(__linkedin_check_flag);
    $("body").html(
      "<h1 class='not-linkedin-message'>Not a Linkedin Wesbite</h1>"
    );
  }
});
