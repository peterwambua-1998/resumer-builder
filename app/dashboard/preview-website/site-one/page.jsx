'use client'
import { Navbar, Menu, Button, Loading } from 'react-daisyui'
import Image from "next/image";
import profileImage from '@/app/images/profile.jpeg';

const SiteOnePreview = () => {
    return (  
        <div>
            <div className='bg-orange-500'>
                <Navbar className='my-font bg-transparent text-white'>
                    <Navbar.Start>
                        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                    </Navbar.Start>
                    <Navbar.End className="hidden lg:flex">
                        <Menu horizontal className="px-1">
                            <Menu.Item className="active">
                                <a href="#">About</a>
                            </Menu.Item>
                            <Menu.Item>
                            <a href='/dashboard/resume'>Skills</a>
                            </Menu.Item>
                            <Menu.Item>
                            <a href='/dashboard/website'>Curriculum-vitae</a>
                            </Menu.Item>
                        </Menu>
                    </Navbar.End>
                </Navbar>
                <div className="pl-20 pr-20 pt-20 flex gap-10">
                    {/* image */}
                    <div>
                        <Image src={profileImage} width={130} className="w-[80%] h-[100%] rounded-full border-6" />
                    </div>
                    {/* image */}
                    <div>
                        <p>HI, Welcome to PETER WAMBUA's website</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default SiteOnePreview;