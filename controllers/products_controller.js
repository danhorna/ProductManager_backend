const productsCtrl = {};
const { getAllProducts, findProductByCode, updateProductByCode, newProduct, getProductById, updateDateByCode } = require('../helpers/products_utils');
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
    const { products, listDate } = req.body;
    let created = 0;
    let creationErrors = 0;
    let priceUpdated = 0;
    let priceUpdateErrors = 0;
    let dateUpdated = 0;
    let dateUpdateErrors = 0;
    let historicalAdded = 0;
    let historicalErrors = 0;
    await Promise.all(products.map(async (product) => {
        let productdb = await findProductByCode(product.code);
        if (productdb.length > 0) {
            let updateDate = false;
            let productLastUpdateFormated = new Date((new Date(productdb[0].lastUpdate)).toDateString());
            let listDateFormated = new Date((new Date(listDate)).toDateString());
            if (productLastUpdateFormated < listDateFormated) {
                updateDate = true;
                if (productdb[0].price == product.price && productdb[0].iva == product.iva) {
                    //updatear fecha
                    try {
                        await updateDateByCode(product.code, listDate)
                        await newPriceToHistorical(productdb[0]._id, product.price, product.iva, listDate);
                        dateUpdated++;
                        historicalAdded++;
                    }
                    catch (err) {
                        dateUpdateErrors++
                    }
                }
                else {
                    //updatear fecha y precios
                    try {
                        await newPriceToHistorical(productdb[0]._id, product.price, product.iva, listDate);
                        await updateProductByCode(product.code, product.price, product.iva, listDate);
                        priceUpdated++;
                        historicalAdded++;
                    }
                    catch (err) {
                        priceUpdateErrors++;
                    }
                }
            }
            else {
                //solo historial
                try {
                    await newPriceToHistorical(productdb[0]._id, product.price, product.iva, listDate);
                    historicalAdded++;
                }
                catch (err) {
                    historicalErrors++;
                }
            }
        }
        else {
            try {
                let newProd = await newProduct(product, listDate);
                await newHistorical(newProd._id, product.price, product.iva, listDate);
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
        priceUpdated,
        priceUpdateErrors,
        dateUpdated,
        dateUpdateErrors,
        historicalAdded,
        historicalErrors
    })
}

module.exports = productsCtrl