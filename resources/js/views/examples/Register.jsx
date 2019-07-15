import React from "react";
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

const Register = (props) => {
    const { history } = props;
    return (
        <Formik
            initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                password: ""
            }}
            onSubmit = {(values, {setSubmitting }) => {
                axios
                    .post('/api/signup', values)
                    .then(res => {
                        if (res.status === 200) {
                            history.push(`/auth/login`)
                        }}
                    );
                setSubmitting(false)
            }
            }
            validationSchema={Yup.object().shape({
                first_name: Yup.string()
                    .min(3, 'Too Short!')
                    .max(50, 'Too Long!')
                    .required('Required'),
                last_name: Yup.string()
                    .min(3, 'Too Short!')
                    .max(50, 'Too Long!')
                    .required('Required'),
                email: Yup.string()
                    .email('Invalid email')
                    .required("Required"),
                password: Yup.string()
                    .required("No password provided.")
                    .min(8, "Password is too short - should be 8 chars minimum.")
                    .matches(/(?=.*[0-9])/, "Password must contain a number.")
            })}>
            {props => {
                const { values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit
                } = props;
                return (
                    <>
                        <Col lg="6" md="8">
                            <Card className="bg-secondary shadow border-0">
                                <CardBody className="px-lg-5 py-lg-5">
                                    <div className="text-center text-muted mb-4">
                                        <small>sign up with credentials</small>
                                    </div>
                                    <Form role="form">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-hat-3" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="First Name"
                                                    type="text"
                                                    name="first_name"
                                                    value={values.first_name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={errors.first_name && touched.first_name && "error"}
                                                />
                                            </InputGroup>
                                            {errors.email && touched.email && (
                                                <div className="input-feedback">{errors.first_name}</div>
                                            )}
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-hat-3" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Last Name"
                                                    type="text"
                                                    name="last_name"
                                                    value={values.last_name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={errors.last_name && touched.last_name && "error"}
                                                />
                                            </InputGroup>
                                            {errors.last_name && touched.last_name && (
                                                <div className="input-feedback">{errors.last_name}</div>
                                            )}
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-email-83" />
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
                                                        <i className="ni ni-lock-circle-open" />
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
                                        <Row className="my-4">
                                            <Col xs="12">
                                                <div className="custom-control custom-control-alternative custom-checkbox">
                                                    <input
                                                        className="custom-control-input"
                                                        id="customCheckRegister"
                                                        type="checkbox"
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="customCheckRegister"
                                                    >
                                            <span className="text-muted">
                                                I agree with the{" "}
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                Privacy Policy
                                                </a>
                                            </span>
                                                    </label>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="text-center">
                                            <Button className="mt-4" color="primary" type="button"  onClick={handleSubmit}>
                                                Create account
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </>
                )
            }

            }
        </Formik>
    )
}
;

export default Register;
