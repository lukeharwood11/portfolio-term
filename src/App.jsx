import './App.css';
import { HomePage } from './home/home.page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layout';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Layout /> }>
					<Route index element={<HomePage/>} />
				</Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
