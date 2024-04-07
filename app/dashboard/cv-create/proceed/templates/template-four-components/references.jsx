'use client'
import { useEffect, useState } from "react";
import { Input, Button, Modal } from "react-daisyui";
import { collection, query, where, onSnapshot, Timestamp, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const References = ({ userId }) => {
    const [visibleEdu, setVisibleEdu] = useState(false);

    const [refrences, setRefrences] = useState([]);



    const toggleVisibleEdu = () => {
        setVisibleEdu(!visibleEdu);
    };

    function getReferences() {
        try {
            let referencesRef = collection(db, 'references');
            let q = query(referencesRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setRefrences([]);
                docs.forEach(doc => {
                    setRefrences(prev => [...prev, doc.data()]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getReferences();
    }, []);

    return (
        <div className="mb-10">
            <p className="text-violet-900 font-bold">References</p>
            <div className="flex gap-10 flex-wrap">
                {
                    refrences.length > 0 ? refrences.map((refrence, index) => (
                        <div className="text-xs">
                            <p className="text-[8px] md:text-xs lg:text-sm font-semibold mb-2 md:mb-2 lg:mb-2">{refrence.referee_name}</p>
                            <p className="text-[6px] md:text-[8px] lg:text-xs mb-2 md:mb-2 lg:mb-2">{refrence.organization}</p>
                            <p className="text-[6px] md:text-[8px] lg:text-xs mb-2 md:mb-2 lg:mb-2">{refrence.role}</p>
                            <p className="text-[6px] md:text-[8px] lg:text-xs mb-2 md:mb-2 lg:mb-2">{refrence.email}</p>
                            <p className="text-[6px] md:text-[8px] lg:text-xs">{refrence.phone}</p>
                        </div>
                    )): <div></div>
                }
            </div>
        </div>
    );
}

export default References;