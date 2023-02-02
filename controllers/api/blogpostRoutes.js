const router = require("express").Router();
const { Blogpost } = require("../../models");
const withAuth = require("../../utils/auth");

//CREATE A NEW POST
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newBlogpost = await Blogpost.create({
      ...req.body,
      user_id: req.session.user_id,
      title: req.body.title,
      content: req.body.content,
    });

    res.status(200).json(newBlogpost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//EDIT AN EXISTING POST
router.put("/:id", (req, res) => {
  // update a post by its `id` value
  Blogpost.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then(function (rowsUpdated) {
    res.json(rowsUpdated);
  });
});

//DELETE POST
router.delete("/:id", withAuth, async (req, res) => {
  console.log("your in delete");
  try {
    const blogpostData = await Blogpost.destroy({
      where: {
        id: req.params.id,
        //user_id: req.session.user_id,
      },
    });
    if (!blogpostData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
