'use strict'

const express = require('express');
const mongoose = require('mongoose');
const Contact = require('../model/Contact');
const router = express.Router();

router.route('/:id')
    .put((req, res) => {
        const _id = req.params.id;
        Contact.findOneAndUpdate({ _id},
            req.body,
            { new: true},
            (err, contact) => {
                if (err) {
                res.status(404).json(err);
                }
                res.json(contact);
            });
    });

module.exports = router;