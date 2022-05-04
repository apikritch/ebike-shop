//Load express
const express = require('express');
//Load express router
const router = express.Router();

//Export function
module.exports = (param) =>{

    const { serviceService } = param;
    
    router.get('/', async(req, res, next) => {

        const serviceslist = await
        serviceService.getList();

        const serviceImage = await
        serviceService.getServiceImage();

        return res.render('service', {page: 'All Services', serviceslist, image: serviceImage});

    });

    router.get('/:name', async(req, res, next) => {

        try{
            const promises = [];
            promises.push(serviceService.getService(req.params.name));
            promises.push(serviceService.getImageForService(req.params.name));
            const result = await Promise.all(promises);

            if(!result[0]){
                return next();
            }

            return res.render('service/detail',{
                page: req.params.name,
                service: result[0],
                image: result[1]
            });
        }
        catch (err){
            return next(err);
        }

    });

    return router;
};