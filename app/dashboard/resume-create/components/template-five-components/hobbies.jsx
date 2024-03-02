'use client'
import { useEffect, useState } from "react";
import { Skeleton } from "react-daisyui";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";

const Hobbies = ({ userId }) => {
    const [hobbies, setHoobbies] = useState([]);

    function getHobbies() {
        try {
            let hobbiesRef = collection(db, 'hobbies');
            let q = query(hobbiesRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setHoobbies([]);
                docs.forEach(doc => {
                    setHoobbies(prev => [...prev, doc.data()]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getHobbies();
    }, []);

    if (hobbies.length < 1) {
        return (
            <div className="text-[#808080] pl-5 pr-5 pt-5">You currently have no hobbies saved</div>
        )
    } else {
        return (
            <div>

                <div className="mt-5 md:mt-10 md:pr-2 md:pl-2 lg:mt-10 lg:pl-4 lg:pr-4">
                    <p className="text-center text-[7px] md:text-base font-semibold border-b md:pb-2 lg:pb-2 border-[#808080] md:mb-5 lg:mb-5">Hobbies</p>
                    {
                        hobbies.length > 0 ? (hobbies.map((hobby, index) => (
                                <div className="pl-1 pr-1 md:pl-2 md:pr-2 lg:pl-8 lg:pr-8 mb-2 md:mb-5 lg:mb-5" key={index}>
                                    <p className="font-semibold text-[6px] md:text-xs md:mb-2">{hobby.title}</p>
                                </div>
                        ))) : (<div className="text-[#808080] text-[6px] md:text-sm lg:text-sm p-2 md:p-5 lg:p-5">You currently have no hobbies</div>)
                    }
                </div>
            </div>
        );
    }


}

export default Hobbies;