//set up the server using import v require, necessary for lowdb
import express from "express";
let app = express();

//db - 0 - install lowdb module
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

//db - 1 - connect to db
let storyMessage = { storyAdditions: [] };
const adapter = new JSONFile("db.json");
const db = new Low(adapter, storyMessage);
console.log(storyMessage);

//set up my first route to a static html page
app.use("/", express.static("public"));

//check for json and parse it
app.use(express.json());

//add a route that is listening for a post request
app.post("/new-data", (req, res) => {
  console.log(req.body);
  let currentDate = Date();
  //   let obj = {
  //     date: currentDate,
  //     message: req.body.storyAddition,
  //   };
  let newStory = req.body;
  newStory.time = Date();

  //old method for adding data to my storymessage; use below method using lowdb
  //   storyMessage.push(obj);
  //   console.log(storyMessage);

  //db - 2 - add value to the db
  db.data.storyAdditions.push(newStory);
  db.write().then(() => {
    res.json({ task: "success" });
  });
});

//add a route to serve the message data
app.get("/data", (req, res) => {
  //old way to send data back to the client, use the below for lowdb
  //   let obj = { data: storyMessage };

  //db - 3 - fetch data from the db
  db.read().then(() => {
    let theData = { messages: db.data.storyAdditions };
    res.json(theData);
  });
});

//Set port variable to listen for requests
let port = 3000;
app.listen(port, () => {
  console.log("Server listening on localhost:", port);
});
