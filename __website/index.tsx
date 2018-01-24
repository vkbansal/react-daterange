// import glamorous from 'glamorous';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import {
    MainWrapper,
    Sidebar,
    Content,
    Link,
    Nav,
    NavItem,
    NavHeading
} from '@vkbansal/scripts/components/DocumentationComponents';
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

function App() {
    return (
        <MainWrapper>
            <Sidebar>
                <NavHeading>React DateRange</NavHeading>
                <Nav>
                    <NavItem>
                        <Link exact to="/">
                            Home
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link exact to="/daterange-picker">
                            DateRangePicker
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link exact to="/daterange-picker-control">
                            DateRangePickerControl
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link exact to="/singledate-picker">
                            SingleDatePicker
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link exact to="/singledate-picker-control">
                            SingleDate PickerControl
                        </Link>
                    </NavItem>
                </Nav>
            </Sidebar>
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
        </MainWrapper>
    );
}

const Routes = (
    <Router>
        <App />
    </Router>
);

ReactDOM.render(Routes, document.getElementById('main'));
