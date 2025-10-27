import app from "./firebase";
import AddUser from "./components/addUser";

function App() {
  console.log(app); // 👈 Muestra tu app de Firebase en la consola

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Firestore + React 🔥
      </h1>
      <AddUser />
    </div>
  );
}

export default App;
