import React, {useEffect, useState} from 'react'
import '../../App.css';
import {getGroups} from "../../helpers/groups";
import {ListGroups} from "./ListGroups";
import {CreateNewGroup} from "./CreateNewGroup";
import Container from "@mui/material/Container";
import {Typography} from "@mui/material";

function Groups() {
    const [groups, setGroups] = useState([]);

    function fetchGroups() {
        getGroups().then(setGroups)
    }

    useEffect(() => {
        fetchGroups();
    }, [])

    const onCreateGroup = () => {
        fetchGroups();
    }

    return (
        <Container sx={{display: 'flex', flexDirection:'column' , alignItems: 'center', justifyItems:'center'}}
            >
            <Typography variant={'h5'}>Elegí una Sala</Typography>
            <ListGroups groups={groups}/>
            <CreateNewGroup onCreate={onCreateGroup}/>
        </Container>
    );
}

export default Groups