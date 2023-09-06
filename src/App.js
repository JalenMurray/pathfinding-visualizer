import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Grid from './components/grid/grid';
import CustomizeBar from './components/customize-bar/customize-bar';

function App() {
  return (
    <div className="App">
      <CustomizeBar />
      <Grid />
    </div>
  );
}

export default App;
