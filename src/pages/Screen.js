import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShortCut from '../components/ShortCut';
import Listner from '../utils/listner';
import { SCREENS_DATA } from '../utils/constant';
import { callbackFn } from '../utils/callback';

// Creating an instance of Listner Class
const listnerInstance = new Listner();


const Screen = (props) => {
    const { location } = props;
    const { id } = location;
    const [shortcutStr, setShortcutStr] = useState("");
    const [desc, setDesc] = useState("");
    const [cb, setCb] = useState("");
    const [data, setData] = useState([]);
    const [screens, setScreens] = useState([]);

    useEffect(() => {
        if (screens && screens.length > 0) {
            localStorage.setItem(SCREENS_DATA, JSON.stringify([...screens]));
        }
    }, [screens])

    useEffect(() => {
        // initial data setup
        const callerFn = async () => {
            const data = await JSON.parse(localStorage.getItem(SCREENS_DATA));
            setScreens(data);
            setScreenData(data);
            if (data && data.length > 0) {
                const screenObj = data.find((obj) => {
                    return obj.id === id
                })
                if (screenObj) {
                    setInitialShortCuts(screenObj);
                    setData(screenObj);
                } else {
                    props.history.goBack();
                }
            }
        }
        callerFn();
    }, []);

    useEffect(() => {
        // unregistration of the events
        listnerInstance.reset();
    }, [])

    const setInitialShortCuts = (screenObj) => {
        // register all the current screen's events at initial load
        const arr = screenObj && screenObj.shortCuts.map((elm) => {
            return {
                "on_keydown": () => {
                    callbackFn[elm.cb] && callbackFn[elm.cb](elm.desc);
                },
                "keys": elm.shortcutStr,
            }
        })
        listnerInstance.registerScreenListner(arr);
    }

    const setScreenData = (data) => {
        if (data && data.length > 0) {
            const screenObj = data.find((obj) => {
                return obj.id === id
            })
            setData(screenObj);
        }
    }

    const onChangeHandler = (type, value) => {
        switch (type) {
            case 'shortcutStr':
                setShortcutStr(value);
                break;
            case 'desc':
                setDesc(value);
                break;
            case 'cb':
                setCb(value);
                break;
            default:
                break;
        }
    }

    const checkIfShortCutExist = (shortCutStr) => {
        if (data && data.shortCuts && data.shortCuts.length > 0) {
            return data.shortCuts.some((elm) => {
                return elm.shortcutStr.trim().toLowerCase() === shortCutStr.trim().toLowerCase()
            })
        }
        return false;
    }

    const addShortCutHandler = () => {
        // register a new event from user input
        if (shortcutStr !== "" && desc !== "" && cb !== "") {
            const isExist = checkIfShortCutExist(shortcutStr.trim());
            if (isExist) {
                alert('Shortcut already exists...');
                return;
            }

            const response = listnerInstance.addListner(shortcutStr.trim(), desc, callbackFn[cb]); // response can be undefined or Object
            if (!response) {
                alert('Something went wrong !!  It seems like you have not entered relavant details');
            } else {
                addShortCutObj({
                    shortcutStr,
                    desc,
                    cb
                });
            }
            setShortcutStr("");
            setDesc("");
            setCb("");
        } else {
            alert('Please fill all the fields *')
        }
    }

    const addShortCutObj = (obj) => {

        screens.forEach((elm) => {
            if (elm.id === id) {
                elm.shortCuts.push(obj);
            }
        })
        setScreenData([...screens]);
        setScreens([...screens]);
    }

    function getShortCuts(shortCuts) {
        return shortCuts.map((obj, index) => {
            return (
                <ShortCut obj={obj} index={index} />
            )
        })
    }

    function getCallBackString() {
        return Object.keys(callbackFn).map((elm, index) => {
            return (
                <div className="item" id={`cb_${index}`}>
                    <div className="header">{elm}</div>
                </div>
            )
        })
    }

    return (
        <div className='ui container'>
            <div className="marginTB20">
                <Link to="/">
                    <button className="ui button blue">GO BACK</button>
                </Link>
            </div>
            <div className="dFlex sb">
                {
                    data && data.shortCuts && data.shortCuts.length > 0 &&
                    <>
                        <div>
                            <h4 className="margin10 bb">{`List Of Shortcuts For Your Selected Screen - ${data && data.name}`}</h4>
                            <div className="ui list margin10">
                                {getShortCuts(data.shortCuts)}
                            </div>
                        </div>
                        <div className="width50">
                            <h4 className="margin10 bb">Result Box</h4>
                            <div className="ui cards displayBox" id="displayBox">
                                <div className="card">
                                    Description:
                                    <div className="content"></div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>

            <div className="margin10 marginT50">
                <h2>Create Your ShortCut</h2>
                <div className="dFlex column">
                    <div className="ui input labeled margin10">
                        <div className="ui label">
                            Shortcut
                        </div>
                        <input type="text" placeholder="shift y" onChange={(e) => onChangeHandler('shortcutStr', e.target.value)} value={shortcutStr} />
                    </div>
                    <div className="ui input labeled margin10">
                        <div className="ui label">
                            Description
                        </div>
                        <input type="text" placeholder="description" onChange={(e) => onChangeHandler('desc', e.target.value)} value={desc} />
                    </div>
                    <div className="ui input labeled margin10">
                        <div className="ui label">
                            Callback Fn
                        </div>
                        <input type="text" placeholder="turnYellow/turnGreen/turnRed" onChange={(e) => onChangeHandler('cb', e.target.value)} value={cb} />
                    </div>
                    <button className='ui button blue half-width width50' onClick={addShortCutHandler}>Add Short Cut</button>
                </div>
            </div>

            <div className="margin10">
                <h4 className="bb">Available Callback  : </h4>
                <div>
                    <div className="ui list">
                        {getCallBackString()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Screen;