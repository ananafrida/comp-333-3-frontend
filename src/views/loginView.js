import React from "react"
import { useState , useEffect } from "react"
import { TextField, FormControl, Button } from "@mui/material";
import axios from "axios";
import styles from './loginView.module.css';
import { useNavigate, Link } from "react-router-dom";
export default function LoginView () {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [user, setUser] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = loggedInUser;
          setUser(foundUser);
          navigate("/");
        }
      }, []);

    function loginUser (event) {
        event.preventDefault();

        axios
            .post("http://localhost:80/index.php/user/login",{
                username: username,
                password: password,
            }, {withCredentials: true})
            .then((response) => {

            if (response.data.success) {
                
                setUser(response.data.username);
                localStorage.setItem('user', response.data.username);

                const cookies = response.headers['set-cookie'];
                localStorage.setItem('cookies', JSON.stringify(cookies));

                navigate("/");
            } else {
                console.error(`Login failed. ${response.data.username}`);
                // Handle registration failure, display an error message, etc.
            }

            })
            .catch((error) => {
            console.error("Error Logging in user:", error);
            // Handle registration error, display an error message, etc.
            });
        return;
    }    

    return (
        <div className={styles.container}> 
            <h1 className={styles.heading}>Login Form</h1>
            <form autoComplete="off" onSubmit={loginUser}>
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
                 <Button variant="outlined" color="secondary" type="submit">Login</Button>
             
        </form>
        <Button variant="outlined" color="secondary" onClick={() => navigate("/register")}>Register</Button>
        </div>
    )
}