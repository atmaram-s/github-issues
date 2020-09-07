import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Issues from "./pages/Issues";
import IssueDetail from "./pages/IssueDetail";

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Issues} />
                <Route exact path="/detail/:issueId" component={IssueDetail} />
            </Switch>
        </BrowserRouter>
    );
}
