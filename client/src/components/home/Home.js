import React, { useEffect, useState } from 'react';
import Axios from "axios";

const Home = () => {
    const [snippits, setSnippits] = useState([]);

    useEffect(() => {
        //get the snippits
        getSnippits();
    }, []);

    async function getSnippits() {
        const snippitsRes = await Axios.get("http://localhost:4000/snippit/");
        setSnippits(snippitsRes.data);
    }

    return (
        <div className='home'>Home</div>
    );
}

export default Home;