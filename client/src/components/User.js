import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import Cookies from 'universal-cookie';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

require("dotenv").config();


const useStyles = makeStyles(theme => ({
    row: {
      display: "flex",
      alignItems: "center",
      justifyContent :"center",
      flexDirection: "row"
    },
    col: {
        display: "flex",
        alignItems: "center",
        justifyContent :"center",
        flexDirection: "column"
      },
    box: {minWidth:200, 
        padding: 10, 
        boxShadow: "0px 0px 5px #dbdbdb", 
        maxWidth: 400, 
        display: "block",
        marginLeft: "auto", 
        marginRight: "auto" 
    },
    spacing:{
        padding: 10,
        margin: 20
    },
    text:{
        marginLeft: 10,
        color: "#6e6e6e"
    }
  }));

function User(props) {
    const classes = useStyles();


    const cookies = new Cookies();
    const token = cookies.get('token')

    if (token === undefined) {
        window.location = "/";
    }

    const logout = () => {
        cookies.remove("token")
        window.location = "/";
    }

    const [songs, setSongs] = useState([])
    const [emptySongs, setEmptySongs] = useState(true)

    const [songList, setSongList] = useState()

    useEffect(() => {
        axios.get( "/api/user/getSongs",
            { headers: { authorization: "Bearer " + token } })
            .then((response) => {
                if(response.data.length > 0) {
                    setSongs( response.data)
                    setEmptySongs(false)
                }
            }, (error) => {
                console.log(error);
            });
    }, [])

    
    useEffect(() =>{
        console.log("Lista...")
        setSongList(songs.map((item) => {
            return (
                <ListItem button key={item._id} onClick={()=>{
                    window.location = "/tool/"+item._id
                }}>
                    <ListItemIcon>
                        <MusicNoteIcon />
                    </ListItemIcon>
                    <ListItemText  primary={item.title} />
                </ListItem>
            )
        }))
    },[songs])



    const addNewSong = () => {
        window.location = "/tool";

    }

    return (
        <div className={classes.col}>

            <div style={{ margin: 20 }}>
                <div className={classes.box} >
                    <p style={{ margin: 0 }}><b>My Songs:</b></p>
                    {emptySongs ?
                        <div className={[classes.row, classes.spacing].join(" ")}>
                            <AddCircleOutlineIcon color="action" />
                            <div className={classes.text}>Add new songs...</div>
                        </div>
                    :
                    <List component="nav" aria-label="main mailbox folders">
                        {songList}
                    </List>
                    }
                    <Button variant="contained" color="primary" onClick={addNewSong} style={{ width: '100%' }}>
                        Add new song
                    </Button>
                </div>
            </div>


            <Button variant="outlined" onClick={logout}>
                Logout...
        </Button>
        </div>
    );
}

export default User;
