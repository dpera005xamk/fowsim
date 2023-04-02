import React from 'react';
import Canvas from './components/Canvas';

const object = {
  units: [
    {
      id: 'unit-1',
      location: {
        x: 50,
        y: 50,
      },
      dimensions: {
        width: 250,
        height: 100,
      },
      angle: 90
    },
    {
      id: 'unit-2',
      location: {
        x: 200,
        y: 200,
      },
      dimensions: {
        width: 50,
        height: 250,
      },
      angle: 70
    },
  ],
};

function App() {
  return (
    <div className="App">
      <Canvas 
        object={object}/>
    </div>
  );
}

export default App;
