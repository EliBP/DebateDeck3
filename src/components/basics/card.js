import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import projectTheme from "../projectTheme";

const theme = projectTheme;

const useStyles = makeStyles({
  card: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: 24,
    background: theme.palette.background.paper
  }
});

export default function EvidenceCard() {
  const classes = useStyles();
  return <Card variant="outlined" className={classes.card}></Card>;
}
