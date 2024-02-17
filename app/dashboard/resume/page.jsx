'use client';
import Link from "next/link";
import { Menu, Card, Button } from "react-daisyui";

const CurriculumVitae = () => {
    return (  
        <div>
            <div className="p-8 h-[40vh] my-bg-blur">
                <h1 className="text-2xl font-bold">Resume</h1>
            </div>
            <div className="p-8 absolute top-[30%] w-full">
                <div className="md:border md:border-slate-200 p-5 md:rounded bg-white">
                    <div className="md:grid md:grid-cols-4">
                        <div className="p-2" >
                            <Menu>
                                <Menu.Item>
                                    <a className="active">My Curriculam Vitae</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link href='/dashboard/resume-create'>Create Resume</Link>
                                </Menu.Item>
                                {/* <Menu.Item>
                                    <a>Item 3</a>
                                </Menu.Item> */}
                            </Menu>
                        </div>
                        <div className="md:col-span-3">
                            <div className="md:grid md:grid-cols-3 gap-4">
                                <Card>
                                    <Card.Image src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                                    <Card.Body>
                                        <Card.Title tag="h2">Shoes!</Card.Title>
                                        <p>If a dog chews shoes whose shoes does he choose?</p>
                                        <Card.Actions className="justify-end">
                                        <Button color="primary">Buy Now</Button>
                                        </Card.Actions>
                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Image src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                                    <Card.Body>
                                        <Card.Title tag="h2">Shoes!</Card.Title>
                                        <p>If a dog chews shoes whose shoes does he choose?</p>
                                        <Card.Actions className="justify-end">
                                        <Button color="primary">Buy Now</Button>
                                        </Card.Actions>
                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Image src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                                    <Card.Body>
                                        <Card.Title tag="h2">Shoes!</Card.Title>
                                        <p>If a dog chews shoes whose shoes does he choose?</p>
                                        <Card.Actions className="justify-end">
                                        <Button color="primary">Buy Now</Button>
                                        </Card.Actions>
                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Image src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                                    <Card.Body>
                                        <Card.Title tag="h2">Shoes!</Card.Title>
                                        <p>If a dog chews shoes whose shoes does he choose?</p>
                                        <Card.Actions className="justify-end">
                                        <Button color="primary">Buy Now</Button>
                                        </Card.Actions>
                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Image src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                                    <Card.Body>
                                        <Card.Title tag="h2">Shoes!</Card.Title>
                                        <p>If a dog chews shoes whose shoes does he choose?</p>
                                        <Card.Actions className="justify-end">
                                        <Button color="primary">Buy Now</Button>
                                        </Card.Actions>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CurriculumVitae;