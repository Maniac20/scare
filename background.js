// chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
//   if (request.action === "LOGIN") {
//     const loginData = {
//       email: request.email,
//       password: request.password,
//     };

//     console.log("", loginData);

//     const requestOptions = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Requested-With': 'XMLHttpRequest',
//       },
//       body: JSON.stringify(loginData),

//       // mode:'cors',
//       // credentials:'include'
//     };

//     try {
//       const response = await fetch('http://44.201.145.32/api/login', requestOptions);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const responseData = await response.json();
//       console.log(responseData);
//       sendResponse(responseData);
//     } catch (error) {
//       console.error(error);
//       sendResponse({ error: error.message });
//     }

//     return true;
//   }
// });
