import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect, RouteProps
} from "react-router-dom";
import {routes} from "./routes";

/**
 * App page
 *
 * @desc Main entry of the project
 *
 * */
const App = ()=>{
    return (
        <React.Suspense fallback={'Loading...'}>
            <BrowserRouter>
                <Switch>
                    {routes.map((route:RouteProps,i:number)=> <Route key={i} {...route} />)}
                    <Redirect from={'/'} to={'/users'}/>
                </Switch>
            </BrowserRouter>
        </React.Suspense>
    );
}

export default App;
