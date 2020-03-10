import { useDispatch, useSelector } from "react-redux";
import { gameState, getClientData } from "../actions/game";
import React, { useEffect, useState } from "react";
import "./Menu.css";
import Button from "@material-ui/core/Button";
import ListOfPlayers from "./ListOfPlayers";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Menu = props => {
    const state = useSelector(store => store.gameState);
    const clientData = useSelector(store => store.clientData);
    const host = useSelector(store => store.host);
    const players = useSelector(store => store.players);
    const classicMode = useSelector(store => store.classicMode);

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleStart = () => {
        props.socket.emit("startGame", clientData);
    };

    const handleReady = () => {
        props.socket.emit("readyCheck", clientData);
    };

    const handleLeave = () => {
        props.socket.emit("leaveGame", clientData);
        location.hash = "";
        getClientData(dispatch)(null);
    };

    useEffect(() => {
        if (
            gameState.GAME_FINISHED === state ||
            state === gameState.STARTING_SCREEN
        )
            handleOpen();
    }, [state]);

    useEffect(() => {
        if (state === gameState.GAME_STARTED) handleClose();
    }, [state]);

    const menuButtons = () => {
        const user = players.find(
            user => user.username === clientData.username
        );

        return (
            <DialogActions>
                {!host ? (
                    <>
                        <Button color="secondary" onClick={handleReady}>
                            {user && !user.ready ? "READY" : "UNREADY"}
                        </Button>
                        <Button color="secondary" onClick={handleLeave}>
                            {"LEAVE"}
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="primary" onClick={handleStart}>
                            {state === gameState.STARTING_SCREEN
                                ? "START"
                                : state === gameState.GAME_FINISHED
                                ? "RESTART"
                                : "RETURN"}
                        </Button>
                        <Button color="secondary" onClick={handleReady}>
                            {user && !user.ready ? "READY" : "UNREADY"}
                        </Button>
                        <Button color="secondary" onClick={handleLeave}>
                            {"LEAVE"}
                        </Button>
                    </>
                )}
            </DialogActions>
        );
    };

    return (
        players && (
            <Dialog
                maxWidth="xs"
                fullWidth
                open={open}
                disableBackdropClick={true}
                onClose={handleClose}
            >
                <Toolbar style={{ paddingLeft: 0 }}>
                    <DialogTitle>
                        {gameState.STARTING_SCREEN === state
                            ? "Starting screen"
                            : gameState.GAME_FINISHED === state
                            ? "Game over!"
                            : "Pause"}
                    </DialogTitle>
                    <div style={{ flexGrow: 1 }} />
                    <Typography variant="body2">
                        Room: {clientData.room}
                    </Typography>
                </Toolbar>

                <DialogContent>
                    <ListOfPlayers />
                </DialogContent>
                <FormControlLabel
                    disabled={!host}
                    label="Classic Mode"
                    control={<Switch />}
                    checked={classicMode}
                    style={{ marginLeft: "20px" }}
                    onClick={() => {
                        props.socket.emit("toggleGameMode", clientData);
                    }}
                />
                {menuButtons()}
            </Dialog>
        )
    );
};

export default Menu;
