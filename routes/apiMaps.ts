import express from 'express';
import { Virhe } from '../errors/virhekasittelija';
import { PrismaClient } from '@prisma/client'; // clientti mukaan

const prisma : PrismaClient = new PrismaClient();

const apiMapsRouter : express.Router = express.Router();

apiMapsRouter.use(express.json());

apiMapsRouter.delete("/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

     if (await prisma.fowmap.count({
           where : {
                id : Number(req.params.id)
            }
        }))  {
        try {
                        // delete on toki delete
            await prisma.fowmap.delete({
                where : {
                    id : Number(req.params.id)
                }
            });
                            // palautuksena taas näytetään kaikki
            res.json(await prisma.fowmap.findMany());

        } catch (e : any) {
            next(new Virhe())
        }
    } else {
        next(new Virhe(400, "Virheellinen id"));
    }

});


apiMapsRouter.put("/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
        // täällä await sitten
    if (await prisma.fowmap.count({ // lasketaan taas, että löytyy se yksi
        where : { // jossa tämä ehto
            id : Number(req.params.id)
        }
        })) {
        if (req.body.details?.length > 0) {

            try {
                                    // update on muokkaus
                await prisma.fowmap.update({
                    where : { // jossa katotaan wherellä id
                        id : Number(req.params.id)
                    },
                    data : {  // sit taas data olio
                        details : req.body.details,
                    }
                });
                        // palautetaan taas vastauksena kaikki
                res.json(await prisma.fowmap.findMany());
        
            } catch (e : any) {
                next(new Virhe())
            }

        } else {
            next(new Virhe(400, "Virheellinen pyynnön body"));
        }
    } else {
        next(new Virhe(400, "Virheellinen id"));
    }

});

apiMapsRouter.post("/", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
 
      if (req.body.details?.length > 0 && req.body.name?.length > 0) {

        try {
                                // create lisää uuden
            await prisma.fowmap.create({
                data : { // vaatii taas tämän objektin, jonka ominaisuus data
                        // saa kätevästi sen default id:n, joka jakaa sen automaattisesti
                    details : req.body.details,
                    name : req.body.name
                }
            });
    
            res.json(await prisma.fowmap.findMany());
    
        } catch (e : any) {
            next(new Virhe())
        }

    } else {
        next(new Virhe(400, "Virheellinen pyynnön body"));
    } 

});

apiMapsRouter.get("/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

     try {
                                // count palauttaa tietueiden määrän
        if (await prisma.fowmap.count({
            where : { // vähän niinkuin sql:ssä, käytetään where rajausta
                id : Number(req.params.id)
            }
        }) === 1) { // eli, jos countti on 1
            res.json(await prisma.fowmap.findUnique({
                where : {
                    id : Number(req.params.id)
                }
            }))
        } else {
            next(new Virhe(400, "Virheelinen id"));
        }
        
    } catch (e: any) {
        next(new Virhe());
    }
    

});
                            // async toimii prismassa
apiMapsRouter.get("/", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    try {               // prisma.(mallin nimi).komento
        res.json(await prisma.fowmap.findMany());
    } catch (e : any) {
        next(new Virhe());
    }

});

export default apiMapsRouter;