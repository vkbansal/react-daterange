import glamorous from 'glamorous';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NavLink, Route, HashRouter as Router, Switch } from 'react-router-dom';
import { addLanguage } from 'illuminate-js';
import { jsx } from 'illuminate-js/lib/languages/jsx';
import { bash } from 'illuminate-js/lib/languages/bash';

import './styles.css';

import { About } from './About';
import { DateRangePickerControlExample } from './DateRangePickerControlExample';
import { DateRangePickerExample } from './DateRangePickerExample';
import { SingleDatePickerControlExample } from './SingleDatePickerControlExample';
import { SingleDatePickerExample } from './SingleDatePickerExample';

addLanguage('js', jsx);
addLanguage('bash', bash);

const Container = glamorous('div')({
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'stretch'
});

const SideBar = glamorous('aside')('pure-menu', {
    width: '250px',
    padding: 0,
    background: '#eee',
    color: '#222'
});

const Content = glamorous('div')('container', {
    width: 'calc(100% - 250px)',
    padding: '16px',
    overflowX: 'hidden',
    overflowY: 'auto',
    boxShadow: '-2px 0px 8px -2px rgba(0, 0,0, 0.2)'
});

const Link = glamorous(NavLink)('pure-menu-link', {
    position: 'relative',
    transition: 'background 0.2s linear',
    '&:hover': {
        background: 'rgba(0, 0, 0, 0.07)'
    },
    '&.active': {
        color: '#e94949',
        '&::after': {
            opacity: 1
        }
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        display: 'block',
        width: 0,
        height: 0,
        border: '8px solid transparent',
        borderRightColor: '#fff',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        opacity: 0,
        transition: 'opacity 0.2s linear'
    }
});

function App() {
    return (
        <Container>
            <SideBar>
                <div className="pure-menu-heading">React DateRange</div>
                <ul className="pure-menu-list">
                    <li className="pure-menu-item">
                        <Link exact to="/">
                            Home
                        </Link>
                    </li>
                    <li className="pure-menu-item">
                        <Link exact to="/daterange-picker">
                            DateRangePicker
                        </Link>
                    </li>
                    <li className="pure-menu-item">
                        <Link exact to="/daterange-picker-control">
                            DateRangePickerControl
                        </Link>
                    </li>
                    <li className="pure-menu-item">
                        <Link exact to="/singledate-picker">
                            SingleDatePicker
                        </Link>
                    </li>
                    <li className="pure-menu-item">
                        <Link exact to="/singledate-picker-control">
                            SingleDate PickerControl
                        </Link>
                    </li>
                </ul>
            </SideBar>
            <Content>
                <Switch>
                    <Route exact path="/" component={About} />
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
