const TemplateOne = ({coverLetter}) => {
    return (
        <div className="cover-letter-padding">
            <div className="bg-slate-900 text-white rounded pl-20 pt-5 pr-20 pb-5 text-sm">
                <div className="flex justify-between  ">
                    <div>
                        <p>programmer</p>
                    </div>
                    <div className="text-right">
                        <p>80104 Docks, Nairobi Kenya</p>
                        <p>pwambua25@gamil.com</p>
                        <p>0715 100 539</p>
                    </div>
                </div>
                {/* name */}
                <div className="my-font-two mt-28 text-5xl font-bold">
                    <p>Peter</p>
                    <p>Wambua</p>
                </div>
                {/* name */}

                {/* to and cover letter content */}
                <div className="grid grid-cols-4 mt-12">
                    <div className="col-span-1">
                        <p className="text-xs">to</p>
                        <p>Mr. Felsted</p>
                    </div>
                    <div className="col-span-3">
                        <p>06/12/2022</p>
                        <p className="mt-5">Dear Mr. Felsted,</p>
                        <p>
                            {
                                coverLetter
                                .filter((skill) => skill.checked === true)
                                .map((skill) => (
                                    <div className="show-selected-skills" key={skill.id}>
                                        <p className="">{skill.coverLetter}</p>
                                    </div>
                                ))
                            }
                        </p>
                    </div>
                </div>
                {/* to and cover letter content */}

            </div>

        </div>
    );
}

export default TemplateOne;