import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { browserHistory } from "react-router";
import { setLogonUser } from "../../components/auth/AuthManagement"
import { GetDefaultImage } from "../../tools/MediaHelpers"
import { isStringNullOrEmpty, isArrayNotEmpty } from "../../tools/Helpers"

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

// import css
import "./Login.css"

function mapStateToProps(state) {
    return {
        logonUser: state.counterReducer["logonUser"],
        loading: state.counterReducer["loading"],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CallUserLogin: (data) => dispatch(GitAction.CallUserLogin(data)),
    };
}


const INITIAL_STATE = {
    // input 
    username: "",
    password: "",
    showPassword: false,
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE

        this.handleInputChange = this.handleInputChange.bind(this)
        this.OnSubmitLogin = this.OnSubmitLogin.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.logonUser)
        console.log(this.props.loading)
        if (!this.props.loading && isArrayNotEmpty(this.props.logonUser)) {
            //success

        }
        else {
            //failure
        }
    }

    handleInputChange = (e) => {
        const elementId = e.target.id
        switch (elementId) {
            case "login-username":
                this.setState({ username: e.target.value.trim() })
                break;

            case "login-password":
                this.setState({ password: e.target.value })
                break;

            default:
                break;
        }
    }

    isInputsVerified = () => {
        const { username, password } = this.state
        return (!isStringNullOrEmpty(username) && !isStringNullOrEmpty(password))
    }

    OnSubmitLogin = () => {
        console.log('yes')
        console.log(this.isInputsVerified())
        if (this.isInputsVerified()) {
            let object = {
                username: this.state.username,
                password: this.state.password,
            }
            this.props.CallUserLogin(object)
        }
    }

    render() {
        return (
            <div style={{ display: 'flex', width: '100%', height: '100vh', }}>
                <div className="container login-container m-auto">
                    <div className="logo-container w-100">
                        <img src="" alt="System Logo" width='100%' height='100%' onError={event => { event.target.src = GetDefaultImage(); event.onerror = null }} />
                    </div>
                    <div className="login-inputs-group">
                        <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                            <InputLabel htmlFor="login-username">Username</InputLabel>
                            <Input
                                id="login-username"
                                value={this.state.username}
                                onChange={(e) => this.handleInputChange(e)}
                                size="small"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                            <InputLabel htmlFor="login-password">Password</InputLabel>
                            <Input
                                id="login-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={(e) => this.handleInputChange(e)}
                                size="small"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <VpnKeyIcon />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onMouseUp={() => this.setState({ showPassword: false })}
                                            onMouseDown={() => this.setState({ showPassword: true })}
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Button
                            sx={{ m: 1 }}
                            className="w-100"
                            variant="contained"
                            onClick={() => this.OnSubmitLogin()}
                        >
                            Login
                        </Button>

                        <a href="#" title="Forget Password?" style={{ marginLeft: '0.5em', fontSize: '11pt' }}>Problem on login?</a>
                    </div>
                </div>
            </div >

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);