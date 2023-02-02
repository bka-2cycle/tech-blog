const router = require("express").Router();
const { Comments } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
  console.log("message!");
  try {
    console.log(req.body);
    console.log(req.session);
    const newComment = await Comments.create({
      userId: req.session.user_id,
      content: req.body.content,
      postId: req.body.postId,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
