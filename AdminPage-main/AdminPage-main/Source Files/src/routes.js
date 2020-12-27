import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Dashboard from "./views/Dashboard";
import UserProfileLite from "./views/AdminList";
import Errors from "./views/Posts";
import BlockedList from "./views/BlockedList";
import UserList from "./views/UserList";
import ReportTable from "./views/Reports";
import MatchedCouples from "./views/MatchedCouples";
import AdminList from "./views/AdminList";
import Posts from "./views/Posts";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/dashboard" />
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: Dashboard
  },
  {
    path: "/user-list",
    layout: DefaultLayout,
    component: UserList
  },
  {
    path: "/blocked-user-list",
    layout: DefaultLayout,
    component: BlockedList
  },
  {
    path: "/reports",
    layout: DefaultLayout,
    component: ReportTable
  },
  {
    path: "/matched-couples",
    layout: DefaultLayout,
    component: MatchedCouples
  },
  {
    path: "/admin-list",
    layout: DefaultLayout,
    component: AdminList
  },
  {
    path: "/posts",
    layout: DefaultLayout,
    component: Posts
  }
];
