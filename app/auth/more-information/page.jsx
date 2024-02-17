'use client';
import { auth, db } from "@/app/firebase/firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { Modal, Input, Loading, Select, Button } from "react-daisyui";
import { collection, addDoc, query, where, getDoc, getDocs, onSnapshot, Timestamp, setDoc, doc } from "firebase/firestore"; 
import ProfilePhoto from "./components/profilephoto";
import EducationWidget from "@/app/dashboard/cv-create/components/education";
import ExperienceWidget from "@/app/dashboard/cv-create/components/experince";
import SkillWidget from "@/app/dashboard/cv-create/components/skills";
import { useEffect, useState } from "react";

const MoreInformation = () => {
    const router = useRouter();
    var [isLoading, setIsLoading] = useState(true);
    var [user, setUser] = useState(null);
    const [firebase_user, loading, error] = useAuthState(auth);
    const [err, setErr] = useState(null);
    const [educationData, setEducationData] = useState([]);
    const [skillData, setSkiData] = useState([]);
    const [expData, setExpData] = useState([]);

    //profile info
    const [fullName, setFullName] = useState(null);
    const [email, setEmail] = useState(null);
    const [dob, setDob] = useState(null);
    const [location, setLocation] = useState(null);
    const [martialStatus, setMartialStatus] = useState(null);

    // profile errors
    const [fullNameError, setFullNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [dobError, setDobError] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [martialStatusError, setMartialStatusError] = useState(null);

  
    async function checkEdu(userId) {
        let eduRef =  collection(db, 'education');
        let q =  query(eduRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setEducationData([]);
            doc.forEach((data) => {
                setEducationData((prev) => [...prev, data.data()]);
            })
        })
    }

    async function checkExperience(userId) {
        let experienceRef =  collection(db, 'experience');
        let q =  query(experienceRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setExpData([]);
            doc.forEach((data) => {
                setExpData((prev) => [...prev, data.data()]);
            })
        })
    }

    async function checkSkill(userId) {
        let skillRef =  collection(db, 'skill');
        let q =  query(skillRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setSkiData([]);
            doc.forEach((data) => {
                setSkiData((prev) => [...prev, data.data()]);
            })
        })
    }

    async function addProfile() {
        if (fullName == null || !fullName) {
            setFullNameError('field required');
            return;
        } else {
            setFullNameError(null);
        }

        if (email == null || !email) {
            setEmailError('field required');
            return;
        } else {
            setEmailError(null);
        }

        if (dob == null || !dob) {
            setDobError('field required');
            return;
        } else {
            setDobError(null);
        }

        if (location == null || !location) {
            setLocationError('field required');
            return;
        } else {
            setLocationError(null);
        }
        

        try {
            const data = {
                full_name: fullName,
                email: email,
                location: location,
                DOB: dob,
                martial_status: martialStatus,
                created_at: Timestamp.now()
            }
            await setDoc(doc(db, "profile", user.uid), data);
        } catch (error) {
            console.log(error);
        }
    }

    function goToDashboard() {
        router.push('/dashboard');
    }

    useEffect(() => {
        setUser(firebase_user);
        setIsLoading(loading);
        if (firebase_user) {
            checkEdu(firebase_user.uid);
            checkExperience(firebase_user.uid);
            checkSkill(firebase_user.uid);
        }
    }, [firebase_user, loading])
   
    if (isLoading) {
        //console.log(loading);
        return (<div className='h-[100vh] w-full align-middle text-blue-500 bg-blue-950 text-center'><Loading className='' /></div>)
    }
   
    
    if (!isLoading) {
        if (!user) {
            router.replace('/');
        } else {
           
            return (  
                <main className="bg-image">
                    {/* <div className="pl-[5%] pr-[5%] pt-2 w-full text-center">
                        <p className="font-bold text-[#1E3A8A] md:text-2xl lg:text-2xl">Lets Know more about you</p>
                        {
                            (educationData.length > 0 && expData.length > 0 && skillData.length > 0) ? (<div><p>You can proceed to your dashboard</p><Button color="accent" onClick={() => goToDashboard()}>Proceed</Button></div>) : ''
                        }
                    </div>
                    {/* <ProfilePhoto user_id={user.uid} /> 
                    <ExperienceWidget user_id={user.uid} />

                    <EducationWidget user_id={user.uid} />

                    <SkillWidget user_id={user.uid} />
                    <div className="text-center">
                    {
                            (educationData.length > 0 && expData.length > 0 && skillData.length > 0) ? (<div className="pb-5"><p>You can proceed to your dashboard</p><Button onClick={() => goToDashboard()}>Proceed</Button></div>) : ''
                    }
                    </div> */}
                    <div className="pl-[5%] pr-[5%] pt-2 w-full ">
                        <p className="font-bold text-[#1E3A8A] md:text-2xl lg:text-2xl text-center">Lets Know more about you</p>
                        <p className="text-center text-sm text-[#808080]">Kindly fill the fields below</p>
                        <div className="pl-[5%] pr-[5%] pt-2 w-full text-center">
                        {
                            (educationData.length > 0 && expData.length > 0 && skillData.length > 0) ? (<div><p>You can proceed to your dashboard</p><Button color="accent" onClick={() => goToDashboard()}>Proceed</Button></div>) : ''
                        }
                        </div>
                        <div className="md:grid md:grid-cols-2">
                            <div>
                                <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Full name</span>
                                        </label>
                                        <Input className="bg-white" placeholder="Ex: John Doe" onChange={(e) => setFullName(e.target.value)} />
                                        <div className="text-red-600 text-sm">{fullNameError}</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Email</span>
                                        </label>
                                        <Input className="bg-white" placeholder="Ex: someone@mail.com" onChange={(e) => setEmail(e.target.value)} />
                                        <div className="text-red-600 text-sm">{emailError}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-3 mb-2">
                            <div>
                                <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text text-black">DOB</span>
                                        </label>
                                        <Input type="date" className="bg-white" onChange={(e) => setDob(e.target.value)} />
                                        <div className="text-red-600 text-sm">{dobError}</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text text-black">Location</span>
                                        </label>
                                        <Input className="bg-white" placeholder="Ex: Nairobi, Kenya" onChange={(e) => setLocation(e.target.value)} />
                                        <div className="text-red-600 text-sm">{locationError}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text text-black">Martial status (Optional)</span>
                                        </label>
                                        <Select className="bg-white" onChange={(e) => setMartialStatus(e.target.value)}>
                                            <option value={'Pick one'}>
                                                Pick one
                                            </option>
                                            <option value={'n/a'}>n/a</option>
                                            <option value={'Single'}>Single</option>
                                            <option value={'Married'}>Married</option>
                                            <option value={'Divorced'}>Divorced</option>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-3">
                            <Button onClick={addProfile} className="w-full bg-amber-500 text-black" >Save Profile Information</Button>
                        </div>
                    </div>
                    <div className="pl-[5%] pr-[5%] pt-2 w-full">
                        <EducationWidget user_id={user.uid} />

                        <ExperienceWidget user_id={user.uid} />

                        <SkillWidget user_id={user.uid} />
                    </div>
                    <div className="pl-[5%] pr-[5%] pt-2 w-full text-center">
                        {
                            (educationData.length > 0 && expData.length > 0 && skillData.length > 0) ? (<div><p>You can proceed to your dashboard</p><Button color="accent" onClick={() => goToDashboard()}>Proceed</Button></div>) : ''
                        }
                    </div>
                </main>
            );
        }
    }
}
 
export default MoreInformation;