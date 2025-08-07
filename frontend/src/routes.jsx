import React from "react";

// Auth Imports
import SignIn from "./views/auth/SignIn";
import Welcome from "./views/dashboard/Welcome.jsx";
import DashIcon from "./components/icons/DashIcon";
import Infodata from "./data/Infodata.js";
import dashboardw from "./assets/img/logo/deshboardwhite.png";
import Client from "./views/pages/client";

const routes = [
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    component: <SignIn />,
  },
  {
    name: "Dashboard",
    layout: "/dashboard",
    path: "welcome",
    component: <Welcome />,
  },
  {
    name: "Client",
    layout: "/admin",
    path: "client",
    component: <Client />,
    icon: { iconlight: Infodata.dashboardw, bgcoloer: "bg-purple-700" },

  }

];

export default routes;