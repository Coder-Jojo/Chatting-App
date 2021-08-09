import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    // IconButton,
    // Drawer,
    // Link,
    // MenuItem,
    // Container
  } from "@material-ui/core";
  // import MenuIcon from "@material-ui/icons/Menu";
  import React
  // ,{ useState, useEffect } 
  from "react";
  // import { Link as RouterLink} from "react-router-dom";
  
  const headersData = [
    // {
    //   label: "Listings",
    //   href: "/listings",
    // },
    // {
    //   label: "Mentors",
    //   href: "/mentors",
    // },
    // {
    //   label: "My Account",
    //   href: "/account",
    // },
    {
      label: "Log Out",
      href: "/",
    },
  ];
  
  const useStyles = makeStyles(() => ({
    header: {
      backgroundColor: "#400CCC",
      paddingRight: "79px",
      paddingLeft: "118px",
      "@media (max-width: 900px)": {
        paddingLeft: 0,
      },
    },
    logo: {
      fontFamily: "Work Sans, sans-serif",
      fontWeight: 600,
      color: "#FFFEFE",
      textAlign: "left",
    },
    menuButton: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 700,
      size: "18px",
      marginLeft: "38px",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    drawerContainer: {
      padding: "20px 30px",
    },
  }));
  
  const Navbar = () => {
    // const {logo, menuButton, drawerContainer } = useStyles();
    
    const {menuButton, logo} = useStyles();

    // const [state, setState] = useState({
    //   mobileView: false,
    //   drawerOpen: false,
    // });
  
    // const { mobileView, drawerOpen } = state;
  
    // useEffect(() => {
    //   const setResponsiveness = () => {
    //     return window.innerWidth < 900
    //       ? setState((prevState) => ({ ...prevState, mobileView: true }))
    //       : setState((prevState) => ({ ...prevState, mobileView: false }));
    //   };
  
    //   setResponsiveness();
  
    //   window.addEventListener("resize", () => setResponsiveness());
  
    //   return () => {
    //     window.removeEventListener("resize", () => setResponsiveness());
    //   };
    // }, []);
  
    const displayDesktop = () => {
      return (
        <Toolbar className="d-flex justify-content-between">
          <div>{JOJOLogo}</div>
          <div>{getMenuButtons()}</div>
        </Toolbar>
      );
    };

    // const icons = () => {
    //     return(
    //         <Button color="inherit">Cart</Button>
    //     )
    // }
  
    // const displayMobile = () => {
    //   const handleDrawerOpen = () =>
    //     setState((prevState) => ({ ...prevState, drawerOpen: true }));
    //   const handleDrawerClose = () =>
    //     setState((prevState) => ({ ...prevState, drawerOpen: false }));
  
    //   return (
    //     <Toolbar>
    //       <IconButton
    //         {...{
    //           edge: "start",
    //           color: "inherit",
    //           "aria-label": "menu",
    //           "aria-haspopup": "true",
    //           onClick: handleDrawerOpen,
    //         }}
    //       >
    //         <MenuIcon />
    //       </IconButton>
  
    //       <Drawer
    //         {...{
    //           anchor: "left",
    //           open: drawerOpen,
    //           onClose: handleDrawerClose,
    //         }}
    //       >
    //         <div className={drawerContainer, "d-flex flex-column"}>{getDrawerChoices()}</div>
    //       </Drawer>
            
    //     <Container className="d-flex justify-content-between" width="100%">
    //         <div>{VENDOORLogo}</div>
    //         <div>{icons()}</div>
    //     </Container>
    //     </Toolbar>
    //   );
    // };
  
    // const getDrawerChoices = () => {
    //   return headersData.map(({ label, href }) => {
    //     return (
    //         <Button >
    //             <MenuItem>{label}</MenuItem>
    //             {/* <Link
    //                 {...{
    //                 component: RouterLink,
    //                 to: href,
    //                 color: "inherit",
    //                 style: { textDecoration: "none" },
    //                 key: label,
    //                 }}
    //             >
    //             </Link> */}
    //         </Button>
    //     );
    //   });
    // };
  
    const JOJOLogo = (
      <Typography variant="h6" component="h1" className={logo}>
        JOJOCHAT
      </Typography>
    );
  
    const getMenuButtons = () => {
      return headersData.map(({ label, href }, i) => {
        return (
          <a href='/' key={i} >
            <Button
              {...{
                key: label,
                color: "inherit",
                to: href,
                // component: RouterLink,
                className: menuButton,
              }}
              // className={menuButton}
            >
              {label}
            </Button>
          </a>
        );
      });
    };
  
    return (
        <AppBar position="static" className="bg-dark">
          {displayDesktop()}
          {/* {mobileView ? displayMobile() : displayDesktop()} */}
        </AppBar>
    );
  }

  export default Navbar