'use client'
import { faEnvelope, faLocationPin, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import profileImg from '@/app/images/profile.jpeg';
import { Button, Loading, Skeleton } from "react-daisyui";
import { useEffect, useRef, useState } from "react";
import { db } from "@/app/firebase/firebase";
import { doc, onSnapshot, } from "firebase/firestore";
import AboutMe from "./template-two-components/about";
import SkillWidget from "./template-two-components/skills";
import Award from "./template-two-components/achievements";
import EducationWidget from "./template-two-components/education";
import ExperienceWidget from "./template-two-components/experience";
import References from "./template-two-components/references";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TemplateTwo = ({ userId }) => {

    const pdfRef = useRef();
    const [mDownload, setMDownload] = useState(false);
    const [profile, setProfile] = useState(null);

    function getProfile() {
        try {
            onSnapshot(doc(db, 'profile', userId), doc => {
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

    function downloadPDF() {
        // setMDownload(true);
        // let input = pdfRef.current;

        var doc = new jsPDF('p', 'px', 'a4', true);
        let input = `
            <div style='color: red; background:red; width: 100px'>${userId}</div>
        `;
        doc.html(input, {
            callback: function (doc) {
                doc.save();
            },
            autoPaging: true
        })
        // window.print();

        // html2canvas(input).then((canvas) => {
        //     let pageTwo;
        //     let imageData = canvas.toDataURL('image/png');
        //     // 535374
        //     console.log(imageData.length);
        //     if (imageData.length > 270000) {
        //         console.log(imageData);
        //         let page1 = imageData.substring(0, 170000);
        //         let imageDataPageOne = canvas.toDataURL(page1);
        //         let page2 = imageData.substring(270001, imageData.length - 1);
        //         let pdf = new jsPDF('p', 'mm', 'a4', true);
        //         let pdfWidth = pdf.internal.pageSize.getWidth();
        //         let pdfHeight = pdf.internal.pageSize.getHeight();
        //         let imgWidth = canvas.width;
        //         let imgHeight = canvas.height;
        //         let ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        //         let imgX = (pdfWidth - imgWidth * ratio) / 2;
        //         let imgY = 0;
        //         pdf.addImage(imageData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

        //         pdf.save();

        //     } else {
        //         let pdf = new jsPDF('p', 'in', 'letter', true);
        //         let pdfWidth = pdf.internal.pageSize.getWidth();
        //         let pdfHeight = pdf.internal.pageSize.getHeight();
        //         let imgWidth = canvas.width;
        //         let imgHeight = canvas.height;
        //         let ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        //         let imgX = (pdfWidth - imgWidth * ratio) / 2;
        //         let imgY = 0;
        //         pdf.addImage(imageData, 'PNG', imgX, imgY, imgWidth / 2, imgHeight / 2);
        //         pdf.save();
        //     }

        //     setMDownload(false);
        // })
    }


    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div>
            <div className="flex flex-row-reverse mb-4">
                <Button onClick={() => downloadPDF()} color="primary">
                    {mDownload == true ? <Loading /> : ''}
                    download pdf
                </Button>
            </div>
            <div ref={pdfRef} className=" bg-white grid grid-cols-6 md:grid md:grid-cols-6">
                <div className="col-span-2 bg-stone-700 pt-2 pl-2 pr-2 md:pt-5 md:pl-10 md:pr-10 text-white">
                    <div className="flex justify-center">
                        <Image src={profileImg} width={120} height={120} className="rounded-full w-[40px] h-[40px] md:w-[120px] md:h-[120px] lg:w-[120px] lg:h-[120px]" />
                    </div>
                    {/* location email */}
                    <div className="flex flex-col mt-5">
                        {
                            profile == null
                                ?
                                (
                                    <div>
                                        <Skeleton className="h-4 w-full bg-slate-400"></Skeleton>
                                    </div>) :

                                (
                                    <div>
                                        <table className="mb-2">
                                            <tbody>
                                                <tr>
                                                    <td><FontAwesomeIcon icon={faPhone} className="text-green-500 w-[5px] md:w-[22px]" /></td>
                                                    <td><p className="text-[5%] md:text-base lg:text-base">{profile.phoneNumber}</p></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table className="mb-2">
                                            <tbody>
                                                <tr>
                                                    <td><FontAwesomeIcon icon={faLocationPin} className="text-green-500 w-[5px] md:w-[22px]" /></td>
                                                    <td><p className="text-[5%] md:text-base lg:text-base">{profile.location}</p></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table className="mb-2">
                                            <tbody>
                                                <tr>
                                                    <td><FontAwesomeIcon width={22} icon={faEnvelope} className="text-green-500 w-[5px] md:w-[22px]" /></td>
                                                    <td><p className="text-[5%] md:text-base lg:text-base">{profile.email}</p></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )
                        }
                    </div>
                    {/* location email */}
                    <div className="md:mt-5 lg:mt-5">
                        <AboutMe useId={userId} />
                    </div>
                    <div className="mt-5">
                        <SkillWidget user_id={userId} />
                    </div>
                    <div className="mt-5">
                        <Award userId={userId} />
                    </div>
                </div>
                <div className="col-span-4 bg-white p-2 md:p-[5%] lg:p-[5%]">
                    {
                        profile != null ?
                            <p className="border-b-2  md:text-3xl lg:text-3xl font-semibold pb-5 text-green-700">{profile.full_name}</p>
                            :
                            <Skeleton className="h-4 w-[60%] bg-slate-400"></Skeleton>
                    }

                    <EducationWidget user_id={userId} />
                    <EducationWidget user_id={userId} />
                    <EducationWidget user_id={userId} />
                    <EducationWidget user_id={userId} />
                    <EducationWidget user_id={userId} />

                    <ExperienceWidget user_id={userId} />
                    <ExperienceWidget user_id={userId} />
                    <ExperienceWidget user_id={userId} />
                    <ExperienceWidget user_id={userId} />
                    <ExperienceWidget user_id={userId} />
                    <ExperienceWidget user_id={userId} />

                    <References userId={userId} />
                </div>
            </div>
        </div>
    );
}

export default TemplateTwo;


