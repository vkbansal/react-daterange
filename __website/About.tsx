import * as React from 'react';
import { Illuminate } from 'react-illuminate';

export interface AboutProps {}

export class About extends React.Component<AboutProps> {
    render() {
        return (
            <div>
                <h1>React DateRange</h1>
                <p>Light weight DateRange Component in react</p>
                <h2>Install</h2>
                <Illuminate lang="bash">npm install --save react-daterange</Illuminate>
            </div>
        );
    }
}
