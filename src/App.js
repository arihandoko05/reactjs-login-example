import React from 'react';
import Login from './components/Login';
import Home from './components/Home';
import { PrivateRoute } from './helpers/PrivateRoute';
import { cData } from './helpers/constant';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './styles/App.css';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router history={cData.history}>
                    <div>
                        <PrivateRoute exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                    </div>
                </Router>

            </div>
        );
    }
}

export default App;
