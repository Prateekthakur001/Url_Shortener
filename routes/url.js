const express = require('express');
const {handleGenerateNewShortUrl,handleGetAnalytics} = require('../controllers/url')
const router = express.Router();

// POST /URL - Generates a new short URL and returns the shortened URL in the format example.com/random-id.
router.post('/',handleGenerateNewShortUrl);


// GET /URL/analytics/Cl - Returns the clicks for the provided short id.
router.get('/analytics/:shortId',handleGetAnalytics); 
module.exports = router;