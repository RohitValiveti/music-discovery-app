import React, { useState, useEffect } from "react";
import { User } from "../types/user";
import { Link } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import {
  Button,
  List,
  ListItem,
  ThemeProvider,
  Typography,
} from "@mui/material";
import theme from "../types/Theme";
import LastPage from "../components/LastPage";

const Homepage = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/user/");
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {userInfo ? (
        <div>
          <LastPage endpoint={"/"} pageName="sign in" />
          <div style={{ color: "#535353" }} className="homepage">
            <div className="centered-container">
              <div className="text-container">
                <Typography variant="h3" className="welcome-text">
                  Welcome {userInfo.name}!
                </Typography>
                <Typography variant="h5" className="about-yourself-text">
                  Here's a little about yourself if you forgot:
                </Typography>
                <Typography variant="h6" className="follower-playlist-text">
                  You have {userInfo.followers} followers and{" "}
                  {userInfo.public_playlists} public playlist(s).
                </Typography>
                <Typography variant="h6" className="top-tracks-text">
                  And these were your top tracks over the last 4 weeks:
                </Typography>
              </div>
              <img
                src={userInfo.user_img_url}
                alt={userInfo.name}
                className="user-image"
              />
            </div>
            <List className="homepage-list">
              {userInfo.top_tracks.map((track, idx) => (
                <ListItem key={idx}>{track.name}</ListItem>
              ))}
            </List>
            <div>
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary" className="elt">
                  <Link
                    to={"/chooseplaylist"}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Disover Personalized Music
                  </Link>
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </div>
      ) : (
        <Typography
          variant="h6"
          className="loader"
          style={{ color: "#535353" }}
        >
          <SyncLoader color="#1db954" />
          Loading Profile Content
        </Typography>
      )}
    </div>
  );
};

export default Homepage;
