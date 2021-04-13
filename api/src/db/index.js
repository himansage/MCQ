const mongoose = require('mongoose');
const config = require('config');

const {uri, options} = config.get('dbConfig');

const db = {};

db.mongoose = mongoose;

db.connect = () => {
    return new Promise((resolve, reject) => {

        if (process.env.NODE_ENV === 'test') {
            const Mockgoose = require('mockgoose').Mockgoose;
            const mockgoose = new Mockgoose(mongoose);
            mockgoose.prepareStorage().then(()=> {
                mongoose.connect(uri, options,(err)=> {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            })
        } else {
            mongoose.connect(uri, options,(err)=> {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        }


    });
}

db.close = async () => {
    return await mongoose.disconnect();
}

module.exports = db;