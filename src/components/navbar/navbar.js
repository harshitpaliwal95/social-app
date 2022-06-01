import * as React from "react";
import {
  AppBar,
  Toolbar,
  Badge,
  MenuItem,
  Menu,
  AccountCircle,
  MoreIcon,
  ExploreOutlinedIcon,
  BookmarkBorderOutlined,
  PermIdentityOutlinedIcon,
  LogoutOutlinedIcon,
  Box,
  IconButton,
  Typography,
} from "../../getUi";

import { Link, useLocation } from "react-router-dom";
import { logOut } from "../../feature/auth/authSlice";
import { useDispatch } from "react-redux";

export const Navbar = () => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="profile">Profile </Link>
        <PermIdentityOutlinedIcon fontSize="small" />
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(logOut());
          handleMenuClose();
        }}
      >
        Logout <LogoutOutlinedIcon fontSize="small" />
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={0} color="error">
            <ExploreOutlinedIcon />
          </Badge>
        </IconButton>
        <Link to="explore">
          <p>Explore</p>
        </Link>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={0} color="error">
            <BookmarkBorderOutlined />
          </Badge>
        </IconButton>
        <Link to="bookmark">
          <p>Bookmark</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Link to="profile">
          <p>Profile</p>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ width: "100vw", position: "fixed", top: "0", zIndex: "111" }}>
      <Box
        sx={{
          flexGrow: 1,
          display:
            pathname === "/login" || pathname === "/signup" ? "none" : "unset",
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <Link to="/">
              <Typography variant="h6" noWrap component="div" sx={{}}>
                SOCIAL HUB
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="explore more"
                color="inherit"
              >
                <Badge badgeContent={0} color="error">
                  <Link to="/explore">
                    <ExploreOutlinedIcon />
                  </Link>
                </Badge>
              </IconButton>
              <IconButton size="large" aria-label="bookmark" color="inherit">
                <Badge badgeContent={0} color="error">
                  <Link to="bookmark">
                    <BookmarkBorderOutlined />
                  </Link>
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </Box>
  );
};
