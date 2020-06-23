const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

//GET ALL
function getBlogs(req, res) {}  // I couldn't find the right way to list all the blogs
// I tried readdir etc. but didn't work:(

//GET ONE
function getOneBlog(req, res) {
  // How to get the tilte from the url parameters?
  const title = req.params.title;
  if (fs.existsSync(title)) {
    res.sendFile(path.join(__dirname, title));
  } else {
    res.statusCode = 404;
    res.end("Blog Post Does Not Exist");
  }
}
//CREATE POST
function createBlog(req, res) {
  if (isValid) {
    const title = req.body.title;
    const content = req.body.content;
    fs.writeFileSync(title, content);
    res.end("OK");
  } else {
    res.status(400);
    res.end("You need to add a valid title and content");
  }
}

