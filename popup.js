$(document).ready(function () {
  $("#submit").on("click", function () {
    var user = $("#username").val();
    var pass = $("#password").val();

    if (user == "" || pass == "") {
      confirm("Incorrect username/password") == true;
      $("#username").val("");
      $("#password").val("");
    } else {
      if (user == "Gaurav" && pass == "123") {
        var message = {
          action: "SCRPAING STARTED",
          data: {
            user: "Gaurav",
            pass: "123",
          },
        };
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message);
          }
        );

      
      } else {
        confirm("Incorrect username/password");
        $("#username").val("");
        $("#password").val("");
      }
    }
  });
});
