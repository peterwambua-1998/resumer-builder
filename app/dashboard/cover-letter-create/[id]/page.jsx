'use client'

import { auth, db } from "@/app/firebase/firebase";
import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { Accordion, Alert, Button, Checkbox, Divider, Input, Loading, Modal, Textarea, Toggle } from 'react-daisyui';
import { useAuthState } from "react-firebase-hooks/auth";
import WrapperCoverLetter from "../../cover-letter-design/wrapper";
import resumeImage from '@/app/images/rm2.png';
import Image from 'next/image';


const CoverLetter = ({ params }) => {
    const [coverLetterTitle, setCoverLetterTitle] = useState(null);
    // check if there is content in firebase and ai content
    const [queryingForJobDesc, setQueryForJobDesc] = useState(true);
    const [showJobDescriptionInput, setShowJobDescriptionInput] = useState(false);
    const [jobDescription, setJobDescription] = useState(null);
    const [firebase_user, loadings, error] = useAuthState(auth);
    const [visible, setVisible] = useState(false);
    const [visibleSave, setVisibleSave] = useState(false);
    // store the response from open ai - cover letter content
    const [coverLetterAi, setCoverLetterAi] = useState([]);
    const [activeAbout, setActiveAbout] = useState(null);

    const [viewHeight, setViewHeight] = useState('h-[120vh]');

    const [addressTo, setAddressedTo] = useState(null);

    const [loading, setLoading] = useState(false);

    // modal content
    const toggleVisible = () => {
        setVisible(!visible);
    };

    const toggleVisibleSave = () => {
        setShowSaveAlert(false);
        setVisibleSave(!visibleSave);
    };

    async function saveAddressTo() {
        setLoading(true);
        try {
            let coverLetterRef = doc(db, 'cover-letter', params.id);
            const res = await updateDoc(coverLetterRef, {
                'to': addressTo,
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }



    async function getCoverLetterAi() {
        // show loading spinner
        setQueryForJobDesc(true);

        let exps = `i would like a well crafted and creative cover letter based on job description. Job description is ${jobDescription}. My current about`;

        // about content
        const docRef = doc(db, "about", firebase_user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let about = docSnap.data()['description'];
            exps += `${about}.`;
        }

        // experience
        exps += "my experiences are ";
        const q = query(collection(db, "experience"), where("user_id", "==", firebase_user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let res = doc.data();
            exps += `${res.title} ${res.companyName} - ${res.employmentType} ${res.startDate} - ${res.endDate} ${res.location} - ${res.locationType} ${res.description}.`;
        });

        // get users skills
        exps += 'my skills include ';
        let skills = [];
        const qS = query(collection(db, "skill"), where("user_id", "==", firebase_user.uid));
        const querySnapshotS = await getDocs(qS);
        querySnapshotS.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let res = doc.data();
            exps += `${res.name},`;
        });


        // languages
        exps += 'languages i speak include ';
        const qL = query(collection(db, "languages"), where("user_id", "==", firebase_user.uid));
        const querySnapshotL = await getDocs(qL);
        querySnapshotL.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let res = doc.data();
            exps += `${res.name},`;
        });

        //hobbies
        let hobbies = [];
        exps += 'I also have hobbies like ';
        const qH = query(collection(db, "hobbies"), where("user_id", "==", firebase_user.uid));
        const querySnapshotH = await getDocs(qH);
        querySnapshotH.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let res = doc.data();
            exps += `${res.title},`;
        });

        exps += ' Be creative in making the cover letter wordings mix things up and give me two versions that is version-1 version-2. Always return JSON.';
        // add the rest of the content

        const options = {
            method: 'POST',
            body: JSON.stringify({
                "userContent": exps,
            }),
        };

        try {
            const aboutAI = await fetch('/api/open-ai-cover-letter', options);
            const res = await aboutAI.json();
            console.log(res);
            let resCoverLetterAi = [
                { id: 1, checked: false, coverLetter: res['version-1'] },
                { id: 2, checked: false, coverLetter: res['version-2'] }
            ];
            setCoverLetterAi(resCoverLetterAi);
            setQueryForJobDesc(false);
            setShowJobDescriptionInput(false);
            toggleVisible();
            setViewHeight('h-[100%]');
        } catch (error) {
            console.log(error);
        }
    }

    function setActive(value) {
        setActiveAbout(value);
    }

    function setChangedAboutAi(value, id) {
        const updatedAbout = coverLetterAi.map((checkbox) => {
            if (checkbox.id === id) {
                checkbox.coverLetter = value;
                if (checkbox.checked) {
                    setActiveAbout(value);
                }
                return { ...checkbox };
            } else {
                return { ...checkbox };
            }
        });
        setCoverLetterAi(updatedAbout);
    }

    function initiateSave() {
        toggleVisibleSave();
    }

    // check if the cover letter is already saved
    async function checkIfResumeIsSaved() {
        // get resume by id
        try {
            const coverLetterRef = doc(db, 'cover-letter', params.id);
            const res = await getDoc(coverLetterRef);
            let data = res.data();
            if (res) {
                let description = data['jobDescription'];
                if (description) {
                    // delete previous saved data
                    const q = query(collection(db, "cover-letter-ai-suggestions"), where("cover_letter", "==", params.id));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach(async (data) => {
                        if (data.data()) {
                            await deleteDoc(doc(db, 'cover-letter-ai-suggestions', data.id));
                        }
                    });
                }
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // determine if it has jo description first before even showing it
    async function detJobDesc() {
        const docRef = doc(db, "cover-letter", params.id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (data.jobDescription === null) {
            setQueryForJobDesc(false);
            setShowJobDescriptionInput(true);
            setViewHeight('h-[90vh]');
        } else {
            // get the data from firebase and show resume as it was saved
            await getResumeDataAsItWas();
            setQueryForJobDesc(false);
            setShowJobDescriptionInput(false);
            setViewHeight('h-[100%]');

        }
    }

    async function getResumeDataAsItWas() {
        try {
            //resume title
            const coverRef = doc(db, 'cover-letter', params.id);
            const res = await getDoc(coverRef);
            let data = res.data();
            if (data) {
                setCoverLetterTitle(data['title']);
                setJobDescription(data['jobDescription'])
            }

            // get about from firestore
            const q = query(collection(db, "cover-letter-ai-suggestions"), where("cover_letter", "==", params.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if (doc.data()) {
                    let data = doc.data();
                    let d = [
                        { id: data.letter_one_id, checked: data.letter_one_checked, about: data.letter_one_about },
                        { id: data.letter_two_id, checked: data.letter_two_checked, about: data.letter_two_about },
                    ]
                    setCoverLetterAi(d);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function saveResume() {
        // check if there is recent save if setSkillAiSaved has data
        let deletes = await checkIfResumeIsSaved();
        if (deletes) {
            //save resume at current state including ai suggestions including resume name
            try {
                let coverLetterRef = doc(db, 'cover-letter', params.id);
                let aiSuggestionsRef = collection(db, 'cover-letter-ai-suggestions');
                const res = await updateDoc(coverLetterRef, {
                    'title': coverLetterTitleTitle,
                    'jobDescription': jobDescription,
                });

                const aboutAiAboutResponse = await addDoc(aiSuggestionsRef, {
                    'resume_id': params.id,
                    'letter_one_id': aboutAi[0].id,
                    'letter_one_about': aboutAi[0].about,
                    'letter_one_checked': aboutAi[0].checked,
                    'letter_two_id': aboutAi[1].id,
                    'letter_two_checked': aboutAi[1].about,
                    'letter_two_about': aboutAi[1].checked,
                });

                setAboutAiSaved(aboutAiAboutResponse.id);

                setShowSaveAlert(true);

            } catch (error) {
                console.log(error);
            }
        }
    }

    function changeMarkedCheckBox(id) {
        const updatedCheckboxes = coverLetterAi.map((checkbox) => {
            return checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : { ...checkbox, checked: false }
        });
        setCoverLetterAi(updatedCheckboxes);
    }

    useEffect(() => {
        detJobDesc();
    }, []);

    return (
        <div className={"bg-slate-200 " + viewHeight + ""}>
            {
                queryingForJobDesc ?
                    <div className='text-center pt-[20%]'>
                        <p>Getting your resume ready, hang on!</p>
                        <Loading />
                    </div>

                    : showJobDescriptionInput ?


                        <div className='pl-8 pr-8 pt-16 flex flex-col gap-10 items-center'>
                            <Image src={resumeImage} alt='ai-resume' width={520} height={520} className='w-[40%] h-[40%]' />
                            {/* <Image src={resumeImage} alt='ai-resume' width={120} height={120} className='w-[40%] h-[40%]' /> */}
                            <div className='w-full text-center'>
                                <p className='font-semibold mb-4'>Welcome, spark up your cover letter</p>

                                <div className='border-amber-500 bg-white flex p-2 rounded-lg'>
                                    <Input onChange={(e) => setJobDescription(e.target.value)} type='text' className='w-full bg-transparent border-none rounded-none' placeholder='Enter job description here...' />
                                    <Button onClick={getCoverLetterAi}>submit</Button>
                                </div>
                            </div>
                        </div>

                        :
                        <div className="md:grid md:grid-cols-4 ">
                            <div className="bg-white pt-2 pl-5 pr-5 ">
                                <div className='mb-5'>
                                    <Button className='bg-amber-400 hover:bg-amber-500 text-black border-slate-400' onClick={initiateSave}>Save Resume</Button>
                                </div>
                                <Accordion defaultChecked className="bg-amber-400 text-black mb-3">
                                    <Accordion.Title className="text-xl font-medium text-black">
                                        <p className="text-base font-semibold">Ai Suggestions</p>
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <div className="form-control w-full grow">
                                            <div className="">
                                                <Button className="bg-amber-200 border-amber-500 text-black" onClick={toggleVisible}>Add / Edit</Button>
                                            </div>
                                        </div>
                                    </Accordion.Content>
                                </Accordion>


                                <Accordion className="bg-amber-400 text-black mb-3">
                                    <Accordion.Title className="text-xl font-medium text-black">
                                        <p className="text-base font-semibold">Addressed To</p>
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <div className="form-control w-full grow">
                                            <Input placeholder="To: Mr Joe / Mrs Pam" className="bg-white text-black" onChange={(e) => setAddressedTo(e.target.value)}/>
                                            <div className="">
                                                <Button className="bg-amber-200 border-amber-500 text-black" onClick={saveAddressTo} >{loading == true ? <Loading /> : ''} Save</Button>
                                            </div>
                                        </div>
                                    </Accordion.Content>
                                </Accordion>
                            </div>

                            <div className="md:col-span-3">

                                <div>
                                    <WrapperCoverLetter coverLetter={coverLetterAi} userId={firebase_user.uid} coverLetterId={params.id} />
                                </div>


                                <Modal.Legacy open={visible} className="bg-white max-w-5xl">
                                    <Modal.Header >
                                        <p className="text-lg mb-0 border-b pb-4">Ai Content suggestions</p>
                                    </Modal.Header>
                                    <Modal.Body className="p-0">
                                        <div className='border border-slate-500 rounded-lg p-6 w-full mb-8'>
                                            <p className='text-base mb-6'>About</p>
                                            {
                                                coverLetterAi.length > 0 ?
                                                    coverLetterAi.map((about, index) => (
                                                        <div className='flex gap-4 mb-3' key={index}>
                                                            <Checkbox
                                                                checked={about.checked}
                                                                color="primary"
                                                                value={about.coverLetter}
                                                                onClick={(e) => {
                                                                    setActive(e.target.value);
                                                                    changeMarkedCheckBox(about.id);
                                                                }}
                                                            />
                                                            <Textarea onChange={(e) => setChangedAboutAi(e.target.value, about.id)} defaultValue={about.coverLetter} className='w-full bg-white' />
                                                        </div>
                                                    ))
                                                    : ''
                                            }

                                        </div>
                                    </Modal.Body>
                                    <Modal.Actions>
                                        <Button type="button" onClick={toggleVisible} >Close</Button>

                                    </Modal.Actions>
                                </Modal.Legacy>
                            </div>
                        </div>



            }

        </div>

    );
}

export default CoverLetter;