//Load file system module
const fs = require('fs');
//Load utility module
const util = require('util');

const readFile = util.promisify(fs.readFile);

//Create class
class ProductService {

    constructor(datafile){

        this.datafile = datafile;

    }

    async getData(){

        const data = await readFile(this.datafile, 'utf8');
        if(!data) return [];
        return JSON.parse(data).products;

    }

    async getNames(){

        const data = await this.getData();
        return data.map((product) => {
            return {name:product.name, shortname: product.shortname};
        });

    }

    async getList(){

        const data = await this.getData();
        return data.map((product) => {
            return {shortname:product.shortname, name2:product.name2, description:product.description}
        })

    }

    async getListShort(){

        const data = await this.getData();
        return data.map((product) => {
            return {name:product.name, shortname:product.shortname}
        });
    }

    async getProduct(shortname){

        const data = await this.getData();
        const product = data.find((product) => {
            return product.shortname === shortname;
        });

        if(!product) return null;

        return{
            shortname:product.shortname,
            name2:product.name2,
            description:product.description,
            specification:product.specification,
            package:product.package
        }
    }

    async getImageForProduct(shortname){

        const data = await this.getData();
        const product = data.find((product) => {
            return product.shortname === shortname;
        });
        if(!product || !product.image) return null;
        return product.image;

    }

    async getProductImage(){
        const data = await this.getData();
        const images = data.map((product) => {
            return product.image;
        })
        var productImage = [];
        images.forEach(function(element){
            productImage.push(...element);
        });
        return productImage;
    }

}

module.exports = ProductService;