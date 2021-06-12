import React from 'react';

const ShortCut = ({ obj, index }) => {
    return (
        <a className="item" key={`list_${index}`}>
            <i className="right triangle icon"></i>
            <div className="content">
                <div className="header">{obj.shortcutStr}</div>
                <div className="description">{obj.desc}</div>
            </div>
        </a>
    )
}

export default ShortCut;