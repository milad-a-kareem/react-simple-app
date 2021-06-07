const express = require('express')
const router = express.Router()
const path = require('path'); 
const fs = require('fs'); 
const sharp = require('sharp')

router.get('/:fileName', async(req, res, next) => {
    res.setHeader('Content-Type', 'image/webp')
    let t
    if (!req.query.width && !req.query.height) {
        t = sharp().resize(500).webp({lossless:true, quality: 77, alphaQuality: 80, force: false});
    }
    else if (!req.query.width && req.query.height) {
        t = sharp().resize({height: Number(req.query.height)}).webp({lossless:true, quality: 77, alphaQuality: 80, force: false});
    }

    else if (req.query.width && !req.query.height) {
        t = sharp().resize({width: Number(req.query.width)}).webp({lossless:true, quality: 77, alphaQuality: 80, force: false});
    }
    else{
        t = sharp().resize({height: Number(req.query.height), width: Number(req.query.width)}).webp({lossless:true, quality: 77, alphaQuality: 80, force: false});
    }
 
    fs.createReadStream(path.join('uploads', req.params.fileName)).on('error', function(err){return res.status(401).json({message: err})})
    .pipe(t).pipe(res)
})

module.exports = router