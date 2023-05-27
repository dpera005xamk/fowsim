import React from 'react';
import CanvasDrawing from './components/CanvasDrawing';
import Menu from './components/Menu';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div>
      <Routes>

        <Route path="/" element={<Menu/>}/>

        <Route path="/drawMap" element={<CanvasDrawing/>}/>

      </Routes>
    </div>
  );
};

export default App;
