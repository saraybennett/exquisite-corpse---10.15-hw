window.addEventListener("load", () => {
  console.log("Client side js is loaded!");

  //get the data from the server

  fetch("/data")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let theData = data.messages;

      //Select for element on the page and display only most recent message
      let latestMessage = theData[theData.length - 1].message;
      console.log("this is the latest meessage:" + latestMessage);

      let mostRecentMessage = document.getElementById("latest-message");
      mostRecentMessage.innerHTML = latestMessage;
    })

    .catch((error) => {
      console.log(error);
    });

  //Create an event listener to collect and POST data
  let msgButton = document.getElementById("msg-submit");
  msgButton.addEventListener("click", () => {
    console.log("Button was clicked!");
    let msgInput = document.getElementById("msg-input");
    let currentMessage = msgInput.value;

    let messageObj = {
      message: currentMessage,
    };

    console.log(messageObj);
    let messageObjJSON = JSON.stringify(messageObj);
    console.log(messageObjJSON);

    fetch("/new-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: messageObjJSON,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Did this work?");
        console.log(data);

        //add to the story if it worked

        let mostRecentMessage = document.getElementById("latest-message");
        mostRecentMessage.innerHTML = currentMessage;

        msgInput.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  });
  //after adding their own addition, person clicks to reveal the story
  let storyButton = document.getElementById("button-story");
  storyButton.addEventListener("click", () => {
    console.log("story button was clicked");
    //fetch call to get the entire database
    fetch("/data")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        let theData = data.messages;

        // Loop through data and append to the page

        let feed = document.getElementById("feed");
        feed.innerHTML = "";

        for (let i = 0; i < theData.length; i++) {
          let currentMessage = theData[i].message;

          let currentEl = document.createElement("p");
          currentEl.innerHTML = currentMessage;

          feed.appendChild(currentEl);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  });
});

// tried the code below but it wasn't working so tried rebuilding from our example in class ^^ see above

// window.addEventListener("load", () => {
//   //get the data
//   fetch("/data")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       let theData = data.storyAdditions;

//       //Select for element on the page
//       let feed = document.getElementById("feed");
//       //Loop through data and append to the page
//       for (let i = 0; i < theData.length; i++) {
//         let currentMessage = theData[i].message;
//         let currentEl = document.createElement("p");
//         currentEl.innerHTML = storyAddition;
//         feed.appendChild(currentEl);
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   //create an event listener to post the data
//   document.getElementById("msg-submit").addEventListener("click", () => {
//     let storyAdd = document.getElementById("msg-input").value;
//     console.log(storyAdd);

//     //creating the object
//     let obj = { storyAddition: storyAdd };

//     //stringify the object
//     let jsonData = JSON.stringify(obj);
//     console.log(jsonData);

//     //fetch to route new-data
//     fetch("/new-data", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: jsonData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         //add to the page if it worked

//         let feed = document.getElementById("feed");
//         let currentEl = document.createElement("p");
//         currentEl.innerHTML = currentMessage;
//         feed.appendChild(currentEl);
//         msgInput.value = "";
//       });
//   });
// })
