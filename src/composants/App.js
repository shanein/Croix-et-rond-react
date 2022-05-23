import logo from '../logo.svg';
import '../App.css';
import Content from './Content.js';

const MyCustomAppTitle = (props) => <h1>{props.title || "Default title"}</h1>

function App() {
  return (
    <div className="App">
        <MyCustomAppTitle title="Croix et rond"/>
        <Content />
    </div>
  );
}

export default App;
