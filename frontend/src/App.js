import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import Main from './containers/Main/Main'
import AddTask from "./containers/AddTask/AddTask";
import EditTask from "./containers/EditTask/EditTask";

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/tasks/add" component={AddTask}/>
                        <Route path="/tasks/:id" component={EditTask}/>
                        <Route path="/" component={Main}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
