'use client'
import { faCirclePlus, faEnvelope, faLocationPin, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import profileImg from '@/app/images/profile.jpeg';
import { Button, Modal, Input, Skeleton, Loading } from "react-daisyui";
import { useId, useRef, useState } from "react";
import AboutMe from "./template-one-components/about";
import { auth } from "@/app/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ExperienceWidget from "./template-one-components/experience";
import EducationWidget from "./template-one-components/education";
import References from "./template-one-components/references";
import Award from "./template-one-components/achievements";
import SkillWidget from "./template-one-components/skills";
import Profile from "./template-one-components/profile";
import Hobbies from "./template-one-components/hobbies";
import Projects from "./template-one-components/projects";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ProfilePhoto from "./template-one-components/profilePhoto";
// import { html2pdf } from "html2pdf.js";



const TemplateOne = ({ userId }) => {
    const [user, setUser] = useState(userId);
    const [visibleEdu, setVisibleEdu] = useState(false);
    const toggleVisibleEdu = () => {
        setVisibleEdu(!visibleEdu);
    };
    const [mDownload, setMDownload] = useState(false);
    const pdfRef = useRef();


    function downloadPDF () {
        setMDownload(true);
        let input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            let imageData = canvas.toDataURL('image/png');
            let pdf = new jsPDF('p', 'mm', 'a4', true);
            let pdfWidth = pdf.internal.pageSize.getWidth();
            let pdfHeight = pdf.internal.pageSize.getHeight();
            let imgWidth = canvas.width;
            let imgHeight = canvas.height;
            let ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            let imgX = (pdfWidth - imgWidth * ratio) / 2;
            let imgY = 0;
            pdf.addImage(imageData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save();
            setMDownload(false);
        });
    }


    return (
        <div>
            <div className="flex flex-row-reverse mb-4">
            {/* className="bg-blue-300 border-blue-300 text-black" */}
                <Button onClick={() => downloadPDF()} color="primary">
                    {mDownload == true ?  <Loading /> : ''}
                    download pdf
                </Button>
            </div>
            <div id="template-one" ref={pdfRef} className=" bg-white ">
                {/* top dark area */}
                <div className=" bg-indigo-950 text-white p-2 md:p-10 lg:p-10">

                    <Profile userId={userId} />

                </div>
                {/* top dark area */}

                {/* profile photo and about */}
                <div className="grid grid-cols-4 md:grid md:grid-cols-4 mt-5">
                    <div className="pl-5 pr-0 md:pl-20 md:pr-0 lg:pl-20 lg:pr-0">
                        <ProfilePhoto userId={userId} />
                    </div>
                    <div className="col-span-3 md:pr-10 lg:pr-10">
                        <p className="mb-2 font-bold text-indigo-950 text-xs md:text-lg lg:text-lg">Profile </p>
                        <AboutMe useId={userId} />
                    </div>
                </div>
                {/* profile photo and about */}

                {/* grid */}
                <div className="grid grid-cols-4 md:grid md:grid-cols-4 mt-5">
                    <div className=" text-white border-r border-amber-400">
                        <div className="bg-indigo-950">
                            <p className="font-bold text-[8px] md:text-lg lg:text-lg text-center">Skills</p>
                        </div>

                        <SkillWidget user_id={userId} />


                        <div className="bg-indigo-950 ">
                            <p className="font-bold text-[8px] md:text-lg lg:text-lg text-center">Awards</p>
                        </div>
                        <Award userId={userId} />

                        <div className="bg-indigo-950 ">
                            <p className="font-bold text-[8px] md:text-lg lg:text-lg text-center">Hobbies</p>
                        </div>
                        <Hobbies userId={userId} />

                    </div>
                    <div className="col-span-3 pl-5 pr-5 md:pl-10 md:pr-10 lg:pl-10 lg:pr-10 border-t border-amber-400">
                        <p className="font-bold text-[12px] md:text-lg lg:text-lg text-center mt-2 border-b">Work Experience</p>
                        <ExperienceWidget user_id={userId} />

                        <p className="font-bold text-[12px] md:text-lg lg:text-lg text-center mt-2 border-b">Education</p>
                        <EducationWidget user_id={userId} />

                        <Projects userId={userId} />
                        
                        <p className="font-bold text-[12px] md:text-lg lg:text-lg text-center mt-5 border-b mb-5">References</p>
                        <References userId={userId} />
                    </div>
                </div>
                {/* grid */}
            </div>
        </div>
    );
}

export default TemplateOne;