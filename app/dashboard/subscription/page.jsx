'use client'
import { auth, db } from "@/app/firebase/firebase";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Input } from "postcss";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";

const Subscription = () => {
    const [firebase_user, loading, error] = useAuthState(auth);
    const [clickedSub, setClickedSub] = useState(null);
    const [profile, setProfile] = useState(null);
    const router = useRouter();

    // get user profile
    function getProfile() {
        try {
            const usb = onSnapshot(doc(db, 'profile', firebase_user.uid), doc => {
                if (doc.data()) {
                    setProfile(doc.data());
                } else {
                    setProfile(null);
                }
            });

        } catch (error) {
            console.log(error);
        }
    }

    function setAmountVariableAndInitiatePayment(type) {
        if (type == 12) {
            initiatePayment(100, 12);
        }

        if (type == 22) {
            initiatePayment(300, 22);
        }

        if (type == 32) {
            initiatePayment(200, 32);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    async function initiatePayment(amount, sub_type) {
        if (amount && sub_type) {
            try {
                let options = {
                    method: 'POST',
                    body: JSON.stringify({
                        'amount': amount,
                        'first_name': profile.full_name,
                        'last_name': '',
                        'email': profile.email,
                        'subscription_type': sub_type,
                    }),
                };
                let initPay = await fetch('http://localhost:3000/api/intasend', options);
                let res = await initPay.json();
                let { url } = res;
                router.push(url);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="flex justify-center gap-10 ">
            <div className="bg-slate-200 p-5 w-[20vw] mt-16 rounded-md border border-slate-400">
                <div>
                    <p className="text-sm font-semibold">Basic plan</p>
                </div>
                <div className="mt-5">
                    <p className="text-lg "><span className="font-semibold">KSH 199 /</span><span className="text-sm"> monthly</span></p>
                </div>
                <div className="mt-3">
                    <Button onClick={() => setAmountVariableAndInitiatePayment(12)} className="text-xs w-full rounded h-5 bg-blue-800 hover:bg-blue-950 text-white">GET STARTED</Button>
                </div>
                <div className="mt-3 text-sm">
                    <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                    <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                    <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                    <p className="flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                </div>
            </div>
            <div className="bg-slate-900 p-5 w-[20vw] mt-8 rounded-md border border-slate-400 text-white">
                <div>
                    <p className="text-sm font-semibold">Premium plan</p>
                </div>
                <div className="mt-5">
                    <p className="text-lg "><span className="font-semibold">KSH 199 /</span><span className="text-sm"> monthly</span></p>
                </div>
                <div className="mt-3">
                    <Button onClick={() => setAmountVariableAndInitiatePayment(22)} className="text-xs w-full rounded h-5 bg-blue-800 hover:bg-blue-950 text-white">GET STARTED</Button>
                </div>
                <div className="mt-3 text-sm ">
                    <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full text-black"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                    <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full text-black"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                    <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full text-black"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                    <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full text-black"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                    <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full text-black"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                    <p className="flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full text-black"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                </div>
            </div>
            <div className="bg-slate-200 p-5 w-[20vw] mt-16 rounded-md border border-slate-400">
                <div>
                    <p className="text-sm font-semibold">Pro plan</p>
                </div>
                <div className="mt-5">
                    <p className="text-lg "><span className="font-semibold">KSH 199 /</span><span className="text-sm"> monthly</span></p>
                </div>
                <div className="mt-3">
                    <Button onClick={() => setAmountVariableAndInitiatePayment(32)} className="text-xs w-full rounded h-5 bg-blue-800 hover:bg-blue-950 text-white">GET STARTED</Button>
                </div>
                <div className="mt-3 text-sm">
                    <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                    <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                    <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                    <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                    <p className="flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                </div>
            </div>
        </div>
    );
}

export default Subscription;