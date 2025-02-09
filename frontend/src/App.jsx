import {Routes,Route} from "react-router-dom"

import SignUp from "./pages/signUp/SignUp.jsx"


function App() {
  return (
    <div>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
