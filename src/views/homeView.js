import React from "react"
import { useState , useEffect } from "react"
import { TextField, FormControl, Button } from "@mui/material";
import axios from "axios";
import styles from './homeView.module.css';
import { useNavigate, Link } from "react-router-dom";
import MusicComponent from "../componenets/music_component";
import LoginComponent from "../componenets/login_component";
import RegisterComponent from "../componenets/register_componenet";

export default function HomeView () {

    const [user, setUser] = useState();
    const [musicData, setMusicData] = useState([]);

    const [showLogin, updateShowLogin] = useState(false);
    const [showRegister, updateShowRegister] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = loggedInUser;
          setUser(foundUser);
          getMusic();
        }
        // else {
        //     navigate("/login");
        // }
      }, [showLogin, showRegister]);

    function logout () {
        setUser();
        axios.post("http://localhost:80/index.php/user/logout", {}, {withCredentials: true}).then(
            () => {
                localStorage.clear();
                // navigate("/login");
                getMusic();
            }
        )

    }

    function updateMusicData() {
        getMusic();
    }
    

    function getMusic() {
        axios
            .get("http://localhost:80/index.php/music/list")
            .then((response) => {
                    console.log(response);
                    response = response.data;

                    setMusicData(response);

            })
            .catch((error) => {
            console.error("Error Displaying music:", error);
            // Handle registration error, display an error message, etc.
            });
        return;
    }

    return (
        <div>
            <h1>Home View</h1>
            {!user && <div><Button onClick={() => {
                updateShowLogin(!showLogin); 
                if (showRegister) {
                    updateShowRegister(!showRegister);
                }
            }}>Log In</Button>
            <Button onClick={() => {
                updateShowRegister(!showRegister);
                if (showLogin) {
                    updateShowLogin (!showLogin);
                }
                }}>Register</Button></ div>}
            

            {showLogin && (
                <LoginComponent
                    updateMusicData={updateMusicData}
                    showLogin={showLogin}
                    updateShowLogin={updateShowLogin}
                />
                )}
            {showRegister && (
                <RegisterComponent
                    updateMusicData={updateMusicData}
                    showRegister={showRegister}
                    updateShowRegister={updateShowRegister}
                />
                )}
            <Button>Create</Button>
            <div>
            {musicData.map((music) => (
                    <MusicComponent
                        key={music.id}
                        id={music.id}
                        username={music.username}
                        artist={music.artist}
                        song={music.song}
                        rating={music.rating}
                        signedinUser={user}
                        updateMusicData={updateMusicData}
                    />
                ))}
            </div>
            {user && <Button onClick={logout}>Logout</Button>}
        </div>
    )
}