const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Product = require("./models/product");
const cors = require("cors")

const app = express();
const URL = process.env.MONGO_URL;
const PORT = process.env.PORT;


//

mongoose.set("strictQuery", false);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

//DB Connection
mongoose
.connect(URL)
.then(() =>{
    console.log("Mongo DB Connected")
})
.catch((error) =>{
    console.log({error})
})

//Routes
//TEST
app.get("/", (req,res) =>{
    res.status(200).json("Welcome to the API")
});

//GET ALL
app.get("/products", async(req,res) =>{
    try {
        const product = await Product.find({});
        res.status(200).json(product)
    } catch (error) {
        console.log({message: error.message})
    }
});

//GET ONE
app.get("/products/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        console.log({message: error.message})
    }
})

//CREATE Product
app.post("/products", async(req,res) =>{
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.log({message: error.message})
    }
})

//UPDATE Product
app.patch("/products/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        res.status(201).json(product);
    } catch (error) {
        console.log({message: error.message})
    }
})

//DELETE product
app.delete("/products/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        res.status(201).json(product);
    } catch (error) {
        console.log({message: error.message})
    }
})

//Port Listening
app.listen(PORT, () =>{
    console.log(`Server running on Port ${PORT}`)
})