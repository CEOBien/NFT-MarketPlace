import React from "react";
import Style from "../Loader/Loader.module.css";
import Image from "next/legacy/image";
import img from "@/img";
const Loader = () => {
  return (
    <div className={Style.Loader}>
      <div className={Style.Loader_box}>
        <div className={Style.Loader_box_img}>
          <Image
            src={img.giphy}
            alt="loader"
            width={200}
            height={200}
            className={Style.Loader_box_img_img}
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
