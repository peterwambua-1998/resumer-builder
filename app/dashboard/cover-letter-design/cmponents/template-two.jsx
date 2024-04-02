'use client'
import { useEffect, useState } from "react";
import { profileGlobal } from "../../cv-create/proceed/templates/helpers/helpers";
import { Skeleton } from "react-daisyui";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";

const TemplateTwo = ({ coverLetter, userId, coverLetterId }) => {

    const [profile, setProfile] = useState(null);
    const [addressTo, setAddressedTo] = useState(null);

    async function getProfile() {
        let profData = await profileGlobal(userId);
        setProfile(profData);
    }

    async function getAddressedTo() {
        onSnapshot(doc(db, "cover-letter", coverLetterId), (doc) => {
            setAddressedTo(doc.data()['to']);
        });
    }

    useEffect(() => {
        getProfile();
        getAddressedTo();
    }, [])


    return (
        <div className="cover-letter-padding-other">
            <div className="bg-white text-black rounded pt-5 pr-20 pb-5 text-sm grid grid-cols-6">
                {/* grid one */}
                <div className="col-span-2 text-right w-[90%] pl-5 pt-2 pr-5 border-r border-slate-400">
                    <div className="text-2xl font-bold">
                        {
                            profile == null ? <Skeleton></Skeleton> : <p>{profile.full_name}</p>
                        }
                    </div>

                    {
                        profile == null ? <Skeleton></Skeleton> : <p className="text-sm mt-4">{profile.professionTitle}</p>
                    }


                    <div className="mt-[20vh]">
                        <p className="font-bold">To</p>
                        {
                            addressTo == null ? <p>Not Provided</p> : <p>{addressTo}</p>
                        }
                    </div>

                    <div className="mt-[20vh]">
                        <p className="font-bold">From</p>
                        {
                            profile == null ? <div><Skeleton></Skeleton><Skeleton></Skeleton><Skeleton></Skeleton><Skeleton></Skeleton><Skeleton></Skeleton></div> : <div>
                                <p>{profile.full_name}</p>
                                <p>{profile.professionTitle}</p>
                                <p>{profile.location}</p>
                                <p>{profile.email}</p>
                                <p>{profile.phoneNumber}</p>
                            </div>
                        }

                    </div>
                </div>
                {/* grid one */}


                {/* grid two */}
                <div className="col-span-4 pt-10">
                    <p className="mb-2">4/1/2024</p>

                    <p className="mb-2 font-bold">Dear {
                        addressTo == null ? 'Not Provided,' : `${addressTo},`
                    }</p>

                    {
                        coverLetter
                            .filter((skill) => skill.checked === true)
                            .map((skill) => (
                                <p key={skill.id} className="mb-2">{skill.coverLetter}</p>
                            ))
                    }

                </div>
                {/* grid two */}

            </div>
        </div>
    );
}

export default TemplateTwo;