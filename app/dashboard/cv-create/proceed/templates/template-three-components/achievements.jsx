'use client'
import { useEffect, useState } from "react";
import { Input, Button, Card, Modal, Divider } from "react-daisyui";
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


    useEffect(() => {
        getAwards();
    }, []);

    return (  
        <div>

            <p className="mb-2 font-bold">Awards</p>

            {
                awards.length > 0 ? (awards.map((award, index) => (
                    <div className="mb-8" key={index}>
                        <p className="text-amber-600 font-bold mb-2 text-lg">{award.award}</p>
                        <div className="pl-3 text-sm">
                            <ul style={{ listStyleType: 'disc' }}>
                                <li>{award.description}</li>
                            </ul>
                        </div>
                        
                    </div>
                   
                ))) : <div></div>
            }

            <Divider></Divider>
            
        </div>
    );
}
 
export default Award;