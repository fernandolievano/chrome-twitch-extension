import { createContext, useState } from 'react';
import { DEFAULT_TWITCH_CONTEXT_VALUES } from './constants';

export const TwitchContext = createContext(DEFAULT_TWITCH_CONTEXT_VALUES);

export default function TwitchProvider({ children }) {
  const [accessToken, setAccessToken] = useState(DEFAULT_TWITCH_CONTEXT_VALUES.accessToken);
  const [refreshToken, setRefreshToken] = useState(DEFAULT_TWITCH_CONTEXT_VALUES.refreshToken);

  return (
    <TwitchContext.Provider
      value={{
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
      }}
    >
      {children}
    </TwitchContext.Provider>
  );
}