'use client'

import { auth, db } from "@/app/firebase/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const CoverLetter = () => {
    const [coverLetterTitle, setCoverLetterTitle] = useState(null);
    // check if there is content in firebase and ai content
    const [queryingForJobDesc, setQueryForJobDesc] = useState(true);
    const [showJobDescriptionInput, setShowJobDescriptionInput] = useState(false);
    const [jobDescription, setJobDescription] = useState(null);
    const [firebase_user, loading, error] = useAuthState(auth);
    const [visible, setVisible] = useState(false);
    const [visibleSave, setVisibleSave] = useState(false);
    // store the response from open ai - cover letter content
    const [coverLetterAi, setCoverLetterAi] = useState([]);

    // modal content
    const toggleVisible = () => {
        setVisible(!visible);
    };

    const toggleVisibleSave = () => {
        setShowSaveAlert(false);
        setVisibleSave(!visibleSave);
    };


    async function getCoverLetterAi () {
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
            let resCoverLetterAi = [
                { id: 1, checked: false, coverLetter: res['version-1'] },
                { id: 2, checked: false, coverLetter: res['version-2'] }
            ];
            setCoverLetterAi(resCoverLetterAi);
            setQueryForJobDesc(false);
            setShowJobDescriptionInput(false);
            toggleVisible();
        } catch (error) {
            
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
        } else {
            // get the data from firebase and show resume as it was saved
            await getResumeDataAsItWas();
            setQueryForJobDesc(false);
            setShowJobDescriptionInput(false);
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

    return (  
        <div>cover letter</div>
    );
}
 
export default CoverLetter;