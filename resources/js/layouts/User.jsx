import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import UserNavbar from "../components/Navbars/UserNavbar.jsx";
import UserHeader from "../components/Headers/UserHeader.jsx";
import AdminFooter from "../components/Footers/AdminFooter.jsx";

import routes from "../routes.js";


class User extends Component {
    constructor(){
        super();
        this.state = {
            user : {}
        }
    }

    // loadUser = () => {
    //     this.setState({user: {
    //             id: data.id,
    //             name: data.name,
    //             email: data.email,
    //             entries: data.entries,
    //             joined: data.joined
    //         }})
    // };

    componentDidUpdate(e) {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.mainContent.scrollTop = 0;
    }


    getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.layout === "/user" ) {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
    getBrandText = path => {
        for (let i = 0; i < routes.length; i++) {
            if (
                this.props.location.pathname.indexOf(
                    routes[i].layout + routes[i].path
                ) !== -1
            ) {
                return routes[i].name;
            }
        }
        return "Brand";
    };
    render() {
        return (
            <>
                <div className="main-content" ref="mainContent">
                    <UserNavbar
                        {...this.props}
                        name={localStorage.getItem('username')}
                        brandText={this.getBrandText(this.props.location.pathname)}
                    />
                    <UserHeader />
                    <Switch>
                        {this.getRoutes(routes)}
                    </Switch>
                    <Container fluid>
                        <AdminFooter />
                    </Container>
                </div>
            </>
        );
    }
}

export default User;
