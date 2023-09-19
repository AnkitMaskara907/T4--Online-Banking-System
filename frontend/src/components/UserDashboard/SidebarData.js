import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Account Details",
    path: "/account-details",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Account Summary",
    path: "/account-summary",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Change Password",
    path: "/change-password",
    icon: <FaIcons.FaPhone />,
  },
  {
    title: "Transfer Funds",
    path: "/transfer-funds",
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "RTGS",
        path: "/transfer-funds/RTGS",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "NEFT",
        path: "/transfer-funds/NEFT",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Add Payee",
    path: "/add-payee",
    icon: <IoIcons.IoMdHelpCircle />,
  },
  {
    title: "Open Account",
    path: "/open-account",
    icon: <IoIcons.IoMdHelpCircle />,
  },
];
