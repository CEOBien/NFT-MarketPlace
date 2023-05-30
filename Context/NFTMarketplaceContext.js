import React, { useState, useEffect, useContext } from "react";
import web3Modal from "web3modal";
import { ethers } from "ethers";
import Router from "next/router";

import { create, create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";

// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
const projectId = "2QKlyTPdtig7jlBEq9Xvwq5uyF7";
const projectSercetKey = "92610ff6862385b5ea31eeff3c4ee5a3";

const auth = `Basic ${Buffer.from(`${projectId}:${projectSercetKey}`).toString(
  "base64"
)}`;

const subDomain = "https://ceo-nft-marketplace.infura-https.io";

const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
// FETCH SMART CONTRACT
const fetchContract = (signerOrProvide) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvide
  );

// CONNECTING WITH SMART CONTRACT
const connectingWithSmartContract = async () => {
  try {
    const web3modal = new web3Modal();
    const connect = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connect);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract");
  }
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Discover, collect, and sell NFTs";
  //USESTATE
  const [currentAccount, setCurrentAccount] = useState("");
  //CHECK IF WALLET IS CONNECTED
  const checkIFWalletConnect = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      console.log(accounts);
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No find accounts");
      }
      console.log(currentAccount);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkIFWalletConnect();
  }, []);
  // CONNECT WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      
      setCurrentAccount(accounts[0]);
      // window.location.reload();
    } catch (error) {
      console.log("Error while connecting to wallet");
    }
  };

  //UPLOAD TO IPFS FUNCTION
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `https://infura-ipfs.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log("Errors Uploading to IPFS ", error);
    }
  };

  //CREATENFT FUNCTION
  const createNFT = async (name, price, image, description, router) => {
    if (!name || !description || !price || !image)
      return console.log("Data is Missing");
    const data = JSON.stringify({ name, description, image });
    try {
      const added = await client.add(data);
      const url = `https://infura-ipfs.io/ipfs/${added.path}`;
      await createSale(url, price);
    } catch (error) {
      console.log("Error while creating NFT");
    }
  };

  //createSale FUNCTION

  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      const price = ethers.utils.parseUnits(formInputPrice, "ether");
      const contract = await connectingWithSmartContract();

      const listingPrice = await contract.getListingPrice();
      console.log(listingPrice);
      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.reSellToken(url, price, {
            value: listingPrice.toString(),
          });

      await transaction.wait();
      console.log(transaction);
    } catch (error) {
      console.log("error while creating sale", error);
    }
  };

  //FETCHNFT FUNCTION
  const fetchNFTs = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const data = await contract.fetchMarketItem();
      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);

            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );
      return items;
    } catch (error) {
      console.log("Error");
    }
  };
  //FECTCH MY NFT OR LISTED NFTS
  const fetchMyNFTsorListedNFTs = async (type) => {
    try {
      const contract = await connectingWithSmartContract();
      const data =
        type == "fetchItemsListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFT();
      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );
      return items;
    } catch (error) {
      console.log("Error while fetch listed NFTs");
    }
  };

  //BUYNFT FUNCTION
  const buyNFT = async () => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });
      await transaction.wait();
    } catch (error) {
      console.log("Error while buying NFT");
    }
  };

  return (
    <NFTMarketplaceContext.Provider
      value={{
        checkIFWalletConnect,
        connectWallet,
        fetchNFTs,
        fetchMyNFTsorListedNFTs,
        uploadToIPFS,
        createNFT,
        buyNFT,
        currentAccount,
        titleData,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
