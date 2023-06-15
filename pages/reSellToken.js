import React, { useState, useEffect, useContext } from "react";
import Style from "../styles/reSellToken.module.css";
import fromStyle from "../AccountPage/Form.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "@/components/componentindex";

import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";

const resellToken = () => {
  const { createSale } = useContext(NFTMarketplaceContext);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const { id, tokenURI } = router.query;

  const fetchNFT = async () => {
    if (!tokenURI) return;
    const { data } = await axios.get(tokenURI);
    setImage(data.image);
  };

  useEffect(() => {
    fetchNFT();
  }, [id]);

  const reSell = async () => {
    try {
      await createSale(tokenURI, price, true, id);
      router.push("/author-profile");
    } catch (error) {
      console.log("Error while resell", error);
    }
  };

  return (
    <div className={Style.resellToken}>
      <div className={Style.resellToken_box}>
        <h1>ReSell Your Token, Set Price </h1>
        <div className={fromStyle.Form_box_input}>
          <label htmlFor="name">Price</label>
          <input
            type="number"
            min={1}
            placeholder="reSell price"
            className={fromStyle.Form_box_input_userName}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className={Style.resellToken_box_image}>
          {image && (
            <Image src={image} alt="reSell nft" width={400} height={400} />
          )}
        </div>

        <div className={Style.resellToken_box_btn}>
          <Button btnName="ReSell NFT" handleClick={() => reSell()} />
        </div>
      </div>
    </div>
  );
};

export default resellToken;
