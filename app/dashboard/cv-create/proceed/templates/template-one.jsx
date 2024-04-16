'use client'
import { faCirclePlus, faEnvelope, faLocationPin, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import profileImg from '@/app/images/profile.jpeg';
import { Button, Modal, Input, Skeleton, Loading } from "react-daisyui";
import { useId, useRef, useState } from "react";
import AboutMe from "./template-one-components/about";
import { auth, db } from "@/app/firebase/firebase";
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
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Internship from "./template-one-components/internship";
import Memberships from "./template-one-components/membership";
import Publications from "./template-one-components/publications";
import LinksUser from "./template-one-components/links";
import PdfGenerationTemplateOne from "./template-one-components/pdf-generate";
import Languages from "./template-one-components/languanges";
// import { html2pdf } from "html2pdf.js";


const TemplateOne = ({ userId }) => {
    const [user, setUser] = useState(userId);
    const [visibleEdu, setVisibleEdu] = useState(false);
    const toggleVisibleEdu = () => {
        setVisibleEdu(!visibleEdu);
    };
    const [mDownload, setMDownload] = useState(false);
    const pdfRef = useRef();
    const router = useRouter();

    // async function downloadPDF() {
    //     // check if user has subscription
    //     setMDownload(true);
    //     let subDoc = await getDoc(doc(db, 'subscriptions', userId));
    //     // take user to subscription page to begin payment
    //     if (subDoc.exists() == false) {
    //         return router.replace('/dashboard/subscription');
    //     } 
    //     let profData = null;

    //     profData = profileData(userId);

    //     console.log(profData);

    //     let template = `
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1">
    //         <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    //             integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    //         <title>Document</title>
    //         <script src="https://kit.fontawesome.com/6557f5a19c.js" crossorigin="anonymous"></script>
    //         <style>
    //             .dashed-text-container {
    //                 display: flex;
    //                 align-items: center;
    //             }

    //             .dashed-line {
    //                 flex: 1;
    //                 height: 1px;
    //                 background: #f59e0b;
    //                 margin: 0 10px;
    //             }

    //             .dashed-text {
    //                 white-space: nowrap;
    //                 /* Prevent text from wrapping */
    //             }

    //             .wrapper {
    //                 color: white !important;
    //             }
    //         </style>
    //     </head>
    //     <body>
    //         <div class="wrapper">
    //             <div style="background-color: #1e1b4b; text-center">
    //                 <p style="font-size: 30px; font-weight:bold;" class="mb-3 text-center">Peter Wambua</p>
    //                 <div class="dashed-text-container mb-3" style="width: 100%;">
    //                     <div class="dashed-line"></div>
    //                     <span class="dashed-text ml-3 mr-3" style="font-weight:bold; font-size: 18px;">data analyst</span>
    //                     <div class="dashed-line"></div>
    //                 </div>

    //                 <!-- icons and text -->
    //                 <div class="row text-center">
    //                     <div class="col-lg-4 m-flex">
    //                         <i class="fa-solid fa-location-pin" style="color: #f59e0b;"></i>
    //                         <p>Athiriver, Machakos</p>
    //                     </div>
    //                     <div class="col-lg-4 m-flex">
    //                         <i class="fa-solid fa-envelope" style="color: #f59e0b;"></i>
    //                         <p>pwambuch@mail.com</p>
    //                     </div>
    //                     <div class="col-lg-4 m-flex">
    //                         <i class="fa-solid fa-phone" style="color: #f59e0b;"></i>
    //                         <p>07891011764822</p>
    //                     </div>
    //                 </div>
    //                 <!-- icons and text -->
    //             </div>
    //         </div>
    //     </body>
    //     `;
    // }

    return (
        <div>
            <div className="flex flex-row-reverse mb-4">
                {/* className="bg-blue-300 border-blue-300 text-black" */}
                {/* <Button onClick={() => downloadPDF()} color="primary">
                    {mDownload == true ? <Loading /> : ''}
                    download pdf
                </Button> */}
                <PdfGenerationTemplateOne userId={userId} />
            </div>
            <div id="template-one" ref={pdfRef} className=" bg-white ">
                {/* top dark area */}
                <div className=" bg-indigo-950 text-white p-2 md:p-10 lg:p-10">
                    <Profile userId={userId} />
                </div>
                {/* top dark area */}

                {/* profile photo and about */}
                <div className="grid grid-cols-4 md:grid md:grid-cols-4 mt-5">
                    <div className="pl-5 pr-0 md:pl-20 md:pr-0 lg:pl-10 lg:pr-0">
                        <ProfilePhoto userId={userId} smWidth={40} mdWidth={180} lgWidth={'190px'} />
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

                        <Hobbies userId={userId} />

                        <Languages userId={userId} />

                        <Memberships userId={userId} />

                        <Award userId={userId} />

                    </div>
                    <div className="col-span-3 pl-5 pr-5 md:pl-10 md:pr-10 lg:pl-10 lg:pr-10 border-t border-amber-400 mb-8">

                        <ExperienceWidget user_id={userId} />

                        <EducationWidget user_id={userId} />

                        <Projects userId={userId} />

                        <Internship userId={userId} />

                        <Publications userId={userId} />

                        <LinksUser userId={userId} />

                        <References userId={userId} />
                    </div>
                </div>
                {/* grid */}
            </div>
        </div>
    );
}

export default TemplateOne;