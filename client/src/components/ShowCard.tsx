import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, Typography, CardMedia } from '@mui/material';

interface CardDetails {
    [key: string]: string;
  }

interface PropsType {
    card: {
        id: number;
        details: CardDetails;
      };
}

const ShowCard: React.FC<PropsType> = ({ card }): React.ReactElement => {

    const cardImage = require(`./img/${card.details.img}.png`);

    const clix = () => {
        console.log('clik');
    }

    if (card) {
        return (

            <Card sx={{
                maxWidth: 400,
                background: "rgb(100,180,100)"
            }}>

                <CardMedia
                    component="img"
                    image={cardImage}
                    alt="tankki"
                />

                <CardHeader
                    sx={{ minHeight: 130 }}
                    title={card.details.name}
                />

                <CardContent>

                    {
                        Object.entries(card.details).map(([k,v]) => {
                            return(
                                <Typography key={k+v}>
                                    {k}: {v}
                                </Typography>
                            )
                        })
                    }

                </CardContent>

            </Card>
        );
    } else {
        return (<></>);
    }


}

export default ShowCard;