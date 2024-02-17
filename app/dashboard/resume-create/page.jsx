'use client'
import { useEffect, useState } from 'react';
import ResumeAi from '../openiai/page';

const CreateResume = () => {
    const [summary, setSummary] = useState(null);

    async function getSummary() {
        const response = await ResumeAi();
        console.log(response);
    }

    useEffect(() => {
        getSummary();
    }, [])

    return (  
        <div>
            <p>peter</p>
        </div>
    );
}
 
export default CreateResume;