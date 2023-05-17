import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import { Slider, SliderTypeMap } from '@mui/material';

const CanvasDrawing: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [lastX, setLastX] = useState<number>(0);
    const [lastY, setLastY] = useState<number>(0);
    const [color, setColor] = useState<string>('blue');
    const [size, setSize] = useState<number>(2);

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

    const handleSizeChange = (event: ChangeEvent<{}>, newSize: number | number[]) => {
        setSize(newSize as number);
      };

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={400}
                height={400}
                style={{ border: '1px solid black' }}
            />
            <div>
                <button onClick={() => handleColorChange('blue')}>Blue</button>
                <button onClick={() => handleColorChange('grey')}>Grey</button>
                <button onClick={() => handleColorChange('green')}>Green</button>
            </div>
            <div>
                <Slider
                    value={size}
                    min={1}
                    max={10}
                    onChange={(event: React.ChangeEvent<{}>, newSize: number | number[]) =>
  handleSizeChange(event as React.ChangeEvent<HTMLInputElement>, newSize)
}
                    aria-label="Drawing Size"
                />
            </div>
        </div>
    );
};

export default CanvasDrawing;