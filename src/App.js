import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from "react-hot-toast";
import LoginPage from './view/Auth/logIn';
import SignUpPage from './view/Auth/signUp';
import Dashboard from './view/Dashboard';
import store from './redux/store';
import Layout from './Components/Layout/lindex';
import MealList from './view/List';
import ErrorBoundary from './Components/ErrorBoundary';
import { AuthProvider } from './utils/AuthContext';


function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <AuthProvider>
          <Provider store={store}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/Sign-up" element={<SignUpPage />} />
                <Route path="/dashboard" element={<Layout element={<Dashboard />} />} />
                <Route path="/mealList" element={<Layout element={<MealList />} />} />
              </Routes>
            </BrowserRouter>
          </Provider>
          <Toaster position="top-right" />
        </AuthProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
