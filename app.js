const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const db = require('./models');
const { json } = require('sequelize');
const users = db.users;
const user_detail = db.user_detail;
const posts = db.posts;
const tags = db.tags;
const post_tag = db.post_tag;

db.sequelize.sync();

app.get("/OnetoOne", async (req, res) => {

  try {
    console.log("data");
    let data = await users.findAll({
      include: [user_detail],
    });
    console.log("data1");
    return res.status(200).json({
      success: "true",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: "false",
      err: err,
    });
  }
});


app.get("/OnetoMany", async (req, res) => {
  try {
    console.log("data");
    let data = await users.findAll({
      include: [posts],
    });
    console.log("data1");
    return res.status(200).json({
      success: "true",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: "false",
      err: err,
    });
  }
});



app.get("/ManytoMany", async (req, res) => {
  try {
    console.log("data");
    let data = await posts.findAll({
      include: [tags],
    });
    console.log("data1");
    return res.status(200).json({
      success: "true",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: "false",
      err: err,
    });
  }
});



app.listen(3000, () => {
  console.log("SERVER IS LISTNING");
});


//refrance : https://www.topcoder.com/thrive/articles/many-to-many-relationships-in-mysql-database-using-sequelize-orm
