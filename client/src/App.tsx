import React, { useEffect, useState } from 'react';
import CanvasDrawing from './components/CanvasDrawing';
import Menu from './components/Menu';
import Cards from './components/Cards';
import CreateArmy from './components/CreateArmy';
import { Route, Routes } from 'react-router-dom';

interface FetchSettings {
  method: string
  headers?: any
  body?: string
}

const App: React.FC = () => {
  const [msg, setMsg] = useState<string>('');
  const [cards, setCards] = useState<any>([]);

  const apiCall = async (method: string, packet?: object): Promise<void> => {

    console.log('apicall, method: ', method);

    if (method === 'GET') {
      setMsg('fetching...');
    }

    let url = `/api/units`;

    let settings: FetchSettings = {
      method: method
    };

    if (method === 'POST') {

      setMsg('posting...');

      settings = {
        ...settings,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(packet)
      }
    }

    else if (method === 'GET') {
      setMsg('getting...')
    }

    try {

      const connection = await fetch(url, settings);

      if (connection.status === 200) {

        if (method === 'POST') {
          setMsg('tallennettu')
        } else {
          setMsg('haettu')
          const receivedUnits = await connection.json();

          // convert units from string to object
          const convertedUnits = receivedUnits.map((unit: any) => {
            console.log('unit: ', unit);
            return { ...unit, details: JSON.parse(unit.details) };
          });

          setCards(convertedUnits);
        }

      } else {

        switch (connection.status) {

          case 400: setMsg("Virhe pyynnön tiedoissa"); break;
          case 401: setMsg("ei lupaa"); break;
          default: setMsg("Palvelimella tapahtui odottamaton virhe"); break;

        }

      }

    } catch (e: any) {

      console.log('error yhteydessä: ', e);
      setMsg('palvelimeen ei saada yhteyttä')

    }

  }

  useEffect(() => {
    console.log('cards on load');
    apiCall('GET');
  }, []);

  useEffect(() => {
    console.log('cards: ', cards);
  });
  return (
    <div style={{ background: "rgb(100,100,100)", height: "100vh" }}>
      <Routes>

        <Route path="/" element={<Menu />} />

        <Route path="/drawMap" element={<CanvasDrawing />} />

        <Route path="/cardManagement" element={
          <Cards 
            apiCall = {apiCall}
            msg = {msg}
            />
          
          } />

        <Route path="/playMenu" element={<CanvasDrawing />} />

        <Route path="/createArmy" element={
          <CreateArmy 
            apiCall = {apiCall}
            cards = {cards}
            msg = {msg}
            />
          } />

      </Routes>
    </div>
  );
};

export default App;
