import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function CreateView() {
  // State to store the new song data
  const [newSong, setNewSong] = useState({
    artist: "",
    song: "",
    rating: "",
  });
  
  // State to control the visibility of the create dialog
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  // Handler to open the create dialog
  const handleCreateClick = () => {
    setOpenCreateDialog(true);
  };

  // Handler to close the create dialog
  const handleCreateClose = () => {
    setOpenCreateDialog(false);
  };

  // Handler to create a new song
  const handleCreateSong = () => {
    // Send a request to create the new song
    fetch("http://localhost:80/index.php/music/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSong),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Handle success, e.g., show a success message or navigate back to the HomeView
          // You can use React Router to navigate to the home page.
          // Example: history.push("/");
        } else {
          // Handle failure, display an error message
          console.error("Error creating song:", data.error);
        }
      })
      .catch((error) => {
        // Handle other errors, e.g., network issues
        console.error("Error creating song:", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" style={{ margin: "20px 0" }}>
        Create a New Song
      </Typography>

      <TextField
        label="Artist"
        value={newSong.artist}
        onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
        fullWidth
        style={{ margin: "10px 0" }}
      />

      <TextField
        label="Song"
        value={newSong.song}
        onChange={(e) => setNewSong({ ...newSong, song: e.target.value })}
        fullWidth
        style={{ margin: "10px 0" }}
      />

      <TextField
        label="Rating"
        value={newSong.rating}
        onChange={(e) => setNewSong({ ...newSong, rating: e.target.value })}
        fullWidth
        style={{ margin: "10px 0" }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateClick}
        style={{ margin: "20px 0" }}
      >
        Create Song
      </Button>

      <Dialog open={openCreateDialog} onClose={handleCreateClose}>
        <DialogTitle>Create New Song</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to create this song with the following details?
          </Typography>
          <ul>
            <li>Artist: {newSong.artist}</li>
            <li>Song: {newSong.song}</li>
            <li>Rating: {newSong.rating}</li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateSong} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CreateView;
