import Modal from "@material-ui/core/Modal";
import {useSelector} from "react-redux";
import {gameState} from "../actions/game";
import React, {useEffect, useState} from "react";
import './Menu.css'
import Button from "@material-ui/core/Button";
import ListOfPlayers from "./ListOfPlayers";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const Menu = (props) => {
    const state = useSelector(store => store.gameState);
    const clientData = useSelector(store => store.clientData);
    const host = useSelector(store => store.host);

    const classes = useStyles();

    const [open, setOpen] = useState(true);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleStart = () => {
        props.socket.emit('startGame', null);
        handleClose();
    };

    const handleReady = () => {
        props.socket.emit('readyCheck', null);
    };

    useEffect(() => {
        if( gameState.GAME_FINISHED === state)
            handleOpen();
    }, [state]);

    const menuButtons = () => {
        return (
            <div className={classes.root}>
                {!host ?
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleReady}
                    >
                        READY
                    </Button> :
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleStart}
                        >
                            START
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleReady}
                        >
                            READY
                        </Button>
                    </>
                }
            </div>)
    };

    return (
        <Modal open={open}
               onClose={handleClose}
               disableBackdropClick={gameState.STARTING_SCREEN === state}>
            <div className={"menu"}>
                <h2>{gameState.STARTING_SCREEN === state ? "Starting screen"
                    : gameState.GAME_FINISHED === state ? "Game over!" : "Pause"}</h2>
                <h4>Room: {clientData.room}</h4>
                <ListOfPlayers/>
                {menuButtons()}
            </div>
        </Modal>
    );
};

export default Menu;
