import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { TwitchContext } from '../context';

const useTwitchUser = () => {
  const [twitchUser, setTwitchUser] = useState({});
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const twitch = useContext(TwitchContext);

  const getTokens = async (code) => {
    console.log('trayendo tokens... ');
    try {
      const response = await axios.post(
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

      if (response.status === 200) {
        const { data } = response;
        console.log('data tokens: ', data);

        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('access_token', data.access_token);
        twitch.setAccessToken(data.access_token);
        twitch.setRefreshToken(data.refresh_token);
        setHasError(false);
      }
    } catch (error) {
      setHasError(true);
      console.error('error getting tokens: ', error);
    }
  };

  const refreshTokens = async (code) => {
    console.log('refrescando tokens ');

    try {
      const response = await axios.post(
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

      if (response.status === 200) {
        const { data } = response;
        console.log('data (refresh): ', data);

        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('access_token', data.access_token);
        twitch.setAccessToken(data.access_token);
        twitch.setRefreshToken(data.refresh_token);
        setHasError(false);
      }
    } catch (error) {
      setHasError(true);
      console.error('error refresh: ', error);
    }
  };

  const getUser = async (token) => {
    try {
      console.log('fetching users...');

      const response = await axios.get('https://api.twitch.tv/helix/users', {
        headers: {
          'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_ID,
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        console.log('data user: ', response.data.data[0]);
        setTwitchUser(response.data.data[0]);
        setHasError(false);
      }
    } catch (error) {
      console.log('error users: ', error);

      setHasError(true);

      if (error.response.status === 401) {
        await refreshTokens(twitch.refreshToken);
        console.log('refreshing... for users');
        getUser(twitch.accessToken);
      }
    }
  };

  useEffect(() => {
    const codeParam = new URLSearchParams(window.location.search).get('code');

    async function fetchData() {
      setIsLoading(true);

      if (twitch.accessToken) {
        console.log('hay access token');
        await getUser(twitch.accessToken);
        setShowLoginButton(false);
      } else if (codeParam) {
        console.log('hay code param');
        await getTokens(codeParam);
        setShowLoginButton(false);
      } else {
        console.log('no hay nada hehe');
        setShowLoginButton(true);
      }

      setIsLoading(false);
    }

    fetchData();
  }, []);


  return {
    showLoginButton,
    isLoading,
    hasError,
    twitchUser
  };
};

export default useTwitchUser;