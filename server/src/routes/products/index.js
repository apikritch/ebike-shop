//Load express
const express = require('express');
//Load express router
const router = express.Router();

//Export function
module.exports = (param) =>{

    const { productService } = param;
    
    router.get('/', async(req, res, next) => {

        const productslist = await
        productService.getList();

        const productImage = await
        productService.getProductImage();
        
        return res.render('product', {page: 'All Products', productslist, image: productImage});

    });

    router.get('/:name', async(req, res, next) => {

        try{
            const promises = [];
            promises.push(productService.getProduct(req.params.name));
            promises.push(productService.getImageForProduct(req.params.name));
            const result = await Promise.all(promises);

            if(!result[0]){
                return next();
            }

            return res.render('product/detail',{
                page: req.params.name,
                product: result[0],
                image: result[1]
            });
        }
        catch (err){
            return next(err);
        }

    });

    return router;
};