import { BottomWarning } from "../component/BottomWarning"
import { Button } from "../component/Button"
import { Heading } from "../component/Heading"
import { InputBox } from "../component/InputBox"
import { Subheading } from "../component/Subheading"

export const Signin = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign in"} />
                <Subheading label={"Enter your information to create an account"} />
                <InputBox label={"First Name"} placeholder={"John"} inputType={"text"} />
                 <InputBox label={"Last Name"} placeholder={"Doe"} inputType={"text"} />
                  <InputBox label={"Email"} placeholder={"example@abc.com"} inputType={"email"} />
                   <InputBox label={"Password"} placeholder={"password"} inputType={"password"} />
                   <div className="pt-4">
                    <Button label={"Sign in"} />
                   </div>
                   <BottomWarning label={"Create new account?"} buttonText={"sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
}