// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import Button from "./components/button.js";
// import Audioblock from "./components/audioblock.tsx";
import { audioCall } from "./utils/utils.ts";

import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/hello")
      .then(res => res.json())
      .then(data => setMsg(data.message));
  }, []);

  async function handleClick() {
    const res = await audioCall();
    console.log("Response from backend:", res);
    setDetail(res ?? "");
  }



  return ( <div className="flex h-screen items-center justify-center bg-gray-800 text-white text-2xl font-bold">
     <h1>{msg}</h1>
     <div>
       <h2>Voice Swap</h2>
     </div>
      <Button onClick={handleClick} variant="primary">
        Click Me
      </Button>
      <p>{detail}</p>
      {/* <Audioblock /> */}
    </div>
 
  );
}

export default App;
