import * as Icons from "react-icons/md";

export const navItems = [
    {
        id: 1,
        title: "Inicio",
        path: "./",
        nName: "nav-item",
        sName: "sidebar-item",
        icon: <Icons.MdOutlineHome/>,
    },
    {
        id: 2,
        title: "Servicios",
        path: "./services",
        nName: "nav-item",
        sName: "sidebar-item",
        icon: <Icons.MdOutlineCases />,
    },
    {
        id: 3,
        title: "Contactanos",
        path: "./contact-us",
        nName: "nav-item",
        sName: "sidebar-item",
        icon: <Icons.MdContactPhone />,
    },
    {
        id: 4,
        title: "Registrarme",
        path: "./register",
        nName: "nav-item",
        sName: "sidebar-item",
        icon: <Icons.MdOutlineCreate />,
    },
    {
        id: 5,
        title: "Ingersar",
        path: "./login",
        nName: "nav-item",
        sName: "sidebar-item",
        icon: <Icons.MdOutlineLogin />,
    },
];

export const navItemsWithLogin = [
    {
        id: 1,
        title: "Dashboard",
        path: "./dashboard",
        nName: "nav-item",
        sName: "sidebar-item",
        icon: <Icons.MdOutlineDashboard />,
    },
    {
        id: 2,
        title: "Menu",
        path: "./menu",
        nName: "nav-item",
        sName: "sidebar-item",
        icon: <Icons.MdOutlineMenuBook />,
    },
    {
        id: 3,
        title: "Usuario",
        path: "./user",
        nName: "nav-item",
        sName: "sidebar-item",
        icon: <Icons.MdFace />,
    },
    {
        id: 4,
        title: "Salir",
        path: "./logout",
        nName: "nav-item",
        sName: "sidebar-item",
        icon: <Icons.MdOutlineLogout />,
        onClick: '() => onLogoutClick()}'
    },
];