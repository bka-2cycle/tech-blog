const router = require("express").Router();
const { Blogpost, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogpostData = await Blogpost.findAll({
      include: [{ model: User, attributes: { exclude: "password" } }],
    });
    const blogposts = blogpostData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", {
      logged_in: req.session.logged_in,
      blogposts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

/* router.get("/dashboard", async (req, res) => {
  try {
    res.render("dashboard");
  } catch (err) {
    res.status(500).json(err);
  }
}); */

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find all blogpost with the current session ID
    console.log(req.session.user_id);
    const blogpostData = await Blogpost.findAll({
      where: { user_id: req.session.user_id },
      include: [User]
    });
    /* const login = {
      user: req.session.user_name
    } */
    const blogposts = blogpostData.map((blog) => blog.get({ plain: true }));
    console.log(blogposts);
    
    /* res.render("dashboard", {blogposts}, login); */
    res.render("dashboard", {blogposts});

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});







router.get("/blogpost", async (req, res) => {
  try {
    res.render("blogpost");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
