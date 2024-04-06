import Image from "next/image";
import profImage from '@/app/images/profile.jpeg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocation, faPhone, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, Loading } from "react-daisyui";
import AboutMe from "./template-four-components/about";
import { useEffect, useRef, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import Award from "./template-four-components/awards";
import EducationWidget from "./template-four-components/education";
import ExperienceWidget from "./template-four-components/experience";
import Hobbies from "./template-four-components/hobbies";
import Languages from "./template-four-components/languages";
import Projects from "./template-four-components/projects";
import References from "./template-four-components/references";
import SkillWidget from "./template-four-components/skills";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Internship from "./template-four-components/internship";
import Memberships from "./template-four-components/membership";
import Publications from "./template-four-components/publications";
import LinksUser from "./template-four-components/links";
import ProfilePhoto from "./template-four-components/profilePhoto";

const TemplateFour = ({ userId }) => {
    const pdfRef = useRef();
    const [mDownload, setMDownload] = useState(false);
    const [profile, setProfile] = useState(null);
    let [loading, setLoading] = useState(true);


    function getProfile() {
        try {
            const usb = onSnapshot(doc(db, 'profile', userId), doc => {
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

    async function downloadPDF() {
        // check if user has subscription
        setMDownload(true);
        let subDoc = await getDoc(doc(db, 'subscriptions', userId));
        // take user to subscription page to begin payment
        if (subDoc.exists() == false) {
            router.replace('/dashboard/subscription');
        }
    }

    useEffect(() => {
        getProfile();
    }, [])

    return (
        <div>
            <div classNameName="flex flex-row-reverse mb-4">
                <Button onClick={() => downloadPDF()} color="primary">
                    {mDownload == true ?  <Loading /> : ''}
                    download pdf
                </Button>
            </div>
            <div className="">
                <div className="bg-white p-5">
                    {/* <!-- name and role --> */}
                    <div className="flex gap-4">
                        <div className="w-[2%] bg-violet-900"></div>
                        <div>
                            {
                                profile !== null ? <p className="text-3xl font-bold">{profile.full_name}</p> : <p></p>
                            }
                        </div>
                    </div>
                    <div className="mt-4 pb-2 border-b border-slate-400">
                        {
                            profile !== null ? <p className="text-violet-900">programmer</p> : <p></p>
                        }
                    </div>
                    {/* <!-- name and role --> */}

                    {/* <!-- contact --> */}
                    <div className="mt-2">
                        <p className="text-sm text-[#808080] font-bold">CONTACT</p>
                        <div className="grid grid-cols-3 text-sm mt-2">
                            <div className="flex">
                                <p><FontAwesomeIcon icon={faEnvelope} className="w-[100%] md:w-[100%] lg:w-[100%]" /></p>
                                <p>pwambua25@gmail.com</p>
                            </div>
                            <div className="flex">
                                <p>
                                <FontAwesomeIcon icon={faLocation} className="w-[100%] md:w-[100%] lg:w-[100%]" /> 
                                </p>
                                <p>Machakos, Athiriver</p>
                            </div>
                            <div className="flex">
                                <p>
                                <FontAwesomeIcon icon={faPhone} className="w-[100%] md:w-[100%] lg:w-[100%] " />
                                </p>
                                <p>0722848772</p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- contact --> */}


                    {/* <!-- grid --> */}
                    <div className="grid grid-cols-6 mt-6 gap-10">
                        <div className="col-span-4">
                            {/* <!-- profile --> */}
                            <div className="mb-10">
                                <p className="text-violet-900 font-bold">Experience</p>
                                <div className="mt-2 mb-2">
                                    <p className="text-lg font-semibold">Software Engineer <span className="text-[#808080]">@ Egnite - Independent Consulting</span></p>
                                    <p className="text-sm font-semibold text-[#475569]">August 2022 - December 2022</p>
                                    <p className="text-sm"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dignissimos repellat porro expedita officiis, at libero aliquid ratione ipsam fuga aperiam esse vitae praesentium molestias deserunt, reiciendis, nesciunt distinctio veritatis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam rerum accusamus ex? Explicabo, alias ex placeat repellat expedita aspernatur quae sint porro voluptas asperiores soluta, unde mollitia sunt. Similique, iste?</p>
                                </div>
                                <div className="mt-2">
                                    <p className="text-lg font-semibold">Software Engineer <span className="text-[#808080]">@ Egnite - Independent Consulting</span></p>
                                    <p className="text-sm font-semibold text-[#475569]">August 2022 - December 2022</p>
                                    <p className="text-sm"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dignissimos repellat porro expedita officiis, at libero aliquid ratione ipsam fuga aperiam esse vitae praesentium molestias deserunt, reiciendis, nesciunt distinctio veritatis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam rerum accusamus ex? Explicabo, alias ex placeat repellat expedita aspernatur quae sint porro voluptas asperiores soluta, unde mollitia sunt. Similique, iste?</p>
                                </div>
                            </div>
                            {/* <!-- profile --> */}


                            {/* <!-- profile --> */}
                            <div className="mb-10">
                                <p className="text-violet-900 font-bold">Education</p>
                                <div className="mt-2 mb-2">
                                    <p className="text-lg font-semibold">Software Engineer <span className="text-[#808080]">@ Egnite - Independent Consulting</span></p>
                                    <p className="text-sm font-semibold text-[#475569]">August 2022 - December 2022</p>
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dignissimos repellat porro expedita officiis, at libero aliquid ratione ipsam fuga aperiam esse vitae praesentium molestias deserunt, reiciendis, nesciunt distinctio veritatis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam rerum accusamus ex? Explicabo, alias ex placeat repellat expedita aspernatur quae sint porro voluptas asperiores soluta, unde mollitia sunt. Similique, iste?</p>
                                </div>
                                <div className="mt-2">
                                    <p className="text-lg font-semibold">Software Engineer <span className="text-[#808080]">@ Egnite - Independent Consulting</span></p>
                                    <p className="text-sm font-semibold text-[#475569]">August 2022 - December 2022</p>
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dignissimos repellat porro expedita officiis, at libero aliquid ratione ipsam fuga aperiam esse vitae praesentium molestias deserunt, reiciendis, nesciunt distinctio veritatis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam rerum accusamus ex? Explicabo, alias ex placeat repellat expedita aspernatur quae sint porro voluptas asperiores soluta, unde mollitia sunt. Similique, iste?</p>
                                </div>
                            </div>
                            {/* <!-- profile --> */}

                            {/* <!-- Projects --> */}
                            <div className="mb-10">
                                <p className="text-violet-900 font-bold">Projects</p>
                                <div className="mt-2 mb-2">
                                    <p className="text-lg font-semibold">Project one</p>
                                    <p className="text-sm"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dignissimos repellat porro expedita officiis, at libero aliquid ratione ipsam fuga aperiam esse vitae praesentium molestias deserunt, reiciendis, nesciunt distinctio veritatis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam rerum accusamus ex? Explicabo, alias ex placeat repellat expedita aspernatur quae sint porro voluptas asperiores soluta, unde mollitia sunt. Similique, iste?</p>
                                </div>
                                <div className="mt-2 mb-2">
                                    <p className="text-lg font-semibold">Project one</p>
                                    <p className="text-sm"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dignissimos repellat porro expedita officiis, at libero aliquid ratione ipsam fuga aperiam esse vitae praesentium molestias deserunt, reiciendis, nesciunt distinctio veritatis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam rerum accusamus ex? Explicabo, alias ex placeat repellat expedita aspernatur quae sint porro voluptas asperiores soluta, unde mollitia sunt. Similique, iste?</p>
                                </div>
                            </div>
                            {/* <!-- Projects --> */}

                            {/* <!-- Projects --> */}
                            <div className="mb-10">
                                <p className="text-violet-900 font-bold">Internship Work</p>
                                <div className="mt-2 mb-2">
                                    <p className="text-lg font-semibold">Software Engineer <span className="text-[#808080]">@ Egnite - Independent Consulting</span></p>
                                    <p className="text-sm font-semibold text-[#475569]">2 months</p>
                                    <p className="text-sm"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dignissimos repellat porro expedita officiis, at libero aliquid ratione ipsam fuga aperiam esse vitae praesentium molestias deserunt, reiciendis, nesciunt distinctio veritatis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam rerum accusamus ex? Explicabo, alias ex placeat repellat expedita aspernatur quae sint porro voluptas asperiores soluta, unde mollitia sunt. Similique, iste?</p>
                                </div>
                                <div className="mt-2">
                                    <p className="text-lg font-semibold">Software Engineer <span className="text-[#808080]">@ Egnite - Independent Consulting</span></p>
                                    <p className="text-sm font-semibold text-[#475569]">3 months</p>
                                    <p className="text-sm"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dignissimos repellat porro expedita officiis, at libero aliquid ratione ipsam fuga aperiam esse vitae praesentium molestias deserunt, reiciendis, nesciunt distinctio veritatis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam rerum accusamus ex? Explicabo, alias ex placeat repellat expedita aspernatur quae sint porro voluptas asperiores soluta, unde mollitia sunt. Similique, iste?</p>
                                </div>
                            </div>
                            {/* <!-- Projects --> */}

                            {/* <!-- Links --> */}
                            <div className="mb-10">
                                <p className="text-violet-900 font-bold">Publications</p>
                                <div className="mt-2 mb-2">
                                    <p className="text-base font-semibold">Pub One</p>
                                    <p className="text-sm text-[#475569]"> http://localhost:3000/dashboard/cv-create/proceed</p>
                                </div>
                                <div className="mt-2 mb-2">
                                    <p className="text-base font-semibold">Pub Two</p>
                                    <p className="text-sm text-[#475569]"> http://localhost:3000/dashboard/cv-create/proceed</p>
                                </div>
                            </div>
                            {/* <!-- Links --> */}

                            {/* <!-- Links --> */}
                            <div className="mb-10">
                                <p className="text-violet-900 font-bold">Links</p>
                                <div className="mt-2 mb-2">
                                    <p className="text-base font-semibold">Website</p>
                                    <p className="text-sm text-[#475569]"> http://localhost:3000/dashboard/cv-create/proceed</p>
                                </div>
                                <div className="mt-2 mb-2">
                                    <p className="text-base font-semibold">Website</p>
                                    <p className="text-sm text-[#475569]"> http://localhost:3000/dashboard/cv-create/proceed</p>
                                </div>
                            </div>
                            {/* <!-- Links --> */}

                            <div className="mb-10">
                                <p className="text-violet-900 font-bold">References</p>
                                <div className="flex gap-10 flex-wrap">
                                    <div className="text-xs">
                                        <p className="text-[8px] md:text-xs lg:text-sm font-semibold mb-2 md:mb-2 lg:mb-2">{'refrence.referee_name'}</p>
                                        <p className="text-[6px] md:text-[8px] lg:text-xs mb-2 md:mb-2 lg:mb-2">{'refrence.organization'}</p>
                                        <p className="text-[6px] md:text-[8px] lg:text-xs mb-2 md:mb-2 lg:mb-2">{'refrence.role'}</p>
                                        <p className="text-[6px] md:text-[8px] lg:text-xs mb-2 md:mb-2 lg:mb-2">{'refrence.email'}</p>
                                        <p className="text-[6px] md:text-[8px] lg:text-xs">{'refrence.phone'}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-span-2">
                            {/* <!-- skills --> */}
                            <div className="mb-10">
                                <p className="text-violet-900 font-bold">Skills</p>
                                <div className="flex gap-2 flex-wrap text-sm">
                                    <span className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">Skill one</span>
                                    <span className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">Skill one</span>
                                    <span className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">Skill one</span>
                                    <span className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">Skill one</span>
                                    <span className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">Skill one</span>
                                </div>
                            </div>
                            {/* <!-- skills --> */}

                            {/* <!-- languages --> */}
                            <div className="mb-10">
                                <p className="text-violet-900 font-bold">Languages</p>
                                <div className="flex gap-2 flex-wrap text-sm">
                                    <span className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">Swahili (native)</span>
                                    <span className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">English (native)</span>
                                    <span className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">Swahili (native)</span>
                                    <span className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">English (native)</span>
                                </div>
                            </div>
                            {/* <!-- languages --> */}

                            {/* <!-- Memberships --> */}
                            <div className="mb-10">
                                <p className="text-violet-900 font-bold">Memberships</p>
                                <div className="flex gap-2 flex-wrap text-sm">
                                    <span className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">Swahili (native)</span>
                                    <span className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">English (native)</span>
                                    <span className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">Swahili (native)</span>
                                    <span className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">English (native)</span>
                                </div>
                            </div>
                            {/* <!-- Memberships --> */}

                            {/* <!-- Hobbies --> */}
                            <div className="mb-10">
                                <p className="text-violet-900 font-bold">Hobbies</p>
                                <div className="flex gap-2 flex-wrap text-sm">
                                    <span className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">Singing</span>
                                    <span className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">Writing</span>
                                </div>
                            </div>
                            {/* <!-- Hobbies --> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TemplateFour;