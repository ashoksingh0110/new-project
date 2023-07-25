const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Name is Required"]
    },
    category: {
        type: String,
        required: [true, "Product Category is Required"]
    },
    brand: {
        type: String,
        required: [true, "Product Brand is Required"]
    },
    color: {
        type: String,
        required: [true, "Product Color is Required"]
    },
    size: {
        type: String,
        required: [true, "Product Size is Required"]
    },
    baseprice: {
        type: Number,
        required: [true, "Product Base Price is Required"]
    },
    discount: {
        type: Number,
        default: 0
    },
    finalprice: {
        type: Number,
        required: [true, "Product Final Price Must Required"]
    },
    stock: {
        type: String,
        default: "In Stock"
    },
    description: {
        type: String,
        default: "This is Sample Product"
    },
    pic1: {
        type: String,
        default: ""
    },
    pic2: {
        type: String,
        default: ""
    },
    pic3: {
        type: String,
        default: ""
    },
    pic4: {
        type: String,
        default: ""
    },
})
const Product = new mongoose.model("Product", ProductSchema)
module.exports = Product