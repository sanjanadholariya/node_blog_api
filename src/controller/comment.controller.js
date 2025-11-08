const commentModel = require("../model/commentModel");


module.exports.addComment = async (req, res) => {
  try {
    const articleId = req.params.id;
    const message = req.body.message;
    const userId = req.user._id;

    let allComment = await commentModel.findOne({ article: articleId });

    if (!allComment) {
      allComment = await commentModel.create({
        article: articleId,
        comments: [
          {
            user: userId,
            message,
          },
        ],
      });
    } else {
      allComment.comments.push({
        user: userId,
        message,
      });

      await allComment.save();
    }

    return res
      .status(200)
      .json({ message: "Comment added successfully", data: allComment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// any onw particular article's comments
module.exports.allComments = async (req, res) => {
  try {
    const comments = await commentModel.find(
      { article: req.params.id },
      { comments: { isDelete: false } }
    );
    return res
      .status(200)
      .json({ message: "All comments fetched successfully ", data: comments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id
    await commentModel.findOneAndUpdate({ "comments._id": commentId },{ $set: { "comments.$.isDelete": true } } );
    return res.status(200).json({ message: "Comment Delete Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
