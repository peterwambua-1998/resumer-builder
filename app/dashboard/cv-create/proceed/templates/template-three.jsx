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
import { useRef, useState } from "react";

const TemplateThree = ({userId}) => {
    const pdfRef = useRef();
    const [mDownload, setMDownload] = useState(false);

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
    return (  
        <div>
            <div className="flex flex-row-reverse mb-4">
                <Button onClick={() => downloadPDF()} color="primary">
                    {mDownload == true ?  <Loading /> : ''}
                    download pdf
                </Button>
            </div>
            <div  ref={pdfRef} className="bg-white p-10 border-t-4 border-blue-500">
                {/* cv header */}
                <div className="flex justify-between mb-4">
                    <Image src={profileImg} width={80} height={80} className="rounded-full" />
                    <div className="text-center">
                        <h3 className="md:font-bold md:text-xl mb-2">Peter Wambua Mutuku</h3>
                        <p className="text-[#808080] text-sm mb-2">senior product designer</p>
                        {/* <Profile userId={firebase_user.uid} /> */}
                    </div>
                    <div></div>
                </div>
                {/* cv header end */}
                {/* about me */}
                <div>
                    <AboutMe useId={userId} />
                    {/* <AboutMe useId={firebase_user.uid} /> */}
                </div>
                <Divider></Divider>
                {/* experience */}
                <ExperienceWidget user_id={userId} />
                {/* experience */}
                <Divider></Divider>
                {/* Education */}
                <EducationWidget user_id={userId} />
                {/* Education */}
                <Divider></Divider>
                {/* skills */}
                <SkillWidget user_id={userId} />
                {/* skills */}
                <Divider></Divider>
                {/* Links */}
                <div>
                    <p className="mb-2 font-bold mt-8">Links</p>
                    <div className="text-sm">
                        <p><span className="font-bold pr-2">website:</span><span className="text-blue-500">peterwambua.io</span></p>
                        <p><span className="font-bold pr-2">linkedin:</span><span className="text-blue-500">linkedin.com/in/peterwambua</span></p>
                    </div>
                    <div className="p-2 mt-8">
                        <Button className="bg-transparent w-full rounded-full border-amber-400 text-amber-800"><FontAwesomeIcon icon={faCirclePlus} /> Add Link</Button>
                    </div>
                </div>
                {/* Links */}
                {/* Languages */}
                <div>
                    <p className="mb-2 font-bold mt-8">Languages</p>
                    <div className="text-sm">
                        <p>Swahili (native)</p>
                        <p>English (professional)</p>
                    </div>
                    <div className="p-2 mt-8">
                        <Button className="bg-transparent w-full rounded-full border-amber-400 text-amber-800"><FontAwesomeIcon icon={faCirclePlus} /> Add Link</Button>
                    </div>
                </div>
                {/* Languages */}
                {/* referee */}
                <References userId={userId} />
                {/* referee */}
            </div>
        </div>
    );
}
 
export default TemplateThree;