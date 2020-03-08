import React, { useState } from "react";
import "./Scoreboard.css";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import styled from "@material-ui/core/styles/styled";
import { NoSsr } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        "& > *": {
            display: "flex",
            flexFlow: "column",
            margin: theme.spacing(1),
            width: "135px",
        }
    }
}));

const StyledTextField = styled(TextField)`
  .MuiInputBase-input{
  color: black;
  }
`;


function Scoreboard() {
    const score = useSelector(store => store.score);
    const level = useSelector(store => store.level);
    const lines = useSelector(store => store.clearedLines);

    const classes = useStyles();


    return (
        <div className="board">
            <div className={classes.root}>
                <NoSsr>
                    <StyledTextField label="Score" value={score}/>
                </NoSsr>
                <TextField label="Level" value={level}/>
                <TextField label="Lines" value={lines}/>
            </div>
        </div>
    );
}

export default Scoreboard;
