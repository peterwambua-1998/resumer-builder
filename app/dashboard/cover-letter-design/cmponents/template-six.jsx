'use client'

const TemplateSix = ({ coverLetter }) => {
    return (
        <div className="cover-letter-padding-other">
            <div className="bg-white p-16">
                {/* top area */}
                <div className="flex justify-center mb-6">
                    <div></div>
                    <div className="p-5 w-[50%] text-center rounded-sm">
                        <p className="text-2xl font-bold">Peter Wambua</p>
                        <p className="text-sm text-[#808080]">programmer</p>
                    </div>
                    <div></div>
                </div>
                {/* top area */}

                {/* grid area */}
                <div className="grid grid-cols-6 gap-10">
                    <div className="col-span-4 text-sm">
                        <p className="mb-2 text-[#808080]">03/31/2024</p>
                        <p className="mb-2">Dear Mr Hunter</p>
                        <p className="mb-2">refurb my about me which is
                            'Highly motivated and passionate individual with a strong foundation in JavaScript, HTML, CSS, and MySQL. With a keen interest in technology and a natural aptitude for problem-solving, I have dedicated myself to honing my skills in web development. Beyond my technical abilities, I possess a creative side, actively refining my drawing skills outside of work hours.  Driven by a genuine passion for coding and a curiosity for exploring new technologies, I am eager to leverage my expertise to contribute effectively to dynamic projects and collaborative teams. With a blend of technical proficiency and creative flair, I strive to deliver innovative solutions that exceed expectations.'

                            based on job description:
                            iubenda is a legal-tech scale-up founded in 2011, now trusted by over 90K clients in the EU, the US, and 100+ more Countries. We are leaders in our industry and operate on a global scale developing and releasing innovative tech solutions. Our mission is to provide our clients with everything their business needs - to be compliant with legal, local, and regional requirements; so that they can focus on their core product. Recently, we have undertaken a new thrilling adventure, joining forces with team.blue (a worldwide leader in digital enablement). If you're excited to work at a company in a scaling-up environment providing SaaS solutions to :1M users - and equally important - to join a team of friendly people with a culture based on continuous learning, transparency, and collaboration. Then, you're looking at the right place!

                            Your mission

                            

                            
                            </p>
                        <p className="mb-2">Best Regards</p>
                        <p className="mb-2 font-bold">Peter Wambua</p>
                    </div>
                    <div className="col-span-2">
                        <div className="mb-10 text-sm">
                            <p>To</p>
                            <p>Hiring Team</p>
                        </div>

                        <div className="mb-10 text-sm">
                            <p>Machakos, Athiriver</p>
                            <p>pwambua25@gmail.com</p>
                            <p>+254715100539</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TemplateSix;