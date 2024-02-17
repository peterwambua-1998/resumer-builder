'use client'
import Link from 'next/link';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useLayoutEffect, useState } from 'react';
import { Dropdown, Navbar, Menu, Button, Loading } from 'react-daisyui';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

function ResponsiveNavLinks ({userId}) {
    var [user, setUser] = useState(userId);
    const [firebase_user, loading, error] = useAuthState(auth);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      setUser(firebase_user);
    }, [])

    
    if (!user) {
        return (
            <div>
                <Dropdown.Item>
                    <Link  href='/auth/login'>login</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link  href='/auth/sign-up'>Sign up</Link>
                </Dropdown.Item>
            </div>
        ) 
    } else {
        return (  
            <div>
                <Dropdown.Item>
                    <Button tag="a" onClick={() => handleSignOut()}>logout</Button>
                </Dropdown.Item>
            </div>
        );
    }
}
 
export default ResponsiveNavLinks;