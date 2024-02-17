import { db } from "@/app/firebase/firebase";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { Skeleton } from "react-daisyui";

const AboutMe = ({ useId }) => {
    var [about, setAbout] = useState(null);
    const [aboutError, setAboutError] = useState(null);
    const aboutRef = useRef(null);
    const [isEditing, setEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const savedSelection = useRef(null);

    const toggleVisible = () => {
        setVisible(!visible);
    };


    async function getAbout() {
        try {
            const usb = onSnapshot(doc(db, 'about', useId), doc => {
                if (doc.data()) {
                    setAbout(doc.data()['description']);
                } else {
                    setAbout(null);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function addAbout() {
        if (!about || about == null) {
            setAboutError('field required');
            return;
        } else {
            setAboutError('');
        }

        try {
            let data = {
                description: about,
                created_at: Timestamp.now()
            }
            await setDoc(doc(db, "about", useId), data);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateAbout() {
        try {
            let data = {
                description: about,
                created_at: Timestamp.now()
            }
            await updateDoc(doc(db, "about", useId), data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAbout();
    }, []);

    if (about == null) {
        return (
            <div>
                <Skeleton className="h-6 mb-2 w-[20%] bg-slate-400"></Skeleton>
                <Skeleton className="h-16 w-full bg-slate-400"></Skeleton>
            </div>
        );
    } else {
        return (
            <div className="mt-2 md:mt-4 lg:mt-8">
                <p className="text-[5px] md:text-[10px] lg:text-xs text-[#808080]">{about}</p>
            </div>
        );
    }



}

export default AboutMe;