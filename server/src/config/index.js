//Load path module
const path = require('path');

//Export an object
module.exports = {
    //Create property for development
    development: {
        sitename: 'Bike [Development]',
        //Add urls for the products data and contact data
        data: {
            products: path.join(__dirname, '../data/products.json'),
            services: path.join(__dirname, '../data/services.json'),
            contact: path.join(__dirname, '../data/contact.json'),
            users: path.join(__dirname, '../data/users.json')
        }
    },
    //Create property for production
    production: {
        sitename: 'Bike',
        //Add urls for the products data and contact data
        data: {
            products: path.join(__dirname, '../data/products.json'),
            services: path.join(__dirname, '../data/services.json'),
            contact: path.join(__dirname, '../data/contact.json'),
            users: path.join(__dirname, '../data/users.json')
        }
    }
}