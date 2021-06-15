import React, {useReducer} from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import ContactList from "./components/ContactList";
import {Col, Container, Row} from "react-bootstrap";
import SearchInput from "./components/SearchInput";
import {initialState, reducer} from "./store";
import NewContactButton from "./components/NewContactButton";
import RightPanel from "./components/RightPanel";
import {Contact} from "./object/contact";

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setContacts = (contacts: any) => {
        dispatch({type: 'setContacts', payload: contacts})
    }
    const setSearchValue = (searchValue: string) => {
        dispatch({type: 'setSearchValue', payload: searchValue});
    }
    const rightPanel = (contact: Contact) => {
        dispatch({type: 'rightPanel', payload: contact});
    }

    return (
        <Container id="app" fluid>
            <Row>
                <Col lg={{span: 8, offset: 2}}>
                    <Row id={"header"}>
                        <Col lg={{span: 4}}>
                            <SearchInput setSearchValue={setSearchValue}/>
                        </Col>
                        <Col lg={{span: 3, offset: 5}}>
                            <NewContactButton openRightPanel={rightPanel}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{span: 12}}>
                            <ContactList state={state} setContacts={setContacts} openRightPanel={rightPanel}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {state.showRightPanel && (
                <RightPanel state={state} closeRightPanel={rightPanel} updateContactList={setContacts}/>
            )}
        </Container>
    );
}

export default App;
