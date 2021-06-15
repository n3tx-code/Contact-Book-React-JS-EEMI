import React from "react";
import '../componentsStyle/NewContactButton.css';

function NewContactButton(props: any) {
    return (
        <button id={"new-btn"} onClick={() => props.openRightPanel(null)}>New</button>
    );
}

export default NewContactButton;