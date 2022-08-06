import * as React from "react";
import {useContext} from "react";

import {AppBar, Box, Button, Toolbar} from "@mui/material";
import Container from '@mui/material/Container';
import {GROUPS} from "../ROUTES.js";
import {Context} from "../App.js";
import {SignOutButton} from "./SignOutButton.jsx";

// const links = [
//     {href: ROUTES.GROUPS, title: "Misiones"},
// ];


const ApplicationBar = () => {
    const {user} = useContext(Context)
    return (
        <AppBar position="static" sx={{backgroundColor: "white"}} id="appbar">
            <Container maxWidth="xl" id="container">
                <Toolbar disableGutters id="toolbar"
                         sx={{display: "flex", justifyContent: 'space-between'}}>

                    {/*//TODO add company icon*/}
                    {/*<Link href="/">*/}
                    {/*    <Avatar src="/img/icon/ETI_logo_1.png" alt="ETI" sx={{width: "100px", height: "100px",}}/>*/}
                    {/*</Link>*/}
                    <Button color="primary" variant="text" underline="none"
                            href={GROUPS}
                            key={'groups'}
                            sx={{fontSize: 12, align: "center", margin: "3px", textAlign: 'center'}}>
                        {"Salas"}
                    </Button>
                    <Box sx={{flexDirection: {xs: 'column', sm: 'row'}, justifyContent: 'flex-end'}}
                         display={"flex"}
                         id="botonera">
                        {!!user?.uid && <SignOutButton/>}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ApplicationBar;

