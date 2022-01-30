import React from 'react';

function Snippit({ snippit }) {
    return (
        <div className='snippit'>
            {snippit.title && <h2>{snippit.title}</h2>}
            {snippit.description && <p>{snippit.description}</p>}
            {snippit.code && (
                <pre>
                    <code>{snippit.code}</code>
                </pre>
            )}
        </div>
    );
}

export default Snippit;