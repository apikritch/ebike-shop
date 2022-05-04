//Load express
const express = require('express');
//Load product module
const productRoutes = require('./products');
//Load contact module
const contactRoutes = require('./contact');
//Load service module
const serviceRoutes = require('./services');
//Load express router
const router = express.Router();

//Export function
module.exports = (param) => {

    const { productService,serviceService } = param;

    const { personaliseService } = param;

    //Homepage route
    router.get('/', async(req, res, next) => {

        const productslist = await
        productService.getListShort();
        const serviceslist = await
        serviceService.getListShort();

        const productImage = await
        productService.getProductImage();
        const serviceImage = await
        serviceService.getServiceImage();

        const usersFavouriteProduct = await personaliseService.getUsersFavouriteProduct("Apikritch_Rattanapisankul");

        const favouriteProductImage = await productService.getImageForProduct(usersFavouriteProduct);

        //Tell express to render index.pug
        return res.render('index', {page: 'Home', productslist, serviceslist, image: productImage, image: serviceImage, image: favouriteProductImage});

    });

    //Use productRoutes module
    router.use('/products', productRoutes(param));
    //Use contactRoutes module
    router.use('/contact', contactRoutes(param));
    //Use serviceRoutes module
    router.use('/services', serviceRoutes(param));


    return router;
};
