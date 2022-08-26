const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const jwt = require ("jsonwebtoken")
const middleware = require("../middleware/auth")

router.get("/", (req, res) => {
    try {
        con.query("SELECT * FROM products", (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
      
    }
});

router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM products WHERE id = "${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/", middleware, (req, res) => {
  // if (req.user.user_type === "admin") {
    const user = {
      image: req.body.image,
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
    };
    try {
      let sql = `insert into products SET ?`;
      con.query(sql, user, (err, result) => {
        if (err) throw err.message;
        res.send(result);
      });
    } catch (error) {
      console.log(error.message);
    }
 
});



router.patch("/:id", (req, res) => {
    const {
        image,
        title,
        price,
        category
        } = req.body;
    try {
      con.query(
        `update product set image = "${image}", title = "${title}", price = "${price}", category = "${category}" where id ="${req.params.id}"`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });

router.delete("/:id", (req, res) => {
    try {
      con.query(
        `delete from product where id ="${req.params.id}"`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });


module.exports = router;