const productsCtrl = {};
const { getAllProducts, findProductByCode, updateProductPriceByCode, newProduct } = require('../helpers/products_utils');
const { newHistorical, newPriceToHistorical } = require('../helpers/historical_utils');

productsCtrl.getAllProducts = async (req, res) => {
    const products = await getAllProducts();
    res.json(products);
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
            if (productdb[0].price == product.price)
                withoutchanges++;
            else {
                try {
                    await newPriceToHistorical(product.code, product.price);
                    await updateProductPriceByCode(product.code, product.price);
                    updated++;
                }
                catch (err) {
                    updateErrors++;
                }
            }
        }
        else {
            try {
                await newProduct(product);
                await newHistorical(product.code, product.price);
                created++;
            }
            catch (err) {
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