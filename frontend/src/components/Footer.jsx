import { useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"

const Footer = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="flex justify-center m-2 p-2">
                <div className="w-[90vw] my-15 p-2">
                    <div className="flex justify-between m-2 p-2" >
                        <div className="w-1/3 m-2 p-2">
                            <img src={assets.Logo} alt="" className="m-2 p-2" /><p className="text-xl m-2 p-2">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam a, quos corrupti dolorum, voluptatibus nostrum ea aperiam itaque exercitationem ipsam ut nemo error nisi accusamus dignissimos provident est illo saepe iste odit? Iusto, placeat dolore vero quisquam cumque adipisci a exercitationem aut, inventore id quae eos voluptatum labore odio dolor?
                            </p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold m-2 p-2">Company</p>
                            <div className="text-xl text-gray-800 m-2 p-2">
                                <ul>
                                    <li className=" py-1 my-1">Home</li>
                                    <li className=" py-1 my-1">About us</li>
                                    <li  className="py-1 my-1">Privacy policy</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <p className="text-4xl font-bold m-2 p-2">GET IN TOUCH</p>
                            <p className="p-2 m-2 text-xl">+0-000-000-000</p>
                            <p className="p-2 m-2 text-xl">myproject@gmail.com</p>
                        </div>
                    </div>
                    <div><p className="text-2xl text-center p-2 m-2">Copyright 2024 @ myproject - All Right Reserved.</p></div>
                </div>
            </div>
        </>
    )
}
export default Footer