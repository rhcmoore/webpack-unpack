import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Users from "./containers/Users";
import asyncComponent from "./hoc/asyncComponent";

const AsyncFacebook = asyncComponent(() => {
    return import("./containers/Facebook.js");
});

class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to="/">Users</Link> |
                    <Link to="/facebook">Facebook</Link>
                </div>
                <div>
                    <Route to="/" exact component={Users} />
                    <Route to="/facebook" component={AsyncFacebook} />
                </div>
            </div>
        );
    }
}

export default App;