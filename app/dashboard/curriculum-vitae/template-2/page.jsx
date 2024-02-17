'use client'
import { faEnvelope, faLocationPin, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import profileImg from '@/app/images/profile.jpeg';
import { Button } from "react-daisyui";

const TemplateTwo = () => {
    return (  
        <div className="bg-slate-300 p-5 md:p-20">
            <div className=" bg-white grid grid-cols-6 md:grid md:grid-cols-6">
               <div className="col-span-2 bg-stone-700 pt-2 pl-2 pr-2 md:pt-5 md:pl-10 md:pr-10 text-white">
                    <div className="flex justify-center">
                        <Image alt="image" src={profileImg} width={120} height={120} className="rounded-full w-[40px] h-[40px] md:w-[120px] md:h-[120px] lg:w-[120px] lg:h-[120px]" />
                    </div>
                    {/* location email */}
                    <div className="flex flex-col mt-5">
                        <table className="mb-2">
                            <tbody>
                                <tr>
                                    <td><FontAwesomeIcon icon={faPhone} className="text-green-500 w-[5px] md:w-[22px]" /></td>
                                    <td><p className="text-[5%] md:text-base lg:text-base">+254 715 100 539</p></td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="mb-2">
                            <tbody>
                                <tr>
                                    <td><FontAwesomeIcon icon={faLocationPin} className="text-green-500 w-[5px] md:w-[22px]" /></td>
                                    <td><p className="text-[5%] md:text-base lg:text-base">location</p></td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="mb-2">
                            <tbody>
                                <tr>
                                    <td><FontAwesomeIcon width={22} icon={faEnvelope} className="text-green-500 w-[5px] md:w-[22px]" /></td>
                                    <td><p className="text-[5%] md:text-base lg:text-base">pwambua25@gmail.com</p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* location email */}
                    <div className="md:mt-5 lg:mt-5">
                        <p className="font-bold text-[8px] md:text-lg lg:text-lg border-b md:border-b-2 lg:border-b-2 border-green-500">About</p>
                        <p className="mt-3 text-[5px] md:text-base lg:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, minus pariatur quibusdam maiores doloribus ipsa iusto unde ad velit id esse quis quia tempore laboriosam, dignissimos dolore praesentium recusandae quaerat.</p>
                    </div>
                    <div className="mt-5">
                        <p className="font-bold text-[8px] md:text-lg lg:text-lg border-b md:border-b-2 lg:border-b-2 border-green-500">Skills</p>
                        <div className="flex justify-start mt-3">
                            <ul style={{ listStyleType: 'disc' }} className="text-[5px] md:text-base lg:text-base pl-5 pr-5">
                                <li>Databases</li>
                                <li>HTML</li>
                                <li>CSS</li>
                                <li>Javascript</li>
                                <li>Skill 1</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-5">
                        <p className="font-bold text-[8px] md:text-lg lg:text-lg border-b md:border-b-2 lg:border-b-2 border-green-500">Achievements</p>
                        <div className="mt-3">
                            <p className="text-[7px] md:text-base lg:text-base">Achieve One</p>
                            <p className="text-[5px] md:text-sm lg:text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id fugiat blanditiis sunt asperiores? Illum beatae, at veniam</p>
                        </div>
                        <div className="mt-3">
                            <p className="text-[7px] md:text-base lg:text-base">Achieve Two</p>
                            <p className="text-[5px] md:text-sm lg:text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id fugiat blanditiis sunt asperiores? Illum beatae, at veniam</p>
                        </div>
                    </div>
               </div>
               <div className="col-span-4 bg-white p-2 md:p-[5%] lg:p-[5%]">
                    <p className="border-b-2  md:text-3xl lg:text-3xl font-semibold pb-5 text-green-700">Peter Wambua Mutuku</p>
                    <div className="p-2 md:p-5 lg:p-5">
                        <p className="font-bold text-[8px] md:text-xl lg:text-xl mb-3">Education</p>
                        <div className="flex justify-center text-black">
                            <div className="mb-8 ">
                                <p className="text-green-600 font-bold mb-2 text-[6px] md:text-base lg:text-base">Bachelors, Business</p>
                                <p className="text-[3px] md:text-sm lg:text-sm mb-2">Nairobi University (January 2022 - February 2025)</p>
                                <div className="text-[5px] md:text-sm lg:text-sm">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem facilis possimus dignissimos, similique ut nihil vel ducimus porro quas autem sapiente voluptatum doloribus necessitatibus quia voluptatem a impedit nemo harum!</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center text-black">
                            <div className="mb-8 ">
                                <p className="text-green-600 font-bold mb-2 text-[6px] md:text-base lg:text-base">Bachelors, Business</p>
                                <p className="text-[3px] md:text-sm lg:text-sm mb-2">Nairobi University (January 2022 - February 2025)</p>
                                <div className="text-[5px] md:text-sm lg:text-sm">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem facilis possimus dignissimos, similique ut nihil vel ducimus porro quas autem sapiente voluptatum doloribus necessitatibus quia voluptatem a impedit nemo harum!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    

                    <div className="p-2 md:p-[5%] lg:p-[5%]">
                        <p className="font-bold text-[8px] md:text-xl lg:text-xl mb-3">Experience</p>
                        <div className="flex justify-center text-black">
                            <div className="mb-8 ">
                                <p className="text-green-600 font-bold mb-2 text-[6px] md:text-base lg:text-base">Bachelors, Business</p>
                                <p className="text-[3px] md:text-sm lg:text-sm mb-2">Nairobi University (January 2022 - February 2025)</p>
                                <div className="text-[5px] md:text-sm lg:text-sm">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem facilis possimus dignissimos, similique ut nihil vel ducimus porro quas autem sapiente voluptatum doloribus necessitatibus quia voluptatem a impedit nemo harum!</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center text-black">
                            <div className="mb-8 ">
                                <p className="text-green-600 font-bold mb-2 text-[6px] md:text-base lg:text-base">Bachelors, Business</p>
                                <p className="text-[3px] md:text-sm lg:text-sm mb-2">Nairobi University (January 2022 - February 2025)</p>
                                <div className="text-[5px] md:text-sm lg:text-sm">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem facilis possimus dignissimos, similique ut nihil vel ducimus porro quas autem sapiente voluptatum doloribus necessitatibus quia voluptatem a impedit nemo harum!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-2 md:p-[5%] lg:p-[5%]">
                        <p className="font-bold text-[8px] md:text-xl lg:text-xl mb-3">References</p>
                        <div className="text-[5%] md:text-base lg:text-base flex gap-5 md:flex md:gap-20 lg:flex lg:gap-20 pb-5 md:pb-10 lg:pb-10">
                            <div>
                                <div className="">
                                    <p className="font-bold text-green-500">Sam Mucha</p>
                                    <p>Zulten-WS</p>
                                    <p>CEO</p>
                                    <p>sam@mail.com</p>
                                    <p>+254 715 100 539</p>
                                </div>
                            </div>
                            <div>
                                <div className="">
                                    <p className="font-bold text-green-500">Sam Mucha</p>
                                    <p>Zulten-WS</p>
                                    <p>CEO</p>
                                    <p>sam@mail.com</p>
                                    <p>+254 715 100 539</p>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        </div>
    );
}
 
export default TemplateTwo;


