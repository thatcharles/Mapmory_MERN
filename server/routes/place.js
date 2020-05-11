const express = require('express');
const router = express.Router();
const { Place } = require("../models/Place");

const { auth } = require("../middleware/auth");
// To upload multimedia content
const multer = require("multer");

const dotenv = require("dotenv");

dotenv.config();

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file");

//=================================
//             Place
//=================================

router.post("/createPlace", (req, res) => {

    const place = new Place(req.body);

    place.save((err, placeInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true, 
            placeInfo
        });
    });
});

router.post("/getPlacesByPost", (req, res) => {

    Place.find({ postId: req.body.postId})
         .populate('postId')
         .exec((err, places) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).json({
                    success: true, 
                    places
                }
            )
    });
});



module.exports = router;
