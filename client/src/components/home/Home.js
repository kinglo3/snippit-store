import React, { useEffect, useState } from 'react';
import Axios from "axios";
import Snippit from './Snippit';
import SnippitEditor from './SnippitEditor';
import "./Home.scss";

const Home = () => {
    const [snippits, setSnippits] = useState([]);
    const [snippitEditorOpen, setSnippitEditorOpen] = useState(false);
    const [editSnippitData, setEditSnippitData] = useState(null);

    useEffect(() => {
        //get the snippits
        getSnippits();
    }, []);

    async function getSnippits() {
        const snippitsRes = await Axios.get("http://localhost:4000/snippit/");
        setSnippits(snippitsRes.data);
    }

    const editSnippit = (snippitData) => {
        setEditSnippitData(snippitData);
        setSnippitEditorOpen(true);
    }

    const renderSnippits = () => {
        let sortedSnippits = [...snippits];
        sortedSnippits = sortedSnippits.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        })

        return sortedSnippits.map((snippit, i) => {
            return <Snippit key={i} snippit={snippit} getSnippits={getSnippits} editSnippit={editSnippit} />
        })
    };

    return (
        <div className='home'>
            {!snippitEditorOpen && (
                 <button className='btn-edit-toggle' onClick={() => setSnippitEditorOpen(true)}>
                Add Snippit
                </button>
            )}
            {snippitEditorOpen && (
                <SnippitEditor 
                setSnippitEditorOpen={setSnippitEditorOpen}
                getSnippits={getSnippits}
                editSnippitData={editSnippitData}
                />
            )}
            {renderSnippits()}
        </div>
    );
}

export default Home;