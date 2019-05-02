import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Homepage ,AddProducts, Report} from './layouts'

function App() {
  return (
    <Router>
    <div>
     <Switch>
       <Route exact path='/' component={Homepage}/>
       <Route path='/purchase' component={AddProducts}/>
       <Route path='/products' component={Report}/>
     </Switch>
    </div>

    </Router>
  );
}

export default App;
