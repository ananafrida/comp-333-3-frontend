// Import necessary React, MUI components, and external libraries
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

// StarRating component to display song ratings
function StarRating({ rating }) {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const halfStars = rating - fullStars >= 0.5 ? 1 : 0;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={i} role="img" aria-label="star">
        ⭐
      </span>
    );
  }

  if (halfStars === 1) {
    stars.push(
      <span key={fullStars} role="img" aria-label="half-star">
        🌟
      </span>
    );
  }

  while (stars.length < maxStars) {
    stars.push(
      <span key={stars.length} role="img" aria-label="empty-star">
        ☆
      </span>
    );
  }

  return <span>{stars}</span>;
}

function HomeView() {
  const navigate = useNavigate();
  const [songList, setSongList] = useState([]); // State to store the list of songs
  const [loggedInUser, setLoggedInUser] = useState(null); // State to store the logged-in user
  const [openCreateDialog, setOpenCreateDialog] = useState(false); // State to control the visibility of the create dialog
  const [newSong, setNewSong] = useState({ // State to store data of the new song
    artist: "",
    song: "",
    rating: "",
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false); // State to control the visibility of the update form
  const [artistFilter, setArtistFilter] = useState(""); // State for artist filtering

  // Effect to fetch user data and song list
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
    // Send a request to create the new song
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

  // Filter songs based on artist name
  const filteredSongs = songList.filter((song) =>
    artistFilter
      ? song.artist.toLowerCase().includes(artistFilter.toLowerCase())
      : true
  );

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

      {/* Textfield for artist search */}
      <TextField
        label="Search by Artist"
        value={artistFilter}
        onChange={(e) => setArtistFilter(e.target.value)}
        fullWidth
        style={{ margin: "20px 0" }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateClick}
      >
        Create Song
      </Button>

      <List>
        {filteredSongs.map((song) => (
          <ListItem key={song.id}>
            <ListItemText
              primary={song.song}
              secondary={`Artist: ${song.artist}`}
            />
            <StarRating rating={song.rating} />
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
            onChange={(e) => setNewSong({ ...newSong, song: e.target.value})}
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