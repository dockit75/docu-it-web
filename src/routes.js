// DocuIt React layouts
import Dashboard from "./layouts/dashboard";
import Categories from "./layouts/categories";
import SignIn from "./layouts/authentication/sign-in";
import Documents from "./layouts/Document/Documents";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Categories",
    key: "categories",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/categories",
    component: <Categories />,
  },

  {
    type: "collapse",
    name: "Document",
    key: "document",
    icon: <Icon fontSize="small">Documents</Icon>,
    route: "/document",
    component: <Documents /> ,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "signIn",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/signIn",
    component: <SignIn />,
  },


];

export default routes;
