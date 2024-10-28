import { useState, useEffect } from "react";
import "./App.css";
import { UsersWrapper } from "./wrappers/usersWrapper";

function App() {
  return (
    <div className="App">
      <UsersWrapper />
    </div>
  );
}

// type Message = { message: string; type: string };

// function App(): JSX.Element {
//   const [data, setData] = useState<Message | null>(null);
//   const url: string = "http://localhost:3001";

//   useEffect(() => {
//     fetch(`${url}/api`)
//       .then((res) => res.json())
//       .then((data: Message) => setData(data));
//   }, []);

//   return (
//     <>
//       <h1>React</h1>
//       <div className="card">
//         <p>{!data ? "Loading..." : data.message + " " + data.type}</p>
//       </div>
//     </>
//   );
// }

export default App;
