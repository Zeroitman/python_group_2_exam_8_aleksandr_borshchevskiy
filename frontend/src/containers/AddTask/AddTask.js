import React, {Component, Fragment} from 'react';
import {TASK_STATUS_QUEUE, TASK_STATUSES} from "../../constants";
import Select from "react-select";
import DatePicker from "react-datepicker";
import {TASKS_URL} from "../../api-urls";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";


class AddTaskPage extends Component {
    state = {
        task: {
            summary: "",
            description: "",
            due_date: null,
            status: TASK_STATUS_QUEUE.value,
            time_planned: "",
        }
    };

    updateTask(field, value) {
        this.setState(prevState => {
            let newState = {...prevState};
            let task = {...prevState.task};
            task[field] = value;
            newState.task = task;
            return newState;
        })
    }

    inputChanged = (event) => {
        const {name, value} = event.target;
        this.updateTask(name, value);
    };

    dateChanged = (name, value) => {
        this.updateTask(name, this.parseDate(value));
    };

    getDate = (dateString) => {
        if (dateString) return new Date(dateString);
        return null;
    };

    parseDate = (date) => {
        if (date) return date.toISOString();
        return null;
    };

    selectChanged = (name, value) => {
        this.updateTask(name, this.parseSelectValue(value));
    };

    getStatusValue = (status) => {
        return TASK_STATUSES.find(item => item.value === status)
    };

    parseSelectValue = (selectValue) => {
        return selectValue.value;
    };

    gatherData = (task) => {
        let data = {};
        Object.keys(task).forEach(key => {
            data[key] = task[key] === "" ? null : task[key];
        });
        return data;
    };

    formSubmitted = (event) => {
        event.preventDefault();
        const data = this.gatherData(this.state.task);
        axios.post(TASKS_URL, data).then(response => {
            console.log(response.data);
            this.props.history.push('/');
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        })
    };

    render() {
        const {summary, description, due_date, status, time_planned} = this.state.task;
        return <Fragment>
            <Navbar/>
            <div className='container'>
                <form onSubmit={this.formSubmitted}>
                    <div>
                        <label className="font-weight-bold">Summary</label>
                        <input type="text" value={summary} onChange={this.inputChanged} name='summary'
                               className="form-control"/>
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea value={description} onChange={this.inputChanged} name='description'
                                  className="form-control"/>
                    </div>
                    <div>
                        <label className="font-weight-bold">Status</label>
                        <Select
                            value={this.getStatusValue(status)}
                            options={TASK_STATUSES}
                            isDisabled={true}
                            name='status'
                            onChange={(value) => this.selectChanged('status', value)}
                        />
                    </div>
                    <div>
                        <label className="font-weight-bold">Due date</label>
                        <div>
                            <DatePicker
                                onChange={(value) => this.dateChanged('due_date', value)}
                                selected={this.getDate(due_date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="yyyy-MM-dd HH:mm"
                                name="due_date"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Time planned</label>
                        <input type="number" value={time_planned} onChange={this.inputChanged} name='time_planned'
                               className="form-control"/>
                    </div>
                    <div className="mt-2">
                        <button type="submit" className="btn btn-success">Добавить задачу</button>
                    </div>
                </form>
            </div>
        </Fragment>
    }
}


export default AddTaskPage;