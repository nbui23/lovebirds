require('dotenv').config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/login', (req, res) => {
  const scopes = 'user-read-private user-read-email user-top-read';
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + clientId +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirectUri));
});

app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        code: code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      }
    });

    res.send(response.data);
  } catch (error) {
    res.send(error.response.data);
  }
});

app.get('/user', async (req, res) => {
  const accessToken = req.session.accessToken;
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching user data');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
