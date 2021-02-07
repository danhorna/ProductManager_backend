const productFunctions = {};
const Product = require('../models/Product');

productFunctions.getAllProducts = () => {
    return Product.find()
}

productFunctions.getProductById = (productid) => {
    return Product.findOne({ _id: productid })
}

productFunctions.newProduct = (product, listDate) => {
    const { code, name, price, iva } = product;
    const newProduct = new Product({
        code,
        name,
        price,
        iva,
        lastUpdate: listDate
    });
    return newProduct.save();
}

productFunctions.findProductByCode = (productCode) => {
    return Product.find({ code: productCode });
}

productFunctions.updateProductByCode = (code, price, iva, lastUpdate) => {
    return Product.findOneAndUpdate(
        { code },
        { price, iva, lastUpdate }
    )
}

productFunctions.updateDateByCode = (code, date) => {
    return Product.findOneAndUpdate(
        { code },
        { lastUpdate: date }
    )
}



module.exports = productFunctions