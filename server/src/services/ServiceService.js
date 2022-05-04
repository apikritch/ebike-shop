//Load file system module
const fs = require('fs');
//Load utility module
const util = require('util');

const readFile = util.promisify(fs.readFile);

//Create class
class ServiceService {

    constructor(datafile){

        this.datafile = datafile;

    }

    async getData(){

        const data = await readFile(this.datafile, 'utf8');
        if(!data) return [];
        return JSON.parse(data).services;

    }

    async getNames(){

        const data = await this.getData();
        return data.map((service) => {
            return {name:service.name,shortname:service.shortname};
        });

    }

    async getList(){

        const data = await this.getData();
        return data.map((service) => {
            return {shortname:service.shortname, name2:service.name2, description:service.description}
        })

    }

    async getListShort(){

        const data = await this.getData();
        return data.map((service) => {
            return {name:service.name, shortname:service.shortname}
        });
    }

    async getService(shortname){

        const data = await this.getData();
        const service = data.find((service) => {
            return service.shortname === shortname;
        });

        if(!service) return null;

        return{
            shortname:service.shortname,
            name2:service.name2,
            description:service.description
        }
    }

    async getImageForService(shortname){

        const data = await this.getData();
        const service = data.find((service) => {
            return service.shortname === shortname;
        });
        if(!service || !service.image) return null;
        return service.image;

    }

    async getServiceImage(){

        const data = await this.getData();
        const images = data.map((service) => {
            return service.image;
        });
        var serviceImage = [];
        images.forEach(function(element){
            serviceImage.push(...element);
        })

        return serviceImage;

    }

}

module.exports = ServiceService;