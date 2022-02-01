import Axios from 'axios';
import React from 'react';
import "./Snippit.scss"

function Snippit({ snippit, getSnippits, editSnippit }) {

    async function deleteSnippit() {
        await Axios.delete(`http://localhost:4000/snippit/${snippit._id}`);

        getSnippits();
    }

    return (
        <div className='snippit'>
            <a href='/'>Test Link</a>
            {snippit.title && <h2 className='title'>{snippit.title}</h2>}
            {snippit.description && <p className='description'>{snippit.description}</p>}
            {snippit.code && (
                <pre className='code'>
                    <code>{snippit.code}</code>
                </pre>
            )}
            <button className='btn-edit' onClick={() => editSnippit(snippit)}>Edit</button>
            <button className='btn-delete' onClick={deleteSnippit}>Delete</button>
        </div>
    );
}

export default Snippit;