'use client'
import { faCirclePlus, faEnvelope, faLocationPin, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import profileImg from '@/app/images/profile.jpeg';
import { Button, Modal, Input } from "react-daisyui";
import { useState } from "react";

const TemplateOne = () => {
    const [visibleEdu, setVisibleEdu] = useState(false);
    const toggleVisibleEdu = () => {
        setVisibleEdu(!visibleEdu);
    };

    var [eduData, setEduData] = useState([]);
    var [school, setSchool] = useState(null);
    var [degree, setDegree] = useState(null);
    var [fieldStudy, setFieldStudy] = useState(null);
    var [starDate, setStartDate] = useState(null);
    var [endDate, setEndDate] = useState(null);
    var [grade, setGrade] = useState(null);
    var [descriptionEdu, setDescriptionEdu] = useState(null);
   

    var [schoolError, setSchoolError] = useState(null);
    var [degreeError, setDegreeError] = useState(null);
    var [fieldStudyError, setFieldStudyError] = useState(null);
    var [startDateError, setStartDateError] = useState(null);
    var [endDateError, setEndDateError] = useState(null);
    var [gradeError, setGradeError] = useState(null);
    var [descriptionEduError, setDescriptionEduError] = useState(null);

    async function addEdu() {
        if (school == null || !school) {
            setSchoolError('field required');
            return;
        } else {
            setSchoolError(null);
        }


        if (degree == null || !degree) {
            setDegreeError('field required');
            return;
        } else {
            setDegreeError(null);
        }


        if (fieldStudy == null || !fieldStudy) {
            setFieldStudyError('field required');
            return;
        } else {
            setFieldStudyError(null);
        }

      
        if (starDate == null || !starDate) {
            setStartDateError('field required');
            return;
        } else {
            setStartDateError(null);
        }

        if (endDate == null || !endDate) {
            setEndDateError('field required');
            return;
        } else {
            setEndDateError(null);
        }

        if (grade == null || !grade) {
            setGradeError('field required');
            return;
        } else {
            setGradeError(null);
        }

        if (descriptionEdu == null || !descriptionEdu) {
            setDescriptionEduError('field required');
            return;
        } else {
            setDescriptionEduError(null);
        }

        try {
            let eduRef =  collection(db, 'education');
            await addDoc(eduRef, {
                school: school,
                degree: degree,
                fieldStudy: fieldStudy,
                startDate: starDate,
                endDate: endDate,
                grade: grade,
                descriptionEdu: descriptionEdu,
                user_id: user_id,
                created_at: Timestamp.now()
            });
        } catch (error) {
            console.log('system error please try again');
        }
    }

    return (  
        <div className="bg-slate-300 p-2 md:p-20 lg:p-20">
            <div className=" bg-white ">
                {/* top dark area */}
                <div className=" bg-indigo-950 text-white p-2 md:p-10 lg:p-10">
                    <p className="font-bold text-base md:text-3xl lg:text-3xl mb-3 text-center">Peter Wambua Mutuku</p>
                    <div className="flex justify-center">
                    <div className="dashed-text-container mb-3 w-full md:w-[90%] lg:w-[90%]">
                        <div className="dashed-line"></div>
                        <span className="dashed-text font-semibold text-[10px] md:text-lg lg:text-lg ml-3 mr-3">data analyst</span>
                        <div className="dashed-line"></div>
                    </div>
                    </div>
                    
                    <div className="grid grid-cols-3 md:grid md:grid-cols-3">
                        <div className="flex flex-col items-center w-full ">
                            <FontAwesomeIcon  icon={faLocationPin} className="text-amber-500 text-xs md:w-[22px]" />
                            <p className="text-[8px] md:text-base lg:text-base">location</p>
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <FontAwesomeIcon  icon={faEnvelope} className="text-amber-500 text-xs md:w-[22px]" />
                            <p className="text-[8px] md:text-base lg:text-base">pwambua25@gmail.com</p>
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <FontAwesomeIcon  icon={faPhone} className="text-amber-500 text-xs md:w-[22px]" />
                            <p className="text-[8px] md:text-base lg:text-base">+254 715 100 539</p>
                        </div>
                    </div>
                    
                </div>
                {/* top dark area */}

                {/* profile photo and about */}
                <div className="grid grid-cols-4 md:grid md:grid-cols-4 mt-5">
                    <div className="pl-5 pr-0 md:pl-20 md:pr-0 lg:pl-20 lg:pr-0">
                        <Image alt="profile" src={profileImg} width={120} height={120} className="rounded-full w-[40px] h-[40px] md:w-[120px] md:h-[120px] lg:w-[120px] lg:h-[120px]"  />
                    </div>
                    <div className="col-span-3 md:pr-10 lg:pr-10">
                        <p className="mb-2 font-bold text-indigo-950 text-xs md:text-lg lg:text-lg">Profile </p>
                        <p className="text-[8px] md:text-base lg:text-base">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint minima animi quod officiis fugiat, ex quo magni veritatis, at dignissimos vero nihil ut autem quidem similique soluta sequi. Praesentium, amet?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint minima animi quod officiis fugiat, ex quo magni veritatis, at dignissimos vero nihil ut autem quidem similique soluta sequi. Praesentium, amet?
                        </p>
                        
                        <div className="p-2 mb-2">
                            <button className="text-[5px] md:text-base lg:text-base bg-amber-500 pt-2 pb-2 pl-4 pr-4 rounded-full w-full text-black"><FontAwesomeIcon icon={faCirclePlus} /> Add About</button>
                        </div>
                    </div>
                </div>
                {/* profile photo and about */}

                {/* grid */}
                <div className="grid grid-cols-4 md:grid md:grid-cols-4 mt-5">
                    <div className=" text-white border-r border-amber-400">
                        <div className="bg-indigo-950">
                            <p className="font-bold text-[8px] md:text-lg lg:text-lg text-center">Skills</p>
                        </div>
                        <div className="flex justify-center mb-2 text-[5px] md:text-base lg:text-base">
                            <ul style={{ listStyleType: 'disc' }} className="text-black pl-10 pr-10 ">
                                <li>Databases</li>
                                <li>HTML</li>
                                <li>CSS</li>
                                <li>Javascript</li>
                                <li>Skill 1</li>
                            </ul>
                        </div>
                        <div className="p-2 mb-2">
                            <button className="text-[5px] md:text-base lg:text-base bg-amber-500 pt-2 pb-2 pl-4 pr-4 rounded-full w-full text-black"><FontAwesomeIcon icon={faCirclePlus} /> Add Skill</button>
                        </div>
                        
                        <div className="bg-indigo-950 ">
                            <p className="font-bold text-[8px] md:text-lg lg:text-lg text-center">Education</p>
                        </div>
                        <div className="flex justify-center text-black">
                            <div className="mb-8 p-2 md:p-5 lg:p-5">
                                <p className="text-blue-600 text-[6px] md:text-base lg:text-base font-bold mb-2">Bachelors, Business and Management</p>
                                <p className="text-[3px] md:text-sm lg:text-sm mb-2">Nairobi University (January 2022 - February 2025)</p>
                                <div className=" md:pl-3 lg:pl-3 text-[5px] md:text-sm lg:text-sm">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem facilis possimus dignissimos, similique ut nihil vel ducimus porro quas autem sapiente voluptatum doloribus necessitatibus quia voluptatem a impedit nemo harum!</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 mb-2">
                            <button onClick={toggleVisibleEdu} className="text-[5px] md:text-base lg:text-base bg-amber-500 pt-2 pb-2 pl-4 pr-4 rounded-full w-full text-black"><FontAwesomeIcon icon={faCirclePlus} /> Add Education</button>
                        </div>
                    </div>
                    <div className="col-span-3 pl-5 pr-5 md:pl-10 md:pr-10 lg:pl-10 lg:pr-10 border-t border-amber-400">
                        <p className="font-bold text-[12px] md:text-lg lg:text-lg text-center mt-2 border-b">Work Experience</p>
                        <div className="mt-5">
                            <p className="text-blue-600 font-bold mb-2 text-[8px] md:text-lg lg:text-lg">Programmer, Google</p>
                            <p className="text-[2%] md:text-sm lg:text-sm mb-2">Nairobi, Kenya (January 2022 - February 2025)</p>
                            <div className="pl-3">
                                <ul style={{ listStyleType: 'disc' }}>
                                    <li className="text-[5%] md:text-base lg:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem facilis possimus dignissimos, similique ut nihil vel ducimus porro quas autem sapiente voluptatum doloribus necessitatibus quia voluptatem a impedit nemo harum!</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-5">
                            <p className="text-blue-600 font-bold mb-2 text-[8px] md:text-lg lg:text-lg">Programmer, Google</p>
                            <p className="text-[2%] md:text-sm lg:text-sm mb-2">Nairobi, Kenya (January 2022 - February 2025)</p>
                            <div className="pl-3">
                                <ul style={{ listStyleType: 'disc' }}>
                                    <li className="text-[5%] md:text-base lg:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem facilis possimus dignissimos, similique ut nihil vel ducimus porro quas autem sapiente voluptatum doloribus necessitatibus quia voluptatem a impedit nemo harum!</li>
                                </ul>
                            </div>
                        </div>

                        <div className="p-2 mb-2">
                            <button className="text-[5px] md:text-base lg:text-base bg-amber-500 pt-2 pb-2 pl-4 pr-4 rounded-full w-full text-black"><FontAwesomeIcon icon={faCirclePlus} /> Add Experience</button>
                        </div>

                        <p className="font-bold text-[12px] md:text-lg lg:text-lg text-center mt-5 border-b mb-5">References</p>
                        <div className="text-[5%] md:text-base lg:text-base flex gap-5 md:flex md:gap-20 lg:flex lg:gap-20 pb-5 md:pb-10 lg:pb-10">
                            <div>
                                <div className="">
                                    <p className="font-bold text-blue-500">Sam Mucha</p>
                                    <p>Zulten-WS</p>
                                    <p>CEO</p>
                                    <p>sam@mail.com</p>
                                    <p>+254 715 100 539</p>
                                </div>
                            </div>
                            <div>
                                <div className="">
                                    <p className="font-bold text-blue-500">Sam Mucha</p>
                                    <p>Zulten-WS</p>
                                    <p>CEO</p>
                                    <p>sam@mail.com</p>
                                    <p>+254 715 100 539</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 mb-2">
                            <button className="text-[5px] md:text-base lg:text-base bg-amber-500 pt-2 pb-2 pl-4 pr-4 rounded-full w-full text-black"><FontAwesomeIcon icon={faCirclePlus} /> Add Referee</button>
                        </div>
                    </div>
                </div>
                {/* grid */}
            </div>

            {/* education modal */}
            <Modal.Legacy open={visibleEdu} className="bg-white max-w-5xl">
                <form>
                    <Modal.Header className="font-bold">Eduction</Modal.Header>
                    <Modal.Body className="p-0">
                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">School</span>
                                        </label>
                                        <Input className="bg-white text-black" placeholder="school" onChange={(e) => setSchool(e.target.value)} />
                                        <div className="text-red-600 text-sm">{schoolError}</div>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full">
                                        <label className="label ">
                                            <span className="label-text text-black">Degree</span>
                                        </label>
                                        <Input className="bg-white text-black" placeholder="Ex: Bachelors" onChange={(e) => setDegree(e.target.value)} />
                                        <div className="text-red-600 text-sm">{degreeError}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Field of study</span>
                                        </label>
                                        <Input className="bg-white text-black" placeholder="Ex: Business" onChange={(e) => setFieldStudy(e.target.value)} />
                                        <div className="text-red-600 text-sm">{fieldStudyError}</div>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full">
                                        <label className="label ">
                                            <span className="label-text text-black">Start date</span>
                                        </label>
                                        <Input type="date" className="bg-white text-black" onChange={(e) => setStartDate(e.target.value)} />
                                        <div className="text-red-600 text-sm">{startDateError}</div>
                                    </div>
                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">End date</span>
                                        </label>
                                        <Input type="date" className="bg-white text-black" onChange={(e) => setEndDate(e.target.value)} />
                                        <div className="text-red-600 text-sm">{endDateError}</div>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Grade</span>
                                        </label>
                                        <Input className="bg-white text-black" placeholder="grade" onChange={(e) => setGrade(e.target.value)} />
                                        <div className="text-red-600 text-sm">{gradeError}</div>
                                    </div>
                                </div>
                            </div>


                            


                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                
                                <div className="flex w-full items-center justify-start gap-2 mb-3 col-span-2">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Description (optional)</span>
                                        </label>
                                        <Input className="bg-white text-black" placeholder="Description" onChange={(e) => setDescriptionEdu(e.target.value)} />
                                        <div className="text-red-600 text-sm">{descriptionEduError}</div>
                                    </div>
                                </div>
                            </div>
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisibleEdu} >Close</Button>
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => addEdu()}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy>
        </div>
    );
}
 
export default TemplateOne;