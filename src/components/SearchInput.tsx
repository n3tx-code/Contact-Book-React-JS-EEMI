import React from "react";
import '../componentsStyle/SearchInput.css'

function SearchInput(props: any) {

    const inputHandler = (e: any) => {
        if (e !== null && e.target !== null && e.target.value)
            props.setSearchValue(e.target.value)
        else
            props.setSearchValue('')
    }

    return (
        <div id="search">
            <input type={"text"} placeholder="Search for a user"
                   onKeyUp={(event) => inputHandler(event)}
            />
        </div>
    );
}

export default SearchInput;