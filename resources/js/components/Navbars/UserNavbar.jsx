import React, { Component } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Navbar,
    Nav,
    Container,
    Media, NavbarBrand, Row, Col, NavItem, NavLink, UncontrolledCollapse
} from "reactstrap";

class UserNavbar extends Component {


    logOut(e){
        e.preventDefault();
        localStorage.removeItem('usertoken');
        localStorage.removeItem('user');
        this.props.history.push(`/`)
    }

    render() {
        const isAuthenticated = (
            <Nav className="align-items-center d-none d-md-flex" navbar>
                <UncontrolledDropdown nav>
                    <DropdownToggle className="pr-0" nav>
                        <Media className="align-items-center">
                                <span className="avatar avatar-sm rounded-circle">
                                    <img
                                        alt="..."
                                        src={require("../../assets/img/theme/team-4-800x800.jpg")}
                                    />
                                </span>
                            <Media className="ml-2 d-none d-lg-block">
                                <span className="mb-0 text-sm font-weight-bold">
                                    {this.props.name}
                                </span>
                            </Media>
                        </Media>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem className="noti-title" header tag="div">
                            <h6 className="text-overflow m-0">Welcome!</h6>
                        </DropdownItem>
                        <DropdownItem to="/user/profile" tag={Link}>
                            <i className="ni ni-single-02" />
                            <span>My profile</span>
                        </DropdownItem>
                        <DropdownItem to="/admin/user-profile" tag={Link}>
                            <i className="ni ni-settings-gear-65" />
                            <span>Settings</span>
                        </DropdownItem>
                        <DropdownItem to="/admin/user-profile" tag={Link}>
                            <i className="ni ni-calendar-grid-58" />
                            <span>Activity</span>
                        </DropdownItem>
                        <DropdownItem to="/admin/user-profile" tag={Link}>
                            <i className="ni ni-support-16" />
                            <span>Support</span>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem href="#pablo" onClick={this.logOut.bind(this)}>
                            <i className="ni ni-user-run" />
                            <span>Logout</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        );

        const loginRegLinks = (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink
                        className="nav-link-icon"
                        to="/auth/register"
                        tag={Link}
                    >
                        <i className="ni ni-circle-08" />
                        <span className="nav-link-inner--text">Register</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className="nav-link-icon"
                        to="/auth/login"
                        tag={Link}
                    >
                        <i className="ni ni-key-25" />
                        <span className="nav-link-inner--text">Login</span>
                    </NavLink>
                </NavItem>
            </Nav>
        );

        return (
            <>
                <Navbar
                    className="navbar-top navbar-horizontal navbar-dark"
                    expand="md"
                    id="navbar-main"
                >
                    <Container fluid className="px-4">
                        <NavbarBrand to="/" tag={Link}>
                            <img alt="..." src={require("../../assets/img/brand/argon-react-white.png")} />
                        </NavbarBrand>
                        <button className="navbar-toggler" id="navbar-collapse-main">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
                            <div className="navbar-collapse-header d-md-none">
                                <Row>
                                    <Col className="collapse-brand" xs="6">
                                        <Link to="/">
                                            <img
                                                alt="..."
                                                src={require("../../assets/img/brand/argon-react.png")}
                                            />
                                        </Link>
                                    </Col>
                                    <Col className="collapse-close" xs="6">
                                        <button
                                            className="navbar-toggler"
                                            id="navbar-collapse-main"
                                        >
                                            <span />
                                            <span />
                                        </button>
                                    </Col>
                                </Row>
                            </div>
                        {localStorage.usertoken ? isAuthenticated : loginRegLinks}
                        </UncontrolledCollapse>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default UserNavbar;
