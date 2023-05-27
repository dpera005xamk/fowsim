import React, { useRef, useEffect, useState } from 'react';

interface FetchSettings {
    method: string
    headers?: any
    body?: string
}

interface MapPacket {
    background: string
    data: string
    name: string
}

const CanvasDrawing: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [canvasBackground, setCanvasBackground] = useState<string>('rgb(100, 200, 100)');
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [lastX, setLastX] = useState<number>(0);
    const [lastY, setLastY] = useState<number>(0);
    const [color, setColor] = useState<string>('blue');
    const [size, setSize] = useState<number>(2);
    const [saved, setSaved] = useState<string | null>(null);
    const [mapName, setMapName] = useState<string>('default');
    const [msg, setMsg] = useState<string>('');

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.strokeStyle = color;
        ctx.lineWidth = size;

        const handleMouseDown = (event: MouseEvent) => {
            setIsDrawing(true);
            setLastX(event.clientX - canvas.offsetLeft);
            setLastY(event.clientY - canvas.offsetTop);
        };

        const handleMouseMove = (event: MouseEvent) => {
            if (!isDrawing) return;

            const x = event.clientX - canvas.offsetLeft;
            const y = event.clientY - canvas.offsetTop;

            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();

            setLastX(x);
            setLastY(y);
        };

        const handleMouseUp = () => {
            setIsDrawing(false);
        };

        const handleMouseOut = () => {
            setIsDrawing(false);
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseout', handleMouseOut);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mouseout', handleMouseOut);
        };
    }, [isDrawing, lastX, lastY, color, size]);

    const handleColorChange = (newColor: string) => {
        setColor(newColor);
    };

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSize(Number(event.target.value));
    };

    const handleSave = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        setSaved(canvas.toDataURL()); // Save the canvas as a data URL

        const mapPacket: MapPacket = {
            background: canvasBackground,
            data: canvas.toDataURL(),
            name: mapName
        }

        setMsg('saving...');

        let url = `/api/maps`;

        let settings: FetchSettings = {
            method: "POST"
        };

        settings = {
            ...settings,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mapPacket)
        }


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

    };

    const handleLoad = () => {
        const canvas = canvasRef.current;
        if (!canvas || !saved) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            ctx.drawImage(img, 0, 0); // Draw the saved image on the canvas
        };
        img.src = saved;
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={900}
                height={600}
                style={{
                    border: '1px solid black',
                    background: canvasBackground
                }}
            />
            <div>

                <p>
                    <button onClick={() => handleColorChange('blue')}>Blue</button>
                    <button onClick={() => handleColorChange('grey')}>Grey</button>
                    <button onClick={() => handleColorChange('green')}>Green</button>
                    <button onClick={() => handleColorChange('maroon')}>Brown</button>
                    <button onClick={() => handleColorChange('white')}>White</button>
                    <button onClick={() => handleColorChange('black')}>black</button>
                </p>

                <p>
                    <button id="save" onClick={handleSave}>
                        Save
                    </button>
                    <button id="load" onClick={handleLoad}>
                        Load
                    </button>

                    <span color="red">
                        {msg}
                    </span>

                </p>

                <p>
                    <button id="desert" onClick={() => {
                        setCanvasBackground('rgb(240, 230, 140)')
                    }}>
                        Desert
                    </button>
                    <button id="grass" onClick={() => {
                        setCanvasBackground('rgb(100, 200, 100)')
                    }}>
                        Grass
                    </button>
                </p>

            </div>
            <div>
                pen size:
                <input
                    type="number"
                    defaultValue={1}
                    onChange={handleSizeChange}
                />
                <br />
                kartan nimi:
                <input
                    type="text"
                    defaultValue='default'
                    onChange={(e) => {
                        setMapName(e.target.value);
                    }}
                />
            </div>
        </div>
    );
};

export default CanvasDrawing;