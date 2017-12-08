import glamorous from 'glamorous';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NavLink, Route, HashRouter as Router, Switch } from 'react-router-dom';
import { addLanguage } from 'illuminate-js';
import { javascript } from 'illuminate-js/lib/languages/javascript';

import './styles';

import { DateRangePickerControlExample } from './DateRangePickerControlExample';
import DateRangePickerExample from './DateRangePickerExample';
import { SingleDatePickerControlExample } from './SingleDatePickerControlExample';
import { SingleDatePickerExample } from './SingleDatePickerExample';

addLanguage('js', javascript);

const Container = glamorous('div')({
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'stretch'
});

const SideBar = glamorous('aside')({
    width: '250px',
    padding: 0,
    borderRight: '1px solid #ddd',
    background: 'white',
    color: '#444'
});

const Content = glamorous('div')({
    width: 'calc(100% - 250px)',
    padding: '8px',
    overflowX: 'hidden',
    overflowY: 'auto'
});

const Link = glamorous(NavLink)({
    display: 'block',
    padding: '8px 16px',
    color: '#444',
    textDecoration: 'none',
    fontSize: '14px',
    background: 'transparent',
    transition: 'background 0.4s ease-out',
    '&.active': {
        background: 'rgba(0, 0, 0, 0.12)',
        '&::after': {
            content: '"➤"',
            float: 'right'
        }
    }
});

const Title = glamorous('h1')({
    fontWeight: 'normal',
    padding: '16px',
    margin: 0,
    fontSize: '24px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
});

function App() {
    return (
        <Container>
            <SideBar>
                <Title>React DateRange</Title>
                <Link activeClassName="active" exact to="/daterange-picker">
                    DateRange Picker
                </Link>
                <Link activeClassName="active" exact to="/daterange-picker-control">
                    DateRange Picker Control
                </Link>
                <Link activeClassName="active" exact to="/singledate-picker">
                    SingleDate Picker
                </Link>
                <Link activeClassName="active" exact to="/singledate-picker-control">
                    SingleDate Picker Control
                </Link>
            </SideBar>
            <Content>
                <Switch>
                    <Route exact path="/daterange-picker" component={DateRangePickerExample} />
                    <Route
                        exact
                        path="/daterange-picker-control"
                        component={DateRangePickerControlExample}
                    />
                    <Route exact path="/singledate-picker" component={SingleDatePickerExample} />
                    <Route
                        exact
                        path="/singledate-picker-control"
                        component={SingleDatePickerControlExample}
                    />
                </Switch>
            </Content>
        </Container>
    );
}

const Routes = (
    <Router>
        <App />
    </Router>
);

ReactDOM.render(Routes, document.getElementById('main'));
