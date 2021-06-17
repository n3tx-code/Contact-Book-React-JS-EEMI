import React, {useEffect, useState} from "react";

import {Contact} from "../object/contact";
import '../componentsStyle/ContactList.css'
import {getContacts} from "../store";

function ContactList(props: any) {

    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        const generateContactsList = async () => {
            const contactListResponse = await getContacts();
            props.setContacts(contactListResponse);
            const contactList = await props.state.contacts;
            setContacts(contactList.filter((contact: Contact) => {
                if (contact.forname.toLowerCase().includes(props.state.searchValue.toLowerCase()) ||
                    contact.name.toLowerCase().includes(props.state.searchValue.toLowerCase())) {
                    contact.birthDate = new Date(contact.birthDate)
                    return contact;
                }

            }))

        };
        generateContactsList();

    }, [props])
    return (
        <div>
            {contacts.map((contact: Contact, id: number) =>
                <div key={id} className={'row'}>
                    <div className={"col-12 contact-wrapper animate__animated animate__fadeIn"}
                         onClick={() => props.openRightPanel(contact)}>
                        <h5>{contact.name} {contact.forname}</h5><br/>
                        {contact.birthDate.toLocaleDateString()}<br/>
                        <a href={"mailto:" + contact.email}>{contact.email}</a><br/>
                        <a href={"tel:" + contact.phone}>{contact.phone}</a>
                    </div>
                </div>
            )}
            {contacts.length === 0 && (
                <div id="no-contact" className={"animate__animated animate__bounce"}>Aucun contact</div>
            )}
        </div>
    );
}

export default ContactList;