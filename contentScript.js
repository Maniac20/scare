// contentScript.js''

function getProfile() {
  var profile = document.querySelector(".evi-image");
  return profile;
}
console.log("Hi i am from content script");
// Function to handle messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "INJECT_CONTENT_SCRIPT") {
    //check if the profile is present
    var __flag_profile = getProfile();
    console.log(__flag_profile);

    if (__flag_profile) {
      //profile is present let the dom content show of popup html
      sendResponse({ farewell: "ENABLE DOM CONTENT" });
    } else {
      //sedn response to popup js to cancel all the dom content
      sendResponse({ farewell: "DISABLE DOM CONTENT" });
    }
  }
  else if(request.action=="QUERY TO ENTER IN TEXT FIELD"){
     console.log(request.data)
     sendResponse({farewell:"Query fond"});
  }
});


// Rest of your content script code...
