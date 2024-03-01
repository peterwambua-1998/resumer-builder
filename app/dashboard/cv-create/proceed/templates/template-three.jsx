import Image from "next/image";
import { Badge, Button, Divider } from "react-daisyui";
import profileImg from '@/app/images/profile.jpeg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCoffee } from "@fortawesome/free-solid-svg-icons";
import AboutMe from "./template-three-components/about";
import ExperienceWidget from "./template-three-components/experience";
import EducationWidget from "./template-three-components/education";
import SkillWidget from "./template-three-components/skills";
import References from "./template-three-components/references";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import Internship from "./template-three-components/internship";
import Memberships from "./template-three-components/membership";
import Publications from "./template-three-components/publications";
import LinksUser from "./template-three-components/links";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";

const TemplateThree = ({ userId }) => {
    const pdfRef = useRef();
    const [mDownload, setMDownload] = useState(false);
    const [profile, setProfile] = useState(null);

    function getProfile() {
        try {
            const usb = onSnapshot(doc(db, 'profile', userId), doc => {
                if (doc.data()) {
                    console.log(doc.data());
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

        })
    }

    useEffect(()=> {
        getProfile();
    },[])
    return (
        <div>
            <div className="flex flex-row-reverse mb-4">
                <Button onClick={() => downloadPDF()} color="primary">
                    {mDownload == true ? <Loading /> : ''}
                    download pdf
                </Button>
            </div>
            <div ref={pdfRef} className="bg-white p-10 border-t-4 border-amber-600">
                {/* cv header */}
                <div className="flex justify-between mb-4">
                    <Image src={profileImg} width={80} height={80} className="rounded-full" />
                    <div className="text-center">
                            {
                                profile == null ? (<div>Loading...</div>) : (
                                    <div>
                                        <h3 className="md:font-bold md:text-xl mb-2">{profile.full_name}</h3>
                                        <p className="text-[#808080] text-sm mb-2">{profile.professionTitle}</p>
                                    </div>
                                
                                )
                            }
                        
                        {/* <Profile userId={firebase_user.uid} /> */}
                    </div>
                    <div></div>
                </div>
                {/* cv header end */}
                {/* about me */}
                <AboutMe useId={userId} />
                {/* experience */}
                <ExperienceWidget user_id={userId} />
                {/* experience */}
                {/* Education */}
                <EducationWidget user_id={userId} />

                <Publications userId={userId} />

                {/* Education */}
                <Internship userId={userId} />
                {/* skills */}
                <SkillWidget user_id={userId} />
                {/* skills */}
                {/* skills */}
                <Memberships userId={userId} />
                {/* skills */}
                {/* Links */}

                <LinksUser userId={userId} />

                {/* Links */}

                {/* Languages */}
                {/* Languages */}
                {/* referee */}
                <References userId={userId} />
                {/* referee */}
            </div>
        </div>
    );
}

export default TemplateThree;