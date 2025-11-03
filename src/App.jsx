import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import Login from "./components/Loging";
import Register from "./components/Register";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(true);

  const cerrarSesion = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUsuario(null);
  };

  const cambiarVista = () => setMostrarLogin(!mostrarLogin);

  return (
    <div>
      {!usuario ? (
        mostrarLogin ? (
          <Login onLogin={setUsuario} cambiarVista={cambiarVista} />
        ) : (
          <Register onRegister={setUsuario} cambiarVista={cambiarVista} />
        )
      ) : (
        <>
          <h1>Panel de Administración</h1>
          <p>Usuario: {usuario.email}</p>
          <button onClick={cerrarSesion}>Cerrar Sesión</button>
          <AddUser />
          <UserList />
        </>
      )}
    </div>
  );
}

export default App;
