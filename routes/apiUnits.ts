import express from 'express';
import { Virhe } from '../errors/virhekasittelija';
import { PrismaClient } from '@prisma/client'; // clientti mukaan

const prisma : PrismaClient = new PrismaClient();

const apiUnitsRouter : express.Router = express.Router();

apiUnitsRouter.use(express.json());

apiUnitsRouter.delete("/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

     if (await prisma.unit.count({
           where : {
                id : Number(req.params.id)
            }
        }))  {
        try {
                        // delete on toki delete
            await prisma.unit.delete({
                where : {
                    id : Number(req.params.id)
                }
            });
                            // palautuksena taas näytetään kaikki
            res.json(await prisma.unit.findMany());

        } catch (e : any) {
            next(new Virhe())
        }
    } else {
        next(new Virhe(400, "Virheellinen id"));
    }

});


apiUnitsRouter.put("/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
        // täällä await sitten
    if (await prisma.unit.count({ // lasketaan taas, että löytyy se yksi
        where : { // jossa tämä ehto
            id : Number(req.params.id)
        }
        })) {
        if (req.body.details?.length > 0) {

            try {
                                    // update on muokkaus
                await prisma.unit.update({
                    where : { // jossa katotaan wherellä id
                        id : Number(req.params.id)
                    },
                    data : {  // sit taas data olio
                        details : req.body.details,
                    }
                });
                        // palautetaan taas vastauksena kaikki
                res.json(await prisma.unit.findMany());
        
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

apiUnitsRouter.post("/", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
 
      if (req.body.details?.length > 0) {

        try {
                                // create lisää uuden
            await prisma.unit.create({
                data : { // vaatii taas tämän objektin, jonka ominaisuus data
                        // saa kätevästi sen default id:n, joka jakaa sen automaattisesti
                    details : req.body.details
                }
            });
    
            res.json(await prisma.unit.findMany());
    
        } catch (e : any) {
            next(new Virhe())
        }

    } else {
        next(new Virhe(400, "Virheellinen pyynnön body"));
    } 

});

apiUnitsRouter.get("/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

     try {
                                // count palauttaa tietueiden määrän
        if (await prisma.unit.count({
            where : { // vähän niinkuin sql:ssä, käytetään where rajausta
                id : Number(req.params.id)
            }
        }) === 1) { // eli, jos countti on 1
            res.json(await prisma.unit.findUnique({
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
apiUnitsRouter.get("/", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    try {               // prisma.(mallin nimi).komento
        res.json(await prisma.unit.findMany());
    } catch (e : any) {
        next(new Virhe());
    }

});

export default apiUnitsRouter;