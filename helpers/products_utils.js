const productFunctions = {};
const Product = require('../models/Product');

productFunctions.getAllProducts = () => {
    return Product.find()
}

productFunctions.getProductById = (productid) => {
    return Product.findOne({_id: productid})
}

productFunctions.newProduct = (product) => {
    const { code, name, price, iva } = product;
    const newProduct = new Product({
        code,
        name,
        price,
        iva
    });
    return newProduct.save();
}

productFunctions.findProductByCode = (productCode) => {
    return Product.find({ code: productCode });
}

productFunctions.updateProductPriceByCode = (code, price, iva) => {
    return Product.findOneAndUpdate(
        { code },
        { price, iva }
    )
}



module.exports = productFunctions