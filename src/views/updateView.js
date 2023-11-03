import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";


function UpdateView({ onClose, songId }) {
  const [updateData, setUpdateData] = useState({
    artist: "",
    song: "",
    rating: "",
  });


  const navigate = useNavigate();


  const {id} = useParams();
  // Fetch song details and update updateData when the component mounts
  useEffect(() => {
    const songId = id;
    fetch(`http://localhost:80/index.php/music/read/${songId}`)
      .then((response) => response.json())
      .then((data) => {
        setUpdateData(data);
      })
      .catch((error) => {
        console.log("Error fetching song details:", error);
      });
  });
  useEffect(() => {
    const name = Cookies.get('name')
    if(!name){
      navigate('/login')
    }
  },[]);




  const handleUpdate = () => {
    const songId = id;
    // Send a request to update the song with the provided data
    const payload = {...updateData, "id": id}
    console.log(payload);
    fetch(`http://localhost:80/index.php/music/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        console.log("response")
        return response.text();
      })
      .then((data) => {
        console.log("success",data);
      })
      .catch((error) => {
        console.error("Error updating song:", error?.message);
      });


    // After updating, you can close the dialog
    onClose();
  };


  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Update Song</DialogTitle>
      <DialogContent>
        <TextField
          label="Artist"
          value={updateData.artist}
          onChange={(e) => setUpdateData({ ...updateData, artist: e.target.value })}
          fullWidth
        />
        <TextField
          label="Song"
          value={updateData.song}
          onChange={(e) => setUpdateData({ ...updateData, song: e.target.value })}
          fullWidth
        />
        <TextField
          label="Rating"
          value={updateData.rating}
          onChange={(e) => setUpdateData({ ...updateData, rating: e.target.value })}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{
          navigate("/")
        }} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}


export default UpdateView;
