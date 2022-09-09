import React from "react";

import {
    MdPersonOutline,
    MdOutlineAccountBalanceWallet,
    MdOutlineAddShoppingCart,
    MdOutlineMonetizationOn,
  } from "react-icons/md";
const iconStyle = (Icon) => <Icon size="2rem" color="crimson" backgroundColor= "rgba(255, 0, 0, 0.2)"/>;

export const widgetData = [
  {
    name: "USUARIOS",
    isMoney: false,
    link: "Ver usuarios",
    query: "users",
    icon: iconStyle(MdPersonOutline),
    imgClass: 'one',
  },
  {
    name: "ORDENES",
    isMoney: false,
    link: "Ver Ordenes",
    query: "oders",
    icon: iconStyle(MdOutlineAddShoppingCart),
    imgClass: 'two',
  },
  {
    name: "GANANCIAS",
    isMoney: true,
    link: "Ver ganancias netas",
    query: "ernings",
    icon: iconStyle(MdOutlineMonetizationOn),
    imgClass: 'three',
  },
  {
    name: "PRODUCTOS",
    isMoney: false,
    link: "Ver detalles",
    query: "products",
    icon: iconStyle(MdOutlineAccountBalanceWallet),
    imgClass: 'four',
  },
];
