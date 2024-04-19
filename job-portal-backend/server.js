const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const otpGenerator = require('otp-generator');
// routes

// for auth
const userRoutes = require("./routes/admin/auth");
// for HR
const adminRoutes = require("./routes/admin/auth");

const port = process.env.PORT;

// mongodb connection
mongoose
  .connect(
    `mongodb+srv://raj:rajeasy@cluster0.k72qfhk.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log("mondb not connected");
    console.log(error);
  });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const myStream = {
  write: (text) => {
    console.info("Response Details", JSON.parse(text));
  },
};

const morganToken = {
  date: ":date[iso]",
  url: ":url",
  httpVersion: ":http-version",
  method: ":method",
  remoteAddr: ":remote-addr",
  remoteUser: ":remote-user",
  resTime: ":response-time[6]",
  resStatus: ":status",
  userAgent: ":user-agent",
  logger: "morgan",
};

app.use(
  morgan(
    JSON.stringify(morganToken),
    // {
    //   skip: function (req, res) {
    //     console.log(req.body);
    //   },
    // },
    { stream: myStream }
  )
);

app.get("/", (req, res) => {
  res.send("Server");
});
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", userRoutes);

app.post("/send_email", function (req, response) {
  var from = req.body.from;
  var to = req.body.to;
  var subject = req.body.subject;
  var message = req.body.message;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "paulsouraj99@gmail.com",
      pass: "gntnbsfmyrqmkxyg",
    },
  });

  var mailOptions = {
    from: from,
    to: to,
    subject: subject || "Onboarding Mail From Job Portal  - ",
    text: `This is a System generated message from Job Portal, please read the documentation for more information about this message and contactNumber - ${message}`,
    template: "index",
    context: {
      name: "Souraj Pal",
    }, // send extra values to template
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
      return response.status(200).json(info);
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
