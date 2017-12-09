import * as React from 'react';
import snarkdown from 'snarkdown';

import { Illuminate } from 'react-illuminate';
export interface IPropsTableProps {
    docs: any;
}

function mapObject<A extends object, B>(m: A, callback: (v: any, k: string, m: A) => B): B[] {
    let array: B[] = [];

    for (let key in m) {
        array.push(callback(m[key], key, m));
    }

    return array;
}

export class PropsTable extends React.Component<IPropsTableProps> {
    cleanUpType(type: string) {
        let tmp = type
            .split(' | ')
            .filter(t => t !== 'undefined')
            .join(' | ');

        return tmp;
    }

    refineType(type: string, name: string) {
        if (name === 'locale') return 'Object';
        if (type.indexOf('"') > -1) return 'string';

        return type;
    }

    render() {
        const { docs: { props, description } } = this.props;
        let [desc, usage] = description.split('@example');

        if (usage) usage = usage.trim();

        return (
            <div>
                <p>{desc}</p>

                {usage && (
                    <div>
                        <h2>Usage</h2>
                        <Illuminate lang="js">{usage.replace(/\\t/g, ' ')}</Illuminate>
                    </div>
                )}
                <h2>API</h2>
                <table className="pure-table pure-table-bordered">
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>type</th>
                            <th>Required?</th>
                            <th>description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mapObject(props, (prop, key) => {
                            if (key === 'children') return null;

                            let { description, defaultValue, required } = prop;
                            const type = this.cleanUpType(prop.type.name);
                            const refinedType = this.refineType(type, key);

                            if (type !== refinedType && refinedType === 'string') {
                                description += ` (one of the following: ${type.replace(
                                    /\s\|/g,
                                    ','
                                )})`;
                            }

                            if (defaultValue) {
                                description +=
                                    defaultValue.value.length > 50
                                        ? `<div style='max-width: 500px'><p>The default value is:</p>
    ${defaultValue.value}
</div>`
                                        : ` The default value is \`${defaultValue.value}\``;
                            }

                            return (
                                <tr key={key}>
                                    <td>
                                        <code>{key}</code>
                                    </td>
                                    <td>
                                        <code>{refinedType}</code>
                                    </td>
                                    <td>{required ? 'Yes' : 'No'}</td>
                                    <td
                                        dangerouslySetInnerHTML={{ __html: snarkdown(description) }}
                                    />
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
