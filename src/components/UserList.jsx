import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

function UserList() {
  const [usuarios, setUsuarios] = useState([]);

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

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados todavía.</p>
      ) : (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>
              <strong>Nombre:</strong> {usuario.nombre} <br />
              <strong>Edad:</strong> {usuario.edad}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
