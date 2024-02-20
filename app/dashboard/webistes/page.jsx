'use client';
import { auth, db } from "@/app/firebase/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Card, Button, Loading } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";

const WebsiteList = () => {
    var [firebase_user, loading, error] = useAuthState(auth);
    var [website, setWebsite] = useState(null);
    var [checkingResume, setCheckingResume] = useState(true);

    async function checkWebsite () {
        try {
            const querySnapshot = await getDoc(collection(db, "user-website", firebase_user.uid));
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

    useEffect(() => {
        checkWebsite();
    }, [])

    return (  
        <div></div>
    );
}
 
export default WebsiteList;