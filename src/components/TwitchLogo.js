import React from 'react';

const TwitchLogo = ({ width = 24, height = 24, color = '#f1f1f1' }) => {
  return (
    <div>
      <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M391.2 103.5H352.5v109.7h38.6zM285 103H246.4V212.8H285zM120.8 0 24.3 91.4V420.6H140.1V512l96.5-91.4h77.3L487.7 256V0zM449.1 237.8l-77.2 73.1H294.6l-67.6 64v-64H140.1V36.6H449.1z" /></svg>
    </div>
  );
};



export default TwitchLogo;