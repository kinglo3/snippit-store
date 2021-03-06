import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login"
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import Navbar from "./components/other/Navbar";

function Router() {
    return <BrowserRouter>
            <Navbar />
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
        </Switch>
    </BrowserRouter>
};

export default Router;