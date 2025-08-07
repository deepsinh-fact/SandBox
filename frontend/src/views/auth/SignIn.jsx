import React from "react";
import { useNavigate } from "react-router-dom";
// Ract Hook Form 
import { useForm } from "react-hook-form";

//  components
import InputField from "../../components/fields/InputField";

//Service
import ServiceRegExr from "../../Service/RegExr";

import { Usersignin } from "../../Store/Reducers/TBSlice";
import { useDispatch, useSelector } from "react-redux";
import AntModalComponents from "../../components/ant/AntModalComponents";
import ForgotPassword from "./ForgotPassword";
import { TBSelector } from "../../Store/Reducers/TBSlice";
import ButtonComponent from "../../components/button/ButtonComponent";
import Info from "../../components/AlInfo/Info";
import Infodata from "../../data/Infodata";


export default function SignIn() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: 'test@gmail.com', 
            password: 'password123' // Mock credentials for testing
        }
    })
    const { isResetPassword, isUsersigninFetching } = useSelector(TBSelector);
    const dispatch = useDispatch();
    const [infoData, setInfoData] = React.useState({});
    const [modal1Open, setModal1Open] = React.useState(false);

    React.useEffect(() => {
        if (isResetPassword) {
            setModal1Open(false)
        }
    }, [isResetPassword])

    const onSubmit = async (data) => {
        try {
            const result = await dispatch(Usersignin({ email: data.email, password: data.password, ...infoData }));

            // Check if login was successful
            if (result.type === 'Usersignin/fulfilled') {
                // Redirect to welcome page after successful login
                navigate('/dashboard/welcome');
            } else if (result.type === 'Usersignin/rejected') {
                // Handle login failure
                console.error('Login failed:', result.payload);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
                    <div className="mt-[1vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                        <div className="mb-10 text-center">
                            <img className="dark:inline-block hidden w-[200px]" src={Infodata.Factbytew} alt="logo" />
                            <img className="dark:hidden inline-block w-[200px]" src={Infodata.Factbyteb} alt="logo" />
                        </div>
                        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                            Sign In
                        </h4>
                        <p className="mb-9 ml-1 text-base text-gray-600">
                            Welcome to Fact Byte
                        </p>

                        <InputField
                            variant="auth"
                            extra="mb-3"
                            label="Email"
                            placeholder="demo@mail.com"
                            type="text"
                            maxLength={50}
                            {...register("email", {
                                required: "Email Address is required",
                                pattern: {
                                    value: ServiceRegExr.emailRegExr,
                                    message: "Invalid email format",
                                },
                            })}
                            state={errors.email?.message ? "error" : "default"}
                        />
                        <InputField
                            variant="auth"
                            extra="mb-3"
                            label="Password"
                            placeholder="Min. 8 characters"
                            id="password"
                            type="password"
                            maxLength={50}
                            {...register("password", {
                                required: "Password is required",
                            })}
                            state={errors.password?.message ? "error" : "default"}
                        />
                        <div className="mb-4 flex items-center justify-end px-2">
                            <p
                                className="text-sm font-medium cursor-pointer text-brand-500 hover:text-brand-600 dark:text-white"
                                onClick={() => setModal1Open(true)}
                            >
                                Forgot Password?
                            </p>
                        </div>
                        <ButtonComponent disabled={isUsersigninFetching}>Sign In</ButtonComponent>
                    </div>
                </div>
            </form>
            <Info data={setInfoData} />
            <AntModalComponents width={500} ModalOpen={modal1Open} handleCancel={setModal1Open}>
                <ForgotPassword />
            </AntModalComponents>
        </>
    );
}
