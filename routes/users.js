const express = require('express');
const multer = require('multer');
const { Database, User } = require('../src/models');
const { UsersController, NewsController } = require('./../src/controllers');

const router = express.Router();

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        console.log('File: ', file);
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    const flag = file.mimetype.startsWith('image');
    cb(null, flag);
};
const uploadFile = multer({
    storage: multerStorage,
    fileFilter
})

router.get('/', UsersController.getAll);

router.post('/', uploadFile.single('profilePic'), UsersController.createUser);

router.get('/:id', UsersController.getById);

module.exports = router;
