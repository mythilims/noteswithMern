import { Route, Routes ,BrowserRouter} from "react-router-dom";
import Login from "./pages/Login";
import NotesList from "./pages/NotesList";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* Login Page */}
      <Route path="/" element={<Login />} />

      {/* Protected Notes Dashboard */}
      <Route
        path="/notesDashboard"
        element={
          <ProtectedRoute>
            <NotesList />
          </ProtectedRoute>
        }
      />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
