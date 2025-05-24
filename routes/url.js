const express = require('express');
const {handleGenerateNewShortUrl,handleRedirection,handleGetAnalytics} = require('../controllers/url')
const router = express.Router();

// POST:- /url/ - Generates a new short URL and returns the shortened URL in the format example.com/random-id.
router.post('/',handleGenerateNewShortUrl);

// GET /:id - Redirects the user to the original URL.
router.get('/:shortId',handleRedirection);

// GET /url/analytics/Cl - Returns the clicks for the provided short id.
router.get('/analytics/:shortId',handleGetAnalytics); 


module.exports = router;