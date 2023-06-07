import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowCard from './ShowCard';

interface FetchSettings {
    method: string
    headers?: any
    body?: string
}

interface PropsTypes {
    apiCall: (method: string, packet?: object) => Promise<void>
    cards: any
    msg: string
  }


interface UnitCard {
    id: number
    details: any
}

interface Armies {
    name: string
    units: Array<any>
}

const CreateArmy: React.FC<PropsTypes> = ({apiCall, cards, msg}): React.ReactElement => {
    const [armies, setArmies] = useState<any>([]);

    const navigate = useNavigate();

    useEffect( () => {
      apiCall('GET');
    }, []);

    useEffect( () => {

        const sortedArmies: Array<Armies> = [];

        // sort armies to their own arrays
        cards.forEach( (card: UnitCard) => {

            // fill sortedArmies
            if (sortedArmies.length === 0) {
                
                sortedArmies.push({
                    name: card.details.army, units: [card]
                });

            } else {

                let newArmy: boolean = true;
                let index: number = 0;

                // check if that army already exists in SortedArmies
                sortedArmies.forEach( (army, i) => {
                    if (army.name === card.details.army) { 
                        newArmy = false;
                        index = i;
                    }
                });

                // if yes, then push to that same army
                if (newArmy) {

                    sortedArmies.push({
                        name: card.details.army, units: [card]
                    });

                } else {

                    sortedArmies[index].units.push(card);

                }

            }

        });

        setArmies(sortedArmies);

    }, [cards]);

        return (
            <div style={{ textAlign: "center", padding: 15 }}>

                <p style= {{color: "red"}}>
                    {msg}
                </p>



                <button onClick={() => { navigate('/') }} style= {{margin: 4}}>Takaisin</button>

                <br/>

                <p>

                    {
                      cards.map( (card: any, i: number) => {
                        
                        return(

                            <p key= {i}>
                                <ShowCard card={card}/>
                            </p>
                            
                        )
                      })
                    }   

                </p>

                <div>
                    
                    <p>
                      sorted:
                    </p>

                    {
                    armies.map( (card: any, i: number) => {
                        
                        return(

                            <p key= {i}>
                                <p>
                                    Army:
                                </p>

                                <p>
                                  {card.name}
                                  <br/>
                                  units:
                                </p>
                                
                                {
                                    card.units.map( (unit: any, ix: number) => {
                                        console.log('unit: ', unit);
                                        
                                        return(

                                            <p key= {ix}>
                                                {unit.details.name}
                                            </p>

                                        )

                                    })
                                }

                            </p>
                            
                        )
                      })
                    }   

                </div>

            </div>
        );
    };

    export default CreateArmy;