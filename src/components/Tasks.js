import Task from "./Task";

const Tasks = ({ tasks, onAction, onToggle }) => {
    return (
        <>
         { tasks.map(each => (
             <Task onToggle={onToggle} onDelete={onAction} key={each.id} task={each}/>
            ))}   
        </>
    )
}

export default Tasks
