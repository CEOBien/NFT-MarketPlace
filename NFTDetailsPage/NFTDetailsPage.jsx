import React from "react";
import Style from "./NFTDEtailsPage.module.css";

import { NFTTabs, NFTDescription, NFTDetailsImg } from "./index";

const NFTDetailsPage = ({nft}) => {
  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg nft={nft}/>
        <NFTDescription nft={nft}/>
      </div>
    </div>
  );
};

export default NFTDetailsPage;
