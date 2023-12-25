const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const Product = require('./models/productModels')


const app = express()

app.use(express.json())
// routes


app.get('/', (req, res) => {
    res.send("Hello NODE API")
})


app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})


app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: `We cannot find any product with this ID: ${id}` });
        }

        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



app.delete('/products/:id', async (req, res) => {
    try {
        console.log(req.params)
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({ message: `Could not find product with ID ${id}` })
        }

        res.status(200).json({ message: `Product with ID ${id} has been deleted successfully` })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})



mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Connected!')
        app.listen(3000, () => {
            console.log("Node API is running on port 3000")
        })

    }).catch((error) => {
        console.log({ message: error.message })
    })




