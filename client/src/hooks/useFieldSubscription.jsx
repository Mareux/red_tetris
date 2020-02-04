import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {SET_PLAYFIELD, setPlayfield} from "../actions/game";

function useFieldSubscription(socket) {
    const dispatch = useDispatch();
    const playfield = useSelector(store => store.playfield);

    useEffect(() => {
        console.log(socket);
        socket.on(SET_PLAYFIELD, setPlayfield(dispatch));//задиспачить экшн в стор
    }, [socket]);

    return playfield;
}

export default useFieldSubscription;
