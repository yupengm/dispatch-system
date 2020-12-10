
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import '../styles/App.css';
import WelcomePage from "./WelcomePage";
import Track from "./Track";

function App() {
  return (
      <Router>
    <div className="App">
      <Header />
      <div>
          <Switch>
              <Route path="/home" component={WelcomePage} />
              <Route path="/package" component={Main}/>
              <Redirect from="/" exact to="/home" />
          </Switch>
      </div>
      <Footer />
    </div>
      </Router>
  );
}

export default App;
