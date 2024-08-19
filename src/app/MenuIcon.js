

import React, { useState } from 'react';

const MenuIcon = () => {
    const [showMenu, setShowMenu] = useState(false);

    const handleMouseEnter = () => {
        setShowMenu(true);
    };

    const handleMouseLeave = () => {
        setShowMenu(false);
    };

    return (
        <div
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#ff002f', color: '#ffffff', borderRadius: '5px', fontFamily: 'monospace' }}>
                ☰ MENU
            </div>

            {showMenu && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        backgroundColor: '#ff002f',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '5px',
                        zIndex: 1
                    }}
                >
                    <div
                        style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #ccc' }}
                        onClick={() => console.log('Add User')}
                    >
                        Add User
                    </div>
                    <div
                        style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #ccc' }}
                        onClick={() => console.log('Remove User')}
                    >
                        Remove User
                    </div>
                    <div
                        style={{ padding: '10px', cursor: 'pointer' }}
                        onClick={() => console.log('Look for a User')}
                    >
                        Look for a User
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuIcon;
