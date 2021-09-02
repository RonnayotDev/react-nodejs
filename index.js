const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "employeeSystem",
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const money = req.body.money;

  db.query(
    "INSERT INTO employee (name, age, country, position, money) VALUES(?,?,?,?,?)",
    [name, age, country, position, money],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values insert success!");
      }
    }
  );
});
app.put("/update",(req,res) => {
    const id = req.body.id;
    const money = req.body.money;

    db.query("UPDATE employee SET money = ? WHERE id = ?",[money,id], (err,result) => {
        if(err){
            console.log(err)
        }
        else{
            res.send("Values Update Success !")
        }
    })
})
app.delete("/delete/:id",(req,res) => {
    const id = req.params.id;
    db.query("DELETE FROM employee WHERE id = ?",[id],(err,result) => {
        if(err){
            console.log(err)
        }
        else{
            res.send("Values Delete Success !")
        }
    })
})

app.listen("3002", () => {
  console.log("Server is running on port 3000");
});
