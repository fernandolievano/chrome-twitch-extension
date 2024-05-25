import React from 'react';

const LoginButton = () => {
  return (
    <div className="flex justify-center pt-8">
      <button className='bg-primary-color border-2 border-primary-color px-8 py-2 rounded font-bold shadow-lg transition-colors hover:bg-secondary-color hover:border-light-color hover:shadow-none'>
        CONNECT WITH TWITCH
      </button>
    </div>
  );
};

export default LoginButton;