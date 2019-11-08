import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from '../containers/Screen';
import Checkout from '../containers/Checkout';
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import Login from '../containers/Login';
import NotFound from '../containers/NotFound';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;