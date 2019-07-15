import React from "react";
import { connect } from 'react-redux';
import { logIn } from "../../store/actions/user-actions";
import { Link } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col
} from "reactstrap";
import axios from "axios";


const Login = (props) => {
    const {history, dispatch} = props;

    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            onSubmit={(values, {setSubmitting}) => {
                dispatch(logIn(values))
                    .then(res => history.push('/'));
                setSubmitting(false)
            }
            }
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email('Invalid email')
                    .required("Required"),
                password: Yup.string()
                    .required("No password provided.")
                    .min(6, "Password is too short.")
            })}>
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit
                } = props;
                return (
                    <>
                        <Col lg="5" md="7">
                            <Card className="bg-secondary shadow border-0">
                                <CardBody className="px-lg-5 py-lg-5">
                                    <div className="text-center text-muted mb-4">
                                        <small>sign in with credentials</small>
                                    </div>
                                    <Form role="form">
                                        <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-email-83"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Email"
                                                    type="email"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={errors.email && touched.email && "error"}
                                                />
                                            </InputGroup>
                                            {errors.email && touched.email && (
                                                <div className="input-feedback">{errors.email}</div>
                                            )}
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-lock-circle-open"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Password"
                                                    type="password"
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={errors.password && touched.password && "error"}
                                                />
                                            </InputGroup>
                                            {errors.password && touched.password && (
                                                <div className="input-feedback">{errors.password}</div>
                                            )}
                                        </FormGroup>
                                        <div className="custom-control custom-control-alternative custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id=" customCheckLogin"
                                                type="checkbox"
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor=" customCheckLogin"
                                            >
                                                <span className="text-muted">Remember me</span>
                                            </label>
                                        </div>
                                        <div className="text-center">
                                            <Button className="my-4" color="primary" type="button"
                                                    onClick={handleSubmit}>
                                                Sign in
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                            <Row className="mt-3">
                                <Col xs="6">
                                    <Link
                                        className="text-light"
                                        to="/auth/forget-password"
                                    >
                                        <small>Forgot password?</small>
                                    </Link>
                                </Col>
                                <Col className="text-right" xs="6">
                                    <Link
                                        className="text-light"
                                        to="/auth/register"
                                    >
                                        <small>Create new account</small>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </>
                )
            }
            }
        </Formik>
    )
};

export default connect(null, null)(Login);
