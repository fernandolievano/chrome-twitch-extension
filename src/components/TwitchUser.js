import React from 'react';

const TwitchUser = ({ username, image }) => {
  return (
    <div className="px-4 text-center">
      <img src={image} className='rounded-full w-24 h-24 mx-auto' alt="Profile Picture" />
      <h4 className="text-xl font-normal py-2">Welcome <strong className='text-primary-color'>{username}</strong>!</h4>
    </div>
  );
};

export default TwitchUser;