import React from "react";
import { TextField, FormControl, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./music_component.module.css"

export default function MusicComponent({ id, username, artist, song, rating, signedinUser }) {
    const navigate = useNavigate();

    const [isUpdateFormVisible, setUpdateFormVisibility] = useState(false);
    const [isDeleteFormVisible, setDeleteFormVisibility] = useState(false);
    const [updatedSong, setUpdatedSong] = useState(song);
    const [updatedArtist, setUpdatedArtist] = useState(artist);
    const [updatedRating, setUpdatedRating] = useState(rating);

    const handleUpdateClick = () => {
        setDeleteFormVisibility(false);
        setUpdateFormVisibility(true);
    };

    const handleDeleteClick = () => {
        setUpdateFormVisibility(false);
        setDeleteFormVisibility(true);
    }

    const handleUpdateSubmit = (event) => {
        event.preventDefault();
        // Handle update logic (e.g., send data to the server)
        // After successful update, you can close the form
        setUpdateFormVisibility(false);
    };

    const handleUpdateCancel = (event) => {
        event.preventDefault();
        setUpdateFormVisibility(false);
    }

    const handleDeleteSubmit = (event) => {
        event.preventDefault();
        // Handle update logic (e.g., send data to the server)
        // After successful update, you can close the form
        setDeleteFormVisibility(false);
    }

    const handleDeleteCancel = (event) => {
        event.preventDefault();
        setDeleteFormVisibility(false);
    }


    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderBottom: "1px solid #ccc" }}>
            <div style={{ flex: 1, marginRight: "10px" }}>
                ({username})- <strong>{artist} - {song}</strong>
            </div>
            <div style={{ flex: 1 }}>
                Rating: {rating}
            </div>
            <Button onClick={() => navigate("/read")}>Read</Button>
            {signedinUser === username && (
                <>
                    <Button onClick={handleUpdateClick}>Update</Button>
                    {isUpdateFormVisible && (
                        <div class={styles.form}>
                        <form onSubmit={handleUpdateSubmit}>
                            <TextField
                                label="Song"
                                variant="outlined"
                                value={updatedSong}
                                onChange={(e) => setUpdatedSong(e.target.value)}
                            />
                            <TextField
                                label="Artist"
                                variant="outlined"
                                value={updatedArtist}
                                onChange={(e) => setUpdatedArtist(e.target.value)}
                            />
                            <TextField
                                label="Rating"
                                variant="outlined"
                                value={updatedRating}
                                onChange={(e) => setUpdatedRating(e.target.value)}
                            />
                            <Button type="submit">Save</Button>
                        </form>
                        <Button type="cancel" onClick={handleUpdateCancel}>Cancel Update</Button>
                        </div>
                    )}
                    <Button onClick={handleDeleteClick}>Delete</Button>
                    {isDeleteFormVisible && (
                        <div class={styles.form}>
                        <Button type="submit" onClick={handleDeleteSubmit}>Confirm Delete</Button>
                        <Button type="cancel" onClick={handleDeleteCancel}>Cancel Delete</Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
