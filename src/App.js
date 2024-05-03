import './App.css';
import User from './components/User';

function App() {
  return (
    <div className='w-full h-full px-8 py-4 bg-zinc-900'>
      <h1 className='text-3xl font-bold text-white'>Twitch Extension v0.1</h1>

      <User />
    </div>
  );
}

export default App;
