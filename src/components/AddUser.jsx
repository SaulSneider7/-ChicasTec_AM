import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";

function AddUser() {
    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");

    const agregarUsuario = async () => {
        if (!nombre || !edad) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Por favor completa todos los campos antes de continuar.",
                confirmButtonColor: "#3085d6",
            });
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "usuarios"), {
                nombre,
                edad: Number(edad),
                fechaRegistro: new Date(),
            });

            console.log("✅ Usuario agregado con ID:", docRef.id);

            Swal.fire({
                icon: "success",
                title: "¡Usuario agregado!",
                text: `El usuario ${nombre} fue registrado correctamente 🎉`,
                confirmButtonColor: "#3085d6",
            });

            setNombre("");
            setEdad("");
        } catch (error) {
            console.error("Error al agregar usuario:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un problema al guardar el usuario. Intenta nuevamente.",
                confirmButtonColor: "#d33",
            });
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md w-80">
            <input
                type="text"
                placeholder="Nombre"
                className="border border-gray-300 rounded-md p-2 w-full mb-3"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                type="number"
                placeholder="Edad"
                className="border border-gray-300 rounded-md p-2 w-full mb-3"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
            />
            <button
                onClick={agregarUsuario}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full transition duration-300"
            >
                Agregar Usuario
            </button>
        </div>
    );
}

export default AddUser;
