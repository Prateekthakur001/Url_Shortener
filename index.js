// POST /URL - Generates a new short URL and returns the shortened URL in the format example.com/random-id.
// GET /:id - Redirects the user to the original URL.
// GET /URL/analytics/Cl - Returns the clicks for the provided short id.

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const {connectToMongoDB} = require('./connect');
const {restrictToLoggedinUserOnly,checkAuth} = require('./middlewares/auth');
const URL = require('./models/url');

// Routes folder:-
const urlRoute =  require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const port = 8001;

// MongoDB Connection:- 
connectToMongoDB('mongodb://localhost:27017/short-url')
  .then(()=>console.log("MongoDb Connected!!"))
  .catch(()=> console.log("Error in MongoDB Connection"));

//Setting the view engine:- 
app.set("view engine","ejs"); // Telling the exporess that we are using the ejs view engine.
app.set("views", path.resolve('./views')); // Telling the path of the views.

//Middleware:-
app.use(express.json()); // Supports json data.
app.use(express.urlencoded({extended: false})); // Supports url encoded data.
app.use(cookieParser());
 
//Routes:-
// app.get('/test', async(req,res)=>{
//   const allUrls = await URL.find({});
//   return res.render('home',{
//     urls: allUrls,
//   });
// });

app.use('/url',restrictToLoggedinUserOnly,urlRoute);
app.use('/user',userRoute);
app.use('/',checkAuth,staticRoute);

// This route will redirect the xuser to the original URL. 
// app.get('/:shortId', async (req, res) => {
//   const shortId = req.params.shortId;
//   const entry = await URL.findOneAndUpdate(
//     { shortId },
//     {
//       $push: {
//         visitHistory: {
//           timestamp: Date.now(),
//         },
//       },
//     }
//   );

//   if (!entry) {
//     return res.status(404).send('Short URL not found');
//   }

//   res.redirect(entry.redirectURL);
// });


app.listen(port,()=>console.log( `Server Started at ${port}` ));

