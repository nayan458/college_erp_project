import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './css/App.css';

import Login from './pages/Login';
import MyClass from './pages/MyClass';
import Assignments from './pages/myClass/Assignments';
import ClassCalendar from './pages/myClass/ClassCalendar';
import MyClassmates from './pages/myClass/MyClassmates';
import Error from './pages/Error';
import Protected from './Protected';
import Logout from './pages/Logout';
import NodeState from './contexts/NodeState';

function App() {
  return (
    <>
    <NodeState>
      <BrowserRouter>
        <Routes>
          <Route element={<Protected/>}>

              <Route path='/' element={<MyClass/>}/>
              <Route path='/myClass' element={<MyClass/>}/>

              <Route path='/assignments' element={<Assignments/>}/>

              <Route path='/classCalendar' element={<ClassCalendar/>}/>

              <Route path='/myClassmates' element={<MyClassmates/>}/>
              <Route path='/myClassmates/:ActClass' element={<MyClassmates/>}/>

              <Route path='/logout' element={<Logout/>}/>

          </Route>

              <Route path='/login' element={<Login/>}/>

              <Route path='/*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
      </NodeState>
    </>

  );
}

export default App;
