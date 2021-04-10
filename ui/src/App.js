import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';

import Questions from './components/questions/Questions';
import Container from "react-bootstrap/Container";

function App() {
  return (
    <Router>
        <Container fluid className='vh-100 vw-100'>
            <Switch>
                <Route path='/' component={Questions} />
                <Route path='/questions' component={Questions} />
            </Switch>
        </Container>
    </Router>
  );
}

export default App;
