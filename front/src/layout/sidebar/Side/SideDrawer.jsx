import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { Divider, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { blue } from "@mui/material/colors";

import PropTypes from "prop-types";
import NavBarLink from "../../../routes/components/NavBarLink";
import ROUTES from "../../../routes/routesModel";

export default function SideDrawer({ drawerWidth, sideBarTitle }) {
  const menuArray = [
    "Home",
    "Add Production",
    "Login",
    "Add Member",
    "Log out",
  ];

  const setMenuListItemButton = (title, navigteTo, key) => {
    return (
      <ListItem key={key} disablePadding>
        <ListItemButton>
          {/* <ListItemText primary={title} /> */}
          <NavBarLink to={navigteTo}>{title}</NavBarLink>
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          [`& .MuiDrawer-paper`]: {
            boxSizing: "border-box",
            backgroundColor: blue[100],
            width: drawerWidth,
            flexShrink: 0,
          },
        }}
      >
        <List>
          <ListItemButton>
            <ListItemText primary={sideBarTitle} />
            {/* <NavBarLink></NavBarLink> */}
          </ListItemButton>

          <Divider />

          {menuArray.map((menuItem, i) => {
            switch (menuItem) {
              case "Home":
                return setMenuListItemButton(menuItem, ROUTES.ROOT, i);

              case "Add Production":
                return setMenuListItemButton(menuItem, ROUTES.ADD_PROD, i);
              case "Members":
                return setMenuListItemButton(menuItem, ROUTES.MEMBERS, i);
              case "Login":
                return setMenuListItemButton(menuItem, ROUTES.LOGIN_PAGE, i);
              case "Add Member":
                return setMenuListItemButton(menuItem, ROUTES.REGISTER, i);

              default:
                return (
                  <ListItem key={menuItem} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={menuItem} />
                    </ListItemButton>
                  </ListItem>
                );
            }
          })}
        </List>
      </Drawer>
    </>
  );
}

SideDrawer.propTypes = {
  drawerWidth: PropTypes.string.isRequired,
};
