const router = require("express").Router();
const { Blogpost, User, Comments } = require("../models");
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



router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find all blogpost with the current session ID
    console.log(req.session.user_id);
    const blogpostData = await Blogpost.findAll({
      where: { user_id: req.session.user_id },
      include: [User]
    });
    
    const blogposts = blogpostData.map((blog) => blog.get({ plain: true }));
    console.log(blogposts);
    
    
    res.render("dashboard", {blogposts,
      logged_in: req.session.logged_in,
    
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



router.get("/blogpost", withAuth, async (req, res) => {
  try {
    res.render("blogpost", {logged_in: req.session.logged_in,});
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get("/postpreview/:id", withAuth, async (req, res) => {
  
  try {
    // Find all blogpost with the current session ID
    console.log(req.session.user_id);
    const blogpostData = await Blogpost.findAll({
      where: { id: req.params.id },
      include: [User, Comments]
    });
    console.log(blogpostData);
    const blogposts = blogpostData.map((blog) => blog.get({ plain: true }));
    console.log(blogposts);
    
   // res.json(blogposts);
    
    res.render("postpreview", {blogposts,
      logged_in: req.session.logged_in,
    
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get("/editpost/:id", withAuth, async (req, res) => {
  try {

    /*Open single blogpost with ability to submit/save an edited version*/
   
    console.log(req.session.user_id);
    const blogpostData = await Blogpost.findAll({
      where: { id: req.params.id },
      include: [User]
    });
    
    const blogposts = blogpostData.map((blog) => blog.get({ plain: true }));
    console.log(blogposts);
    
    
    res.render("editpost", {blogposts,
      logged_in: req.session.logged_in,
    
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//cg code tried here

router.put('/editpost/:id', (req, res) => {
  Blogpost.update({
    title: req.body.title,
    content: req.body.content
  }, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    Blogpost.findByPk(req.params.id).then(example => {
      res.send({ status: 'success', data: example });
    });
  });
});








module.exports = router;
