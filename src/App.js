import { GlobalStyle } from './GlobalStyle';
import './App.css';
import Form from './Components/Form/Form';

function App() {
  return (
    
    
    <div className="App" style={{backgroundColor: 'white', height: "100vh", display: "flex", alignItems: "center"}}>
      <GlobalStyle/>
        <div style={{display: "flex", width: "100vw", justifyContent: "space-around"}}>
          <Form></Form>
        </div>
    </div>
   
  );
}

export default App;
