import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore"; //Agregamos

function UserList() {
  const [usuarios, setUsuarios] = useState([]);

  //Agregamos aqui
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");
  const [edadEditada, setEdadEditada] = useState("");

  useEffect(() => {
    // Escucha en tiempo real los cambios en la colección "usuarios"
    const unsubscribe = onSnapshot(collection(db, "usuarios"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsuarios(lista);
    });

    // Limpia la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  //Modo edicion
  const editarUsuario = (usuario) => {
    setEditandoId(usuario.id);
    setNombreEditado(usuario.nombre);
    setEdadEditada(usuario.edad);
  };

  // Guardamos los cambios en firebase
  const guardarCambios = async (id) => {
    const usuarioRef = doc(db, "usuarios", id);
    await updateDoc(usuarioRef, {
      nombre: nombreEditado,
      edad: Number(edadEditada),
    });
    setEditandoId(null); // cerramos el modo de edicion
  };


  //Funcion para eliminar
  const eliminarUsuario = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este usuario?");
    if (confirmar) {
      try {
        await deleteDoc(doc(db, "usuarios", id));
        alert("Usuario eliminado correctamente.");
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert("No se pudo eliminar el usuario.");
      }
    }
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados todavía.</p>
      ) : (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>
              {editandoId === usuario.id ? (
                <>
                  <input 
                    type="text" 
                    value={nombreEditado} 
                    onChange={(e) => setNombreEditado(e.target.value)}
                  />

                  <input 
                    type="text" 
                    value={edadEditada}
                    onChange={(e)=> setEdadEditada(e.target.value)}
                  />

                  <button onClick={()=>guardarCambios(usuario.id)}>Guardar</button>
                </>
              ) : (
                <>
                  <strong>Nombre:</strong> {usuario.nombre} - 
                  <strong>Edad:</strong> {usuario.edad}
                  <button onClick={() => editarUsuario(usuario)}>Editar</button> 
                  <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
