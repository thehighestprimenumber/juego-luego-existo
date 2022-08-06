import * as React from "react";
import {useContext, useEffect} from "react";
import {getAuth} from "firebase/auth";
import {SIGN_IN} from "../ROUTES";
import {Context} from "../App.js";
import {Button} from "@mui/material";

const WithAuthentication = ({children}) => {
    const {user, setUser} = useContext(Context)
    const auth = getAuth()
    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(user => {
            setUser(user)
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, [auth, setUser])

    return (
        <>
            {!user?.uid ?
             <Button color="secondary" variant="outlined" underline="none"
                     href={SIGN_IN}
                     key={'signin'}
                     sx={{fontSize: 12, align: "center", margin: "3px", textAlign: 'center'}}>
                 {"Iniciar Sesión"}
             </Button> : <>{children}</>
            }
        </>
    )
}
export default WithAuthentication;