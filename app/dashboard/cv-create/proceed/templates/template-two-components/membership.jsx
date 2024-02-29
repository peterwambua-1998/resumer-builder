'use client'

import { db } from "@/app/firebase/firebase";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, addDoc, collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Accordion, Badge, Button } from "react-daisyui";

const Memberships = () => {
    const [memberships, setMemberships] = useState([]);
    
    function getMemberships() {
        try {
            let membershipRef = collection(db, 'memberships');
            let q = query(membershipRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setMemberships([]);
                docs.forEach(doc => {
                    let docId = doc.id;
                    const documentData = doc.data();
                    const newData = { ...documentData, id: docId };
                    setMemberships(prev => [...prev, newData]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

   
    useEffect(() => {
        getInternships();
    }, []);


    return (  
        <div className="">
            
        </div>
    );
}
 
export default Memberships;