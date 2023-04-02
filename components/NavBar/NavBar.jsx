import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
//import icon
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";

//import index

import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import { Button } from "../componentindex";
import Style from "./NavBar.module.css";
import images from "../../img";

const NavBar = () => {
  //---USESTATE COMPONNTS
  const [discover, setDiscover] = useState(false);
  const [help, sethelp] = useState(false);
  const [notification, setnotification] = useState(false);
  const [profile, setprofile] = useState(false);
  const [openSideMenu, setopenSideMenu] = useState(false);

  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Discover") {
      setDiscover(true);
      sethelp(false);
      setnotification(false);
      setprofile(false);
    } else if (btnText == "Help Center") {
      setDiscover(false);
      sethelp(true);
      setnotification(false);
      setprofile(false);
    } else {
      setDiscover(false);
      sethelp(false);
      setnotification(false);
      setprofile(false);
    }
  };

  const openNotification = () => {
    if (!notification) {
      setnotification(true);
      setDiscover(false);
      sethelp(false);
      setprofile(false);
    } else {
      setnotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setprofile(true);
      sethelp(false);
      setDiscover(false);
      setnotification(false);
    } else {
      setprofile(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setopenSideMenu(true);
    } else {
      setopenSideMenu(false);
    }
  };

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <Image
            src={images.logo}
            alt="NFT MARKET PLACE"
            width={100}
            height={100}
          />
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch onClick={() => {}} className={Style.search_icon} />
            </div>
          </div>
        </div>
        {/*END OF LEFT SECTION */}
        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_discover}>
            {/*DISCOVER MENU*/}
            <p
              onClick={(e) => {
                openMenu(e);
              }}
            >
              Discover
            </p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>
          {/*HELP CENTER MENU*/}
          <div className={Style.navbar_container_right_help}>
            <p
              onClick={(e) => {
                openMenu(e);
              }}
            >
              Help Center
            </p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

          {/*NOTIFICATION */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => openNotification()}
            />
            {notification && <Notification />}
          </div>
          {/*CREATE BUTTON SECTION*/}
          <div className={Style.navbar_container_right_button}>
            <Button btnName="Create" handleClick={() => {}}/>
          </div>
          {/*USER PROFILE */}
          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image
                src={images.user1}
                alt="Profile"
                width={40}
                height={40}
                onClick={() => openProfile()}
                className={Style.navbar_container_right_profile}
              />
              {profile && <Profile />}
            </div>
          </div>
          {/*MENU BUTTON */}
          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSideBar()}
            />
          </div>
        </div>
      </div>
      {/*SIDEBAR COMPONENT */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar setopenSideMenu={setopenSideMenu} />
        </div>
      )}
    </div>
  );
};

export default NavBar;
