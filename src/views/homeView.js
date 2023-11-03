import React from "react"
import { useState , useEffect } from "react"
import { TextField, FormControl, Button } from "@mui/material";
import axios from "axios";
import styles from './homeView.module.css';
import { useNavigate, Link } from "react-router-dom";
import MusicComponent from "../componenets/music_component";

export default function HomeView () {

    const [user, setUser] = useState();
    const [musicData, setMusicData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = loggedInUser;
          setUser(foundUser);
          getMusic();
        }
        else {
            navigate("/login");
        }
      }, []);

    function logout () {
        setUser();
        localStorage.clear();
        navigate("/login");
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
            <Button onClick={() => navigate("/create")}>Create</Button>
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
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}