import React, { useEffect, useState } from 'react';
import Axios from "axios";
import Snippit from '../Snippit';

const Home = () => {
    const [snippits, setSnippits] = useState([]);
    const [newSnippitEditorOpen, setNewSnippitEditorOpen] = useState(false);
    const [editorTitle, setEditorTitle] = useState("");
    const [editorDescription, setEditorDescription] = useState("");
    const [editorCode, setEditorCode] = useState("");

    useEffect(() => {
        //get the snippits
        getSnippits();
    }, []);

    async function getSnippits() {
        const snippitsRes = await Axios.get("http://localhost:4000/snippit/");
        setSnippits(snippitsRes.data);
    }

    const renderSnippits = () => {
        return snippits.map((snippit, i) => {
            return <Snippit key={i} snippit={snippit} />
        })
    };

    async function saveSnippit(e) {
        e.preventDefault();

        const snippitData = {
            title: editorTitle ? editorTitle : undefined,
            description: editorDescription ? editorDescription : undefined,
            code: editorCode ? editorCode : undefined,
        };

        await Axios.post("http://localhost:4000/snippit/", snippitData);
    }

    return (
        <div className='home'>
            {!newSnippitEditorOpen && (
                 <button onClick={() => setNewSnippitEditorOpen(true)}>
                Add Snippit
                </button>
            )}
            {newSnippitEditorOpen && (
                 <div className='snippit-editor'>
                     <form onSubmit={saveSnippit}>
                         <label htmlFor="editor-title">Title</label>
                         <input id="editor-title" type="text" value={editorTitle}
                         onChange={(e) => setEditorTitle(e.target.value)} />

                         <label htmlFor="editor-description">Description</label>
                         <input id="editor-description" type="text" value={editorDescription}
                         onChange={(e) => setEditorDescription(e.target.value)} />

                         <label htmlFor="editor-code">Code</label>
                         <textarea id="editor-code" value={editorCode}
                         onChange={(e) => setEditorCode(e.target.value)} />

                         <button type='submit'>Save snippit</button>
                     </form>
                </div>
            )}
            {renderSnippits()}
        </div>
    );
}

export default Home;