const express = require("express");
require('dotenv').config();
const nodemailer = require('nodemailer');
const app = express();
const path = require("path");
const port = 3000;
// const { v4: uuidv4 } = require('uuid');

const mongoose = require('mongoose');
const Request = require("./models/Request.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

main()
.then((res)=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
//   await mongoose.connect('process.env.MONGO_URL');
    await mongoose.connect(process.env.MONGO_URL);

}

app.get("/", (req,res)=>{
    res.render("index.ejs");
})

app.post("/posting", async (req,res)=>{
    const {Name, Email, Message} = req.body;
    const newRequest = new Request({Name, Email, Message});
    // newRequest.save()
    // .then((data)=>{
    //     console.log("Saved Successfully");
    //     res.redirect("/?sent=true");
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })

    try {
        await newRequest.save();
        console.log("Saved Successfully");

        // Step 1: Create transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, //your email
                pass: process.env.EMAIL_PASS     //app-specific password (see note below)
            }
        });

        // Mail options
        const mailOptions = {
            from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // you will receive this
            subject: "New Contact Form Submission",
            text: `Name: ${Name}\nEmail: ${Email}\nMessage: ${Message}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log("Mail sent successfully");

        res.redirect("/?sent=true");
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong.");
    }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});