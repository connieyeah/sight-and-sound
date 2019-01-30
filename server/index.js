var express = require('express');
var path = require('path');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var request = require('request');
// var cors = require('cors');

const Clarifai = require('clarifai');

const querystring = require('querystring');

var app = express();
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

const appClarifai = new Clarifai.App({apiKey: 'c242e9881b394568b5303941036b053f'});



// first call
const client_id = '91a6997d074c4e05b7309537d8437839';
const client_secret = '0d121ef289d246d3884a5049442ad125';
const redirect_uri = 'http://localhost:5000/callback';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';


/* The first call is the service’s /authorize endpoint, passing to it the client ID,
scopes, and redirect URI. This is the call that starts the process of
authenticating to user and gets the user’s authorization to access data. */
app.get('/login', (req, res) => {
  console.log(`attempting to do /login`)
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  // your application requests authorization
  const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri,
      state
    }));
});

/* The second call is to the Spotify Accounts Service’s /api/token endpoint,
passing to it the authorization code returned by the first call and the client
secret key. This second call returns an access token and also a refresh token. */
app.get('/callback', function(req, res) {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;
  console.log(`attempting to do /callback`)
  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/?' + querystring.stringify({ access_token, refresh_token }));
        // res.redirect('/#' + querystring.stringify({ access_token, refresh_token }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
  });
  
  app.get('/refresh_token', function(req, res) {
  
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  });

  app.post('/clarifai', function(req, res) {
    console.log('post request to /clarifai', req.body.urlSearchInput)
    // const { urlSearchInput } = req.body
    const urlSearchInput = req.body.urlSearchInput

    // Make POST request to external Clarifi API with the search URL that user inputed
    appClarifai.models.initModel({id: Clarifai.GENERAL_MODEL, version: 'aa7f35c01e0642fda5cf400f543e7c40'})
      .then(generalModel => {
        return generalModel.predict(urlSearchInput);
      })
      .then(response => {
        // Data from Clarifai
        var concepts = response['outputs'][0]['data']['concepts'];
        // console.log( `these are concepts`, concepts)
        var keyWords = [];
        concepts.map((concept) => {
          if (concept.value > 0.7 && concept.name !== 'no person') {
            keyWords.push(concept.name)
          }
        });
        // console.log(keyWords)
        // res send the data back to client
        res.send(keyWords)
      })
      .catch((err) => {
        console.log('error --', err)
      })
  })

  // app.post('/spotify', (req, res) => {
  //   console.log('post request to /spotify', req.body.dataFromClarifai)
  // })

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening on port ${port}!`);
})