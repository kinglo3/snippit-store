import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function Router() {
    return <BrowserRouter>
        <Switch>
            <Route path="/login">
                Login
            </Route>
            <Route path="/register">
                Register
            </Route>
            <Route exact path="/">
                Homepage
            </Route>
        </Switch>
    </BrowserRouter>
};

export default Router;