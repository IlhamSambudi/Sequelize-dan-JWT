const express = require("express")
const models = require("../models/index") 
const customer = models.customer
const app = express()
const multer = require("multer")
const path = require("path")
const fs = require("fs")

//AUTHENTICATION
const auth = require("../auth")
app.use(auth)

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,"./image/customer")
    },
    filename:(req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})

//MENAMPILKAN SELURUH DATA
app.get("/", (req,res)=>{
    customer.findAll()
    .then(customer => {
        res.json({
            data:customer
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
            phone:req.body.phone,
            address:req.body.address,
            image: req.file.filename
        }

        customer.create(data)
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
    let param = {id_customer: req.body.id_customer}
    let data = {
        name: req.body.name,
        phone:req.body.phone,
        address:req.body.address
    }

    if(req.file){
        const row = customer.findOne({where:param})
        .then(result=>{
            let oldFileName = result.image
            let dir = path.join(__dirname, "../image/customer",oldFileName)
            fs.unlink(dir, err => console.log(err))
        })
        .catch(error=> {
            console.log(error.message)
        })
        data.image = req.file.filename
        customer.update(data, ({where:param}))
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
app.delete("/:id_customer", async (req,res)=>{
    try{
        let param = {id_customer: req.params.id_customer}
        let result = await customer.findOne({where: param})
        let oldFileName = result.image
        let dir = path.join(__dirname,"../image/customer",oldFileName)
        fs.unlink(dir,err=> console.log(err))
        customer.destroy({where:param})
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