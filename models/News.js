const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = new Schema({
    phone: String,
    address: {
        uz: String,
        kr: String
    }
}, { collection: 'news' })


const News = mongoose.model('News', newsSchema)

module.exports = News