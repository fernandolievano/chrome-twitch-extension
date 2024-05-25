import './App.css';
import LoginButton from './components/LoginButton';

function App() {
  return (
    <div className='px-8 py-4 bg-[#b9a3e3] h-full w-full text-white'>
      <h1 className='text-3xl font-bold text-center'>Twitch Extension v0.1</h1>

      <LoginButton />
    </div>
  );
}

export default App;
