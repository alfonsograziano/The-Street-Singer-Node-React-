import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
import Cookies from 'universal-cookie';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextareaAutosize from 'react-textarea-autosize';

import {tuneConverter , notationConverter}from '../tuneConverter';


require("dotenv").config();

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 10,
    margin: 20,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  close: {
    padding: theme.spacing(0.5),
  },
  box: {
    margin: 10,
    boxShadow: "0px 0px 5px #dbdbdb"
  },
  textArea: {
    width: '98%',
    display: "inline-block",
    resize: "vertical"
  },
  row: {
    margin: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
}));



function Tool(props) {
  const classes = useStyles();

  const cookies = new Cookies();
  const token = cookies.get('token')

  const [songId, setSongId] = useState("")
  const [title, setTitle] = useState("")
  const [songText, setSongText] = useState("")
  const [notation, setNotation] = useState("ita")


  const [error, setError] = React.useState(false);
  const [errorMSG, setErrorMSG] = React.useState("");


  useEffect(() => {
    if (props.match.params.id !== undefined) {
      setSongId(props.match.params.id)
    }
  }, [])

  useEffect(() => {
    if (songId !== "") {
      axios.get( "/api/song/" + songId,
        { headers: { authorization: "Bearer " + token } })
        .then((response) => {
          setTitle(response.data.title)
          setSongText(response.data.song)

        }, (error) => {

        });
    }
  }, [songId])


  const deleteSong = () => {
    axios.delete("/api/song/" + songId,
      { headers: { authorization: "Bearer " + token } })
      .then((response) => {
        window.location = "/user"

      }, (error) => {
        setErrorMSG("Impossibile eliminare la canzone")
        setError(true)
      });
  }

  const saveSong = () => {
    if (title === "" || songText === "") {
      setErrorMSG("Aggiungi il titolo e il testo prima di salvare")
      setError(true)
    } else {

      let url = ""
      if (songId === "") {
        url =  "/api/song/add"
      } else {
        url = "/api/song/update/" + songId
      }
      axios.post(url,
        { title: title, song: songText }, { headers: { authorization: "Bearer " + token } })
        .then((response) => {
          setErrorMSG("Salvataggio effettuato...")
          setError(true)
          console.log(response)
        }, (error) => {
          console.log(error);
          setErrorMSG("Errore nel salvataggio...")
          setError(true)
        });

    }
  }


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false)
  };

  return (
    <div>
      <Grid container spacing={1} style={{ marginBottom: 30 }}>
        <Grid item xs={12} sm={6}>

          <Paper className={classes.paper}>
            <TextField label="Song name" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '80%', marginBottom: 10 }} />
            <div className={classes.box}>
              <TextareaAutosize
                useCacheForDOMMeasurements
                placeholder="Add song here..." className={classes.textArea}
                value={songText} onChange={(e) => setSongText(e.target.value)}

              />
            </div>

          </Paper>
        </ Grid >
        <Grid item xs={12} sm={6}>

          <Paper className={classes.paper}>
            <div className={classes.row}>
              <Button
                onClick={() => setSongText(tuneConverter(songText, 11))}
                variant="outlined" color="primary">-1</Button>

              <div style={{ marginLeft: 20, marginRight: 20 }}><b>Transpose</b></div>
              <Button
                onClick={() => setSongText(tuneConverter(songText, 1))}
                variant="outlined" color="primary">+1</Button>
            </div>

            <Paper className={classes.paper}>

              <div><b>Notazione</b></div>
              <RadioGroup aria-label="Notazione" name="gender1" value={notation} onChange={(e) => {
                setNotation(e.target.value)
                setSongText(notationConverter(songText,e.target.value))
                }}>
                <FormControlLabel value="ita"
                control={<Radio />} 
                label="Italiana" 
               />
                 <FormControlLabel value="eng"
                control={<Radio />} 
                label="Americana" 
                />
              </RadioGroup>
            </Paper>
            <Container>
              <Button style={{ margin: 10 }} onClick={saveSong} variant="contained" color="primary">Salva</Button>
              <Button style={{ margin: 10 }} onClick={saveSong} variant="outlined" color="secondary" onClick={deleteSong}>Elimina</Button>
              <Button style={{ margin: 10 }} variant="outlined" color="default" onClick={deleteSong}>salva pdf</Button>
            </Container>

          </Paper>
        </ Grid >

      </Grid>


      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{errorMSG}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />

    </div>
  );
}

export default Tool;
