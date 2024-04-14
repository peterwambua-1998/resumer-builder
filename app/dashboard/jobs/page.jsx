'use client'

import { auth } from "@/app/firebase/firebase";
import { useEffect, useState } from "react";
import { Button, Card } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";

const Jobs = () => {
    const [firebase_user, loading, error] = useAuthState(auth);
    const [jobs, setJobs] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(true);

    async function getJobs () {
        const options = {
            method: 'GET',
        };

        try {
            let aboutAI = await fetch('/api/scrapper', options);
            let res = await aboutAI.json();
            console.log(res);
            setJobs(res);
        } catch (error) {
            console.log(error);
        }

        setLoadingJobs(false);
    }

    useEffect(() => {
        getJobs();
    }, []);


    return (  
        <div>
            <div className="p-8 h-[40vh] my-bg-blur">
                <h1 className="text-2xl font-bold">Jobs</h1>
            </div>
            <div className="p-8 absolute top-[30%] w-full">
                <div>
                    <div className="md:border md:border-slate-200 p-5 md:rounded bg-white p-8">
                    {
                        loadingJobs ? <p>loading</p> :

                        jobs.map((job, index) => (
                            <Card className="mb-8">
                                <Card.Body>
                                    <h3 className="font-bold text-xl">{job.title}</h3>
                                    <p>
                                        {job.text}
                                    </p>
                                    <a href={job.link}><Button>
                                       Apply
                                    </Button></a>
                                </Card.Body>
                            </Card>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Jobs;