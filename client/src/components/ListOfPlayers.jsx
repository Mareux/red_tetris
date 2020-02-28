import {useSelector} from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GradeIcon from '@material-ui/icons/Grade';
import "./ListOfPlayers.css"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const ListOfPlayers = () => {
    const currentPlayer = useSelector(store => store.clientData);
    const players = useSelector(store => store.players);

    return (
        <div className={"list_of_players"}>
            <p>Joined players:</p>
            <List>
                {players.map(player => {
                    return <ListItem
                        selected={currentPlayer.username === player.username}
                    >
                        <ListItemIcon>
                            {player.host ? <GradeIcon/> : ""}
                        </ListItemIcon>
                        {player.username}
                        <ListItemSecondaryAction>
                                {player.ready ? <CheckCircleIcon /> : "" }
                        </ListItemSecondaryAction>
                    </ListItem>
                })}
            </List>
        </div>
    )

};

export default ListOfPlayers;
