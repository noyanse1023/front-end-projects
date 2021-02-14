import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch'

function App() {
  return (
    <div className="App container-fluid">
      <div class="row">
        <div class="col-3">
          <FileSearch title="我的云文档" onFileSearch={() => {}} />
        </div>
        <div class="col-9">
          right
        </div>
      </div>
    </div>
  );
}

export default App;
