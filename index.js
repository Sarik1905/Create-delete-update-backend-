const express = require("express");
const { engine } = require("express-handlebars");
const configDb = require("./configDB/config"); // funksiyani chaqirib olayapmiz
const Posts = require("./models/posts");
require("dotenv").config();

const server = express();
configDb();
server.engine(".hbs", engine({ extname: ".hbs" }));
server.set("view engine", ".hbs");

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.get("/", async (req, res) => {
  const post = await Posts.find().lean();
  res.render("home", {
    title: "Post Page",
    post,
  });
});
server.get("/create/post", async (req, res) => {
  res.render("addPost", {
    title: "Create Post Page",
  });
});
server.get("/post/:id", async (req, res) => {
 try {
  const id = req.params.id;
  const post = await Posts.findById(id).lean();

  res.render("updatePost", {
    title: "Update Post Page",
    post,
  });
 } catch (error) {
console.log(error);
 }

});
server.post("/updatePost/post/:id", async (req, res) => {
  const id = req.params.id;
  const { title, img, descr } = req.body;
  await Posts.findByIdAndUpdate(id, { img, title, descr });
  res.redirect(`/post/${id}`);
});

server.post("/create/post", async (req, res) => {
  const { img, title, descr } = req.body;
  await Posts.create({ title, img, descr });
  res.redirect(`/updatePost/post/${_id}`); // korsatilgan manzilga kelayotgan malumotni otib yuboradi
});

server.post("/delete/post/:id", async (req, res) => {
  const id = req.params.id;
  await Posts.findByIdAndDelete(id);
  res.redirect("/"); // korsatilgan manzilga kelayotgan malumotni otib yuboradi
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server run : ${PORT}`);
  }
});
