import {Button} from "@mui/material";
import {auth} from "../utils/firebase";
import React, {useContext} from "react";
import {Context} from "../App.js";

export function SignOutButton() {
    const {setUser} = useContext(Context)

    function signOut() {
        setUser({user: {}})
        return auth.signOut()
    }

    return <Button color="secondary" variant="outlined" underline="none"
                   onClick={signOut}
                   href={"/"}
                   key={'signout'}
                   sx={{fontSize: 12, align: "center", margin: "3px", textAlign: "center"}}>
        {"Cerrar Sesión"}
    </Button>;
}