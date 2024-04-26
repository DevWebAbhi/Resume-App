import logo from './logo.svg';
import './App.css';
import Dashboard from './Components/Dashboard';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
     <Dashboard/>
     </Provider>
    </div>
  );
}

export default App;
