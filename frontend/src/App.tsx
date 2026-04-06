// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/hello")
      .then(res => res.json())
      .then(data => setMsg(data.message));
  }, []);

  return ( <div className="flex h-screen items-center justify-center bg-gray-800 text-white text-2xl font-bold">
     <h1>{msg}</h1>
      App
    </div>
 
  );
}

export default App;
