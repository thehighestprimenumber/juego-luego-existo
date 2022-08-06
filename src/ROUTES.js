import Missions from "./pages/Missions";
import SignIn from "./pages/SignIn";
import Groups from "./pages/groups/index";

export const MISSIONS = '/missions'
export const SIGN_IN = '/sign-in'
export const GROUPS = '/groups'

export const ROUTES = [
    {path: MISSIONS, element: <Missions/>},
    {path: GROUPS, element: <Groups/>},
]

export const PUBLIC_ROUTES = [
    {path: '/', element: <SignIn/>},
    {path: SIGN_IN, element: <SignIn/>},
]