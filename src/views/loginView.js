import React from "react";
import Cookies from 'js-cookie';
import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import styles from './loginView.module.css';
import { useNavigate } from "react-router-dom";

export default function LoginView() {
    // State variables to store user input, error flags, and user data
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [user, setUser] = useState();

    // Initialize React Router's navigate function
    const navigate = useNavigate();

    // Check if a user is already logged in (persisted login)
    useEffect(() => {
        const loggedInUser = Cookies.get('name');
        if (loggedInUser) {
            // User found, set the user data
            const foundUser = loggedInUser;
            setUser(foundUser);
        }
    }, []);

    // Redirect to the home page if a user is already logged in
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    // Function to handle user login
    function loginUser(event) {
        event.preventDefault();

        // Send a POST request to the server for login
        axios
            .post("http://localhost:80/index.php/user/login", {
                username: username,
                password: password,
            })
            .then((response) => {
                if (response.data.success) {
                    // Successful login, set the user and store login data
                    console.log(response.data);
                    setUser(response.data.username);
                    Cookies.set('name', response.data.username, { expires: 1 });
                    navigate("/");
                } else {
                    console.error(`Login failed. ${response.data.username}`);
                    // Handle login failure, display an error message, etc.
                }
            })
            .catch((error) => {
                console.error("Error Logging in user:", error);
                // Handle login error, display an error message, etc.
            });
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Login Form</h1>
            <form autoComplete="off" onSubmit={loginUser}>
                <TextField
                    label="Username"
                    onChange={e => setUsername(e.target.value)}
                    required
                    variant="outlined"
                    color="primary"
                    type="text"
                    sx={{ mb: 3 }}
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
                    sx={{ mb: 3 }}
                />
                <Button variant="outlined" color="secondary" type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
}
