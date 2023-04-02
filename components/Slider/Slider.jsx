import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import Style from "./Slider.module.css";
import SliderCar from "./SliderCar/SliderCar";
const Slider = () => {
  const sliderArray = [1, 2, 3, 4, 5, 6];
  const[width, setWidth] = useState(0);
  const dragSlider = useRef()
  return <div>Slider</div>;
};

export default Slider;
