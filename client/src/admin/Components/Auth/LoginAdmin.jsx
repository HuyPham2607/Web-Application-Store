import React, { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { AuthContext } from '../../../Context/AuthContext';

import { useDispatch } from 'react-redux';
import { loginredux } from '../../../redux/apiCall';
function LoginAdmin() {
    const { loginUser } = useContext(AuthContext);

    const dispatch = useDispatch();
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });

    const { email, password } = loginForm;
    const onChangeLoginForm = (event) => setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

    const login = async (event) => {
        event.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            loginredux(dispatch, loginData);
        } catch (error) {
            console.log(error);
        }
    };

    const body = (
        <>
            <Container>
                <Row className="my-5 py-5">
                    <div className="container d-flex justify-content-center">
                        <form onSubmit={login}>
                            <div className="d-flex align-items-center mb-3 pb-1">
                                <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }} />
                                <div className="text-center">
                                    <img src="https://s3.nikecdn.com/unite/app/953/images/swoosh_black_2x.png" alt="" />
                                </div>
                            </div>
                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                                Sign into your account
                            </h5>
                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    id="form2Example17"
                                    className="form-control form-control-lg"
                                    name="email"
                                    value={email}
                                    onChange={onChangeLoginForm}
                                />
                                <label className="form-label" htmlFor="form2Example17">
                                    Email address
                                </label>
                            </div>
                            <div className="form-outline mb-4">
                                <input
                                    type="password"
                                    id="form2Example27"
                                    className="form-control form-control-lg"
                                    name="password"
                                    value={password}
                                    onChange={onChangeLoginForm}
                                />
                                <label className="form-label" htmlFor="form2Example27">
                                    Password
                                </label>
                            </div>
                            <div className="pt-1 mb-4">
                                <button className="btn btn-dark btn-lg btn-block" type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </Row>
            </Container>
        </>
    );
    return body;
}

export default LoginAdmin;
