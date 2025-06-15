import { useState } from "react"
import { BottomWarning } from "../component/BottomWarning"
import { Button } from "../component/Button"
import { Heading } from "../component/Heading"
import { InputBox } from "../component/InputBox"
import { Subheading } from "../component/Subheading"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const [firstName, SetFirstName] = useState("");
    const [lastName, SetLastName] = useState("");
    const [username, SetUserName] = useState("");
    const [password, SetPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <Subheading label={"Enter your information to create an account"} />
                <InputBox onChange={e =>{
                    SetFirstName(e.target.value);
                }}label={"First Name"} placeholder={"John"} inputType={"text"} />
                 <InputBox onChange={(e) =>{
                    SetLastName(e.target.value);
                 }} label={"Last Name"} placeholder={"Doe"} inputType={"text"} />
                  <InputBox onChange={(e) =>{
                    SetUserName(e.target.value);
                  }} label={"Email"} placeholder={"example@abc.com"} inputType={"email"} />
                   <InputBox onChange={(e) => {
                    SetPassword(e.target.value);
                   }} label={"Password"} placeholder={"password"} inputType={"password"} />
                   <div className="pt-4">
                    <Button onClick={ async () =>{
                       const response = await  axios.post("http://localhost:3000/api/v1/user/signup", {
                           username, 
                           firstName,
                           lastName,
                           password
                        })
                        localStorage.setItem("token", response.data.token);
                        navigate("/")
                    }} label={"Sign up"} />
                   </div>
                   <BottomWarning label={"Already have an account?"} buttonText={"sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}