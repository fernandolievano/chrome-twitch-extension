import React from 'react';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator bg-white rounded px-8 py-8 mx-auto my-8 flex flex-col justify-center items-center text-dark-color w-fit shadow">
      <svg className='h-20 w-20 pb-4' fill='#ff686b' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
      </svg>

      <span className='font-bold text-xl'>
        Something has gone terribly wrong
      </span>
      <span className='font-medium'>(but we already sent <s>an AI</s> droids to fix it)</span>
    </div>
  );
};

export default ErrorIndicator;