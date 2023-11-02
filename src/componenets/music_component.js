import React from "react";
import { TextField, FormControl, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MusicComponent({ id, username, artist, song, rating, signedinUser }) {
    const navigate = useNavigate();
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
                    <Button onClick={() => navigate("/update")}>Update</Button>
                    <Button onClick={() => navigate("/delete")}>Delete</Button>
                </>
            )}
        </div>
    );
}
