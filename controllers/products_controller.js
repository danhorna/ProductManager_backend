const productsCtrl = {};

const Product = require('../models/Product');
const Historical = require('../models/Historical');
const { HistoricalPricesModel } = require('../models/HistoricalPrices')

productsCtrl.getAllProducts = async (req,res) => {
    const products = await Product.find();
    res.json(products);
}

function newProduct(product) {
    const { code, name, price } = product;
    const newProduct = new Product({
        code,
        name,
        price
    });
    return newProduct.save();
}

function newHistorical(product){
    const { code, price } = product;
    const newHistoricalPrice = new HistoricalPricesModel({
        price,
        date: new Date()
    });
    const newHistorical = new Historical({
        code,
        historicalPrices: [newHistoricalPrice]
    });
    return newHistorical.save()
}

function addHistoricalPrice(product){
    const { code, price } = product;
    const newHistoricalPrice = new HistoricalPricesModel({
        price,
        date: new Date()
    });
    return Historical.findOneAndUpdate(
        { code }, 
        { $push: 
            { historicalPrices: newHistoricalPrice} 
        })
}

function updateProductPrice(product){
    const { code, price } = product;
    return Product.findOneAndUpdate(
        { code },
        { price }
    )
}

productsCtrl.newList = async (req,res) => {
    const { products } = req.body;
    let created = 0;
    let creationErrors = 0;
    let updated = 0;
    let updateErrors = 0;
    let withoutchanges = 0;
    await Promise.all(products.map(async (product, index) =>{
        let productdb = await Product.find({code:product.code});
        if (productdb.length > 0){
            if (productdb[0].price == product.price)
                withoutchanges++;
            else{
                try{
                    await addHistoricalPrice(product);
                    await updateProductPrice(product);
                    updated++;
                }
                catch(err){
                    updateErrors++;
                }
            }
        }
        else{
            try{
                await newProduct(product);
                await newHistorical(product);
                created++;
            }
            catch(err){
                creationErrors++;
            }
        }
        
    }));
    res.json({
        "Creados": created,
        "Errores al crear": creationErrors,
        "Actualizados": updated,
        "Errores al actualizar": updateErrors,
        "Sin cambios": withoutchanges
    })
}

module.exports = productsCtrl