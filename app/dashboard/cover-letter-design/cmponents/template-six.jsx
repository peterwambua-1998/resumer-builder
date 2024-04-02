'use client'
import { useEffect, useState } from "react";
import { profileGlobal } from "../../cv-create/proceed/templates/helpers/helpers";
import { Skeleton } from "react-daisyui";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";

const TemplateSix = ({ coverLetter, userId, coverLetterId }) => {

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
    }, []);


    return (
        <div className="cover-letter-padding-other">
            <div className="bg-white p-16">
                {/* top area */}
                <div className="flex justify-center mb-6">
                    <div></div>
                    <div className="p-5 w-[50%] text-center rounded-sm">
                        {
                            profile == null ? <Skeleton></Skeleton> : <p className="text-2xl font-bold">{profile.full_name}</p>
                        }
                        {
                            profile == null ? <Skeleton></Skeleton> : <p className="text-sm text-[#808080]">{profile.professionTitle}</p>
                        }

                    </div>
                    <div></div>
                </div>
                {/* top area */}

                {/* grid area */}
                <div className="grid grid-cols-6 gap-10">
                    <div className="col-span-4 text-sm">
                        <p className="mb-2 text-[#808080]">03/31/2024</p>
                        <p className="mb-2 font-bold">Dear  {
                            addressTo == null ? 'Not Provided' : `${addressTo}`
                        },</p>
                        {
                            coverLetter
                                .filter((skill) => skill.checked === true)
                                .map((skill) => (
                                    <p key={skill.id} className="mb-2">{skill.coverLetter}</p>
                                ))
                        }
                        <p className="mb-2">Best Regards</p>
                        {
                            profile == null ? <Skeleton></Skeleton> : <p className="mb-2 font-bold">{profile.full_name}</p>
                        }
                    </div>
                    <div className="col-span-2">
                        <div className="mb-10 text-sm">
                            <p>To</p>
                            <p className="font-bold"> {
                                addressTo == null ? 'Not Provided' : `${addressTo}`
                            },</p>
                        </div>

                        {
                            profile == null ? <div className="mb-10 text-sm"><Skeleton></Skeleton><Skeleton></Skeleton><Skeleton></Skeleton></div> : <div className="mb-10 text-sm">
                                <p>{profile.location}</p>
                                <p>{profile.email}</p>
                                <p>{profile.phoneNumber}</p>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TemplateSix;