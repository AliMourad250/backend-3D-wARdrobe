const express = require("express");
const multer = require('multer');
const clothingController = require("../controllers/clothingController");

const modelStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/clothingModels');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const thumbnailStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/thumbnails');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploadModel = multer({ storage: modelStorage });
const uploadThumbnail = multer({ storage: thumbnailStorage });

const router = express.Router();
router.post("/create", uploadModel.single('modelFile'), uploadThumbnail.single('thumbnailFile'), clothingController.create);
router.get("/fetchAll", clothingController.fetchAll);
router.get("/filter/:type", clothingController.filterByType);
router.delete("/delete/:clothingId", clothingController.delete);

module.exports = router;
