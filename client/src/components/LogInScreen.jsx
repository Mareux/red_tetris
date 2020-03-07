import React, { useState } from "react";
import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { getClientData } from "../actions/game";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        "& > *": {
            display: "flex",
            flexFlow: "column",
            margin: theme.spacing(1)
        }
    }
}));

const LogIn = (props) => {

    const dispatch = useDispatch();

    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");


    const handleLogIn = () => {
        location.hash = room + '[' + username + ']';

        props.socket.emit("Hash", location.hash);
        getClientData(dispatch)({username, room});

    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "100px" }}>
            <div className={classes.root}>
                <TextField id="username" label="Username" value={username} onChange={(event) => setUsername(event.target.value)}/>
                <TextField id="room" label="Room" value={room} onChange={(event) => setRoom(event.target.value)}/>
                <Button variant="contained" color="primary" style={{ float: "right" }} onClick={handleLogIn}>
                    Log in
                </Button>
            </div>
        </Container>
    );
};

export default LogIn;
