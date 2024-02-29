'use client'

import { db } from "@/app/firebase/firebase";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { Input } from "postcss";
import { useState } from "react";
import { Accordion, Modal } from "react-daisyui";

const Publications = () => {
    const [publications, setPublications] = useState([]);
    
    function getPublications() {
        try {
            let publicationsRef = collection(db, 'publications');
            let q = query(publicationsRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setPublications([]);
                docs.forEach(doc => {
                    let docId = doc.id;
                    const documentData = doc.data();
                    const newData = { ...documentData, id: docId };
                    setPublications(prev => [...prev, newData]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getPublications();
    }, []);

    return (  
        <div className="">
           
        </div>
    );
}
 
export default Publications;