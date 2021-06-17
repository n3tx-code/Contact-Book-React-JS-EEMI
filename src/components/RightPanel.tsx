import React, {useEffect, useState} from "react";
import '../componentsStyle/RightPanel.css';
import {Button, Col, Row, Form,} from "react-bootstrap";
import {getContacts} from "../store";
import {registerLocale} from "react-datepicker";
import DatePicker from "react-datepicker";
import fr from 'date-fns/locale/fr';

import "react-datepicker/dist/react-datepicker.css";

registerLocale('fr', fr)

function RightPanel(props: any) {
    const [closing, setClosing] = useState(false);
    const [name, setName] = useState("");
    const [forname, setFormane] = useState("");
    const [birthDate, setBirthDate] = useState(new Date());
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (props.state.contactRightPanel != null) {
            setName(props.state.contactRightPanel.name);
            setFormane(props.state.contactRightPanel.forname);
            setBirthDate(new Date(props.state.contactRightPanel.birthDate));
            setEmail(props.state.contactRightPanel.email);
            setPhone(props.state.contactRightPanel.phone);
        }
    }, [])

    const handleClose = () => {
        setClosing(true);
    }

    const formHandler = async (e: any) => {
        e.preventDefault()
        try {
            let contact = {
                name: name,
                forname: forname,
                birthDate: birthDate,
                email: email,
                phone: phone
            };
            let response;
            if (props.state.contactRightPanel) {
                // update
                response = await fetch('http://localhost:3004/contacts/' + props.state.contactRightPanel.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(contact)
                });
            } else {
                // creation
                response = await fetch('http://localhost:3004/contacts/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(contact)
                });
            }

            if (response.ok) {
                props.updateContactList(getContacts());
                if (!props.state.contactRightPanel) {
                    handleClose();
                }
            }
        } catch (err) {
            alert('Mauvaise réponse du serveur')
        }
    }

    const deleteHandler = async () => {
        try {
            let response = await fetch('http://localhost:3004/contacts/' + props.state.contactRightPanel.id, {
                method: 'DELETE',
            });
            if (response.ok) {
                props.updateContactList(getContacts());
                handleClose();
            }
        } catch (err) {
            alert('Mauvaise réponse du serveur')
        }
    }

    return (
        <div id={'right-panel'} style={closing ? {backgroundColor: "transparent"} : undefined}>
            <Row>
                <Col lg={{span: 4, offset: 8}} id={'right-panel-content'}
                     className={`animate__animated animate__fast ${closing ? "animate__bounceOutRight" : "animate__bounceInRight"}`}
                     onAnimationEnd={closing ? props.closeRightPanel : undefined}>
                    <Button variant="dark" id={'right-panel-close'} onClick={() => handleClose()}>X</Button>
                    <h2>
                        {props.state.contactRightPanel
                            ?
                            <div>
                                <Row>
                                    <Col>
                                        Modify {props.state.contactRightPanel.name} {props.state.contactRightPanel.forname}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col id={"contact-delete"}>
                                        <Button variant="link" onClick={deleteHandler}>Delete</Button>
                                    </Col>
                                </Row>
                            </div>
                            : "Add contact"
                        }
                    </h2>
                    <Form onSubmit={formHandler}>
                        <Form.Group controlId="contactName">
                            <Form.Label className={'mt-4'}>Name</Form.Label>
                            <Form.Control type="text" placeholder="Contact name" value={name}
                                          onChange={(e) => setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="contactForName">
                            <Form.Label className={'mt-4'}>Forname</Form.Label>
                            <Form.Control type="text" placeholder="Contact forname" value={forname}
                                          onChange={(e) => setFormane(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="contactBirthDate">
                            <Form.Label className={'mt-4'}>Birth date</Form.Label><br/>
                            <DatePicker selected={birthDate} onChange={(date: Date) => setBirthDate(date)}
                                        dateFormat="dd/MM/Y" locale="fr" maxDate={new Date()}/>
                        </Form.Group>
                        <Form.Group controlId="contactEmail">
                            <Form.Label className={'mt-4'}>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Contact email" value={email}
                                          onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="contactPhone">
                            <Form.Label className={'mt-4'}>Phone</Form.Label>
                            <Form.Control type="text" placeholder="Contact phone" value={phone}
                                          onChange={(e) => setPhone(e.target.value)}/>
                        </Form.Group>
                        <Row className={'mt-4 p-3'}>
                            <Button type={'submit'} block>
                                {props.state.contactRightPanel
                                    ? 'Modify'
                                    : 'Add'
                                }
                            </Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default RightPanel;