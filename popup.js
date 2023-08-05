$(document).ready(function () {
  // popup.js

  
  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    if (message.action === "NOT A LINKEDIN WEBSITE") {

      $("body").html("<h1>This website is not LinkedIn</h1>");

      // empty the html and push please..the website is not a linkedin website 
      
      
    
    
    }
  });

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
});
