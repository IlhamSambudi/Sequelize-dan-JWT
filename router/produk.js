const express = require("express") 
const models = require("../models/index") 
const product = models.product 
const app = express()
const multer = require("multer")
const path = require("path")
const fs = require("fs")

//KONFIGURASI STORAGE 
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,"./image/product")
    },
    filename:(req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})
//MENAMPILKAN SELURUH DATA
app.get("/", (req,res)=>{
    product.findAll()
    .then(product => {
        res.json({
            data:product
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})
//TAMBAH DATA
app.post ("/", upload.single("image"),(req,res)=>{
    if(!req.file) {
        res.json({
            message: "no image"
        })
    }else {
        let data = {
            name:req.body.name,
            price:req.body.price,
            stock:req.body.stock,
            image: req.file.filename
        }

        product.create(data)
        .then(result => {
            res.json({
                message: "data inserted",
                data: result
            })
        })
        .catch(error=>{
            message: error.message
        })
    }
})

//EDIT DATA
app.put("/", upload.single("image"), (req,res)=>{
    let param = {id_product: req.body.id_product}
    let data = {
        name:req.body.name,
        price:req.body.phone,
        stock:req.body.address,
    }

    if(req.file){
        const row = product.findOne({where:param})
        .then(result=>{
            let oldFileName = result.image
            let dir = path.join(__dirname, "../image/product",oldFileName)
            fs.unlink(dir, err => console.log(err))
        })
        .catch(error=> {
            console.log(error.message)
        })
        data.image = req.file.filename
        product.update(data, ({where:param}))
        .then(result=> {
            res.json({
                message: "data updated"
            })
        })
        .catch(error=>{
            res.json({
                message: error.message
            })
        })
    }
})

//DELETE DATA
app.delete("/:id_product", async (req,res)=>{
    try{
        let param = {id_product: req.params.id_product}
        let result = await product.findOne({where: param})
        //temukan file gambar
        let oldFileName = result.image
        let dir = path.join(__dirname,"../image/product",oldFileName)
        fs.unlink(dir,err=> console.log(err))
        product.destroy({where:param})
        .then(result=>{
            res.json({
                message:"data deleted"
            })
        })
        .catch(error=>{
            res.json({
                message:error.message
            })
        })
    } catch{
        res.json({
            message:error.message
        })
    }
})

module.exports = app