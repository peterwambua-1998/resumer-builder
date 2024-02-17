import { useState, useEffect } from "react";
import { Button, Input, Modal, Badge } from "react-daisyui";
import { collection, addDoc, query, where, getDoc, getDocs, onSnapshot, Timestamp } from "firebase/firestore"; 
import {  db } from "@/app/firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const SkillWidget = ({user_id}) => {
    const [visibleEdu, setVisibleEdu] = useState(false);
    var [skillName, setSkillName] = useState([]);
    var [skillNameError, setSkillNameError] = useState(null);
    var [skillData, setSkillData] = useState([]);
    
    const toggleVisibleEdu = () => {
        setVisibleEdu(!visibleEdu);
    };

    async function checkSkill(userId) {
        let skillRef =  collection(db, 'skill');
        let q =  query(skillRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setSkillData([]);
            doc.forEach((data) => {
                setSkillData((prev) => [...prev, data.data()]);
            })
        })
    }

    async function addSkill() {
        if (skillName == null || !skillName) {
            setSkillNameError('field required');
            return;
        } else {
            setSkillNameError(null);
        }
        

        try {
            let skillRef =  collection(db, 'skill');
            await addDoc(skillRef, {
                name: skillName,
                user_id: user_id,
                created_at: Timestamp.now()
            });
        } catch (error) {
            console.log('system error please try again');
        }
    }

    useEffect(() => {
        checkSkill(user_id);
    }, [])

    return (  
        
        
        <div className="md:grid md:grid-cols-5 mt-10">
                <div className="col-span-1 pl-2 mb-5"></div>
                <div className="col-span-4 pl-10 mb-5">
                    <p className="font-bold text-lg  border-b">Skills</p>
                </div>
                <div className="col-span-1 pl-2 text-right mb-6">

                </div>
                <div className="col-span-4 pl-10 mb-6 text-sm">
                    <div className="flex gap-5 flex-wrap">
                    {
                        skillData.length > 0 ? (skillData.map((skill, index) => (
                        <div className="w-[30%]" key={index}>
                            <p>{skill.name}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-1">
                                <div className="bg-cyan-400 h-2.5 rounded-full w-[100%]"></div>
                            </div>
                        </div>
                    ))) : (
                        <div className="w-[30%]">
                            <p>You currently have no skills data</p>
                        </div>  
                    )
                    }
                    </div>

                </div>
            </div>
    );
}
 
export default SkillWidget;