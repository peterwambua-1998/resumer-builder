const TemplateThree = ({coverLetter}) => {
    return (
        <div className="cover-letter-padding">
            <div className="my-gradient text-black rounded pl-20 pt-5 pr-20 pb-5 text-sm ">
                <div className="flex justify-between border-b-2 border-black pb-5">
                    <div>
                        <p className="font-bold text-lg">Pater Wambua</p>
                        <p>Programmer</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold">pwambua25@gamil.com</p>
                        <p>0715 100 539</p>
                    </div>
                </div>
                <div className="text-xs pt-5">
                    <p>80104 Docks, Nairobi Kenya</p>
                </div>

                <div className="text-sm mt-20">
                    <p className="font-semibold">To Mr. Felsted, History</p>
                    <p className="text-lg mt-5 mb-5">06/12/2022</p>
                    <p className="mb-2">Dear Mr. Felsted</p>
                    {
                        coverLetter
                        .filter((skill) => skill.checked === true)
                        .map((skill) => (
                            <p  key={skill.id}>{skill.coverLetter}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default TemplateThree;