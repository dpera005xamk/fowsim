import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostNewCard from './PostNewCard';

interface PropsTypes {
  apiCall: (method: string, packet?: object) => Promise<void>
  msg: string
}

const Cards: React.FC<PropsTypes> = ({apiCall, msg}): React.ReactElement => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const navigate = useNavigate();

        return (
            <div style={{ textAlign: "center", padding: 15 }}>

                <p style= {{color: "red"}}>
                    {msg}
                </p>

                <PostNewCard
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                    apiCall={apiCall}
                />

                <button onClick={() => { navigate('/') }} style= {{margin: 4}}>Takaisin</button>

                <br/>

                <button onClick={() => { setDialogOpen(true) }} style= {{margin: 4}}>lisää uusi yksikkö</button>
                
                <br/>

                <button onClick={() => { navigate('/createArmy') }} style= {{margin: 4}}>tee armeija</button>

            </div>
        );
    };

    export default Cards;