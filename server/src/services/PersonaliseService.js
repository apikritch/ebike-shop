const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

class PersonaliseService {
  constructor(datafile) {
    
    this.datafile = datafile;
    
  }

  async getList() {
    const data = await this.getData();
    return data;
  }

  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }

  async getUsersFavouriteProduct(shortname){
    const data = await this.getData();
    const user = data.users.find((user) => {
        return user.shortname === 'Apikritch_Rattanapisankul';
    });

    if(!user || !user.mostviewedProduct) return null;
    return user.mostviewedProduct; 
  }
}

module.exports = PersonaliseService;