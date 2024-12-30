import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styled from "@mui/material/styles/styled";
import Container from "@mui/material/Container"; // GLOBAL CUSTOM COMPONENTS

import { NavLink } from "../../components/nav-link";
import BazaarCard from "../../components/BazaarCard"; // COMMON STYLED OBJECT

export const NAV_LINK_STYLES = {
  fontFamily:'Helvetica',
  color:'#6A6B6B',
  fontWeight:'bold',
  cursor: "pointer",
  // transition: "color 150ms ease-in-out",
  "&:hover": {
    color: "#fff"
  },
  "&:last-child": {
    marginRight: 0
  }
};
export const StyledNavLink = styled(NavLink)({ ...NAV_LINK_STYLES });

export const ParentNav = styled(Box, {
  shouldForwardProp: prop => prop !== "active"
})(({
  theme,
  active
}) => ({
  position: "relative",
  "&:hover": {
    color: "#fff",
    "& > .parent-nav-item": {
      display: "block"
    }
  },
  ...(active && {
    color: "#fff",
  })
}));
export const ParentNavItem = styled("div", {
  shouldForwardProp: prop => prop !== "left" && prop !== "right"
})(({
  theme,
  left,
  right
}) => ({
  top: 0,
  zIndex: 5,
  left: "100%",
  paddingLeft: 8,
  display: "none",
  position: "absolute",
  // [theme.breakpoints.down(1640)]: { right: "100%", left: "auto", paddingRight: 8 }
  ...(right && {
    right: "100%",
    left: "auto",
    paddingRight: 8
  })
}));
export const NavBarWrapper = styled(BazaarCard, {
  shouldForwardProp: prop => prop !== "border"
})(({
  theme,
  border
}) => ({
  background:'#353535',
  height: "60px",
  display: "block",
  borderRadius: "0px",
  position: "relative",
  ...(border && {
    borderBottom: `1px solid ${theme.palette.grey[200]}`
  }),
  [theme.breakpoints.down(1150)]: {
    display: "none"
  }
}));
export const InnerContainer = styled(Container)({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
});
export const CategoryMenuButton = styled(Button)(({
  theme
}) => ({
  borderRadius: '50px',
  background:'#717171',
  color:'#fff',
  ...(theme.direction === "rtl" && {
    ".dropdown-icon": {
      rotate: "180deg"
    }
  }),
  ".prefix": {
    px:3,
    gap: 8,
    flex: 1,
    display: "flex",
    alignItems: "center",
    color: theme.palette.grey[800]
  }
}));
export const ChildNavListWrapper = styled("div")({
  zIndex: 5,
  left: "50%",
  top: "100%",
  display: "none",
  position: "absolute",
  transform: "translate(-50%, 0%)",
  "& .MuiMenuItem-root": {
    padding: "8px 16px",
    "&:hover": {
      backgroundColor: "#1976d2", // Example hover background
      color: "#fff", // Example hover text color
    },
  },
  "& .MuiMenuItem-root:hover": {
    backgroundColor: "#f0f0f0", // Change hover background
    color: "#1976d2", // Change hover text color
  },
});
