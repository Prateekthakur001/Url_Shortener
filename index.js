// POST /URL - Generates a new short URL and returns the shortened URL in the format example.com/random-id.
// GET /:id - Redirects the user to the original URL.
// GET /URL/analytics/Cl - Returns the clicks for the provided short id.

const express = require('express');
const {connectToMongoDB} = require('./connect');
const urlRoute =  require('./routes/url');
const URL = require('./models/url');

const app = express();
const port = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
  .then(()=>console.log("MongoDb Connected!!"));

//Middleware:-
app.use(express.json());
 
app.use('/url',urlRoute);

app.get('/:shortId', async(req,res)=>{
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
  },{$push:{
    visitHistory:{
      timestamp: Date.now(),
    },
  }});
  res.redirect(entry.redirectURL);
});

app.listen(port,()=>console.log( `Server Started at ${port}` ));

