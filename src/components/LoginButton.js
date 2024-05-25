import React from 'react';
import TwitchLogo from './TwitchLogo';

const LoginButton = () => {
  return (
    <div className="flex justify-center pt-8">
      <a
        href={
          `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&redirect_uri=http://localhost:3000&scope=user%3Aread%3Afollows`
        }
        className='flex items-center justify-start bg-primary-color border-2 border-primary-color px-4 py-4 rounded font-bold shadow-lg transition-colors hover:bg-secondary-color hover:border-light-color hover:shadow-none'
      >
        <TwitchLogo width={24} height={24} />
        <span className='pl-2 text-lg'>CONNECT WITH TWITCH</span>
      </a>
    </div>
  );
};

export default LoginButton;