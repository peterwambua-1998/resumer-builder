'use client'
import { useEffect, useState } from 'react';
import ResumeAi from '../openiai/page';
import { Input } from 'react-daisyui';

const CreateResume = () => {
    const [showJobDescriptionInput, setShowJobDescriptionInput] = useState(true);
    // const [summary, setSummary] = useState(null);

    // async function getSummary() {
    //     const response = await ResumeAi();
    //     console.log(response);
    // }

    // useEffect(() => {
    //     getSummary();
    // }, [])

    return (  
        <div>
            {showJobDescriptionInput ? 
            <div className='p-10'>
                <Input type='text' placeholder='Enter job description here...' />
            </div> 
            : 
            <div></div>
            }
        </div>
    );
}
 
export default CreateResume;