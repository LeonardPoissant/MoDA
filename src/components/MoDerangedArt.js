import React from "react";

import styled from "styled-components";

function LeonardGallery() {
  const canvasRef = React.useRef(null);
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  function draw(ctx, location) {
    if (!isDrawing) return;
    ctx.strokeStyle = "#FF0000";
    ctx.beginPath(0, -40);
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(location.x, location.y);
    ctx.stroke();
    [lastX, lastY] = [location.x, location.y];
  }
  return (
    <>
      <DrawingBoard
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseMove={(e) => {
          const canvas = canvasRef.current;
          var rect = canvas.getBoundingClientRect();
          const ctx = canvas.getContext("2d");
          draw(ctx, { x: e.clientX, y: e.clientY - rect.top });
        }}
        onMouseDown={(e) => {
          isDrawing = true;
          [lastX, lastY] = [e.clientX, e.clientY];
        }}
        onMouseUp={(e) => {
          isDrawing = false;
        }}
        onMouseOut={(e) => {
          isDrawing = false;
        }}
      ></DrawingBoard>
    </>
  );
}

const DrawingBoard = styled.canvas`
  height: 200;
  width: 300;
`;

export default LeonardGallery;
