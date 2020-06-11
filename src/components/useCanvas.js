import React, { useState, useEffect, useRef } from "react";

//Scaling Constants for Canvas
const SCALE = 0.1;
const OFFSET = 80;
export const canvasWidth = window.innerWidth * 0.5;
export const canvasHeight = window.innerHeight * 0.5;

export function draw(ctx, location) {
  console.log("am I drawing?");
}
