const productsCtrl = {};
const { getAllProducts, findProductByCode, updateProductPriceByCode, newProduct, getProductById } = require('../helpers/products_utils');
const { newHistorical, newPriceToHistorical } = require('../helpers/historical_utils');

productsCtrl.getAllProducts = async (req, res) => {
    const products = await getAllProducts();
    res.json(products);
}

productsCtrl.getProductById = async (req, res) => {
    const product = await getProductById(req.params.id)
    res.json(product)
}

productsCtrl.newList = async (req, res) => {
    const { products } = req.body;
    let created = 0;
    let creationErrors = 0;
    let updated = 0;
    let updateErrors = 0;
    let withoutchanges = 0;
    await Promise.all(products.map(async (product) => {
        let productdb = await findProductByCode(product.code);
        if (productdb.length > 0) {
            if (productdb[0].price == product.price && productdb[0].iva == product.iva)
                withoutchanges++;
            else {
                try {
                    await newPriceToHistorical(productdb[0]._id, product.price, product.iva);
                    await updateProductPriceByCode(product.code, product.price, product.iva);
                    updated++;
                }
                catch (err) {
                    updateErrors++;
                }
            }
        }
        else {
            try {
                let newProd = await newProduct(product);
                await newHistorical(newProd._id, product.price, product.iva);
                created++;
            }
            catch (err) {
                creationErrors++;
            }
        }

    }));
    res.json({
        created,
        creationErrors,
        updated,
        updateErrors,
        withoutchanges
    })
}

module.exports = productsCtrl