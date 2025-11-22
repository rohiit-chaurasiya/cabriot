import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdOutlineFoodBank,
} from "react-icons/md";
import { FaKitchenSet } from "react-icons/fa6";
import { LiaClipboardListSolid } from "react-icons/lia";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import AddKitchen from "views/admin/addKitchen";
import EditKitchen from "views/admin/editKitchen";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Admin Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  // {
  //   name: "Kitchen",
  //   layout: "/admin",
  //   path: "/kitchen",
  //   icon: (
  //     <Icon
  //       as={FaKitchenSet}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  //   // Nested routes for the "Kitchen" route
  //   routes: [
  //     {
  //       name: "add-kitchen",
  //       path: "admin/add-kitchen",
  //       component: Profile,
  //     },
  //     {
  //       name: "edit-kitchen",
  //       path: "admin/edit-kitchenId", // Example of a dynamic parameter
  //       component: EditKitchen,
  //     },
  //     // Add more child routes as needed
  //   ],
  // },
  {
    name: "Kitchen",
    layout: "/admin",
    path: "/kitchen",
    icon: (
      <Icon
        as={FaKitchenSet}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  // {
  //   name: "Kitchen",
  //   layout: "/admin",
  //   path: "/kitchen",
  //   icon: (
  //     <Icon
  //       as={FaKitchenSet}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  // },
  {
    name: "Menu Items",
    layout: "/admin",
    path: "/menu-items",
    icon: <Icon as={MdOutlineFoodBank} width='20px' height='20px' color='inherit' />,
    component: DataTables,
  },
  {
    name: "User Orders",
    layout: "/admin",
    path: "/user-orders",
    icon: <Icon as={LiaClipboardListSolid} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "/sign-in",
  //   icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
  //   component: SignInCentered,
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: RTL,
  // },
];

export default routes;
