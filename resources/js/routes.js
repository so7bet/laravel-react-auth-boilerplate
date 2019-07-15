import Index from "./views/Index.jsx";
import UserIndex from "./views/UserIndex.jsx";
import Profile from "./views/examples/Profile.jsx";
import Maps from "./views/examples/Maps.jsx";
import Register from "./views/examples/Register.jsx";
import Login from "./views/examples/Login.jsx";
import ForgetPassword from "./views/examples/ForgetPassword.jsx";
import PasswordReset from "./views/examples/PasswordReset.jsx";
import Tables from "./views/examples/Tables.jsx";
import Icons from "./views/examples/Icons.jsx";

let routes = [
    {
        path: "/index",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        auth: true,
        exact: true,
        component: Index,
        layout: "/admin"
    },
    {
        path: "/index",
        name: "index",
        icon: "ni ni-tv-2 text-primary",
        auth: false,
        exact: true,
        component: UserIndex,
        layout: "/user"
    },
    {
        path: "/profile",
        name: "User Profile",
        icon: "ni ni-single-02 text-yellow",
        auth: true,
        exact: true,
        component: Profile,
        layout: "/user"
    },
    {
        path: "/icons",
        name: "Icons",
        icon: "ni ni-planet text-blue",
        auth: true,
        exact: true,
        component: Icons,
        layout: "/admin"
    },
    {
        path: "/maps",
        name: "Maps",
        icon: "ni ni-pin-3 text-orange",
        auth: true,
        exact: true,
        component: Maps,
        layout: "/admin"
    },
    {
        path: "/tables",
        name: "Tables",
        icon: "ni ni-bullet-list-67 text-red",
        auth: true,
        exact: true,
        component: Tables,
        layout: "/admin"
    },
    {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        auth: false,
        exact: true,
        component: Login,
        layout: "/auth"
    },
    {
        path: "/register",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        auth: false,
        exact: true,
        component: Register,
        layout: "/auth"
    },
    {
        path: "/forget-password",
        name: "ForgetPassword",
        icon: "ni ni-key-25 text-info",
        auth: false,
        exact: true,
        component: ForgetPassword,
        layout: "/auth"
    },
    {
        path: "/reset-password/:resetToken",
        name: "PasswordReset",
        icon: "ni ni-key-25 text-info",
        auth: false,
        exact: true,
        component: PasswordReset,
        layout: "/auth"
    }
];
export default routes;
