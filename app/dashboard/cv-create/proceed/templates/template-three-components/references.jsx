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
        // <div>

        //         <div className="p-2 md:p-[5%] lg:p-[5%]">
        //             <p className="font-bold text-[8px] md:text-xl lg:text-xl mb-3">References</p>
                    

        //             <div className="text-[5%] md:text-base lg:text-base flex gap-5 md:flex md:gap-20 lg:flex lg:gap-20 pb-5 md:pb-10 lg:pb-10">
        //             {
        //                 refrences.length > 0 ? refrences.map((refrence, index) => (
        //                     <div>
        //                         <div className="">
        //                             <p className="font-bold text-green-500">{refrence.referee_name}</p>
        //                             <p>{refrence.organization}</p>
        //                             <p>{refrence.role}</p>
        //                             <p>{refrence.email}</p>
        //                             <p>{refrence.phone}</p>
        //                         </div>
        //                     </div>
        //                 )) : (<div className="text-[#808080] mb-5">You currently have no references</div>)
        //             }
        //             </div>
        //         </div>
            


        // </div>
        <div>
            <p className="mb-2 font-bold mt-8">References</p>
            <div className="md:flex md:gap-20">
            {
                refrences.length > 0 ? refrences.map((refrence, index) => (
                <div key={index}>
                    <div className="text-sm">
                        <p className="font-bold text-blue-500">{refrence.referee_name}</p>
                        <p>{refrence.organization}</p>
                        <p>{refrence.role}</p>
                        <p>{refrence.email}</p>
                        <p>{refrence.phone}</p>
                    </div>
                </div>
            )) : (<div className="text-[#808080] mb-5">You currently have no references</div>)
            }
            </div>
            
        </div>
    );
}

export default References;