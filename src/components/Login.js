import React from 'react';
import { authService } from '../services/authService';
import { cData } from '../helpers/constant';
import {Button, Form, Col, Row, Alert} from 'react-bootstrap';
import '../styles/Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            txtUsername: '',
            txtPassword: '',
            validated: false,
            errorLogin: false,
            errorMessage: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = ev => {
        const elm = ev.target;
        const value = elm.value;
        const name = elm.id;

        this.setState({[name]: value});
    };

    handleSubmit = (ev) => {
        ev.preventDefault();
        const forms = ev.target;

        const element = forms.elements;
        this.setState({
            txtUsername: element.txtUsername.value,
            txtPassword: element.txtPassword.value,
            validated: true
        });

        const dataVo = this.dataPreparation();

        if (forms.checkValidity() === false) {
            ev.stopPropagation();
        } else {

            authService.login(dataVo).then(response => {
                   if (response.status === 'ok') {
                       localStorage.setItem('user', JSON.stringify(response.data));
                       cData.history.push('/');
                       window.location.reload();
                   } else {
                       this.setState({errorLogin: true, errorMessage: response.message});
                   }
                }).catch(error => {
                    this.setState({errorLogin: true, errorMessage: error.message});
                });
        }

            console.log(this.state.txtUsername);
    };

    dataPreparation = () => {
        return {
            username: this.state.txtUsername,
            password: this.state.txtPassword
        };
    };

    render(){
        const { validated, txtUsername, txtPassword, errorLogin, errorMessage } = this.state;
        return (
            <div>
                <header className="title-box">
                    <p>
                        Login Form
                    </p>
                </header>
                <div className="login-box">
                <Form validated={validated} onSubmit={this.handleSubmit} noValidate>
                    <Alert variant="danger" show={errorLogin} onClose={() => {this.setState({errorLogin: false})}} dismissible>
                        {errorMessage}
                    </Alert>
                    <Form.Group as={Row} controlId="txtUsername">
                        <Form.Label column sm="2">
                            Username
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required placeholder="username"
                                          value={txtUsername} onChange={this.handleInputChange}/>
                            <Form.Control.Feedback type="invalid">
                                Please fill a username.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="txtPassword">
                        <Form.Label column sm="2">
                            Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="password"
                                          value={txtPassword} onChange={this.handleInputChange} required/>
                            <Form.Control.Feedback type="invalid">
                                Please fill a password.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit">Sign in</Button>
                        </Col>
                    </Form.Group>

                </Form>
                </div>
            </div>
        );
    }

}

export default Login;