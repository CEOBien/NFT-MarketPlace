import React from "react";
import Style from "./NFTDEtailsPage.module.css";

import { NFTTabs, NFTDescription, NFTDetailsImg } from "./index";

const NFTDetailsPage = () => {
  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg />
        <NFTDescription />
      </div>
    </div>
  );
};

export default NFTDetailsPage;
