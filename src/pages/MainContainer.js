import React, { useState, useEffect } from 'react';
import AddScreen from '../components/AddScreen';
import AllScreen from '../components/AllScreen';
import { v4 as uuid } from 'uuid';
import { SCREENS_DATA } from '../utils/constant';

const MainContainer = () => {
    const [screens, setScreens] = useState([]);

    useEffect(() => {
        setScreens(JSON.parse(localStorage.getItem(SCREENS_DATA)));
    }, [])

    useEffect(() => {
        if (screens && screens.length > 0) {
            localStorage.setItem(SCREENS_DATA, JSON.stringify([...screens]));
        }
    }, [screens])

    const addScreen = (name) => {
        const screenObj = {
            id: uuid(),
            name: name,
            shortCuts: []
        }

        const data = screens && screens.length ? [...screens, screenObj] : [screenObj];
        setScreens(data);
    }

    return (
        <div className='ui container'>
            <AddScreen
                addScreen={addScreen}
            />
            <AllScreen screens={screens} />
        </div>
    )
}

export default MainContainer;