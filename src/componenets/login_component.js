import React from "react"
import Cookies from 'js-cookie';
import { useState , useEffect } from "react"
import { TextField, FormControl, Button, Typography } from "@mui/material";
import axios from "axios";
import styles from './login_component.module.css';
import { useNavigate, Link, BrowserRouter } from "react-router-dom";

export default function LoginComponent ({updateMusicData, showLogin, updateShowLogin}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [user, setUser] = useState();
    const [loginError, setLoginError] = useState(null);


    function loginUser (event) {
        event.preventDefault();

        // Reset error states
        setUsernameError(false);
        setPasswordError(false);
        setLoginError(null);

        axios.post("http://localhost:80/index.php/user/login", {
          username: username,
          password: password,
        }, { withCredentials: true })
          .then((response) => {
            if (response.data.success) {
              setUser(response.data.username);
              Cookies.set('name', response.data.username, { expires: 1 });
              const cookies = response.headers['set-cookie'];
              localStorage.setItem('cookies', JSON.stringify(cookies));
              updateShowLogin(false);
              updateMusicData();
            } else {
              console.error(`Login failed.`);
              setLoginError(`Login failed.`);
            }
          })
          .catch((error) => {
            console.error("Error Logging in user:", error);
            setLoginError("Error logging in. Please try again.");
          });
        return;
    }    

    return (
        <div className={styles.container}>
          <form
            className={styles.form}
            autoComplete="off"
            onSubmit={loginUser}
            data-testid="login-form"
          >
            <TextField
              label="username"
              onChange={(e) => setUsername(e.target.value)}
              required
              variant="outlined"
              color="primary"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={username}
              error={usernameError}
              data-testid="username-input"
            />
            <TextField
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="password"
              value={password}
              error={passwordError}
              fullWidth
              sx={{ mb: 3 }}
              data-testid="password-input"
            />
            <Button variant="outlined" color="secondary" type="submit" data-testid="login-button">
              Login
            </Button>
            {loginError && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {loginError}
          </Typography>
        )}
          </form>
        </div>
      );
}