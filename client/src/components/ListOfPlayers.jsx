import { useSelector } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GradeIcon from "@material-ui/icons/Grade";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Card from "@material-ui/core/Card";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";

const ListOfPlayers = () => {
    const currentPlayer = useSelector(store => store.clientData);
    const players = useSelector(store => store.players);

    return (
        <Card variant="outlined" className={"list_of_players"}>
            <List
                subheader={
                    <ListSubheader component="div">
                        Joined players
                    </ListSubheader>
                }
            >
                {players.map(player => {
                    return (
                        <ListItem>
                            <ListItemIcon>
                                {player.host ? <GradeIcon /> : ""}
                            </ListItemIcon>
                            <ListItemText>
                                {player.username}
                                {currentPlayer.username === player.username && (
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="span"
                                        style={{ marginLeft: 8 }}
                                    >
                                        (me)
                                    </Typography>
                                )}
                            </ListItemText>
                            <ListItemSecondaryAction
                                style={{ display: "flex" }}
                            >
                                {player.ready && (
                                    <CheckCircleIcon color="action" />
                                )}
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </Card>
    );
};

export default ListOfPlayers;
