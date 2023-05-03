const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

// We use the bodyParser middleware in Express to parse incoming request bodies
// bodyParser.urlencoded() is a middleware function that parses incoming request 
// bodies in the URL-encoded format and populates the req.body object with the parsed data.
app.use(bodyParser.urlencoded({ extended: true }));

// bodyParser.json() is a middleware function that parses incoming request bodies in the JSON format 
// and populates the req.body object with the parsed data.
app.use(bodyParser.json());

//The app.use(express.json()) middleware is used to parse incoming request bodies in JSON format. 
//It allows you to easily extract the data from the body of an HTTP request and use it in your server-side logic.
app.use(express.json());

// By using these middleware functions, we can easily access the data sent from the client-side 
// in the req.body object and use it in our server-side code.


//Create Connections
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Hans_Matrimony"
});

//connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connection done");
});



//Post request code:
app.post("/adduser", async (req, res) => {
  try {
    const post = {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      age: req.body.age,
      city: req.body.city,
      pincode: req.body.pincode,
      address: req.body.address,
      dob: req.body.dob
    };
    
    const sql = "INSERT INTO users SET ?";
    const query = await db.query(sql, post);
    console.log("result");
    res.send("User Detail added successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user.");
  }
});


//Get request code: 
app.get('/users', async (req, res) => {
  try {
    const query = await new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users';
      db.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
    res.json(query);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


app.listen("8800", () => {
  console.log("Server is successfully running on port 8800");
});








 //Get:
//  app.get("/users", (req, res) => {
//   const sql = "SELECT * FROM users";
//   const query = db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

//Insert person detail 1
// app.post("/adduser", (req, res) => {
//     const post = { id: req.body.id, first_name: req.body.first_name, last_name: req.body.last_name, age: req.body.age, city: req.body.city, pincode: req.body.pincode, address: req.body.address, dob: req.body.dob};
//     const sql = "INSERT INTO users SET ?";
//     const query = db.query(sql, post, (err, result) => {
//       if (err) throw err;
//       console.log("result");
//       res.send("User Detail added successfully.");
//     });
//   });