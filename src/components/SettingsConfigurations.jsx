import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {Button, Checkbox, Input, Loader, Segment, Select, Table} from "semantic-ui-react";

const SettingsConfigurations = () => {
    const [initialWidth, setWidth] = useState(3);
    const configuration = useSelector(state => state.configReducer)
    const {t} = useTranslation()

    const DragHeaderCell = (e) => {
        return console.log(e.clientX, e.clientY)
    }

    if (configuration.isLoading) {
        return <Loader>{`${t('data_loading')}`}</Loader>
    }

    return (
        <Segment>
            {configuration.chosenConfig.map(setting => (
                <Table
                    singleLine
                    celled
                    fixed
                    key={setting.name}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell onMouseDown={e => DragHeaderCell(e)} width={initialWidth}>
                                {`${t(setting.name)}`}
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                {`${t('Permission.FieldsSettings')}`}
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {setting.columns.map(item => (
                            <Table.Row key={item.displayNameKey}>
                                <Table.Cell>
                                    {t(item.displayNameKey)}
                                    {
                                        item.isRequired ? (
                                            <span style={{fontSize: '20px', color: 'red'}}> *</span>
                                        ) : null
                                    }
                                </Table.Cell>
                                {
                                    item.type === 'Boolean' ? (
                                        <Table.Cell style={{marginTop: '1rem'}}>
                                            <Checkbox toggle/>
                                        </Table.Cell>
                                    ) : (
                                        item.type === 'Select' ? (
                                            <Table.Cell>
                                                <Select
                                                    options={[
                                                        {
                                                            key: '1',
                                                            value: '1',
                                                            text: '1',
                                                        }, {
                                                            key: '2',
                                                            value: '2',
                                                            text: '2',
                                                        },
                                                    ]} fluid/>
                                            </Table.Cell>
                                        ) : (
                                            <Table.Cell>
                                                <Input fluid type={item.type}/>
                                            </Table.Cell>
                                        )
                                    )
                                }
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ))}
            <Button.Group style={{marginTop: '2rem'}} floated={'right'}>
                <Button
                    style={{minWidth: '150px'}}
                    content={`${t(`CancelButton`)}`}
                    secondary/>
                <Button.Or/>
                <Button
                    style={{minWidth: '150px'}}
                    content={`${t(`SaveButton`)}`}
                    positive/>
            </Button.Group>
        </Segment>
    );
};

export default SettingsConfigurations;