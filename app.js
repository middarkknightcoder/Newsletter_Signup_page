// Here makeing a signup page for the newsletter app and store the Email using mailchip api
// Note - If your css file and other images are note response when srver call then you can used the (When your css is external )
// app.use(express.static("foldername"));


// Here import the all packages

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

// Here used all packeges 

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // Here used the bodyparser
app.use(express.static("public")); //This used for the make call static file - this one type of static storage

// Here create the new route root server

app.get("/", function (req, res) {
    
    res.sendFile(__dirname + "/Signup.html");
});

//Here used a post method for the response

app.post("/", function (req, res) {
    
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.Email;

    // Here stored the data as a json file - this structure is very importent

    const data = {

        members: [
            {

                email_address: email,
                status: "subscribed",
                merge_fields: {

                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]
    };

    // Here stored json file data as a string

    const jsondata = JSON.stringify(data);


    // Here create the url for the send the data - Endpoint

    const url = "https://us21.api.mailchimp.com/3.0/lists/5f8495ab9e";

    // Here create the option as a object

    const option = {

        method: "post",
        auth: "Ronak:ad65aa6c13327a786597603c79027a38-us21"

    };

    // This is send the data into the mailchimp website using the api

    const requsts = https.request(url, option, function (response) {

        if (response.statusCode === 200) {
            
            res.sendFile(__dirname + "/Success.html");
        }
        else {

            res.sendFile(__dirname + "/Failure.html");
        }

        response.on("data", function (data) {
            
            console.log(JSON.parse(data));

        });
    });

    requsts.write(jsondata); // This is used for the write the data into the mailchimp website
    requsts.end();
});

// when button is click that time server /failure and when click that time redirect the route root means home 

app.post("/failure", function (req, res) {
    
    res.redirect("/");


})


// listen() method binds itself with the specified host and port to bind and listen for any connections.

app.listen(process.env.PORT || 3000, function () {  // sprocess.env.PORT is a dynemic port 
    
    console.log("now Server 3000 is live");

});


// Here used "Procfile" for explicitly declare what command should be executed to start your app.
// Here over page is deploy in the web so we need to heroku server