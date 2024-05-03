import axios from 'axios';
import React, { useState, useEffect } from 'react';

const User = () => {
  const [showConnectButton, setShowConnectButton] = useState(true);
  const [codeAuth, setCodeAuth] = useState(localStorage.getItem('auth_code'));
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [user, setUser] = useState(null);
  const [channels, setChannels] = useState([]);

  useEffect(() => {


    // authorization code
    const fetchAuthCode = async () => {
      if (localStorage.getItem('auth_code')) {
        setShowConnectButton(false);
      } else {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
          setShowConnectButton(false);
          setCodeAuth(code);
          localStorage.setItem('auth_code', code);
        }
      }
    };
    // authorization code

    // access_token
    const fetchAccesToken = async () => {
      const { data } = await axios.post('https://id.twitch.tv/oauth2/token', {
        client_id: process.env.REACT_APP_TWITCH_CLIENT_ID,
        client_secret: process.env.REACT_APP_TWITCH_CLIENT_SECRET,
        code: codeAuth,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3000',
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      localStorage.setItem('access_token', data.refresh_token);
      setAccessToken(data.access_token);
    };
    // access_token

    // get user info
    const fetchUser = async () => {
      const { data } = await axios.get('https://api.twitch.tv/helix/users', {
        headers: {
          'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_ID,
          'Authorization': `Bearer ${accessToken}`,
        }
      });
      setUser(data.data[0]);

      return data.data[0]
    };
    // get user info

    fetchAuthCode().then(() => {
      if (!accessToken) {
        fetchAccesToken();
      }

      fetchUser().then(async (user) => {
        const { data } = await axios.get(`https://api.twitch.tv/helix/streams/followed?user_id=${user.id}`, {
          headers: {
            'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`,
          }
        });

        console.log('followed streams: ', data.data);
        setChannels(data.data);
      });
    });
  }, []);

  return (
    <div className='pt-8 text-white'>
      <a
        className={`bg-purple-900 rounded-md px-4 py-2 font-semibold ${showConnectButton ? 'inline-block' : 'hidden'}`}
        href={
          `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&redirect_uri=http://localhost:3000&scope=user%3Aread%3Afollows`
        }
      >
        Conectar con Twitch
      </a>

      <a href={`https://www.twitch.tv/${user?.login}`} target='_blank' className="flex justify-end items-center text-white decoration-0 ml-auto w-fit">
        <p className='text-white text-lg pr-4'> {user?.display_name}</p>
        <img className='w-12 h-12 rounded' src={user?.profile_image_url} />
      </a>

      <div className="flex flex-col items-start justify-center">
        {channels.map((channel) => (
          <a href={`https://www.twitch.tv/${channel.user_login}`} target='_blank' className="flex items-center justify-start py-4 w-full" key={channel.user_id}>
            <img src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${channel.user_login}-315x188.jpg`} className="rounded w-1/4 h-auto max-w-[315px]" />

            <div className="pl-8">
              <p className='pb-0 font-bold text-stone-500'>{channel.user_name}</p>
              <p className="pb-1 font-medium text-stone-500">{channel.game_name}</p>
              <p className='text-2xl'>{channel.title}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default User;