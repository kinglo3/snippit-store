import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";

function Router() {
    return <BrowserRouter>
            <Navbar />
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