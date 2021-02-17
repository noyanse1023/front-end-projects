import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch'

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-3">
          <FileSearch onFileSearch={(value) => {console.log('value', value)}} />
        </div>
        <div className="col-9">
          right
        </div>
      </div>
    </div>
  );
}

export default App;
