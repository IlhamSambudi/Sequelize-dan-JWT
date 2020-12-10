  
const express = require("express")
const app = express()
const customer = require("./router/customer")
const product = require("./router/product")
const transaksi = require("./router/transaksi")
const admin = require("./router/admin")

app.use("/computerstore/customer", customer)
app.use("/computerstore/product", product)
app.use("/computerstore/transaksi", transaksi)
app.use("/computerstore/admin", admin)

app.listen(8000,()=>{
    console.log("server run")
})