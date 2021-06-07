const express = require('express')
const router = express.Router()
const connection = require('../connection')
const multer = require('multer')

var storage = multer.diskStorage({ 
  destination: (req, file, cb) => { 
      cb(null, 'uploads') 
  }, 
  filename: (req, file, cb) => { 
      cb(null, file.fieldname + '-' + Date.now() + ".webp") 
  } 
}); 

var upload = multer({ storage: storage });


// getting all stores
router.get('/', (req, res)=>{
    const limit = (req.query.limit)
    let start = (req.query.start)

    if(!start) start=0

    if(limit && start>=0){
        const query ="SELECT * FROM `stores`" + `LIMIT ${limit}  OFFSET ${start}`
        const query2 = 'SELECT COUNT(*) FROM `stores`'
        connection.query(query2, (err,resu)=>{
            if(err) return res.status(404).json({message:err.message})
            if(resu) {
                const numOfAllStores = resu[0]['COUNT(*)']
                connection.query(query,(err,result)=>{
                    if(err) return res.status(404).json({message:err.message})
                    if(result) return res.status(201).json({data: result, count: numOfAllStores})
                    else return res.send('unkown error')
                })
            }
            else return res.send('unkown error')
        })
    }
    else{
        const query = 'SELECT * FROM `stores`'
        connection.query(query,(err,result)=>{
            if(err) return res.status(404).json({message:err.message})
            if(result) return res.status(201).json({data: result})
            else return res.send('unkown error')
        })
    }
    
    
})

// adding new store
router.post('/add', upload.single('file'), (req, res)=>{
    const name = req.body.name
    const address = req.body.address
    const img = 'http://' + req.get('host') + '/images/' + req.file.filename

    const query = "INSERT INTO `stores` (`name`, `address`, `logo`) VALUES ('" + name + "', '" + address + "', '" + img + "')"
    connection.query(query,(err,result)=>{
        if(err) return res.status(404).json({message:err.message})
        if(result) return res.status(201).json({data: result})
        else return res.send('unkown error')
    })
})

// getting all categories of a single store
router.get('/:storeID/categories', (req, res)=>{
    const storeID = req.params.storeID
    const query = "SELECT * FROM `store_categories` WHERE (store_ID='" + storeID +  "')"

    connection.query(query,(err,result)=>{
        if(err) return res.status(404).json({message:err.message})
        if(result) return res.status(201).json({data: result})
        else return res.send('unkown error')
    })
})

// adding new category to a store
router.post('/:storeID/categories/add',upload.single('file'), (req, res)=>{
    const storeID = req.params.storeID
    const name = req.body.name
    const img = 'http://' + req.get('host') + '/images/' + req.file.filename

    const query = "INSERT INTO `store_categories` (`store_ID`,`category_name`, `category_image_url`) VALUES ('" + storeID + "', '" + name + "', '" + img + "')"
    connection.query(query,(err,result)=>{
        if(err) return res.status(404).json({message:err.message})
        if(result) return res.status(201).json({data: result})
        else return res.send('unkown error')
    })
})

// getting all items of a single category of a single store
router.get('/:storeID/:catID/items', (req, res)=>{
    const storeID = req.params.storeID
    const catID = req.params.catID
    const query = "SELECT * FROM `items` WHERE (store_ID='" + storeID +  "' AND category_ID='" + catID + "')"

    connection.query(query,(err,result)=>{
        if(err) return res.status(404).json({message:err.message})
        if(result) return res.status(201).json({data: result})
        else return res.send('unkown error')
    })
})

// adding new item to a single category of a single store
router.post('/:storeID/:catID/items/add', upload.single('file'), (req, res)=>{
    const storeID = req.params.storeID
    const catID = req.params.catID
    const name = req.body.name
    const price = req.body.price
    const color = req.body.color
    const img = 'http://' + req.get('host') + '/images/' + req.file.filename

    const query= "INSERT INTO `items` (`store_ID`,`category_ID`, `name`, `image_url`, `price`,`color`) VALUES ('" + storeID + "', '" + catID+ "', '" + name + "', '" + img + "', '" + price + "', '" + color + "')"
    connection.query(query,(err,result)=>{
        if(err) return res.status(404).json({message:err.message})
        if(result) return res.status(201).json({data: result})
        else return res.send('unkown error')
    })
})

module.exports = router;