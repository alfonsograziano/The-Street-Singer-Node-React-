import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

        <ExpansionPanel style={{marginTop:50, maxWidth: 500, marginBottom: 50}}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>How it works?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Questo tool utile per i chitarristi principianti consente di tenere in cloud tutte le proprie canzoni preferite.
              Una volta aggiunta la canzone si può cambiare la tonalità degli accordi.
              Gli accordi vengono trovati automaticamente da un algoritmo che riconosce quali righe di testo contengono note e quali testo
              Attenzione quindi ad aggiungere solo canzoni che hanno le note su righe separate rispetto al testo, diversamente potrebbe non funzionare
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        
      </div>
     
    </div>
  );
}

export default Home;
