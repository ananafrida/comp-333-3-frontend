import React from "react"
import { useState , useEffect } from "react"
import { TextField, FormControl, Button } from "@mui/material";
import axios from "axios";
import styles from './registerView.module.css';
import { useNavigate } from "react-router-dom";

export default function RegisterView () {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [user, setUser] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = loggedInUser;
          setUser(foundUser);
        }
      }, []);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate])

    function registerUser (event) {
        event.preventDefault();

        axios
            .post("http://localhost:80/index.php/user/register",{
                username: username,
                password: password,
                confirm_password: confirmPassword
            })
            .then((response) => {

            if (response.data.success) {

                setUser(response.data.username);
                localStorage.setItem('user', response.data.username);
                navigate("/");
                // Handle successful registration, such as redirecting to another page
            } else {
                console.error(`Registration failed. ${response.data.username}`);
                // Handle registration failure, display an error message, etc.
            }

            })
            .catch((error) => {
            console.error("Error registering user:", error);
            // Handle registration error, display an error message, etc.
            });
        return;
    }    

    return (
        <div className={styles.container}> 
            <h1 className={styles.heading}>Register Form</h1>
            <form autoComplete="off" onSubmit={registerUser}>
                {/* cross checking the username */}
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
                 />
                 <TextField 
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value={password}
                    error={passwordError}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 {/* input password second time to be confirmed about it */}
                <TextField 
                    label="Confirm Password"
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value={confirmPassword}
                    error={confirmPasswordError}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 {/* specific button with styling for logging in  */}
                 <Button variant="outlined" color="secondary" type="submit">Login</Button>
             
        </form>
        </div>
    )
}

