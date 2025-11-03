import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Register({ onRegister, cambiarVista }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registrarUsuario = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert("Cuenta creada con éxito. Ya puedes iniciar sesión.");
      onRegister(userCredential.user);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("No se pudo crear la cuenta. Verifica tus datos.");
    }
  };

  return (
    <div>
      <h2>Crear Cuenta</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={registrarUsuario}>Registrarse</button>
      {/* <p>
        ¿Ya tienes una cuenta?{" "}
        <button onClick={cambiarVista}>Iniciar sesión</button>
      </p> */}
    </div>
  );
}

export default Register;
