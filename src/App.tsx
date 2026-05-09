import { Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { LoginForm } from "./components/LoginForm";

import { QueriesPage } from "./pages/QueriesPage";
import { SearchPage } from "./pages/SearchPage";

import { ModalPortal } from "./components/ModalPortal";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";

import { useScrollToTopFromTouchEnd } from "./hooks/useScrollToTopFromTouchEnd";

import "normalize.css";
import "./App.css";

function App() {
  useScrollToTopFromTouchEnd();
  return (
    <>
      <div className="modal" id="modal"></div>
      <div className="mainContainer">
        <ModalPortal />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<SearchPage />} />
              <Route path="queries" element={<QueriesPage />} />
            </Route>
          </Route>
          <Route element={<PublicRoute />}>
            <Route index path="login" element={<LoginForm />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
