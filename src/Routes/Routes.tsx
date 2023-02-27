import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SignUp } from "../pages/SignUp/index";
import { Home } from "../pages/Home/index";
import { QueryClientProvider, QueryClient } from "react-query";
import { Login } from "../pages/Login/index";

function Routes() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default Routes;

