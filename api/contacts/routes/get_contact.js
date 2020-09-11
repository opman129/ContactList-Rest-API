'use strict'

const express = require('express');
const mongoose = require('mongoose');
const Contact = require('../model/Contact');
const router = express.Router();

//FIND ONLY ONE CONTACT
router.route('/:id')
    .get((req, res) => {

        const _id = req.params.id;

        Contact.find0ne({_id}, (err, contact) => {
            if (err) {
                res.status(400).json(err);
            }

            if (!contact) {
                res.status(404).json({message: 'Contact not found'});
            }
            res.json(contact);
        });
    });

    module.exports = router;
