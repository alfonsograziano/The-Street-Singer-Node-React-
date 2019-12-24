import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    display:"flex", 
    flexDirection:"column",
    padding: 20,
    margin: 0,
    alignItems:"center",
    justifyContent: "center"
  },
  col:{
    display:"flex", 
    flexDirection:"column",
    alignItems:"center",
    justifyContent: "center",
    padding:20
  }
});


function Home() {
  const classes = useStyles();

  return (
    <div >
        <h1 className={classes.root}>Benvenuto! </h1>
        <br/>
        <div className={classes.col} >
          <h3>Cosa puoi fare con questa piattaforma? </h3>

          <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Salvare i testi delle tue canzoni preferite" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <ImportExportIcon />
            </ListItemIcon>
            <ListItemText primary="Cambiare la tonalità degli accordi" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <GTranslateIcon />
            </ListItemIcon>
            <ListItemText primary="Cambiare la notazione degli accordi (ita/eng)" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <PictureAsPdfIcon />
            </ListItemIcon>
            <ListItemText primary="Scarica la canzone in PDF" />
          </ListItem>
        </List>

        <Button variant="contained" color="primary" 
        style={{padding: 10, width:300, marginTop:20}}
        onClick={()=>{window.location ="/singup"}}>crea un account</Button>
      </div>
     
    </div>
  );
}

export default Home;
