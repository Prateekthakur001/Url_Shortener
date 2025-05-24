const shortid = require('shortid');
const URL = require("../models/url");

// Function that handles the creation of a new URL.
async function handleGenerateNewShortUrl(req,res) {
  const body = req.body;
  if(!body.url) return res.status(400).json({error: "No data provided"});
  const shortID = shortid();
  await URL.create({ // creating a new document in the database.
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id
  });
  return res.render('home', {
    id: shortID
  }); // render the home page with the short id. 
  // return res.json({id: shortID}); //Sending the json response.
}

// Function that handles the redirection of the user to the original URL.
async function handleRedirection(req,res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (!entry) {
    return res.status(404).send('Short URL not found');
  }
  res.redirect(entry.redirectURL);

}


// Function that tells how many times a URL has been visited.
async function handleGetAnalytics(req,res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({shortId});
  return res.json({totalClicks: result.visitHistory.length, Analytics: result.visitHistory});
}


module.exports = {
  handleGenerateNewShortUrl,
  handleRedirection,
  handleGetAnalytics
}