'use client'
import { useEffect, useState } from 'react';
import { Card, Button } from 'react-daisyui';
import { auth, db } from '@/app/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where, getDoc, getDocs, onSnapshot, Timestamp,doc } from "firebase/firestore";
import {  useRouter, useSearchParams } from 'next/navigation';

const Dashboard = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    console.log(searchParams.get('userId'));
    let [user, setUser] = useState();
    const [firebase_user, loading, error] = useAuthState(auth);
    console.log(loading);
    console.log(firebase_user);
    
    async function checkForSkillEduExp() {
        try {
            let eduRef = collection(db, 'education');
            let q = query(eduRef, where('user_id', '=', user));
            const qEduSnapshot = await getDocs(q);

            let skillRef = collection(db, 'skill');
            let qS = query(skillRef, where('user_id', '=', user));
            const qSnapshotSkill = await getDocs(qS);

            let expRef = collection(db, 'skill');
            let qE = query(expRef, where('user_id', '=', user));
            const qESnapshotSkill = await getDocs(qE);

            if (!qEduSnapshot.exists()) {
                router.push('/more-information', {
                    query: { userId: user.uid }
                })
                
            }

            if (!qSnapshotSkill.exists()) {
                router.push('/more-information', {
                    query: { userId: user.uid }
                })
            }

            if (!qESnapshotSkill.exists()) {
                router.push('/more-information', {
                    query: { userId: user.uid }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!loading) {
            if (firebase_user) {
                setUser(firebase_user.uid);
            } 
        }
    },[]);

    return (  
        <main className="p-5">
            <div className="grid grid-cols-1 md:grid md:grid-cols-3 md:gap-8">
                <Card>
                    <Card.Body>
                        <Card.Title tag="h2">Curriculum vitae</Card.Title>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <Card.Actions className="justify-end">
                        </Card.Actions>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title tag="h2">Resume</Card.Title>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <Card.Actions className="justify-end">
                        </Card.Actions>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title tag="h2">Cover letter</Card.Title>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <Card.Actions className="justify-end">
                        </Card.Actions>
                    </Card.Body>
                </Card>
            </div>
            <div className='mt-10'>
                <h6>Statistics</h6>
            </div>

        </main>
    );
}
 
export default Dashboard;