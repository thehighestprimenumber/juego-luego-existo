import React, {useEffect, useState} from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import {auth, uiConfig} from "../utils/firebase";
import {Button} from "@mui/material";
import {GROUPS} from "../ROUTES.js";
import {SignOutButton} from "../components/SignOutButton.jsx";

function SignInScreen() {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    if (!isSignedIn) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <p>Inicia sesión para continuar</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
            </div>
        );
    } else {
        return <>
            <Button color="primary" variant="contained" underline="none"
                    href={GROUPS}
                    key={'groups'}
                    sx={{fontSize: 12, align: "center", margin: "3px", textAlign: 'center'}}>
                {"Salas"}
            </Button>
            <SignOutButton/>
        </>
    }
}

export default SignInScreen