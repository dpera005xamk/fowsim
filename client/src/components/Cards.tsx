import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostNewCard from './PostNewCard';

interface FetchSettings {
    method: string
    headers?: any
    body?: string
}

const Cards: React.FC = (): React.ReactElement => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>('');

    const navigate = useNavigate();

    const apiCall = async (method: string, packet: object): Promise<void> => {

            setMsg('saving...');

            let url = `/api/units`;
    
            let settings: FetchSettings = {
                method: method
            };
    
            settings = {
                ...settings,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(packet)
            }
            console.log('pack: ', packet);
   
            try {
    
                const connection = await fetch(url, settings);
    
                if (connection.status === 200) {
    
                    setMsg('tallennettu');
    
                } else {
    
                    switch (connection.status) {
    
                        case 400: setMsg("Virhe pyynnön tiedoissa"); break;
                        case 401: setMsg("ei lupaa"); break;
                        default: setMsg("Palvelimella tapahtui odottamaton virhe"); break;
    
                    }
    
                }
    
            } catch (e: any) {
    
                setMsg('palvelimeen ei saada yhteyttä')
    
            }
            
    }

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

            </div>
        );
    };

    export default Cards;