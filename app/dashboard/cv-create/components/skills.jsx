import { useState, useEffect } from "react";
import { Button, Input, Accordion, Badge } from "react-daisyui";
import { collection, addDoc, query, where, getDoc, getDocs, onSnapshot, Timestamp } from "firebase/firestore"; 
import { auth, db } from "@/app/firebase/firebase";


const SkillWidget = ({user_id}) => {
    const [visibleSkill, setVisibleSkill] = useState(false);
    var [skillName, setSkillName] = useState([]);
    var [skillNameError, setSkillNameError] = useState(null);
    var [skillData, setSkillData] = useState([]);

    const toggleVisibleSkill = () => {
        setVisibleSkill(!visibleSkill);
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
                user_id: user_id
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
            <Accordion className="bg-black text-white">
                <Accordion.Title className="text-xl font-medium text-white">
                    Skills
                </Accordion.Title>
                <Accordion.Content>
                        <div className="flex gap-2 mb-2 items-center">
                            {skillData.map((edu, index) => (
                                <div key={index}>
                                    <Badge className="p-4">{edu.name}</Badge>
                                </div>
                            ))}
                        </div>
                        
                        <div className="form-control w-full grow">
                            <label className="label">
                                <span className="label-text">Add Skill</span>
                            </label>
                            <div className="flex gap-4">
                            <Input className="bg-white text-black" placeholder="Ex: Databases" onChange={(e) => setSkillName(e.target.value)} />
                                <Button onClick={() => {addSkill()}}>Save</Button>
                            </div>
                        </div>
                </Accordion.Content>
            </Accordion>
            
        </div>
    );
}
 
export default SkillWidget;