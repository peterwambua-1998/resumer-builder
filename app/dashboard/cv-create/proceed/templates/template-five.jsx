import { faEnvelope, faLocation, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import AboutMe from './template-five-components/about';
import Award from './template-five-components/awards';
import EducationWidget from './template-five-components/education';
import ExperienceWidget from './template-five-components/experience';
import Hobbies from './template-five-components/hobbies';
import Languages from './template-five-components/languages';
import { useEffect, useRef, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/app/firebase/firebase';
import { Button, Loading, Skeleton } from 'react-daisyui';
import Projects from './template-five-components/projects';
import References from './template-five-components/references';
import SkillWidget from './template-five-components/skills';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TemplateFive = ({userId}) => {
    const [profile, setProfile] = useState(null);
    let [loading, setLoading] = useState(true);
    const pdfRef = useRef();
    const [mDownload, setMDownload] = useState(false);

    function getProfile() {
        try {
            const usb = onSnapshot(doc(db, 'profile', userId), doc => {
                if (doc.data()) {
                    setProfile(doc.data());
                } else {
                    setProfile(null);
                }
            });
            setLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

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
        })
    }

    useEffect(() => {
        getProfile();
    }, [])


    return ( 
        <div>
            <div className="flex flex-row-reverse mb-4">
                <Button onClick={() => downloadPDF()} color="primary">
                    {mDownload == true ?  <Loading /> : ''}
                    download pdf
                </Button>
            </div>
            <div ref={pdfRef} className="grid grid-cols-5 md:grid md:grid-cols-5 bg-white">
                    <div className="col-span-2 bg-[#1E1B4B] text-white text-sm p-5 ">
                        <div className="w-fill flex justify-center">
                        {profile == null ?
                            (
                                <div>
                                    <Skeleton className="w-[45%] md:w-[45%] lg:w-[30%] rounded-full bg-slate-300"></Skeleton>
                                </div>) :

                            (
                                <Image src={profile.file_url} width={120} height={120} alt="profile-image" className="w-[45%] md:w-[45%] lg:w-[30%] rounded-full" />
                            )
                        }
                        </div>
                        {profile == null ?
                            (
                                <div>
                                    <Skeleton className="h-4 w-full bg-slate-300 md:mt-2 lg:mt-2"></Skeleton>
                                </div>
                            ):
                            (
                                <p className="md:mt-2 lg:mt-2 text-[8px] md:text-base text-center font-semibold">{profile.professionTitle}</p>
                            )}
                        {/* skills */}
                        <SkillWidget user_id={userId} />
                        {/* skills */}

                        {/* awards */}
                        <Award userId={userId} />
                        {/* awards */}

                        {/* hobbies */}
                        <Hobbies userId={userId} />
                        {/* hobbies */}

                        {/* languages */}
                        <Languages userId={userId} />
                        {/* languages */}

                    </div>

                    
                    <div className="col-span-3 md:col-span-3 pl-3 pr-3 md:pl-10 md:pr-10 lg:pl-10 lg:pr-10 pt-5">
                    {
                        profile == null ?

                        (
                            <div className="grid grid-cols-3 gap-2 text-[5px] md:text-sm lg:text-sm w-full">
                                <div className="flex gap-2">
                                    <Skeleton className='w-[8%] md:w-[8%] lg:w-[8%]'></Skeleton>
                                    <Skeleton className='h-2 w-full bg-slate-300'></Skeleton>
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className='w-[8%] md:w-[8%] lg:w-[8%]'></Skeleton>
                                    <Skeleton className='h-2 w-full bg-slate-300'></Skeleton>
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className='w-[8%] md:w-[8%] lg:w-[8%]'></Skeleton>
                                    <Skeleton className='h-2 w-full bg-slate-300'></Skeleton>
                                </div>
                            </div>
                        ) :

                        (
                            <div>
                                <p className="text-[10px] md:text-lg lg:text-xl font-bold mb-2 md:mb-4 lg:mb-8 text-[#1E1B4B]">Peter Wambua Mutuku</p>
                                <div className="grid grid-cols-3 gap-2 text-[5px] md:text-sm lg:text-sm w-full">
                                    <div className="flex gap-2">
                                        <FontAwesomeIcon icon={faPhone} className="w-[8%] md:w-[8%] lg:w-[8%]" />
                                        <p className="md:text-[8px] lg:text-[12px]">{profile.phoneNumber}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <FontAwesomeIcon icon={faEnvelope} className="w-[8%] md:w-[8%] lg:w-[8%]" />
                                        <p className="md:text-[8px] lg:text-[12px]">{profile.email}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <FontAwesomeIcon icon={faLocation} className="w-[8%] md:w-[8%] lg:w-[8%]" />
                                        <p className="md:text-[8px] lg:text-[12px]">{profile.location}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                        

                        {/* about */}
                        <AboutMe useId={userId} />
                        {/* about */}

                        {/* work experience */}
                        <ExperienceWidget user_id={userId} />
                        {/* work experience */}

                        {/* work experience */}
                        <EducationWidget user_id={userId} />
                        {/* work experience */}

                        {/* projects */}
                        <Projects userId={userId} />
                        {/* projects */}

                        {/* references */}
                        <References userId={userId} />
                        {/* references */}

                    </div>
            </div>
        </div> 
    );
}
 
export default TemplateFive;