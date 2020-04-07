import React from 'react';
import Board from './components/board'
import Snake from './components/snake'

import './global.css'

function App() {
  return (
    <div className="App">
      <Board width = {'100vw'} height={'100vh'} />
      <Snake coords = {[{left:'8px', top:'8px'},{left:'8px',top:'24px'}]} direction = 'left'/> 
    </div>
  );
}

export default App;
