import React from "react"
import { useState , useEffect } from "react"
import { TextField, FormControl, Button } from "@mui/material";
import axios from "axios";
import styles from './login_component.module.css';
import { useNavigate, Link } from "react-router-dom";

export default function RegisterComponent ({updateMusicData, showRegister, updateShowRegister}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [user, setUser] = useState();


    function loginUser (event) {
        event.preventDefault();

        axios
            .post("http://localhost:80/index.php/user/register",{
                username: username,
                password: password,
                confirm_password: confirmPassword
            }, {withCredentials: true})
            .then((response) => {

            if (response.data.success) {
                
                setUser(response.data.username);
                localStorage.setItem('user', response.data.username);

                const cookies = response.headers['set-cookie'];
                localStorage.setItem('cookies', JSON.stringify(cookies));
                updateShowRegister(false);
                updateMusicData();
            } else {
                console.error(`Register failed. ${response.data.username}`);
                // Handle registration failure, display an error message, etc.
            }

            })
            .catch((error) => {
            console.error("Error Registering in user:", error);
            // Handle registration error, display an error message, etc.
            });
        return;
    }    

    return (
        <div className={styles.container}> 
            <form 
                class={styles.form} 
                autoComplete="off" 
                onSubmit={loginUser}
                data-testid="register-form"
            >
                <TextField 
                    label="username"
                    onChange={e => setUsername(e.target.value)}
                    required
                    variant="outlined"
                    color="primary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={username}
                    error={usernameError}
                    data-testid="username-input"
                 />
                 <TextField 
                    label="Raw-Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="raw-password"
                    value={password}
                    error={passwordError}
                    fullWidth
                    sx={{mb: 3}}
                    data-testid="raw-password-input"
                 />
                <TextField 
                    label="Confirm-Password"
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="confirmpassword"
                    value={confirmPassword}
                    error={passwordError}
                    fullWidth
                    sx={{mb: 3}}
                    data-testid="confirm-password-input"
                 />
                 <Button variant="outlined" color="secondary" type="submit" data-testid="register-button">
                    Register
                 </Button>
             
        </form>
        </div>
    )
}