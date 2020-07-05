import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Alerts } from './components/layout/Alerts';
import { Home } from './components/pages/Home';
import { About } from './components/pages/About';
import { ContactState } from './context/contact/ContextState';
import { AuthState } from './context/auth/AuthState';
import { AlertState } from './context/alert/AlertState';
import { Register } from './components/auth/Register'
import { Login } from './components/auth/Login';
import { setAuthToken } from './utils/setAuthToken';
import { PrivateRoute } from './components/routing/PrivateRoute';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>

          <Router>
            <div>
              <Navbar />
              <div className='container'>

                <Alerts />
                <Switch>

                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />

                </Switch>

              </div>
            </div>
          </Router>
          
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
