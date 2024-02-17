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
        
        <div className="mb-5 p-2">
            
            <p className="font-bold text-[8px] md:text-lg lg:text-lg border-b md:border-b-2 lg:border-b-2 border-green-500">Skills</p>
            <div className="flex justify-start mt-3">
                <ul style={{ listStyleType: 'disc' }} className="text-[5px] md:text-base lg:text-base pl-5 pr-5">
                    {skillData.map((skill, index) => (
                        <li key={index}>{skill.name}</li>
                    ))}
                </ul>
            </div>
            
           
            {/* <Modal.Legacy open={visibleEdu} className="bg-white max-w-5xl">
                <form>
                    <Modal.Header className="font-bold text-black">Skill</Modal.Header>
                    <Modal.Body className="p-0">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-black">Add Skill</span>
                            </label>
                            <div className="flex gap-4">
                                <Input className="bg-white w-full text-black" placeholder="Ex: Databases" onChange={(e) => setSkillName(e.target.value)} />
                                <div className="text-red-600 text-sm">{skillNameError}</div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisibleEdu} >Close</Button>
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => {addSkill()}}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy> */}
        </div>
    );
}
 
export default SkillWidget;