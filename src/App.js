import {Route, Routes} from "react-router-dom";
import {PUBLIC_ROUTES, ROUTES} from "./ROUTES";
import AppBar from "./components/AppBar";
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import {LocalizationProvider} from '@mui/x-date-pickers';
import {createContext, useState} from "react";
import WithAuthentication from "./helpers/withAuthentication";

export const Context = createContext({
    user: {}, setUser: () => {
    }
});
Context.displayName = 'MyContext';

function App() {

    const [user, setUser] = useState({user: {}})
    return (
        <div className="">
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Context.Provider value={{user, setUser}}>
                    <AppBar/>
                    <Routes>
                        {PUBLIC_ROUTES.map((route) => {
                            return (
                                <Route key={route.path} path={route.path} element={route.element} exact/>
                            );
                        })}
                            {ROUTES.map((route) => {
                                return (

                                    <Route key={route.path} path={route.path} element={
                                        <WithAuthentication>{route.element}</WithAuthentication>} exact/>
                                );
                            })}
                    </Routes>
                </Context.Provider>
            </LocalizationProvider>
        </div>
    );
}

export default App;
