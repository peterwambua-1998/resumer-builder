'use client'

import { db } from "@/app/firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const Internship = ({userId}) => {
    const [visibleEdu, setVisibleEdu] = useState(false);
    const [internships, setInternships] = useState([]);

    function getInternships() {
        try {
            let internshipRef = collection(db, 'internships_volunteer_work');
            let q = query(internshipRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setInternships([]);
                docs.forEach(doc => {
                    let docId = doc.id;
                    const documentData = doc.data();
                    const newData = { ...documentData, id: docId };
                    setInternships(prev => [...prev, newData]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInternships();
    },[]);

    
    return (  
        <div>
            
        </div>
    );
}
 
export default Internship;