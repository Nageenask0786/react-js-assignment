import { Switch , Route} from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./components/Dashboard"
const App = () => (
    <Switch>
        <Route exact path = "/login" component = {Login} />
        <Route exact path = "/signup" component = {Signup} />
        <ProtectedRoute exact path = "/" component = {Dashboard} />
    </Switch>
)

export default App