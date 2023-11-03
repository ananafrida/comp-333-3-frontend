import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';

import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import UpdateView from "./updateView"; // Import the UpdateView component

function HomeView() {
  const navigate = useNavigate();
  const [songList, setSongList] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newSong, setNewSong] = useState({
    artist: "",
    song: "",
    rating: "",
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    const user = Cookies.get('name');
    if (user) {
      setLoggedInUser(user);
    } else {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:80/index.php/music/list?username=${user}`)
      .then((response) => response.json())
      .then((data) => {
        setSongList(data);
      })
      .catch((error) => {
        console.error("Error fetching song list:", error);
      });

  }, [navigate]);

  const handleCreateClick = () => {
    setOpenCreateDialog(true);
  };

  const handleCreateClose = () => {
    setOpenCreateDialog(false);
  };

  const handleCreateSong = () => {
    fetch("http://localhost:80/index.php/music/create", {
      method: "POST",
      body: JSON.stringify(newSong),
    })
      .then((response) => response.json())
      .then(() => {
        fetch("http://localhost:80/index.php/music/list")
          .then((response) => response.json())
          .then((data) => {
            setSongList(data);
          })
          .catch((error) => {
            console.error("Error fetching song list:", error);
          });

        setOpenCreateDialog(false);
      })
      .catch((error) => {
        console.error("Error creating song:", error);
      });
  };

  return (
    <div>
      {loggedInUser && (
        <>
          <Typography variant="h6">
            Welcome, {loggedInUser}!
          </Typography>
          <button onClick={() => {
            Cookies.remove('name');
            navigate("/login");
          }}>Logout</button>
        </>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateClick}
      >
        Create Song
      </Button>

      <List>
        {songList.map((song) => (
          <ListItem key={song.id}>
            <ListItemText
              primary={song.song}
              secondary={`Artist: ${song.artist}, Rating: ${song.rating}`}
            />
            {loggedInUser === song.username && (
              <Link to={`/update/${song.id}`}>
                <Button variant="contained" color="primary">
                  Update
                </Button>
              </Link>
            )}
          </ListItem>
        ))}
      </List>

      {showUpdateForm && <UpdateView onClose={() => setShowUpdateForm(false)} />}

      <Dialog open={openCreateDialog} onClose={handleCreateClose}>
        <DialogTitle>Create New Song</DialogTitle>
        <DialogContent>
          <TextField
            label="Artist"
            value={newSong.artist}
            onChange={(e) =>
              setNewSong({ ...newSong, artist: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Song"
            value={newSong.song}
            onChange={(e) => setNewSong({ ...newSong, song: e.target.value })}
            fullWidth
          />
          <TextField
            label="Rating"
            value={newSong.rating}
            onChange={(e) =>
              setNewSong({ ...newSong, rating: e.target.value })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateSong} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default HomeView;
