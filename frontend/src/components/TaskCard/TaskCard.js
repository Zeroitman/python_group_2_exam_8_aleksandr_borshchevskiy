import React from 'react';
import {NavLink} from "react-router-dom";
const TaskCard = (props) => {
    const {task, onDelete} = props;
    return <div className='border border-info text-center p-2 rounded'>
        <h4>{task.summary}</h4>
        <p>Время исполнения: {task.due_date}</p>
        <NavLink to={'/tasks/' + task.id} className="btn btn-success p-2 m-2">Редактирование</NavLink>
        <button type="button" className="btn btn-danger p-2 m-2" onClick={onDelete}>Удаление</button>
    </div>
};


export default TaskCard;