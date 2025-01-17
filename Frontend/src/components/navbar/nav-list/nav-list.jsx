import MenuItem from "@mui/material/MenuItem"; // MUI ICON COMPONENTS
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown"; // GLOBAL CUSTOM COMPONENTS
import { NavLink } from "../../../components/nav-link";
import { FlexBox } from "../../../components/flex-box";
import BazaarCard from "../../../components/BazaarCard"; // LOCAL CUSTOM COMPONENTS
import MegaMenu from "../mega-menu";
import NavItemChild from "./nav-item-child";
import CategoryBasedMenu from "../category-based-menu"; // NAVIGATION DATA LIST
import navigation from "../../../data/navbarNavigation"; // STYLED COMPONENTS
import { StyledNavLink, NAV_LINK_STYLES, ChildNavListWrapper } from "../styles"; // DATA TYPES
import Link from "next/link"; // MUI

export default function NavigationList() {
  const renderNestedNav = (list = [], isRoot = false) => {
    return list.map(nav => {
      if (isRoot) {

        if (nav.megaMenu) {
          // return <MegaMenu key={nav.title} title={nav.title} menuList={nav.child} />;
        }

        if (nav.megaMenuWithSub && nav.url) {
          return <CategoryBasedMenu url={nav.url} key={nav.title} title={nav.title} menuList={nav.child} />;
        }

        
        if (nav.child && nav.url) {
          return (
            <FlexBox sx={{ "&:hover": { "& > .child-nav-item": { display: "block" } }}} key={nav.title} alignItems="center" position="relative" flexDirection="column" >
              <FlexBox alignItems="flex-end" gap={0.3} sx={NAV_LINK_STYLES}>
                <Link href={nav.url} target="blank">{nav.title}</Link>
                <KeyboardArrowDown sx={{ color: "grey.500", fontSize: "1.1rem"}} />
              </FlexBox>

              <ChildNavListWrapper className="child-nav-item">
                <BazaarCard
                  elevation={3}
                  sx={{
                    mt: 2.5,
                    py: 1,
                    // color: "#fff",
                    minWidth: 100,
                    borderRadius: "8px",
                    border: "1px solid white",
                    "& .MuiMenuItem-root:hover": {
                      background:'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)',
                      color:'#fff',
                    },
                  }}
                >
                  {renderNestedNav(nav.child)}
                </BazaarCard>
              </ChildNavListWrapper>
            </FlexBox>
          );
        }

        if (nav.url) {
          return <StyledNavLink href={nav.url} key={nav.title} sx={{ "&:hover": { backgroundColor: "#000" } }}>
              {nav.title}
            </StyledNavLink>;
        }

        if (nav.child) {
          return <FlexBox sx={{ "&:hover": { "& > .child-nav-item": { display: "block" } }}} key={nav.title} alignItems="center" position="relative" flexDirection="column" >
              <FlexBox alignItems="flex-end" gap={0.3} sx={NAV_LINK_STYLES}>
                {nav.title} <KeyboardArrowDown sx={{ color: "grey.500", fontSize: "1.1rem"}} />
              </FlexBox>

              <ChildNavListWrapper className="child-nav-item">
                <BazaarCard
                  elevation={3}
                  sx={{
                    mt: 2.5,
                    py: 1,
                    // color: "#fff",
                    minWidth: 100,
                    borderRadius: "8px",
                    border: "1px solid white",
                    "& .MuiMenuItem-root:hover": {
                      background:'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)',
                      color:'#fff',
                    },
                  }}
                >
                  {renderNestedNav(nav.child)}
                </BazaarCard>
              </ChildNavListWrapper>
            </FlexBox>;
        }
      } else {

        //SECOND LAYER DROPDOWN
        if (nav.url) {
          return (
            <NavLink href={nav.url} key={nav.title} >
              <MenuItem sx={{ fontFamily: "Elemental End", textTransform: "lowercase" }}>
                {nav.title}
              </MenuItem>
            </NavLink>
          )
        }

        //SECOND LAYER DROPDOWN
        if (nav.child) {
          return (
            <NavItemChild 
              nav={nav} 
              key={nav.title} 
              sx={{ 
                background:'#000',
                fontFamily: "Elemental End",
                textTransform: "lowercase"
              }}>
              {renderNestedNav(nav.child)}
            </NavItemChild>
          );
        }
      }
    });
  };

  return <FlexBox gap={4}>{renderNestedNav(navigation, true)}</FlexBox>;
}