import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login({ onLogin, cambiarVista }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = async () => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      onLogin(userCredential.user);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
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
      <button onClick={iniciarSesion}>Ingresar</button>
      {/* <p>
        ¿No tienes cuenta?{" "}
        <button onClick={cambiarVista}>Crear una cuenta</button>
      </p> */}
    </div>
  );
}

export default Login;
