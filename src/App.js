import Header from "./components/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

import { useState, useEffect } from "react";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    
    getTasks();
  }, []);


  //  Fetch Tasks (Whole List)
  const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks');
      const data = await res.json();
      return data;
  }
  //  Fetch Tasks (Fetch only one item)
  const fetchSingleTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`);
      const data = await res.json();
      return data;
  }
  //  Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();
    setTasks([...tasks, data]);
    
    // const id = Math.floor(Math.random() * 10000) + 1;
    // setTasks([...tasks, task]);
  };
  //  Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(each => each.id !== id));
  };
  //  Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchSingleTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });

    setTasks(tasks.map(each => each.id === id ? {...each, reminder: !each.reminder} : each))
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        {showAddTask && <AddTask onAdd={addTask}/>}
        
        <Route path='/' exact render={ (props) => (
          <>
          {tasks.length > 0 ? <Tasks onAction={deleteTask} onToggle={toggleReminder} tasks={tasks}/> : 'No Tasks'}
          </>
        )}/>
        <Route path='/about' component={About}/>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
