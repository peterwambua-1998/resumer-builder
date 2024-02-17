import { faEnvelope, faLocationPin, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import profileImg from '@/app/images/profile.jpeg';

const TemplateThree = () => {
    return (
        <div className="p-2 md:pl-[8%] md:pr-[8%] lg:pl-[12%] lg:pr-[12%] md:pt-10 md:pb-10 bg-slate-400 m-vbody">
            <div className="grid grid-cols-5 md:grid md:grid-cols-5 bg-white">
                <div className="col-span-2 bg-[#1E1B4B] text-white text-sm p-5 ">
                    <div className="w-fill flex justify-center">
                        <Image src={profileImg} width={120} height={120} alt="profile-image" className="w-[45%] md:w-[45%] lg:w-[30%] rounded-full" />
                    </div>
                    <p className="md:mt-2 lg:mt-2 text-[8px] md:text-base text-center font-semibold">Data Analyst</p>

                    {/* skills */}
                    <div className="md:mt-8 md:pl-2 md:pr-2 lg:mt-8 lg:pl-4 lg:pr-4">
                        <p className="text-center text-[7px] md:text-base font-semibold border-b md:pb-2 mb-2 md:mb-5 border-[#808080]">Skills</p>
                        <div className="md:pl-2 md:pr-2 lg:pl-8 lg:pr-8">
                            <div className="mb-1 md:mb-5">
                                <p className="font-semibold text-[5px] md:text-[10px] lg:text-sm tracking-wide">HTML</p>
                                <div className="w-full bg-black rounded-full h-1 md:h-1.8 lg:h-2.5 dark:bg-black mt-1">
                                    <div className="bg-[#4F46E5] h-1 md:h-1.8 lg:h-2.5 rounded-full w-[50%]"></div>
                                </div>
                            </div>

                            <div className="mb-1 md:mb-5">
                                <p className="font-semibold text-[5px] md:text-[10px] lg:text-sm tracking-wide">Databases</p>
                                <div className="w-full bg-black rounded-full h-1 md:h-1.8 lg:h-2.5 dark:bg-black mt-1">
                                    <div className="bg-[#4F46E5] h-1 md:h-1.8 lg:h-2.5 rounded-full w-[70%]"></div>
                                </div>
                            </div>

                            <div className="mb-1 md:mb-5">
                                <p className="font-semibold text-[5px] md:text-[10px] lg:text-sm tracking-wide">Javascript</p>
                                <div className="w-full bg-black rounded-full h-1 md:h-1.8 lg:h-2.5 dark:bg-black mt-1">
                                    <div className="bg-[#4F46E5] h-1 md:h-1.8 lg:h-2.5 rounded-full w-[50%]"></div>
                                </div>
                            </div>

                            <div className="mb-1 md:mb-5">
                                <p className="font-semibold text-[5px] md:text-[10px] lg:text-sm tracking-wide">CSS</p>
                                <div className="w-full bg-black rounded-full h-1 md:h-1.8 lg:h-2.5 dark:bg-black mt-1">
                                    <div className="bg-[#4F46E5] h-1 md:h-1.8 lg:h-2.5 rounded-full w-[90%]"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* skills */}

                    {/* awards */}
                    <div className="mt-5 md:mt-10 md:pr-2 md:pl-2 lg:mt-10 lg:pl-4 lg:pr-4">
                        <p className="text-center text-[7px] md:text-base font-semibold border-b md:pb-2 lg:pb-2 border-[#808080] md:mb-5 lg:mb-5">Awards</p>
                        <div className="pl-1 pr-1 md:pl-2 md:pr-2 lg:pl-8 lg:pr-8 mb-2 md:mb-5 lg:mb-5">
                            <p className="font-semibold text-[6px] md:text-xs md:mb-2">Award One</p>
                            <p className="text-[5px] md:text-xs text-[#808080] m-line">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod molestias incidunt officia consequuntur deserunt numquam maxime. Error sapiente dolorum dolor repellendus accusamus quo in, ratione, unde ducimus consequatur ipsa.</p>
                        </div>
                        <div className="md:pl-2 md:pr-2 lg:pl-8 lg:pr-8 mb-2 md:mb-5 lg:mb-5">
                            <p className="font-semibold text-[6px] md:text-xs md:mb-2">Award One</p>
                            <p className="text-[5px] md:text-xs text-[#808080] m-line">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod molestias incidunt officia consequuntur deserunt numquam maxime. Error sapiente dolorum dolor repellendus accusamus quo in, ratione, unde ducimus consequatur ipsa.</p>
                        </div>
                    </div>
                    {/* awards */}

                    {/* languages */}
                    <div className="md:mt-10 md:pl-2 md:pr-2 lg:mt-10 lg:pl-4 lg:pr-4">
                        <p className="text-center text-[7px] md:text-base font-semibold border-b md:pb-2 lg:pb-2 border-[#808080] md:mb-5 lg:mb-5">Languages</p>
                        <div className="md:pl-2 md:pr-2 lg:pl-8 lg:pr-8 md:mb-5 flex gap-2">
                            <p className="font-semibold text-[5px] md:text-xs mb-2">English</p>
                            <p className="text-[5px] md:text-xs text-[#808080]">(native)</p>
                        </div>
                        <div className="md:pl-2 md:pr-2 lg:pl-8 lg:pr-8 md:mb-5 flex gap-2">
                            <p className="font-semibold text-[5px] md:text-xs mb-2">Swahili</p>
                            <p className="text-[5px] md:text-xs text-[#808080]">(professional)</p>
                        </div>

                    </div>
                    {/* languages */}

                </div>
                <div className="col-span-3 md:col-span-3 pl-3 pr-3 md:pl-10 md:pr-10 lg:pl-10 lg:pr-10 pt-5">
                    <p className="text-[10px] md:text-lg lg:text-xl font-bold mb-2 md:mb-4 lg:mb-8 text-[#1E1B4B]">Peter Wambua Mutuku</p>
                    {/* contanct */}
                    <div className="grid grid-cols-3 gap-2 text-[5px] md:text-sm lg:text-sm w-full">
                        <div className="flex gap-2">
                            <FontAwesomeIcon icon={faPhone} className="w-[8%] md:w-[8%] lg:w-[8%]" />
                            <p className="md:text-[8px] lg:text-base">0715 100 539</p>
                        </div>
                        <div className="flex gap-2">
                            <FontAwesomeIcon icon={faPhone} className="w-[8%] md:w-[8%] lg:w-[8%]" />
                            <p className="md:text-[8px] lg:text-base">0715 100 539</p>
                        </div>
                        <div className="flex gap-2">
                            <FontAwesomeIcon icon={faPhone} className="w-[8%] md:w-[8%] lg:w-[8%]" />
                            <p className="md:text-[8px] lg:text-base">0715 100 539</p>
                        </div>
                    </div>
                    {/* contanct */}

                    {/* about */}
                    <div className="mt-2 md:mt-4 lg:mt-8">
                        <p className="text-[5px] md:text-[10px] lg:text-xs text-[#808080]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software.</p>
                    </div>
                    {/* about */}

                    {/* work experience */}
                    <div className="mt-8">
                        <p className="text-[10px] md:text-sm lg:text-base font-semibold text-[#1E1B4B] border-b border-[#808080] pb-2">Work Experience</p>
                        <div className="pr-2 pl-2 md:pl-4 md:pr-4">
                            <div className="mb-3 md:mb-6 lg:mb-6">
                                <p className="text-[8px] md:text-xs lg:text-sm mb-2 font-semibold mt-2 md:mt-5 lg:mt-5">Business Consultant</p>
                                <p className="text-[5px] md:text-[8px] lg:text-xs text-[#808080] mb-2">Google inc - (2017 - 2022)</p>
                                <p className="text-[6px] md:text-[10px] lg:text-xs">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially.
                                </p>
                            </div>
                            <div className="mb-3 md:mb-6 lg:mb-6">
                                <p className="text-[8px] md:text-xs lg:text-sm mb-2 font-semibold mt-2 md:mt-5 lg:mt-5">Business Consultant</p>
                                <p className="text-[5px] md:text-[8px] lg:text-xs text-[#808080] mb-2">Google inc - (2017 - 2022)</p>
                                <p className="text-[6px] md:text-[10px] lg:text-xs">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially.
                                </p>
                            </div>
                        </div>

                    </div>
                    {/* work experience */}

                    {/* work experience */}
                    <div className="mt-8">
                        <p className="text-[10px] md:text-sm lg:text-base font-semibold text-[#1E1B4B] border-b border-[#808080] pb-2">Education</p>
                        <div className="pr-2 pl-2 md:pl-4 md:pr-4">
                            <div className="mb-3 md:mb-6 lg:mb-6">
                                <p className="text-[8px] md:text-xs lg:text-sm mb-2 font-semibold mt-2 md:mt-5 lg:mt-5">Business Consultant</p>
                                <p className="text-[5px] md:text-[8px] lg:text-xs text-[#808080] mb-2">Google inc - (2017 - 2022)</p>
                                <p className="text-[6px] md:text-[10px] lg:text-xs">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially.
                                </p>
                            </div>
                            <div className="mb-3 md:mb-6 lg:mb-6">
                                <p className="text-[8px] md:text-xs lg:text-sm mb-2 font-semibold mt-2 md:mt-5 lg:mt-5">Business Consultant</p>
                                <p className="text-[5px] md:text-[8px] lg:text-xs text-[#808080] mb-2">Google inc - (2017 - 2022)</p>
                                <p className="text-[6px] md:text-[10px] lg:text-xs">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially.
                                </p>
                            </div>
                        </div>

                    </div>
                    {/* work experience */}

                    {/* references */}
                    <div className="mt-5 mb-10">
                        <p className="text-[10px] md:text-sm lg:text-base font-semibold text-[#1E1B4B] border-b border-[#808080] pb-2">Education</p>
                        <div className="pr-2 pl-2 md:pl-4 md:pr-4 lg:pl-4 lg:pr-4 flex flex-wrap gap-8">
                            <div className="text-xs">
                                <p className="text-[8px] md:text-xs lg:text-sm font-semibold mb-0 md:mb-2 lg:mb-2">Sam Mucha</p>
                                <p className="text-[6px] md:text-[8px] lg:text-xs mb-0 md:mb-2 lg:mb-2">CEO</p>
                                <p className="text-[6px] md:text-[8px] lg:text-xs mb-0 md:mb-2 lg:mb-2">sam@mail.com</p>
                                <p className="text-[6px] md:text-[8px] lg:text-xs">07100909876</p>
                            </div>
                        </div>
                    </div>
                    {/* references */}

                </div>
            </div>
        </div>
    );
}

export default TemplateThree;


