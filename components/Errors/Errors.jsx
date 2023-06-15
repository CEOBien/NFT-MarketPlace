import React, { useState, useEffect, useContext } from "react";
import Image from "next/legacy/image";

import Style from "./Errors.module.css";
import img from "@/img";

import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";

const Errors = () => {
  const { error, setErrorOpen } = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.Error} onClick={() => setErrorOpen(false)}>
      <div className={Style.Error_box}>
        <div className={Style.Error_box_info}>
          <Image
            src={img.giphy}
            alt="Error"
            width={200}
            heigth={200}
            objectFit="cover"
            className={Style.Error_box_info_img}
          />
        </div>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default Errors;
