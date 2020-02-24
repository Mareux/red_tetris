import Modal from "@material-ui/core/Modal";
import {useSelector} from "react-redux";
import {gameState} from "../actions/game";
import React, {useState} from "react";
import './Menu.css'

const Menu = (props) => {
    const state = useSelector(store => store.gameState);

    const [open, setOpen] = useState(true);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleStart = () => {
        props.socket.emit('checkReady', null);
        handleClose();
    };

    console.log(props.soket);

    const createMenu = () => {
        if (state === gameState.STARTING_SCREEN) {
            return <Modal open={open}
                          onClose={handleClose}>
                <div className="menu">
                    <button
                        className="menu_button"
                        onClick={handleStart}>START</button>
                </div>
            </Modal>
        }
    };

    return (
        createMenu()
    );
};

export default Menu;
