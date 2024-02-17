'use client'
import { useEffect, useState } from "react";
import { Input, Button, Card, Modal } from "react-daisyui";
import { collection, query, where, onSnapshot, Timestamp, addDoc } from "firebase/firestore"; 
import { db } from "@/app/firebase/firebase";

const Award = ({userId}) => {
    const [visibleEdu, setVisibleEdu] = useState(false);

    const [awards, setAwards] = useState([]);
    const [awardValue, setAwardValue] = useState(null);
    const [descriptionValue, setDescriptionValue] = useState(null);

    const [titleError, setTitleError] = useState(null);
    const [descriptionError, setDescriptionError] = useState(null);

    const toggleVisibleEdu = () => {
        setVisibleEdu(!visibleEdu);
    };

    function getAwards() {
        try {
            let awardsRef = collection(db, 'award');
            let q = query(awardsRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setAwards([]);
                docs.forEach(doc => {
                    setAwards(prev => [...prev, doc.data()]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }


    async function addAward() {
        if (!awardValue || awardValue == null) {
            setTitleError('field required');
        } else {
            setTitleError('');
        }

        if (!descriptionValue || descriptionValue == null) {
            setDescriptionError('field required');
        } else {
            setDescriptionError('');
        }

        try {
            const data = {
                user_id: userId,
                award: awardValue,
                description: descriptionValue,
                created_at: Timestamp.now()
            }
            
            const collectionRef =  collection(db, 'award');
            const res = await addDoc(collectionRef, data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAwards();
    }, []);

    return (  
        <div>
            <div className="mt-5 md:mt-10 md:pr-2 md:pl-2 lg:mt-10 lg:pl-4 lg:pr-4" >
                <p className="text-center text-[7px] md:text-base font-semibold border-b md:pb-2 lg:pb-2 border-[#808080] md:mb-5 lg:mb-5">Awards</p>
                {
                    awards.length > 0 ? (awards.map((award, index) => (

                        
                            <div className="pl-1 pr-1 md:pl-2 md:pr-2 lg:pl-8 lg:pr-8 mb-2 md:mb-5 lg:mb-5" key={index}>
                                <p className="font-semibold text-[6px] md:text-xs md:mb-2">{award.award}</p>
                                <p className="text-[5px] md:text-xs text-[#808080] m-line">{award.description}</p>
                            </div>
                    ))) : (<div className="text-[#808080] text-sm p-2 md:p-5 lg:p-5">You currently have no awards</div>)
                }
            </div>
            
        </div>
    );
}
 
export default Award;