'use client';
import { auth, db } from "@/app/firebase/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Card, Button, Loading } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";
import resumeImage from '@/app/images/website-1.png';
import Image from "next/image";

const WebsiteList = () => {
    var [firebase_user, loading, error] = useAuthState(auth);
    var [website, setWebsite] = useState(null);
    var [checkingResume, setCheckingResume] = useState(true);

    async function checkWebsite () {
        try {
            const docSnap = await getDoc(doc(db, "user-website", firebase_user.uid));
            if (docSnap.exists()) {
                setWebsite(docSnap.data());
            }
            setCheckingResume(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkWebsite();
    }, [])

    return (  
        <div>
            <div className="p-8 h-[40vh] my-bg-blur">
                <h1 className="text-2xl font-bold">Website</h1>
            </div>
            <div className="p-8 absolute top-[30%] w-full">
                {
                    checkingResume ? 
                    <div className="flex justify-center items-center flex-col gap-20 w-full h-[50vh] bg-slate-300 rounded-lg"><Loading /><p>Checking resumes</p></div> 
                    :
                    website != null ? 
                    // has webiste so show link
                    <div>
                        <div className="md:border md:border-slate-200 p-5 md:rounded bg-white">
                            <div className="md:grid md:grid-cols-4 gap-4">
                                <Card>
                                    <Card.Image src="@/app/images/webiste-one.png" alt="Shoes" />
                                    <Card.Body>
                                        <Card.Title tag="h2">Website peachy</Card.Title>
                                        <Card.Actions className="justify-end">
                                        <Button color="primary">Preview</Button>
                                        </Card.Actions>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div> 
                    : 
                    // has no webiste so show webiste previews
                    <div className="w-full p-10 bg-slate-300 rounded-lg">
                        <p className="text-sm mb-6">You can preview the templates and select one</p>
                        <div className="md:grid md:grid-cols-4 gap-10">
                            <Card className="bg-white">
                                <div className="p-2">
                                    <Image src={resumeImage} width={120} className="w-[100%] rounded-lg"  />
                                </div>
                                <Card.Body >
                                    <Card.Title tag="p" className="text-base mb-4">Website peachy</Card.Title>
                                    <Card.Actions className="">
                                        <Link href='/dashboard/preview-website/site-one'><Button color="primary">Preview</Button></Link>
                                    </Card.Actions>
                                </Card.Body>
                            </Card>

                            

                            <Card className="bg-white">
                                <Card.Image src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                                <Card.Body >
                                    <Card.Title tag="p" className="text-base mb-4">Website peachy</Card.Title>
                                    <Card.Actions className="">
                                        <Button color="primary">Preview</Button>
                                    </Card.Actions>
                                </Card.Body>
                            </Card>

                            <Card className="bg-white">
                                <Card.Image src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                                <Card.Body >
                                    <Card.Title tag="p" className="text-base mb-4">Website peachy</Card.Title>
                                    <Card.Actions className="">
                                        <Button color="primary">Preview</Button>
                                    </Card.Actions>
                                </Card.Body>
                            </Card>

                            <Card className="bg-white">
                                <Card.Image src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                                <Card.Body >
                                    <Card.Title tag="p" className="text-base mb-4">Website peachy</Card.Title>
                                    <Card.Actions className="">
                                        <Button color="primary">Preview</Button>
                                    </Card.Actions>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    
                }
                
            </div>
        </div>
    );
}
 
export default WebsiteList;