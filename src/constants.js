export const DEFAULT_TWITCH_CONTEXT_VALUES = {
  accessToken: localStorage.getItem('access_token'),
  setAccessToken: () => {},
  refreshToken: localStorage.getItem('refresh_token'),
  setRefreshToken: () => {}
}