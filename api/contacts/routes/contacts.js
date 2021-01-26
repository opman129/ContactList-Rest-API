const express = require('express');
const Contact = require('../model/Contact');
const router = express.Router();

//GET MULTIPLE CONTACTS
router.get('/', (req, res) => {
  Contact.find({}, (err, contacts) => {
    if (err) {
      res.status(400).json(err);
    }
    res.json(contacts);
  });
});

//CREATE NEW USER CONTACT
router.post("/", async (req, res) => {
  const contact = await new Contact(req.body);

  contact.save((err, contact) => {
    if (err) {
      res.status(400).json(err);
    }
    res.json(contact);
  });
});

//FIND ONLY ONE CONTACT
router.route("/:id", (req, res) => {
  const _id = req.params.id;

  Contact.find0ne({ _id }, (err, contact) => {
    if (err) {
      res.status(400).json(err);
    }

    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  });
});

//UPDATE CONTACT
router.patch("/:id", (req, res) => {
  const _id = req.params.id;
  Contact.findOneAndUpdate({ _id }, req.body, { new: true }, (err, contact) => {
    if (err) {
      res.status(404).json(err);
    }
    res.json(contact);
  });
});


module.exports = router;