'use client'
import { useEffect, useState } from 'react';
import ResumeAi from '../openiai/page';
import { Input } from 'react-daisyui';
import ProfileDetails from '../cv-create/proceed/templates/add-edit/profile';
import AboutAddEdit from '../cv-create/proceed/templates/add-edit/about';
import ExperienceAddEdit from '../cv-create/proceed/templates/add-edit/experience';
import EducationAddEdit from '../cv-create/proceed/templates/add-edit/education';
import SkillAddEdit from '../cv-create/proceed/templates/add-edit/skills';
import AwardAddEdit from '../cv-create/proceed/templates/add-edit/awards';
import ReferencesEditDelete from '../cv-create/proceed/templates/add-edit/references';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/firebase';
import HobbiesAddEdit from '../cv-create/proceed/templates/add-edit/hobbies';
import Languages from '../cv-create/proceed/templates/add-edit/languages';
import LinksUser from '../cv-create/proceed/templates/add-edit/links';
import ProjectsAddEdit from '../cv-create/proceed/templates/add-edit/projects';
import Image from 'next/image';
import resumeImage from '@/app/images/peter2.png';

const CreateResume = () => {
    const [showJobDescriptionInput, setShowJobDescriptionInput] = useState(true);
    const [firebase_user, loading, error] = useAuthState(auth);

    // const [summary, setSummary] = useState(null);

    // async function getSummary() {
    //     const response = await ResumeAi();
    //     console.log(response);
    // }

    // useEffect(() => {
    //     getSummary();
    // }, [])

    return (
        <div className="md:grid md:grid-cols-4 bg-slate-200">
            <div className="bg-white pt-10 pl-5 pr-5">
                <ProfileDetails userId={firebase_user.uid} />
                <AboutAddEdit useId={firebase_user.uid} />
                <ExperienceAddEdit user_id={firebase_user.uid} />
                <EducationAddEdit userId={firebase_user.uid} />
                <SkillAddEdit user_id={firebase_user.uid} />
                <AwardAddEdit userId={firebase_user.uid} />
                <ReferencesEditDelete userId={firebase_user.uid} />
                <HobbiesAddEdit userId={firebase_user.uid} />
                <Languages userId={firebase_user.uid} />
                <LinksUser userId={firebase_user.uid} />
                <ProjectsAddEdit userId={firebase_user.uid} />
            </div>
            <div className="md:col-span-3 p-10">
                {showJobDescriptionInput ?
                    // job desc input
                    <div className='pl-8 pr-8  flex flex-col gap-10 items-center'>
                        <Image src={resumeImage} alt='ai-resume' width={120} height={120} className='w-[40%] h-[40%]' />
                        <div className='w-full text-center'>
                            <p className='font-semibold mb-4'>Welcome, spark up your resume</p>
                            <Input type='text' className='w-full bg-white border-amber-500' placeholder='Enter job description here...' />
                        </div>

                    </div>
                    :
                    // resume
                    <div></div>
                }
            </div>
        </div>
    );
}

export default CreateResume;