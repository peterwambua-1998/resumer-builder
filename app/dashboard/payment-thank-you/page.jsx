'use client'
import { auth, db } from '@/app/firebase/firebase';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const ThankYou = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    let [checkingStatus, setCheckingStatus] = useState(true);
    var [firebase_user, loading, error] = useAuthState(auth);

    function addOneYear(date) {
        // Making a copy with the Date() constructor
        const dateCopy = new Date(date);
        dateCopy.setFullYear(dateCopy.getFullYear() + 1);
        return dateCopy;
    }

    async function createSubscription(dateToday, expDate) {
        let plan = searchParams.get('subscriptionType');
        console.log(plan);
        try {
            let data = {
                'user_id': firebase_user.uid,
                'plan': plan,
                'created_date': dateToday,
                'exp_date': expDate,
                'create_at': Timestamp.now(),
            }
            await setDoc(doc(db, "subscriptions", firebase_user.uid), data);
            setCheckingStatus(false);
            // return to cv page and download
            router.replace('/dashboard/cv-create/proceed');
        } catch (error) {
            console.log(error);
        }
    }

    async function verifyPaymentStatus() {
        let invoiceId = searchParams.get('tracking_id');
        if (invoiceId) {
            try {
                let options = {
                    method: 'POST',
                    body: JSON.stringify({
                        'invoice_id': invoiceId,
                    }),
                };
                let statusCheck = await fetch('http://localhost:3000/api/intasend-payment-status', options);
                let statusRes = await statusCheck.json();
                if (statusRes.invoice.state === 'COMPLETE' && statusRes.invoice.failed_code === null) {
                    // create subscription
                    let today = new Date();
                    let exp_date = addOneYear(today);
                    createSubscription(today, exp_date);
                } else {
                    // return to cv page
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        verifyPaymentStatus();
    }, []);

    return (
        <div>
            {
                checkingStatus ? <div>
                    <p>checking payment status</p>
                </div> : ''
            }
        </div>
    );
}

export default ThankYou;