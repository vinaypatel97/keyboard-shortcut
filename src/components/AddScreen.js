import React, { useState } from 'react';

const AddScreen = ({ addScreen }) => {

    const [screenName, setScreenName] = useState("");

    const onChangeHandler = (e) => {
        setScreenName(e.target.value);
    }

    const addScreenHandler = () => {
        if (screenName !== "") {
            addScreen(screenName);
            setScreenName("");
        }
    }

    return (
        <div className="marginT50">
            <h3>Add Screen</h3>
            <div className="dFelx">
                <div className="ui input margin10">
                    <input type="text" placeholder="Screen Name..." onChange={onChangeHandler} value={screenName} />
                </div>
                <button className='ui button margin10 blue' onClick={addScreenHandler}>Add Screen</button>
            </div>

        </div>
    )
}

export default AddScreen;