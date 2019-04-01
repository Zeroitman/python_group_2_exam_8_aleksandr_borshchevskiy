import React, {Component, Fragment} from 'react';
import {TASKS_URL} from "../../api-urls";
import {TASK_STATUS_QUEUE, TASK_STATUS_DONE, TASK_STATUS_IN_PROGRESS, TASK_STATUSES} from "../../constants";
import TaskCard from "../../components/TaskCard/TaskCard";
import axios from "axios";
import Navbar from '../../components/Navbar/Navbar'

class MainPage extends Component {
    state = {
        tasks: {
            [TASK_STATUS_QUEUE.value]: [],
            [TASK_STATUS_IN_PROGRESS.value]: [],
            [TASK_STATUS_DONE.value]: []
        }
    };

    componentDidMount() {
        axios.get(TASKS_URL).then(response => {
            console.log(response.data);
            const tasksData = response.data;
            let tasks = {};
            TASK_STATUSES.forEach(status => tasks[status.value] = []);
            tasksData.forEach(task => {
                tasks[task.status].push(task);
            });
            this.setState({tasks});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        })
    }

    taskDeleted = (taskStatus, taskId) => {
        axios.delete(TASKS_URL + taskId + '/').then(response => {
            console.log(response.data);
            this.setState(prevState => {
                let newState = {...prevState};
                let tasks = [...newState.tasks[taskStatus]];
                let taskIndex = tasks.findIndex(task => task.id === taskId);
                tasks.splice(taskIndex, 1);
                newState.tasks[taskStatus] = tasks;
                return newState;
            })
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        })
    };

    render() {
        return <Fragment>
            <Navbar/>
            <div className='d-flex container'>
                {TASK_STATUSES.map(status => {
                    return <div className="p-1" key={status.value}>
                        <h2 className="text-center">{status.label}</h2>
                        <div className="d-flex flex-wrap">
                            {this.state.tasks[status.value].map(task => {
                                return <div className="p-1" key={task.id}>
                                    <TaskCard task={task}
                                              onDelete={() => this.taskDeleted(status.value, task.id)}/>
                                </div>
                            })}
                        </div>
                    </div>
                })}
            </div>
        </Fragment>
    }
}


export default MainPage;