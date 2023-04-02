import React, { useEffect, useRef, useState } from 'react';

interface Unit {
  id: string;
  location: {
    x: number;
    y: number;
  };
  dimensions: {
    width: number;
    height: number;
  };
  angle: number;
}

interface Object {
  units: Unit[];
}

interface Props {
  object: Object;
}

const Canvas: React.FC<Props> = ({ object }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);


  function rotateLeft() {
    if (!selectedUnitId) return;
  
    const unit = object.units.find(u => u.id === selectedUnitId)!;
    const { location, dimensions } = unit;
    const { width, height } = dimensions;
  
    // Calculate the new angle and position of the unit
    const angle = -Math.PI / 8;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const centerX = location.x + width / 2;
    const centerY = location.y + height / 2;
    const newCenterX = centerX * cos - centerY * sin;
    const newCenterY = centerX * sin + centerY * cos;
    unit.location.x = newCenterX - width / 2;
    unit.location.y = newCenterY - height / 2;
    unit.angle -= Math.PI / 8;
  }
  
  function rotateRight() {
    if (!selectedUnitId) return;
  
    const unit = object.units.find(u => u.id === selectedUnitId)!;
    const { location, dimensions } = unit;
    const { width, height } = dimensions;
  
    // Calculate the new angle and position of the unit
    const angle = Math.PI / 8;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const centerX = location.x + width / 2;
    const centerY = location.y + height / 2;
    const newCenterX = centerX * cos - centerY * sin;
    const newCenterY = centerX * sin + centerY * cos;
    unit.location.x = newCenterX - width / 2;
    unit.location.y = newCenterY - height / 2;
    unit.angle += Math.PI / 8;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // tän perusteella draw: https://github.com/irtep/TheRockRally/blob/master/public/race/draw.js

    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    object.units.forEach(unit => {
      ctx.beginPath();
      ctx.rect(unit.location.x, unit.location.y, unit.dimensions.width, unit.dimensions.height);
      if (unit.id === selectedUnitId) {
        ctx.fillStyle = '#FF0000';
      } else {
        ctx.fillStyle = '#000000';
      }
      ctx.fill();
      ctx.closePath();
    });
  }, [object, selectedUnitId]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!selectedUnitId) return;

      const unit = object.units.find(u => u.id === selectedUnitId)!;
      const { location, dimensions } = unit;

      switch (event.key) {
        case 'ArrowLeft':
          unit.location.x -= 5;
          break;
        case 'ArrowRight':
          unit.location.x += 5;
          break;
        case 'ArrowUp':
          unit.location.y -= 5;
          break;
        case 'ArrowDown':
          unit.location.y += 5;
          break;
        case 'a':
          rotateLeft()
          break;
        case 'd':
          rotateRight()
          break;
        default:
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [object, selectedUnitId]);

  function handleClick(event: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const unit = object.units.find(unit => {
      const { location, dimensions } = unit;
      const { x: unitX, y: unitY } = location;
      const unitRight = unitX + dimensions.width;
      const unitBottom = unitY + dimensions.height;
      return x >= unitX && x <= unitRight && y >= unitY && y <= unitBottom;
    });

    if (unit) {
      setSelectedUnitId(unit.id);
    } else {
      setSelectedUnitId(null);
    }
  }

  return (
    <canvas ref={canvasRef} width={800} height={600} onClick={handleClick} tabIndex={0} />
  );
};

export default Canvas;