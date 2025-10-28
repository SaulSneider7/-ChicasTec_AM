import './App.css'
import app from './firebase'
import AddUser from './components/AddUser'
import UserList from './components/UserList'

function App() {
  console.log(app);
  
  return (
    <>
      <div>
        <h1>Mi página web con React y Firebase</h1>
      </div>

      <AddUser />

      <hr />

      <UserList />
    </>
  )
}

export default App
