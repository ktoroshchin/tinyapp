const bodyParser = require("body-parser");
var express = require("express");
var app = express();
var PORT = 8080; // default port 8080
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
var cookieParser = require("cookie-parser");
app.use(cookieParser());

 function generateRandomString() {
    const characters = ['1','3','4','8','x','w','r','g','p'];
    var strLength = 6;
    var randomized = "";
    for(var i = 0; i<strLength; i++)
    {
      var el = characters[Math.floor(Math.random()*characters.length)];
      randomized = randomized.concat(el);
    }
    return randomized;
};

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
};


app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});



app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id,
                       longURL: urlDatabase[req.params.id]
                     };
  console.log(urlDatabase[req.params.id]);
  res.render("urls_show", templateVars);
});
app.get("/u/:shortURL",(req,res) => {
  let shortURL = req.params.shortURL;
  res.redirect(urlDatabase[shortURL]);
})
app.get("/urls", (req, res) => {
  console.log(req.cookies["username"])
  let templateVars = { urls: urlDatabase,
                       username: req.cookies["username"]
                     };
  res.render("urls_index", templateVars);
});
app.get("/hello", (req, res) => {
  res.end("<html><body>Hello <b>World</b></body></html>\n");
});
app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id]
  console.log(req.params.id)
  res.redirect("/urls")
});

app.post("/urls",(req, res) => {
  var longURL = req.body.longURL;
  var shortURL = generateRandomString();
  urlDatabase[shortURL] = longURL;
  console.log(urlDatabase);
});

app.post("/urls/:id",(req, res) => {
  urlDatabase[req.params.id] = req.body.longURL
  res.redirect("/urls");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.post("/login",(req, res) => {
  const username = req.body.username;  //access to the username-variable from the form/
  res.cookie("username", username);
  console.log(req.body.username);
  res.redirect("/urls");
});

app.post("/logout",(req, res) => {
  res.clearCookie("username")
  res.redirect("/urls");
})
generateRandomString();
