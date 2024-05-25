import './App.css';

/* context */
import TwitchProvider from './context';
/* hooks */
import useTwitchUser from './hooks/useTwitchUser';
/* components */
import LoginButton from './components/LoginButton';
import TwitchUser from './components/TwitchUser';

function App() {
  const { showLoginButton, twitchUser } = useTwitchUser();

  return (
    <TwitchProvider>
      <div className='px-8 py-8 bg-secondary-color h-full w-full text-light-color'>
        <h1 className='text-3xl font-bold text-center'>Twitch Extension v0.1</h1>
        <LoginButton visibility={showLoginButton} />
        <TwitchUser username={twitchUser.display_name} image={twitchUser.profile_image_url}  />
      </div>
    </TwitchProvider>
  );
}

export default App;
