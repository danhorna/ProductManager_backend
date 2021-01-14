const productFunctions = {};
const Product = require('../models/Product');

productFunctions.getAllProducts = () => {
    return Product.find()
}

productFunctions.newProduct = (product) => {
    const { code, name, price } = product;
    const newProduct = new Product({
        code,
        name,
        price
    });
    return newProduct.save();
}

productFunctions.findProductByCode = (productCode) => {
    return Product.find({ code: productCode });
}

productFunctions.updateProductPriceByCode = (code, price) => {
    return Product.findOneAndUpdate(
        { code },
        { price }
    )
}



module.exports = productFunctions