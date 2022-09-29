    import React, { useContext, useRef, useState } from "react";
    import { useSelector } from "react-redux";
    import {
        SDivider,
        SLink,
        SLinkContainer,
        SLinkIcon,
        SLinkLabel,
        SLinkNotification,
        SLogo,
        SSearch,
        SSearchIcon,
        SSidebar,
        SSidebarButton,
        STheme,
        SThemeLabel,
        SThemeToggler,
        SToggleThumb,
    } from "./style";

    import { logoSVG } from "../../../imgs";

    import {
        AiOutlineApartment,
        AiOutlineHome,
        AiOutlineLeft,
        AiOutlineSearch,
        AiOutlineSetting,
    } from "react-icons/ai";
    import { MdLogout, MdOutlineAnalytics } from "react-icons/md";
    import { BsPeople } from "react-icons/bs";

    import { ThemeContext } from "../../../container/App";
    import { useLocation } from "react-router-dom";

    const SideBar = () => {
    const searchRef = useRef(null);
    const { setTheme, theme } = useContext(ThemeContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();

    const searchClickHandler = () => {
        if (!sidebarOpen) {
        setSidebarOpen(true);
        searchRef.current.focus();
        } else {
        // search functionality
        }
    };

    const isLogged = useSelector((state) =>
        state.entries.auth
        ? state.entries.auth.logged
            ? state.entries.refreshtoken
            : state.entries.refreshtoken.logged
        : false
    );

    return isLogged ? (
        <SSidebar isOpen={sidebarOpen}>
        <>
            <SSidebarButton
            isOpen={sidebarOpen}
            onClick={() => setSidebarOpen((p) => !p)}
            >
            <AiOutlineLeft />
            </SSidebarButton>
        </>
        <SLogo>
            <img src={logoSVG} alt="logo" />
        </SLogo>
        <SDivider />
        {linksArray.map(({ icon, label, notification, to }) => (
            <SLinkContainer key={label} isActive={pathname === to}>
            <SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}}>
                <SLinkIcon>{icon}</SLinkIcon>
                {sidebarOpen && (
                <>
                    <SLinkLabel>{label}</SLinkLabel>
                    {/* if notifications are at 0 or null, do not display */}
                    {!!notification && (
                    <SLinkNotification>{notification}</SLinkNotification>
                    )}
                </>
                )}
            </SLink>
            </SLinkContainer>
        ))}
        <SDivider />
        {secondaryLinksArray.map(({ icon, label }) => (
            <SLinkContainer key={label}>
            <SLink to="/" style={!sidebarOpen ? { width: `fit-content` } : {}}>
                <SLinkIcon>{icon}</SLinkIcon>
                {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
            </SLink>
            </SLinkContainer>
        ))}
        <SDivider />
        <STheme>
            {sidebarOpen && <SThemeLabel>Dark Mode</SThemeLabel>}
            <SThemeToggler
            isActive={theme === "dark"}
            onClick={() => setTheme((p) => (p === "light" ? "dark" : "light"))}
            >
            <SToggleThumb style={theme === "dark" ? { right: "1px" } : {}} />
            </SThemeToggler>
        </STheme>
        </SSidebar>
    ) : (
        <></>
    );
    };

    const linksArray = [
        {
            label: "Home",
            icon: <AiOutlineHome />,
            to: "/",
            notification: 0,
        },
        {
            label: "Statistics",
            icon: <MdOutlineAnalytics />,
            to: "/statistics",
            notification: 0,
        },
        {
            label: "Customers",
            icon: <BsPeople />,
            to: "/customers",
            notification: 0,
        },
        {
            label: "Diagrams",
            icon: <AiOutlineApartment />,
            to: "/diagrams",
            notification: 1,
        },
    ];

    const secondaryLinksArray = [
        {
            label: "Settings",
            icon: <AiOutlineSetting />,
        },
        {
            label: "Logout",
            icon: <MdLogout />,
        },
    ];


    export default SideBar;
