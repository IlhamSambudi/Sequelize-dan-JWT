const express = require("express") 
const models = require("../models/index") 
const transaksi = models.transaksi 
const detail_transaksi = models.detail_transaksi
const app = express()
const dateTime = require('node-datetime')
app.use(express.urlencoded({extended:true}))

app.get("/", async (req,res)=>{
    let result = await transaksi.findAll({
        include: [
            "customer",
            {
                model: models.detail_transaksi,
                as: "detail_transaksi",
                include: ["product"]
            }
        ]
    })
    res.json({
        data:result
    })
})

app.post("/", async(req,res)=>{
    var thisDateTime = dateTime.create()
    var dateFormated = thisDateTime.format('Y-m-d H:M:S')

    let data = {
        id_customer: req.body.id_customer,
        waktu: dateFormated
    }

    transaksi.create(data)
    .then(result=>{
        let lastID = result.id_transaksi
        let data = {
            id_transaksi: lastID,
            id_product: req.body.id_product,
            qty: req.body.qty
        }

        detail_transaksi.create(data)
        .then(result=>{
            res.json({
                message: "data inserted"
            })
        })
        .catch(error=>{
            res.json({
                message:error.message
            })
        })
    })
})

module.exports = app