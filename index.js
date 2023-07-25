const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const cors = require("cors")


const Product = require("./models/Product")
const User = require("./models/User")
require("./dbConnect")


const app = express()
app.set(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(cors())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

//api for User
app.post("/user", async (req, res) => {
    try {
        const data = new User(req.body)
        await data.save()
        res.send({
            result: "Done",
            message: "User details is added Successfully"
        })
    } catch (error) {
        // console.log(error)
        if (error.keyValue)
            res.status(400).send({
                result: "Fail",
                message: "Username Already Registered ! Choose Any Other username"
            })
        else if (error.errors.name)
            res.status(400).send({
                result: "Fail",
                message: error.errors.name.message
            })
        else if (error.errors.email)
            res.status(400).send({
                result: "Fail",
                message: error.errors.email.message
            })
        else if (error.errors.username)
            res.status(400).send({
                result: "Fail",
                message: error.errors.username.message
            })
        else if (error.errors.phone)
            res.status(400).send({
                result: "Fail",
                message: error.errors.phone.message
            })
        else if (error.errors.password)
            res.status(400).send({
                result: "Fail",
                message: error.errors.password.message
            })
        else
            res.status(500).send({
                result: "Fail",
                message: "Internal Server Error"
            })
    }
})
app.get("/user", async (req, res) => {
    try {
        const data = await User.find()
        res.send({
            result: "Done",
            data: data
        })
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            message: "Internal Server Error"
        })
    }
})
app.get("/user/:_id", async (req, res) => {
    try {
        const data = await User.findOne({
            _id: req.params._id
        })
        if (data)
            res.send({
                result: "Done",
                data: data
            })
        else
            res.status(404).send({
                result: "Fail",
                message: "Invalid ID"
            })
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            message: "Internal Server Error"
        })
    }
})
app.put("/user/:_id", async (req, res) => {
    try {
        const data = await User.findOne({
            _id: req.params._id
        })
        if (data) {
            data.name = req.body.name ?? data.name
            data.email = req.body.email ?? data.email
            data.phone = req.body.phone ?? data.phone
            data.address = req.body.address ?? data.address
            data.pin = req.body.pin ?? data.pin
            data.city = req.body.city ?? data.city
            data.state = req.body.state ?? data.state
            await data.save()
            res.send({
                result: "Done",
                message: "User Details Updated Successfully"
            })
        } else
            res.status(404).send({
                result: "Fail",
                message: "Invalid ID"
            })
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            message: "Internal Server Error"
        })
    }
})
app.delete("/user/:_id", async (req, res) => {
    try {
        const data = await User.findOne({
            _id: req.params._id
        })
        if (data) {
            await User.deleteOne({_id: req.params._id})
            // await data.delete()
            res.send({
                result: "Done",
                message: "User Details has been removed successfully."
            })
        } else
            res.status(404).send({
                result: "Fail",
                message: "Invalid ID"
            })
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            message: "Internal Server Error"
        })
    }
})


//api for Product

app.post("/product", upload.fields([
    { name: "pic1", maxCount: 1 },
    { name: "pic2", maxCount: 1 },
    { name: "pic3", maxCount: 1 },
    { name: "pic4", maxCount: 1 }
]), async (req, res) => {
    try {
        const data = new Product(req.body)
        if (req.files.pic1) {
            data.pic1 = req.files.pic1[0].filename
        }
        if (req.files.pic2) {
            data.pic2 = req.files.pic2[0].filename
        }
        if (req.files.pic3) {
            data.pic3 = req.files.pic3[0].filename
        }
        if (req.files.pic4) {
            data.pic4 = req.files.pic4[0].filename
        }
        await data.save()
        res.send({ result: "Done", message: "Product is Created!!!!" })
    }
    catch (error) {
        // console.log(error.errors.name.message)
        if (error.errors.name)
            res.status(400).send({ result: "Fail", message: error.errors.name.message })
        else if (error.errors.category)
            res.status(400).send({ result: "Fail", message: error.errors.category.message })
        else if (error.errors.brand)
            res.status(400).send({ result: "Fail", message: error.errors.brand.message })
        else if (error.errors.color)
            res.status(400).send({ result: "Fail", message: error.errors.color.message })
        else if (error.errors.size)
            res.status(400).send({ result: "Fail", message: error.errors.size.message })
        else if (error.errors.baseprice)
            res.status(400).send({ result: "Fail", message: error.errors.baseprice.message })
        else if (error.errors.finalprice)
            res.status(400).send({ result: "Fail", message: error.errors.finalprice.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
})
app.get("/product", async (req, res) => {
    try {
        const data = await Product.find()
        res.send({ result: "Done", data: data })
    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
})
app.get("/product/:_id", async (req, res) => {
    try {
        const data = await Product.findOne({ _id: req.params._id })
        if (data)
            res.send({ result: "Done", data: data })
        else
            res.status(404).send({ result: "Fail", message: "Invalid ID" })
    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
})
app.put("/product/:_id", upload.fields([
    { name: "pic1", maxCount: 1 },
    { name: "pic2", maxCount: 1 },
    { name: "pic3", maxCount: 1 },
    { name: "pic4", maxCount: 1 }
]), async (req, res) => {
    try {
        const data = await Product.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.category = req.body.category ?? data.category
            data.brand = req.body.brand ?? data.brand
            data.color = req.body.color ?? data.color
            data.size = req.body.size ?? data.size
            data.baseprice = req.body.baseprice ?? data.baseprice
            data.discount = req.body.discount ?? data.discount
            data.finalprice = req.body.finalprice ?? data.finalprice
            data.stock = req.body.stock ?? data.stock
            data.description = req.body.description ?? data.description
            if (req.files.pic1) {
                try {
                    fs.unlinkSync(`./public/images/${data.pic1}`)
                } catch (error) { }
                data.pic1 = req.files.pic1[0].filename
            }
            if (req.files.pic2) {
                try {
                    fs.unlinkSync(`./public/images/${data.pic2}`)
                } catch (error) { }
                data.pic2 = req.files.pic2[0].filename
            }
            if (req.files.pic3) {
                try {
                    fs.unlinkSync(`./public/images/${data.pic3}`)
                } catch (error) { }
                data.pic3 = req.files.pic3[0].filename
            }
            if (req.files.pic4) {
                try {
                    fs.unlinkSync(`./public/images/${data.pic4}`)
                } catch (error) { }
                data.pic4 = req.files.pic4[0].filename
            }
            await data.save()
            res.send({ result: "Done", message: "Product Updated!!!!!" })
        }
        else
            res.status(404).send({ result: "Fail", message: "Invalid ID" })
    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
})
app.delete("/product/:_id", async (req, res) => {
    try {
        const data = await Product.findOne({ _id: req.params._id })
        if (data) {
            await Product.deleteOne()
            res.send({ result: "Done", message: "Product is deleted!!!!" })
        }
        else
            res.status(404).send({ result: "Fail", message: "Invalid ID" })
    }
    catch (error) {
        // console.log(error)
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
})



app.listen(8000, () => console.log("Server is Running at PORT 8000"))