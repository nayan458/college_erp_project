import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';

import Message from './pages/Message';
import Admin from './pages/Admin';
import Backpack from './pages/Backpack';
import Login from './pages/Login';
import MyClass from './pages/MyClass';
import Notifications from './pages/Notifications';
import AllMessage from './pages/message/AllMessage';
import Inbox from './pages/message/Inbox';
import Sent from './pages/message/Sent';
import Announcements from './pages/myClass/Announcements';
import Assignments from './pages/myClass/Assignments';
import ClassCalendar from './pages/myClass/ClassCalendar';
import DownloadableMaterials from './pages/myClass/DownloadableMaterials';
import MyClassmates from './pages/myClass/MyClassmates';
import MyProgress from './pages/myClass/MyProgress';
import Quiz from './pages/myClass/Quiz';
import SubjectOverview from './pages/myClass/SubjectOverview';
import Error from './pages/Error';
import Register from './pages/Register';
import Protected from './Protected';
import Logout from './pages/Logout';
import Demo from './pages/Demo';

function AppBackup() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Protected/>}>
              <Route path='/' element={<Message/>}/>

              <Route path='/message' element={<Message/>}/>

              <Route path='/admin' element={<Admin/>}/>

              <Route path='/backpack' element={<Backpack/>}/>

              <Route path='/myClass' element={<MyClass/>}/>

              <Route path='/notifications' element={<Notifications/>}/>

              <Route path='/allMails' element={<AllMessage/>}/>

              <Route path='/inbox' element={<Inbox/>}/>

              <Route path='/sent' element={<Sent/>}/>

              <Route path='/announcements' element={<Announcements/>}/>

              <Route path='/assignments' element={<Assignments/>}/>

              <Route path='/classCalendar' element={<ClassCalendar/>}/>

              <Route path='/downloadableMaterials' element={<DownloadableMaterials/>}/>

              <Route path='/myClassmates' element={<MyClassmates/>}/>

              <Route path='/myProgress' element={<MyProgress/>}/>

              <Route path='/quiz' element={<Quiz/>}/>

              <Route path='/subjectOverview' element={<SubjectOverview/>}/>

              <Route path='/logout' element={<Logout/>}/>

          </Route>


              <Route path='/register' element={<Register/>}/>

              <Route path='/login' element={<Login/>}/>

              <Route path='/*' element={<Error/>}/>

              <Route path='/demo' element={<Demo/>}/>
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default AppBackup;
