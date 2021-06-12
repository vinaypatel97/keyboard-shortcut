import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AllScreen = ({ screens }) => {

    if (!screens || !screens.length) return null;

    return (
        <div className="screen-grid">
            {
                screens.map(doc => (
                    <div key={doc.id} className="cp">
                        <Link to={{
                            pathname: `screen/${doc.id}`,
                            id: doc.id
                        }}>
                            <div className="screen-wrap">
                                <div className="light1">Your Custom Screen - <span className="bold font30">{doc.name}</span></div>
                            </div>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default AllScreen;