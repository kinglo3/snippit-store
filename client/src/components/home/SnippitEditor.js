import React, { useEffect, useState } from 'react';
import Axios from "axios";
import "./SnippitEditor.scss";

function SnippitEditor({ getSnippits, setSnippitEditorOpen, editSnippitData }) {
    const [editorTitle, setEditorTitle] = useState("");
    const [editorDescription, setEditorDescription] = useState("");
    const [editorCode, setEditorCode] = useState("");

    useEffect(() => {
        if (editSnippitData) {
            setEditorTitle(editSnippitData.title ? editSnippitData.title : "");
            setEditorDescription(editSnippitData.description ? editSnippitData.description : "");
            setEditorCode(editSnippitData.code ? editSnippitData.code : "");
        }
    }, [editSnippitData]);

    async function saveSnippit(e) {
        e.preventDefault();

        const snippitData = {
            title: editorTitle ? editorTitle : undefined,
            description: editorDescription ? editorDescription : undefined,
            code: editorCode ? editorCode : undefined,
        };

        if (!editSnippitData)
            await Axios.post("http://localhost:4000/snippit/", snippitData);
        else
            await Axios.put(`http://localhost:4000/snippit/${editSnippitData._id}`, snippitData)

        getSnippits();
        closeEditor();
    }

    const closeEditor = () => {
        setSnippitEditorOpen(false);
        setEditorCode("");
        setEditorDescription("");
        setEditorTitle("");
    }

    return (
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

                         <button className='btn-save' type='submit'>Save</button>
                         <button className='btn-cancel' type="button" onClick={closeEditor}>
                             Cancel
                         </button>
                     </form>
                </div>
    );
}

export default SnippitEditor;