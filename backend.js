// const express = require("express");
// const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");

// const app = express();
// const PORT = process.env.PORT || 3000;

// //body-parser middleware to parse POST request bodies
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


// const emailConfig = {
//   user: "",
//   pass: "",
// };

// // Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: emailConfig.user,
//     pass: emailConfig.pass,
//   },
// });

// // Email subscription route
// app.post("/subscribe", (req, res) => {
//   const email = req.body.email;

//   if (validateEmail(email)) {
//     const mailOptions = {
//       from: emailConfig.user,
//       to: email,
//       subject: "Subscription Confirmation",
//       text: `Thank you for subscribing to our newsletter!`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//       } else {
//         console.log("Email sent: " + info.response);
//         res.status(200).send("Subscription successful");
//       }
//     });
//   } else {
//     res.status(400).send("Invalid email address");
//   }
// });

// // Function to validate email format
// function validateEmail(email) {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/subscribers", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Subscriber schema
const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// Endpoint to handle new subscriptions
app.post("/subscribe", async (req, res) => {
  const email = req.body.email;

  try {
    // Create a new subscriber and save to the database
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: "Subscription successful", email });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Subscription failed", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
