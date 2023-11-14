import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTask from './components/AddTask';
import UpateTask from './components/UpateTask';
import PendingTasks from './components/PendingTasks';
import CompletedTasks from './components/CompletedTasks';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  return (
    <div className="App">
<Router >
      <Sidebar />

        <div className='h-full' id='root'>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/addTask' element={<AddTask />} />
            <Route path='/updateTask/:id' element={<UpateTask />} />
            <Route path='/completed' element={<CompletedTasks />} />
            <Route path='/pending' element={<PendingTasks />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
