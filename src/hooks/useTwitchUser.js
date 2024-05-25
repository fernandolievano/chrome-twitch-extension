import React, { useEffect, useState } from 'react';

const useTwitchUser = () => {
  const [showLoginButton, setShowLoginButton] = useState(true);

  useEffect(() => {
    const  codeParam = new URLSearchParams(window.location.search).get('code');

    if (codeParam) {
      console.log('code: ', codeParam);
      setShowLoginButton(false);
    } else {
      console.log('no code has been found')
    }
  }, [])

  return {
    showLoginButton
  };
};

export default useTwitchUser;