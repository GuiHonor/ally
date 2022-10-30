import { GlobalStyle } from './GlobalStyle';
import './App.css';
import Form from './Components/Form/Form';
import Header from './Components/Header/Header';

function App() {
  return (
    <>
    <GlobalStyle/>
    <div className="App">
       
        <Header/>
       
        <Form></Form>

    </div>
 
   </>
  );
}

export default App;
