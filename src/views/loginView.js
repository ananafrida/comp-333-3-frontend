import React from "react"
import Cookies from 'js-cookie';
import { useState , useEffect } from "react"
import { TextField, FormControl, Button } from "@mui/material";
import axios from "axios";
import styles from './loginView.module.css';
import { useNavigate } from "react-router-dom";
export default function LoginView () {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [user, setUser] = useState();


    const navigate = useNavigate();

    useEffect(() => {
        // const loggedInUser = localStorage.getItem("user");
        const loggedInUser = Cookies.get('name');
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
            .post("http://localhost:80/index.php/user/login",{
                username: username,
                password: password,
            })
            .then((response) => {

            if (response.data.success) {

                console.log(response.data)
                setUser(response.data.username);
                // localStorage.setItem('user', response.data.username);
                Cookies.set('name', response.data.username, { expires: 1 })
                // Cookies.set('name', 'value', { expires: 365 })
                // Cookies.get('name') // => 'value'
                // Cookies.remove('name')

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
            <h1 className={styles.heading}>Register Form</h1>
            <form autoComplete="off" onSubmit={registerUser}>
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
        </div>
    )
}