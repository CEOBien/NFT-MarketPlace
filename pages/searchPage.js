import React from "react";

//INTRNAL IMPORT
import Style from "../SearchPage/SearchBar/SearchBar.module.css";
import { Brand,Slider } from "@/components/componentindex";
import { SearchBar } from "@/SearchPage/searchBarIndex";
import { Filter } from "@/components/componentindex";

import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";

const searchPage = () => {
  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
  ];
  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar />
      <Filter />
      <NFTCardTwo NFTData={collectionArray} />
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;