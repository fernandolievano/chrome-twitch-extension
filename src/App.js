import './App.css';
import LoginButton from './components/LoginButton';
import useTwitchUser from './hooks/useTwitchUser';

function App() {
  const { showLoginButton } = useTwitchUser()

  return (
    <div className='px-8 py-8 bg-secondary-color h-full w-full text-light-color'>
      <h1 className='text-3xl font-bold text-center'>Twitch Extension v0.1</h1>

      <LoginButton visibility={showLoginButton} />
    </div>
  );
}

export default App;
