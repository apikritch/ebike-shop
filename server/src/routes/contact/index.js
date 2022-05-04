//Load express
const express = require('express');
//Load express router
const router = express.Router();

//Export function
module.exports = (param) =>{

    const { contactService } = param;

    router.get('/', async(req, res, next) => {

        const contactlist = await
        contactService.getList();
        try{
            
            return res.render('contact', {
                page: 'Contact',
                contactlist,
                success: req.query.success
            });

        }
        catch(err){
            
            return err;

        }

    });

    router.post('/', async(req, res, next) => {

        try{

            const contactlist = await
            contactService.getList();

            const ctName = req.body.ctName.trim();
            const ctEmail = req.body.ctEmail.trim();
            const ctTitle = req.body.ctTitle.trim();const ctMessage = req.body.ctMessage.trim();

            if(!ctName || !ctEmail || !ctTitle || !ctMessage){
                return res.render('contact',
                {
                    page:'Contact',
                    error:true,
                    ctName,
                    ctEmail,
                    ctTitle,
                    ctMessage,
                    contactlist
                });
            }

            return res.redirect('/contact?success=true')

        }
        catch(err){
            return next(err);
        }

    });

    return router;
    
};