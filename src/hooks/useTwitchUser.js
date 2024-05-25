import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { TwitchContext } from '../context';

const useTwitchUser = () => {
  const [twitchUser, setTwitchUser] = useState({});
  const [showLoginButton, setShowLoginButton] = useState(true);
  const twitch = useContext(TwitchContext);

  const getTokens = async (code) => {
    console.log('trayendo tokens... ');
    const { data } = await axios.post(
      'https://id.twitch.tv/oauth2/token',
      {
        client_id: process.env.REACT_APP_TWITCH_CLIENT_ID,
        client_secret: process.env.REACT_APP_TWITCH_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.REACT_APP_TWITCH_REDIRECT_URI
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log('data: ', data);

    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('access_token', data.access_token);
    twitch.setAccessToken(data.access_token);
    twitch.setRefreshToken(data.refresh_token);
  };

  const refreshTokens = async (code) => {
    console.log('refrescando tokens ');

    const { data } = await axios.post(
      'https://id.twitch.tv/oauth2/token',
      {
        client_id: process.env.REACT_APP_TWITCH_CLIENT_ID,
        client_secret: process.env.REACT_APP_TWITCH_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: code
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log('data (refresh): ', data);

    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('access_token', data.access_token);
    twitch.setAccessToken(data.access_token);
    twitch.setRefreshToken(data.refresh_token);
  };

  const getUser = async (token) => {
    console.log('trayendo users...');

    const response = await axios.get('https://api.twitch.tv/helix/users', {
      headers: {
        'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      console.log('data user: ', response.data.data[0]);
      setTwitchUser(response.data.data[0]);
    } else {
      if (response.status === 401) {
        await refreshTokens(twitch.refreshToken);
        getUser(twitch.accessToken);
      } else {
        console.error('Error al obtener el usuario: ', response.status);
      }
    }
  };


  useEffect(() => {
    const codeParam = new URLSearchParams(window.location.search).get('code');

    if (twitch.accessToken) {
      console.log('hay access token');
      getUser(twitch.accessToken);
      setShowLoginButton(false);
    } else if (codeParam) {
      console.log('hay code param');

      getTokens(codeParam);
      setShowLoginButton(false);
    } else {
      console.log('no hay nada hehe');
      setShowLoginButton(true);
    }
  }, []);

  return {
    showLoginButton,
    twitchUser
  };
};

export default useTwitchUser;