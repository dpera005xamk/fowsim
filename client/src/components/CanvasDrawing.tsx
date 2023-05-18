import React, { useRef, useEffect, useState } from 'react';

const CanvasDrawing: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [lastX, setLastX] = useState<number>(0);
    const [lastY, setLastY] = useState<number>(0);
    const [color, setColor] = useState<string>('blue');
    const [size, setSize] = useState<number>(2);
    const [saved, setSaved] = useState<string | null>(null);

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

    const handleSave = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        setSaved(canvas.toDataURL()); // Save the canvas as a data URL
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
                width={400}
                height={400}
                style={{ 
                    border: '1px solid black',
                    background: 'rgb(210, 180, 140)' 
                }}
            />
            <div>
                <button onClick={() => handleColorChange('blue')}>Blue</button>
                <button onClick={() => handleColorChange('grey')}>Grey</button>
                <button onClick={() => handleColorChange('green')}>Green</button>
                <button id="save" onClick={handleSave}>
                    Save
                </button>
                <button id="load" onClick={handleLoad}>
                    Load
                </button>
            </div>
            <div>
                <input
                    type="number"
                    defaultValue={1}
                    onChange={handleSizeChange}
                />
            </div>
        </div>
    );
};

export default CanvasDrawing;