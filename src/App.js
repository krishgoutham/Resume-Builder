import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Resumes from './components/Resumes'
import AddResume from './components/AddResume'
import Edit from './components/Edit'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [resumes, setResumes] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setResumes(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/resume')
    const data = await res.json()

    return data
  }

  //Fetch Suggestions
  // const fetchSuggestions = async () => {
  //   const res = await fetch('http://localhost:5000/suggestions')
  //   const suggestions = await res.json()
  //   let objects=[];

  //   suggestions.map((suggest) =>{
  //     const id = `${suggest.id}`;
  //     const text =`${suggest.text}`;
  //       objects.push({id, text})
  //   })
  //   return objects
  // }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/resume/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addResume = async (task) => {
    const res = await fetch('http://localhost:5000/resume', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setResumes([...resumes, data])
  }

  // Delete Task
  const deleteResume = async (id) => {
    const res = await fetch(`http://localhost:5000/resume/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setResumes(resumes.filter((resume) => resume.id !== id))
      : alert('Error Deleting This Task')
  }

  // Toggle Reminder
  // const toggle = async (id) => {
  //   const taskToToggle = await fetchTask(id)
  //   const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

  //   const res = await fetch(`http://localhost:5000/tasks/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify(updTask),
  //   })

  //   const data = await res.json()

  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === id ? { ...task, reminder: data.reminder } : task
  //     )
  //   )
  // }

  // update Resume
  const UpdateResume = async (id,resume) => {
    const res = await fetch(`http://localhost:5000/resume/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(resume),
    })

    const data = await res.json()

    setResumes(
      resumes.map((resume) =>
        resume.id === id ? data : resume
      )
    )
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTask && <AddResume onAdd={addResume}/>}
              {resumes.length > 0 ? (
                <>
                <h3>Click on a Name to Edit</h3>
                <Resumes
                  resumes={resumes}
                  onDelete={deleteResume}
                  onUpdate={UpdateResume}
                />
                </>
              ) : (
                'No Resumes to list'
              )}
            </>
          )}
        />
        <Route path='/edit' component={Edit} />
        <Footer />
      </div>
    </Router>
  )
}

export default App
