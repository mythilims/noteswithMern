import{ Route, Routes ,BrowserRouter} from "react-router-dom";
import React, { Suspense } from 'react';
import Loading from "./components/Loading";
const Login=React.lazy(()=> import ("./pages/Login"));
const NotesList = React.lazy(()=>import ("./pages/NotesList"));
const ProtectedRoute =React.lazy(()=>import ("./ProtectedRoute/ProtectedRoute"));

function App() {
  return (
    <>
    <Suspense fallback={<Loading />}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />

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
    </Suspense>
    </>
  );
}

export default App;
