import React from 'react';
import CanvasDrawing from './components/CanvasDrawing';
import Menu from './components/Menu';
import Cards from './components/Cards';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div style= {{background: "rgb(100,100,100)", height: "100vh"}}>
      <Routes>

        <Route path="/" element={<Menu/>}/>

        <Route path="/drawMap" element={<CanvasDrawing/>}/>

        <Route path="/cardManagement" element={<Cards/>}/>

        <Route path="/playMenu" element={<CanvasDrawing/>}/>

      </Routes>
    </div>
  );
};

export default App;
