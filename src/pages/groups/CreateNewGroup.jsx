import React, {useContext, useState} from "react";
import {Context} from "../../App";
import {createGroup} from "../../helpers/groups";
import {Box, Button, TextField, Typography} from "@mui/material";

export function CreateNewGroup({onCreate}) {
    const {user: {uid: userId}} = useContext(Context)
    const [description, setDescription] = useState('');

    const [isCreatingGroup, setIsCreatingGroup] = useState(false);
    const save = async () => {
        try {
            await createGroup({description, userId});
            setDescription('')
            setIsCreatingGroup(false)
            onCreate()
        } catch (e) {
            console.error(e)
        }
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    }

    function toggleIsCreatingGroup() {
        setIsCreatingGroup(prev => !prev)
    }

    return <Box style={{display: 'flex', flexDirection:'column',  alignItems: 'center', padding: '20px', justifyItems: 'center'}}>
        <Button onClick={toggleIsCreatingGroup}>
            <Typography variant={'h6'}>
                O creá una nueva
            </Typography>
        </Button>
        {(isCreatingGroup || description) && <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <TextField
                disabled={!isCreatingGroup}
                value={description}
                label={"Descripcion"}
                onChange={handleDescriptionChange}/>

            <Button onClick={save} disabled={!description || !isCreatingGroup}>Guardar</Button>
        </Box>
        }
    </Box>;
}