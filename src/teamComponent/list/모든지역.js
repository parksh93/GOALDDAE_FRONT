import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/team/list" component={TeamList} />
            </Switch>
        </Router>
    );
}

export default App;