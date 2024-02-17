import { db } from "@/app/firebase/firebase";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { Skeleton, Button, Modal, Textarea } from "react-daisyui";

const AboutMe = ({useId}) => {
    var [about, setAbout] = useState(null);
    const [aboutError, setAboutError] = useState(null);
    const aboutRef = useRef(null);
    const [isEditing, setEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const savedSelection = useRef(null);
    
    const toggleVisible = () => {
        setVisible(!visible);
    };

    const handleDoubleClick = (e) => {
        e.preventDefault();
        setEditing(true);
    };

    const handleBlur = (e) => {
        console.log(e.target.textContent);
        handleChange(e.target.textContent)
    };

    const handleChange = (value) => {
        console.log(value);
        about = value;
        console.log(about);
        updateAbout();
    };

    const handleClickOutside = (e) => {
        if (aboutRef.current && !aboutRef.current.contains(e.target)) {
            setEditing(false);
            //updateAbout();
        }
    };

    

    async function getAbout() {
        try {
            const usb = onSnapshot(doc(db, 'about', useId), doc => {
                if (doc.data()) {
                    console.log(doc.data()['description']);
                    setAbout(doc.data()['description']);
                } else {
                    setAbout(null);
                }
            });
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    async function addAbout () {
        if (!about || about == null) {
            setAboutError('field required');
            return;
        } else {
            setAboutError('');
        }

        try {
            let data = {
                description: about,
                created_at: Timestamp.now()
            }
            await setDoc(doc(db, "about", useId), data);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateAbout() {
        try {
            let data = {
                description: about,
                created_at: Timestamp.now()
            }
            await updateDoc(doc(db, "about", useId),data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);


    useEffect(() => {
        getAbout();
    },[]);

    return (  
        <div>
                {
                    isLoading == true ? 
                    (<div>loading</div>) :
                        about == null ? 
                    (<div >add about me</div>) 
                    : 
                    (<div>
                        <p className="text-base" onClick={handleDoubleClick} contentEditable={isEditing} style={{border: isEditing ? 'none' : 'none', cursor: isEditing ? 'text' : 'default',}}  onBlur={(e) => handleBlur(e)} onChange={(e) => handleChange(e)}>{about}</p>
                    </div>)
                }
                <Button onClick={toggleVisible} className="mt-2 bg-transparent w-full rounded-full border-amber-400 text-amber-800"><FontAwesomeIcon icon={faCirclePlus} /> Add About</Button>
                <Modal.Legacy open={visible} className="bg-white max-w-5xl">
                <form>
                    <Modal.Header className="font-bold">About me</Modal.Header>
                    <Modal.Body className="p-0">
                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="w-full items-center justify-end gap-2 col-span-2">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black">Describe yourself</span>
                                        </label>
                                        <Textarea className="bg-white text-black" onChange={(e) => setAbout(e.target.value)} />
                                        <div className="text-red-600 text-sm">{aboutError}</div>
                                    </div>
                                </div>
                            </div>
                            
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisible} >Close</Button>
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => addAbout()}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy>
        
        </div>
    );
}
 
export default AboutMe;