import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ListPage from "./pages/ListPage"
import AddPage from "./pages/AddPage"
// import { EditPage } from "./pages/EditPage"

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/add" element={<AddPage />} />
          {/* <Route path="/edit/:id" element={<EditPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

