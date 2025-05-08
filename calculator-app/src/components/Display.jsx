import React from 'react';

function Display({result, calculation}) {
    return (
        <>
            <div id="display">{calculation || "0"}</div>
        </>
    )
}

export default Display;