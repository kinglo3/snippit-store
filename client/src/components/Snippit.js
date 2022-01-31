import Axios from 'axios';
import React from 'react';

function Snippit({ snippit, getSnippits, editSnippit }) {

    async function deleteSnippit() {
        await Axios.delete(`http://localhost:4000/snippit/${snippit._id}`);

        getSnippits();
    }

    return (
        <div className='snippit'>
            {snippit.title && <h2>{snippit.title}</h2>}
            {snippit.description && <p>{snippit.description}</p>}
            {snippit.code && (
                <pre>
                    <code>{snippit.code}</code>
                </pre>
            )}
            <button onClick={() => editSnippit(snippit)}>Edit</button>
            <button onClick={deleteSnippit}>Delete</button>
        </div>
    );
}

export default Snippit;