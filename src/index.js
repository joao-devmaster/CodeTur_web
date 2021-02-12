import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Paginas/conta/login';
import ResetarSenha from './Paginas/conta/resetarsenha';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {BrowserRouter as Router, Route,Redirect,Switch} from 'react-router-dom';
import DashBoard from './Paginas/Admin/dashboard';
import Pacote from './Paginas/Admin/pacotes';
import NotFound from './Paginas/notfound';

import './index.css';

import jwt_decode from 'jwt-decode';
import { ToastProvider } from 'react-toast-notifications';

const RotaPrivadaAdmin = ({component : Component, ...rest}) => (
  <Route 
    {...rest}
    render = { props => 
        localStorage.getItem('token-codetur') !== null && jwt_decode(localStorage.getItem('token-codetur')).role === 'Admin' ? 
          (<Component {...props} />) : 
          (<Redirect to={{ pathname :'/', state :{from : props.location}}} />)
    }
  />
);

const rotas = (
  <Router>
    <Switch>
      <Route path='/' exact component={Login} />
      <Route path='/resetar-senha' component={ResetarSenha} />
      <RotaPrivadaAdmin path='/admin' exact component={DashBoard} />
      <RotaPrivadaAdmin path='/admin/pacote' component={Pacote} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)
ReactDOM.render(
  <ToastProvider>
  {rotas}
  </ToastProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
