import React, { useRef, SetStateAction, Dispatch } from 'react';
import { Stack, Dialog, DialogTitle, DialogContent, TextField, Button, Container } from '@mui/material';

interface PropsTypesPostNewCard {
    dialogOpen: boolean
    setDialogOpen: Dispatch<SetStateAction<boolean>>
    apiCall: (method: string, packet: object) => Promise<void>
}

const PostNewCard: React.FC<PropsTypesPostNewCard> = (props): React.ReactElement => {

    const formRef: any = useRef<HTMLFormElement>();

    const save = (e: React.FormEvent): void => {
        e.preventDefault();


        props.apiCall("POST", {
            name: String(formRef.current?.name.value),
            army: String(formRef.current?.army.value),
            stats: String(formRef.current?.stats.value),
            movement: String(formRef.current?.movement.value),
            weapons1: String(formRef.current?.weapons1.value),
            weapons2: String(formRef.current?.weapons2.value),
            weapons3: String(formRef.current?.weapons3.value),
            weapons4: String(formRef.current?.weapons4.value),
            weapons5: String(formRef.current?.weapons5.value),
            types: String(formRef.current?.types.value),
            cost: String(formRef.current?.cost.value),
            img: String(formRef.current?.name.value.replace(/\s+/g, '')),
            size: String(formRef.current?.size.value)
        });

        // close this dialog
        props.setDialogOpen(false);

    }

    const cancelSend = (): void => {

        props.setDialogOpen(false);

    }

    return <Dialog
        maxWidth="lg"
        fullWidth={true}
        open={props.dialogOpen}
        onClose={cancelSend}
    >

        <DialogTitle>Talletettava tunniste</DialogTitle>

        <Container>
            esimerkit:
            <p>
            Motivation: 4+, Skill 5+, Is hit on: 3+, Armour: Front: 5, Side: 4, Top: 1
            </p>
            <p>
            Tactical: 10''/25 cm, Terrain dash: 12''/30 cm, Cross country dash: 18''/45 cm, Road dash: 20''/50cm, Cross: 4+
            </p>
            <p>
            Hull (short 75mm), Range 24''/60cm. Rof: halted: 2, moving: 2. Anti-tank: 9, firepower: 3+, forward firing, Smoke, Stabilizer
            </p>
            <p>
            5 x M3 Lee (short 75mm) 25p, 4 x M3 Lee (short 75mm) 20p, 3 x M3 Lee (short 75mm) 15p. Option: Replace any or all M3 Lee (short 75mm) with M3 Lee (long 75mm) for +1 points each.            </p>            
        </Container>

        <DialogContent style={{ paddingTop: 10 }}>
            <Stack
                spacing={1}
                component="form"
                onSubmit={save}
                ref={formRef}
            >

                <></>:
                <TextField
                    required
                    name="name"
                    label="yksikön nimi"
                    fullWidth
                    variant="outlined"
                />

                <TextField
                    required
                    name="army"
                    label="yksikön armeija"
                    fullWidth
                    variant="outlined"
                />

                <TextField
                    required
                    name="stats"
                    label="yksikön statit: motivation, skill, is hit on, save/armour"
                    fullWidth
                    variant="outlined"
                />

                <TextField
                    required
                    name="movement"
                    label="yksikön liike: tactical, terrain dash, cc dash, road dash, cross"
                    fullWidth
                    variant="outlined"
                />

                <TextField
                    required
                    name="weapons1"
                    label="aseet, nimi, range, rof halted, rof moving, anti-tank, fire power, notes"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    required
                    name="weapons2"
                    label="aseet, nimi, range, rof halted, rof moving, anti-tank, fire power, notes"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    required
                    name="weapons3"
                    label="aseet, nimi, range, rof halted, rof moving, anti-tank, fire power, notes"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    required
                    name="weapons4"
                    label="aseet, nimi, range, rof halted, rof moving, anti-tank, fire power, notes"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    required
                    name="weapons5"
                    label="aseet, nimi, range, rof halted, rof moving, anti-tank, fire power, notes"
                    fullWidth
                    variant="outlined"
                />                                                
                <TextField
                    required
                    name="types"
                    label="tyypit esim. tank unit, infantry unti, observer jne."
                    fullWidth
                    variant="outlined"
                />

                <TextField
                    required
                    name="cost"
                    label="pistehinta, esim. 5 x 25p, 4 x 20 p, 3 x 15p"
                    fullWidth
                    variant="outlined"
                />

                <TextField
                    required
                    name="size"
                    label="koko. esim: largeBase, mediumBase, M4Sherman, sizes.ts filessä pitää olla data"
                    fullWidth
                    variant="outlined"
                />

                <Button
                    variant="contained"
                    type="submit"
                >Tallenna</Button>

                <Button
                    variant="outlined"
                    onClick={cancelSend}
                >Peruuta</Button>

            </Stack>
        </DialogContent>

    </Dialog>;

}

export default PostNewCard;