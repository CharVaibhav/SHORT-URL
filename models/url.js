const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: { type: String, required: true, unique: true },
    redirectURL: { type: String, required: true },
    visitedHistory: [
        {
            timestamp: { type: Date, required: true },
        },
    ],
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
