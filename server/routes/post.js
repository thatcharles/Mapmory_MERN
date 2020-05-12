const express = require('express');
const router = express.Router();
const { Post } = require("../models/Post");

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
//             Post
//=================================

router.post("/createPost", (req, res) => {

    const post = new Post(req.body);

    post.save((err, postInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true, 
            postInfo
        });
    });
});

router.get("/getPosts", (req, res) => {
    // populate user detail information from id
    Post.find()
        .limit(15)
        .populate('author')
        .exec((err, posts) => {
            if(err) {
                return res.status(400).send(err)
            }
            // send result back to client
            res.status(200).json({success:true, posts})
        })
});

module.exports = router;
