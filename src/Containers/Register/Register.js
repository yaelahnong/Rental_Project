import React, {Component} from 'react';
import First from './First';
import Second from './Second';
import Third from './Third';
import Success from './Success';
import { Redirect } from 'react-router-dom';
import './Register.css';
import { userRegister, userLogin } from '../../redux/actions/user.actions';
import { connect } from 'react-redux';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 1,
            formRegister: {
                nama: '',
                email: '',
                password: '',
                passwordConfirm: '',
                no_telp: ''
            },
            showPassword: false,
            redirect: false,
        }
    }

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        })
    }

    // Handle fields change
    handleChange = (event) => {
        let formRegisterNew = {...this.state.formRegister};
        formRegisterNew[event.target.name] = event.target.value
        this.setState({
            formRegister: formRegisterNew
        })
    }
    handleValidation = () => {
        let isValid = true;
        if(!this.state.formRegister.nama && this.state.formRegister.email && this.state.formRegister.password && this.state.formRegister.passwordConfirm && this.state.formRegister.no_telp) {
            isValid = false;
        }
        return isValid;
    }

    handleSubmit = () => {
        if(this.handleValidation()) {
            this.onRegisterUser();
        }
    }

    onRegisterUser = async () => {
        try {
            await this.props.dispatch(userRegister(this.state.formRegister)).then((result) => {
                this.onLoginUser();
            });
        } catch (error) {
            console.log(error)
        }
    }

    onLoginUser = async () => {
        try {
            await this.props.dispatch(userLogin(this.state.formRegister)).then((result) => {
                let data = result.value.data
                if(data.success === true) {
                    sessionStorage.setItem('login', true)
                    sessionStorage.setItem('id_user', data.message.id_user)
                    sessionStorage.setItem('email', data.message.email)
                    sessionStorage.setItem('nama', data.message.nama)
                    sessionStorage.setItem('no_telp', data.message.no_telp)
                    localStorage.setItem('api_token', data.api_token)
                    // localStorage.setItem('api_token', )
                    this.setState({
                        redirect: true
                    })
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if(this.state.redirect === true) {
            return <Redirect to={'/'} />
        }

        if(sessionStorage.getItem("login")) {
            return <Redirect to={'/'} />
        }
        

        const { step } = this.state;
        // const { nama, email, password } = this.state.formRegister;
        // const { values } = { nama, email, password }; 

        switch (step) {
            case 1:
                return (
                    <First
                    value={this.state.formRegister}
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    />
                )
            
            case 2:
                return (
                    <Second
                    value={this.state.formRegister}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    />
                )
            
            case 3:
                return (
                    <Third
                    value={this.state.formRegister}
                    error={this.state.errorMsg}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    />
                )
            
            case 4:
                return (
                    <Success />
                )
        
            default:

        }
    }
}

const mapStatetoProps = (state) => ({
    user: state.user
})

export default connect(mapStatetoProps)(Register);