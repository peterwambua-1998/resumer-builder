'use client';
import { auth, db } from "@/app/firebase/firebase";
import { Timestamp, addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Card, Button, Loading } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";

const CurriculumVitae = () => {
    var [firebase_user, loading, error] = useAuthState(auth);
    var [resumes, setResumes] = useState([]);
    var [checkingResume, setCheckingResume] = useState(true);
    const router = useRouter();

    async function checkResume () {
        try {
            const q = query(collection(db, "users-resumes"), where("user_id", "==", firebase_user.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                let docId = doc.id;
                const documentData = doc.data();
                const newData = { ...documentData, id: docId };
                setResumes((prev) => [...prev, newData])
            });
            console.log(checkingResume);
            setCheckingResume(false);
        } catch (error) {
            console.log(error);
        }
    }

    async function createResumeId() {
        let resumeRef = collection(db, 'users-resumes');
        try {
            const res = await addDoc(resumeRef, {
                'title': null,
                'jobDescription': null,
                'userId': firebase_user.uid,
                'created_at': Timestamp.now()
            });
            router.push(`/dashboard/rs-create/${res.id}`);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkResume();
    },[]);

    return (  
        <div>
            <div className="p-8 h-[40vh] my-bg-blur">
                <h1 className="text-2xl font-bold">Resume</h1>
            </div>
            <div className="p-8 absolute top-[30%] w-full">
                {
                    checkingResume ? 
                    <div className="flex justify-center items-center flex-col gap-20 w-full h-[50vh] bg-slate-300 rounded-lg"><Loading /><p>Checking resumes</p></div> 
                    :
                    resumes.length > 0 ? 
                    // has resume
                    <div>
                        <div className="md:border md:border-slate-200 p-5 md:rounded bg-white">
                            <div className="md:grid md:grid-cols-4">
                                <div className="p-2" >
                                    <Menu>
                                        <Menu.Item>
                                            <a className="active">My Curriculam Vitae</a>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link href='/dashboard/resume-create'>Create Resume</Link>
                                        </Menu.Item>
                                        {/* <Menu.Item>
                                            <a>Item 3</a>
                                        </Menu.Item> */}
                                    </Menu>
                                </div>
                                <div className="md:col-span-3">
                                    {/* <div className="md:grid md:grid-cols-3 gap-4">
                                        <Card>
                                            <Card.Image src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                                            <Card.Body>
                                                <Card.Title tag="h2">Shoes!</Card.Title>
                                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                                <Card.Actions className="justify-end">
                                                <Button color="primary">Buy Now</Button>
                                                </Card.Actions>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Image src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                                            <Card.Body>
                                                <Card.Title tag="h2">Shoes!</Card.Title>
                                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                                <Card.Actions className="justify-end">
                                                <Button color="primary">Buy Now</Button>
                                                </Card.Actions>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Image src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                                            <Card.Body>
                                                <Card.Title tag="h2">Shoes!</Card.Title>
                                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                                <Card.Actions className="justify-end">
                                                <Button color="primary">Buy Now</Button>
                                                </Card.Actions>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Image src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                                            <Card.Body>
                                                <Card.Title tag="h2">Shoes!</Card.Title>
                                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                                <Card.Actions className="justify-end">
                                                <Button color="primary">Buy Now</Button>
                                                </Card.Actions>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Image src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                                            <Card.Body>
                                                <Card.Title tag="h2">Shoes!</Card.Title>
                                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                                <Card.Actions className="justify-end">
                                                <Button color="primary">Buy Now</Button>
                                                </Card.Actions>
                                            </Card.Body>
                                        </Card>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div> 
                    : 
                    // has no resume
                    <div className="flex justify-center items-center flex-col gap-20 w-full h-[50vh] bg-slate-300 rounded-lg">
                        <div>
                            <label className="label pl-2">Create new resume</label>
                            <Button onClick={createResumeId}>Create new resume</Button>
                        </div>
                        
                    </div>
                    
                }
                
            </div>
        </div>
    );
}
 
export default CurriculumVitae;