import {Contact} from "./object/contact";

const initialState = {
    contacts: <Contact[]>[],
    searchValue: "",
    showRightPanel: false,
    contactRightPanel: null,
};

const getContacts = async () => {
    try {
        let response = await fetch("http://localhost:3004/contacts");
        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            throw Error;
        }
    } catch (err) {
        alert('Serveur local introuvable. Avez-vous bien lancer la commande yarn server ?')
    }
};

function reducer(state: any, action: { type: string, payload: any }) {
    switch (action.type) {
        case 'setContacts':
            return {
                contacts: action.payload, searchValue: state.searchValue, showRightPanel: state.showRightPanel,
                contactRightPanel: state.contactRightPanel
            };
        case 'setSearchValue':
            return {
                contacts: state.contacts,
                searchValue: action.payload,
                showRightPanel: state.showRightPanel,
                contactRightPanel: state.contactRightPanel
            };
        case 'rightPanel':
            let contactRightPanel = null;
            if (action.payload != null) {
                contactRightPanel = action.payload;
            }
            return {
                contacts: state.contacts,
                searchValue: state.searchValue,
                showRightPanel: !state.showRightPanel,
                contactRightPanel: contactRightPanel
            };
        default:
            throw new Error();
    }
}

export {reducer, initialState, getContacts}