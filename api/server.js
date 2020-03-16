const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

//get accounts
server.get('/api/accounts', (req, res) => {
    db.select('*')
    .from('accounts')
    .then(accts => {
        res.status(200).json(accts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: "server error"})
    })
})

//get accounts by id
server.get('/api/accounts/:id', (req, res) => {
    db("accounts")
    .where({id: req.params.id})
    .first()
    .then(acct => {
        if(acct) {
            res.status(200).json({data: acct})
        } else {
            res.status(404).json({message: "no account found"})
        }
    })
    .catch(err => {
        res.status(500).json({err: "server error getting posts"})
    })
}) 

//post account:
server.post("/api/accounts", (req, res) => {
    db("accounts")
      .insert(req.body, "id")
      .then(ids => {
        res.status(201).json({ results: ids });
      })
      .catch(error => {
        res.status(500).json({ message: "sorry, ran into an error" });
      });
  });


//put account:
server.put('/api/accounts/:id', (req, res) => {
    const updates = req.body;
    db("accounts")
    .where({ id: req.params.id })
    .update(updates)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "record updated successfully" });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "sorry, ran into an error" });
    });
});

//delete account:
server.delete('/api/accounts/:id', (req, res) => {
    db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(acct => {
        if(acct) {
            res.status(200).json({message: "account deleted successfully"})
        } else {
            res.status(404).json({ message: "Account not found" });
        }
    })
    .catch(err => {
        res.status(500).json({err: "server error deleting account"})
    })
})

module.exports = server;
