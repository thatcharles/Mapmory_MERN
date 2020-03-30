const express = require('express');
const router = express.Router();
const { Blog } = require("../models/Blog");

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
//             Blog
//=================================

router.post("/createPost", (req, res) => {

    const blog = new Blog(req.body);

    blog.save((err, postInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true, 
            postInfo
        });
    });
});

router.post("/updatePost", (req, res) => {

    Blog.findByIdAndUpdate(req.body._id,
        {
            email: req.body.email,
            content: req.body.content          
        },  
        function(err, response){
                if (err) {
                    if (err) return res.json({ success: false, err });
                } else {
                    return res.status(200).json({
                        success: true, 
                        response
                    });
                }
                });
    
});


router.post("/uploadfiles", (req, res) => {

    // Seems like it store the multi media locally.
    upload(req, res, err => {
        if (err) return res.json({ success: false, err });
        return res.json({
            success: true,
            url: res.req.file.path,
            fileName: res.req.file.fileName
        })
    })
});


router.get("/getBlogs", (req, res) => {
    // pull the data from MongoDB

    // populate user detail information from id
    Blog.find()
        .populate('author')
        .exec((err, blogs) => {
            if(err) {
                return res.status(400).send(err)
            }
            // send result back to client
            res.status(200).json({success:true, blogs})
        })
});

router.post("/getPostDetail", (req, res) => {

    Blog.findOne({"_id": req.body.postId})
        .populate('author')
        .exec((err, post) => {
            if(err) {
                return res.status(400).send(err)
            }
            res.status(200).json({success:true, post})
        })
});

module.exports = router;
