const getPosts = async (req, res) => {
  const db = req.app.get("db");
  let posts;
  if (req.query.username) {
    console.log(req.query.username);
    posts = await db.get_posts().catch(error => console.log(error));
    posts = posts.filter(e => e.username === req.query.username);
  } else {
    posts = await db.get_posts().catch(error => console.log(error));
  }
  res.status(200).json(posts);
};

module.exports = {
  getPosts
};
