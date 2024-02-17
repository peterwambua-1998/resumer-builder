import { db } from "@/app/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Skeleton } from "react-daisyui";
import Image from "next/image";

const ProfilePhoto = ({userId}) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    function getProfile() {
        try {
            const usb = onSnapshot(doc(db, 'profile', userId), doc => {
                if (doc.data()) {
                    setProfile(doc.data());
                } else {
                    setProfile(null);
                }
            });
            setLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProfile();
    }, [])

    if (loading) {
        return (
            <div>
                <Skeleton className="h-6 mb-2 w-[20%] bg-slate-400"></Skeleton>
            </div>
        )
    } 

    if (profile) {

        return (  
            <div>
                <Image alt="profile" src={profile.file_url} width={120} height={120} className="rounded-full w-[40px] h-[40px] md:w-[160px] md:h-[160px] lg:w-[160px] lg:h-[160px]" />
            </div>
        );
    }

   
}
 
export default ProfilePhoto;