import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { SESSION_LOGOUT } from '../../store/actions/constants';


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
import {getCurrentUserInfo} from "../../store/actions/user-actions";



class UserNavbar extends Component {


    handleLogOut = (e) => {
        e.preventDefault();
        axios.get('/api/logout')
            .then(this.props.dispatch({ type: SESSION_LOGOUT }))
            .then(res => this.props.history.push('/auth/login'))
    };

    render() {
        const isAuth = (
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
                                    {this.props.user.first_name + this.props.user.last_name}
                                </span>
                            </Media>
                        </Media>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem className="noti-title" header tag="div">
                            <h6 className="text-overflow m-0">Welcome {this.props.user.first_name}</h6>
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
                        <DropdownItem href="#pablo" onClick={this.handleLogOut}>
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
                            { this.props.isAuthenticated ? isAuth : loginRegLinks }
                        </UncontrolledCollapse>
                    </Container>
                </Navbar>
            </>
        );
    }
}

const mapStateToProps = state => ({
    user : state.userReducer.user,
    isAuthenticated: state.userReducer.isAuthenticated
});



export default connect(mapStateToProps)(UserNavbar);
