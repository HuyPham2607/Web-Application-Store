import React, { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import './Login.css';
import { loginredux } from '../../../redux/apiCall';
import { useDispatch } from 'react-redux';
import Navbar from '../../layout/Navbar/Navbar.jsx';
import Footer from '../../layout/Footer/Footer.jsx';
function Login() {
    const dispatch = useDispatch();
    const { loginUser } = useContext(AuthContext);
    const test2 = () => {};
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });

    const { email, password } = loginForm;
    const onChangeLoginForm = (event) => setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

    const login = async (event) => {
        event.preventDefault();

        try {
            // const loginData = await loginUser(loginForm);
            loginredux(dispatch, loginForm);
        } catch (error) {
            console.log(error);
        }
    };

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/register`;
        navigate(path);
    };
    const routeChangeHome = () => {
        let path = `/`;
        navigate(path);
    };
    const body = (
        <>
            <div>
                <Navbar />
            </div>
            <Container>
                <Row className="my-5 py-5">
                    <Col className="content-left">
                        <img className="img-left" src="https://image1.slideserve.com/1839728/nike-inc-l.jpg" alt="" />
                    </Col>
                    <Col>
                        <form onSubmit={login}>
                            <div className="d-flex align-items-center mb-3 pb-1">
                                <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }} />
                                <div className="text-center" onClick={routeChangeHome}>
                                    <img src="https://s3.nikecdn.com/unite/app/953/images/swoosh_black_2x.png" alt="" />
                                </div>
                            </div>
                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                                Sign into your account
                            </h5>
                            <div className="form-outline mb-4">
                                <input
                                    type="email"
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
                            <a className="small text-muted" href="#!">
                                Forgot password?
                            </a>
                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                Don't have an account?{' '}
                                <span onClick={routeChange} style={{ color: '#393f81' }}>
                                    Register here
                                </span>
                            </p>
                            <a href="#!" className="small text-muted">
                                Terms of use.
                            </a>
                            <a href="#!" className="small text-muted">
                                Privacy policy
                            </a>
                        </form>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
    return body;
}

export default Login;
