import React from 'react';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {

  const navigate = useNavigate();

  return (
    <div style={{textAlign: "center"}}>

      <button
        style={{margin: 4}} 
        onClick={ () => {
        navigate('/drawMap')
      }}>
        Piirrä kartta
      </button>

      <br/>
      
      <button 
        style={{margin: 4}} 
        onClick={ () => {
        navigate('/drawMap')
      }}>
        Hallinnoi armeijoita
      </button>

      <br/>
      
      <button 
        style={{margin: 4}} 
        onClick={ () => {
        navigate('/cardManagement')
      }}>
        Hallinnoi yksikköjä
      </button>            

      <br/>
      
      <button 
        style={{margin: 4}} 
        onClick={ () => {
        navigate('/drawMap')
      }}>
        Pelaa
      </button>           

    </div>
  );
};

export default App;