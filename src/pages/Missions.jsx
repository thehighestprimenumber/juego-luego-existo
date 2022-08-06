import React, {useContext, useEffect, useState} from 'react'
import {Box, Button, TextField, Typography} from "@mui/material";
import {httpsCallable} from "firebase/functions";
import '../App.css';
import {createMission, getMissionByUser, getMissionForUser} from "../helpers/mission";
import {functions} from "../utils/firebase";
import {Context} from "../App";
import {getGroup, updateGroup} from "../helpers/groups.js";
import {useQuery} from "../helpers/useQuery.js";
import Container from "@mui/material/Container";
import {GROUPS} from "../ROUTES.js";
import {Navigate} from "react-router-dom";
import {DateTimePicker} from "@mui/x-date-pickers";
import Countdown from "react-countdown";

function CreateMission({setMissionByUser, selectedGroup}) {
    const [missionText, setMissionText] = useState('')
    const {user: {uid: userId}} = useContext(Context)

    let groupId = selectedGroup?.id;
    const onSave = async () => {
        try {
            await createMission({missionText, userId, groupId: groupId});
            setMissionByUser(missionText)
        } catch (e) {
            console.error(e)
        }
    }

    function handleChange(event) {
        setMissionText(event.target.value)
    }

    return <>
        <Typography variant={"body1"}>
            Tu objetivo será cumplir la misión que te toque sin que nadie te descubra. Habrá un tiempo acordado
            previamente para lograrlo. La duración depende de lo que decida la persona que organiza el evento.
            <br/><br/>
            Antes de empezar, vamos a pedirte que escribas una misión en el campo que figura abajo. La misma se
            repartirá entre los integrantes del juego y se sumará a nuestra base de datos para que otras personas
            jueguen en un futuro.
            <br/><br/>
            Las misiones deben ser acciones pensadas para que otras personas del evento realicen sin ser
            descubiertas.
        </Typography>
        <br/>
        <Typography variant={"h6"}>
            Ejemplos de misiones son:
        </Typography>
        <Typography>
            * matar un falso mosquito en la pierna de alguien
            <br/>
            * lograr que toda la gente cante el himno
            <br/>
            * mostrarle un meme a alguien
            <br/>
            * lograr que alguien de la fiesta te siga en redes
            <br/>
            * meter en un bolsillo ajeno algún objeto
        </Typography>
        <br/>
        <br/>
        <Typography variant={"h6"}>
            A tener en cuenta:
        </Typography>
        <Typography variant={"body1"}>
            La idea es que las misiones sean sencillas y que no impliquen situaciones que pongan incómodas a las
            personas que participen.

            La persona que la reciba sólo podrá ganas si la cumple y nadie la descubre en el medio.
        </Typography>
        <br/><br/>

        <Typography variant={"h5"}>Escribí una misión</Typography>
        <TextField value={missionText} onChange={handleChange} variant="filled" fullWidth multiline/>
        <Button onClick={onSave}>Guardar</Button>
    </>;
}

function AssignMissions({selectedGroup}) {
    const [dateEnd, setDateEnd] = useState(new Date());

    function handleDateEndChange(value) {
        setDateEnd(value)
    }

    async function assignMissions() {
        const groupId = selectedGroup.id;
        await updateGroup({dateEnd, groupId});
        const assignMissions = httpsCallable(functions, 'assignMissions');
        try {
            await assignMissions({groupId});
        } catch (e) {
            console.log(e)
        }
    }


    const isDatePending = () => dateEnd <= new Date();
    return <Box style={{margin: '50px'}}>
        <Typography>
            Cuando todxs lxs participantes hayan creado una misión, Asignalas!
        </Typography>
        <Box
            style={{margin: '50px'}}>
            <DateTimePicker
                label="Horario Fin De las Misiones"
                value={dateEnd}
                onChange={handleDateEndChange}
                renderInput={(params) => <TextField {...params} />}
            />

            <Button disabled={isDatePending()} onClick={assignMissions}>Asignar</Button>
        </Box>
    </Box>

}

function ReadMission({missionForUser, selectedGroup}) {
    return <>
        {!missionForUser && <Typography>Tu misión fue guardada</Typography>}
        {missionForUser && <><Typography>Tu misión es: {missionForUser.missionText}</Typography>

            {selectedGroup.dateEnd > new Date() && <>
                <Typography variant={'caption'}>
                    Tiempo Restante:
                </Typography>
                <Countdown date={selectedGroup.dateEnd.toISOString()}/>
            </>}
        </>}
    </>
}

function Missions() {
    const [missionByUser, setMissionByUser] = useState('');
    const [missionForUser, setMissionForUser] = useState(undefined);
    const [selectedGroup, setSelectedGroup] = useState(undefined);
    const [loading, setLoading] = useState(true)
    const {user: {uid: userId}} = useContext(Context);
    const query = useQuery();
    const groupId = query.get('groupId')
    useEffect(() => {
        Promise.all([
            getGroup(groupId).then(setSelectedGroup),
            getMissionByUser({userId, groupId}).then(setMissionByUser),
            getMissionForUser({userId, groupId}).then(setMissionForUser)
        ]).then(() => {
            setLoading(false);
        })
    }, [userId, groupId])

    const isOwner = () => selectedGroup && userId === selectedGroup.ownerId
    return (
        <Container maxWidth="sm" sx={{padding: '50px'}}>
            <Typography variant={"h4"}>
                ¡Bienvenidx al juego de las misiones!
            </Typography><br/>
            {!groupId && <Navigate to={GROUPS}/>}
            {!loading && (
                missionByUser ?
                <ReadMission missionForUser={missionForUser} selectedGroup={selectedGroup}/> :
                <CreateMission setMissionByUser={setMissionByUser}
                               selectedGroup={selectedGroup}/>
            )}
            {!loading && !missionForUser && missionByUser && isOwner() &&
                <AssignMissions selectedGroup={selectedGroup}/>}
        </Container>
    );
}

export default Missions