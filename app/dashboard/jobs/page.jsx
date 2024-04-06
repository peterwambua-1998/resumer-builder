'use clinet'

import { auth } from "@/app/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Jobs = () => {
    const [firebase_user, loading, error] = useAuthState(auth);

    return (  
        <div>

        </div>
    );
}
 
export default Jobs;