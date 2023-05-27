import React from 'react';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {

  const navigate = useNavigate();

  return (
    <div>

      <button onClick={ () => {
        navigate('/drawMap')
      }}>
        Kartat
      </button>

    </div>
  );
};

export default App;