const express = require("express");  //Getting express module
const mongoose = require("mongoose"); //Getting mongoose module
var fs = require('fs'); 
var path = require('path'); 
const session = require("express-session"); //Getting session module
const passport = require("passport"); //Getting passport module
const passportLocalMongoose = require("passport-local-mongoose"); //Passport local module
require("dotenv").config();

const app = express();   //giving constant to express

const port = 4000;    //chossing a port to run application on
const secre = process.env.SECRET

app.use(express.static("public"));    //For including public files like css and images
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

var jsonObj = {
  "Candidates": [
    { "_id": 1, "position": "President", "name": "Candidate #1", "numOfVotes": 0, "button": false, "info": "Some important info about the candidate for the voters", "imagePath": "F:/U&R/Classes/Software Systems Engineering/Project/Online_voting_system/public/images/Candidate.png"},
    { "_id": 2, "position": "President", "name": "Candidate #2", "numOfVotes": 0, "button": false, "info": "info about the user to help voters", "imagePath": "F:/U&R/Classes/Software Systems Engineering/Project/Online_voting_system/public/images/Candidate.png" },
    { "_id": 3, "position": "Vice-President", "name": "Candidate #1-vp", "numOfVotes": 0, "button": false, "info": "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", "imagePath":"F:/U&R/Classes/Software Systems Engineering/Project/Online_voting_system/public/images/tz7n-7vqceaq86dprdnzag.jpg" },
    { "_id": 4, "position": "Vice-President", "name": "Candidate #2-vp", "numOfVotes": 0, "button": false, "info": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", "imagePath":"F:/U&R/Classes/Software Systems Engineering/Project/Online_voting_system/public/images/tz7n-7vqceaq86dprdnzag.jpg" },
    { "_id": 5, "position": "President", "name": "Lakshay", "numOfVotes": 0, "button": false, "info": "My name is Lakshay and I love politics, That is why i am contesting for being president", "imagePath":"F:/U&R/Classes/Software Systems Engineering/Project/Online_voting_system/public/images/Unknown.jpg"},
    { "_id": 6, "position": "Vice-President", "name": "Akash", "numOfVotes": 0, "button": false, "info": "My name is Akash and I love gym, My focus of election is health facilities","imagePath":"F:/U&R/Classes/Software Systems Engineering/Project/Online_voting_system/public/images/Unknown.jpg" }
  ]
};

mongoose.connect('mongodb://localhost:27017/mainproject',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  studentId: Number,
  votedp: Boolean,
  votedvp: Boolean, 
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

const candidateSchema = new mongoose.Schema({
  numOfVotes: Number,
  id: Number,
  name: String,
  position: String,
  info: String,
  img:
    {
        data: Buffer,
        contentType: String
    }, 
  button: Boolean
});

const Candidate = mongoose.model("Candidate", candidateSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

async function onStart() {
  const candidatenfo = await Candidate.find();
  if (candidatenfo.length === 0) {
    for (var i = 0; i < jsonObj.Candidates.length; i++) {
      var candidate = new Candidate({
        numOfVotes: jsonObj.Candidates[i]["numOfVotes"],
        id: jsonObj.Candidates[i]["_id"],
        name: jsonObj.Candidates[i]["name"],
        position: jsonObj.Candidates[i]["position"],
        info: jsonObj.Candidates[i]["info"],
        button: jsonObj.Candidates[i]["button"], 
        img:{data: fs.readFileSync(jsonObj.Candidates[i]["imagePath"]), contentType: 'image/png'}
      });
      candidate.save();
    }
  }
  else {
    for (var j = 0; j < jsonObj.Candidates.length; j++) {
      var exists = false;
      for (const inform of candidatenfo) {
        if (jsonObj.Candidates[j]["_id"] === inform.id) {
          exists = true;
          break;
        }
      }
      if (exists === false) {
        var candidate = new Candidate({
          numOfVotes: jsonObj.Candidates[j]["numOfVotes"],
          id: jsonObj.Candidates[j]["_id"],
          name: jsonObj.Candidates[j]["name"],
          position: jsonObj.Candidates[j]["position"],
          info: jsonObj.Candidates[j]["info"],
          button: jsonObj.Candidates[j]["button"], 
          img:{data: fs.readFileSync(jsonObj.Candidates[j]["imagePath"]), contentType: 'image/png'}
        });
        candidate.save();
      }
    }
  }
}
onStart();

app.get("/", (req, res) => {      //runing root file index.html
  res.sendFile(__dirname + "/index.html", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
  });
  console.log("A user requested the root route");
});

app.listen(port, () => {    //runing application on port 4000 and asking express to listen it

  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/register", (req, res) => {      //runing register file register.ejs
  res.render("register");
  console.log("A user requested the register route");
});

app.post("/register", (req, res) => {
  if (req.body.authentok === secre) {
    console.log("User " + req.body.username + " is attempting to register");
    User.register({ username: req.body.username + "@uregina.ca", studentId: req.body.studentId, votedp: false, votedvp: false },
      req.body.password,
      (err, user) => {
        if (err) {
          console.log(err);
          res.redirect("/");
        } else {
          res.render("notifypage", { notify: "registered" });
        }
      });
  }
  else {
    res.render("notifypage", { notify: "regerror" });
  }
});

app.get("/votingPage", async (req, res) => {      //runing mainVotingPage.ejs
  if (req.isAuthenticated()) {
    try {
      const candidateList = await Candidate.find();
      res.render("votingPage", { candidates: candidateList, username: req.user.username });
      console.log("A user requested the main voting page route");
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("was not authorized.");
    res.redirect("/");
  }
});

app.post("/login", async (req, res) => {
  console.log("User " + req.body.username + " is attempting to log in");
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, (err) => {
    if (err) {
      res.redirect("/");
    } else {
      passport.authenticate("local", { failureRedirect: '/error' })(req, res, () => {
        (async () => {
          const results = await User.find();
          const candList = await Candidate.find();
          console.log(results);
          for (const result of results) {
            if (result.username === req.user.username) {
              if (result.votedp === false) {
                for (const List of candList) {
                  if (List.position === "President") {
                    await Candidate.updateOne({ id: List.id },
                      { $set: { button: false } });
                  }
                }
              }
              if (result.votedvp === false) {
                for (const List of candList) {
                  if (List.position === "Vice-President") {
                    await Candidate.updateOne({ id: List.id },
                      { $set: { button: false } });
                  }
                }
              }
              if (result.votedp === true) {
                for (const List of candList) {
                  if (List.position === "President") {
                    await Candidate.updateOne({ id: List.id },
                      { $set: { button: true } });
                  }
                }
              }
              if (result.votedvp === true) {
                for (const List of candList) {
                  if (List.position === "Vice-President") {
                    await Candidate.updateOne({ id: List.id },
                      { $set: { button: true } });
                  }
                }
              }
            }
          }
          res.redirect("/votingPage");
        })();
      });
    }
  });
});

app.post("/vote", async (req, res) => {
  if (req.isAuthenticated()) {
    console.log("A user is trying to vote");
    var candidateId = req.body.id;
    var candidatePos = req.body.pos;

    console.log(candidateId);
    (async () => {
      try {
        await Candidate.updateOne({ id: candidateId },
          { $inc: { numOfVotes: 1 } });
        await Candidate.updateMany({ position: candidatePos },
          { $set: { button: true } });
        if (candidatePos === "President") {
          await User.updateOne({ _id: req.user._id },
            { $set: { votedp: true } });
        }
        else {
          await User.updateOne({ _id: req.user._id },
            { $set: { votedvp: true } });
        }
        res.redirect("votingPage");
      } catch (error) {
        console.log(error);
      }
    })();
  }
  else {
    console.log("was not authorized.");
    res.redirect("/");
  }
});

app.post("/info", async (req, res) => {
  if (req.isAuthenticated()) {
    var candidatebutton = req.body["aboutMe"];
    var id = req.body["id"];
    try {
      const candinfo = await Candidate.find();
      for (const info of candinfo) {
        if (candidatebutton === "More About me" && info.id === Number(id)) {
          var name = info.name;
          var speech = info.info;
        }
      }
      res.render("info", { CandidateName: name, CandidateInfo: speech });
    } catch (error) {
      console.log(error);
    }
  }
  else {
    console.log("was not authorized.");
    res.redirect("/");
  }
});

app.get("/error", (req, res) => {      //passport error redirection
  console.log("A user requested the main voting page route");
  res.render("notifypage", { notify: "loginerr" });
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});