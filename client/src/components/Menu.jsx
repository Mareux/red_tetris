import Modal from "@material-ui/core/Modal";
import { useSelector } from "react-redux";
import { gameState } from "../actions/game";
import React, { useEffect, useState } from "react";
import "./Menu.css";
import Button from "@material-ui/core/Button";
import ListOfPlayers from "./ListOfPlayers";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Menu = props => {
    const state = useSelector(store => store.gameState);
    const clientData = useSelector(store => store.clientData);
    const host = useSelector(store => store.host);

    const [open, setOpen] = useState(true);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if (state !== gameState.STARTING_SCREEN) setOpen(false);
    };

    const handleStart = () => {
        props.socket.emit("startGame", clientData);
        setOpen(false);
    };

    const handleReady = () => {
        props.socket.emit("readyCheck", clientData);
    };

    useEffect(() => {
        if (gameState.GAME_FINISHED === state) handleOpen();
    }, [state]);

    const menuButtons = () => {
        return (
            <DialogActions>
                {!host ? (
                    <Button color="secondary" onClick={handleReady}>
                        READY
                    </Button>
                ) : (
                    <>
                        <Button color="primary" onClick={handleStart}>
                            START
                        </Button>
                        <Button color="secondary" onClick={handleReady}>
                            READY
                        </Button>
                    </>
                )}
            </DialogActions>
        );
    };

    return (
        <Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose}>
            <Toolbar style={{ paddingLeft: 0 }}>
                <DialogTitle>
                    {gameState.STARTING_SCREEN === state
                        ? "Starting screen"
                        : gameState.GAME_FINISHED === state
                        ? "Game over!"
                        : "Pause"}
                </DialogTitle>
                <div style={{ flexGrow: 1 }} />
                <Typography variant="body2">Room: {clientData.room}</Typography>
            </Toolbar>

            <DialogContent>
                <ListOfPlayers />
            </DialogContent>
            {menuButtons()}
        </Dialog>
    );
};

export default Menu;