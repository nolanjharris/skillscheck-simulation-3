let bcrypt = require("bcryptjs");

const login = async (req, res) => {
  let { username, password } = req.body;
  const db = req.app.get("db");
  let user = await db.get_user([username]).catch(error => console.log(error));
  if (!user[0]) {
    return res.status(403).json({ error: "Username or Password is incorrect" });
  } else {
    const isAuthorized = await bcrypt.compare(password, user[0].password);
    if (!isAuthorized) {
      return res.status(403).json("Username or Password is incorrect");
    } else {
      req.session.user = {
        username
      };

      return res.status(200).json(req.session.user);
    }
  }
};

const register = async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.status(406).json({
      error: "please fill in both fields"
    });
  } else {
    const db = req.app.get("db");
    let existingUser = await db
      .get_user([username])
      .catch(error => console.log(error));
    if (existingUser[0]) {
      console.log(existingUser);
      return res.status(409).json("Username already taken");
    } else {
      let hash = await bcrypt.hash(password, 10);
      let newUser = await db.create_user([username, hash]);
      req.session.user = {
        username,
        id: newUser[0].id
      };
      return res.status(200).json(req.session.user);
    }
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};

module.exports = {
  login,
  register,
  logout
};
