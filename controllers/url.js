const shortid = require('shortid');
const url = require('../models/url.js');

async function shorturl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    const generatedShortId = shortid(); 
    await url.create({
        shortId: generatedShortId,
        redirectURL: body.url,
        visitedHistory: [],
    });
    return res.render("home", { id: generatedShortId });
    return res.status(200).json({ shortId: generatedShortId });
}

async function geturl(req, res) {
    const shortId = req.params.shortId;
    const entry = await url.findOneAndUpdate(
        { shortId },
        { $push: { visitedHistory: { timestamp: Date.now() } } }
    );
    if (!entry) {
        return res.status(404).json({ error: 'URL not found' });
    }
    return res.redirect(entry.redirectURL);
}
 
async function totalclicks(req, res) {
    const shortId = req.params.shortId;
    const entry = await url.findOne({ shortId });
    if (!entry) {
        return res.status(404).json({ error: 'URL not found' });
    }
    return res.status(200).json({ 
        totalClicks: entry.visitedHistory.length,
        analytics: entry.visitedHistory, 
    });
}

module.exports = {
    shorturl,
    geturl, // Ensure geturl is exported
    totalclicks, // Ensure totalclicks is exported
};