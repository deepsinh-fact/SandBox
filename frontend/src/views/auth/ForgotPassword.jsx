import ButtonComponent from '../../components/button/ButtonComponent';
import InputField from '../../components/fields/InputField';
import { useNotificationContext } from '../../../src/createContextStore/NotificationContext';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ServiceRegExr from '../../Service/RegExr';
import { updateState } from '../../Store/Reducers/TBSlice';
import { ResetPassword } from '../../Store/Reducers/TBSlice';
import { TBSelector } from '../../Store/Reducers/TBSlice';

export default function ForgotPassword() {
    const { ResetPasswordData, isResetPassword, isResetPasswordFetching } = useSelector(TBSelector);
    const { openNotification } = useNotificationContext();
    const dispatch = useDispatch();
    const {
        register: modalRegister,
        handleSubmit: modalHandleSubmit,
        formState: { errors: modalErrors },
        reset
    } = useForm();
    const onSubmitEmail = async (data) => {
        dispatch(ResetPassword({ email: data.modalEmail }));
    }
    React.useEffect(() => {
        if (isResetPassword) {
            dispatch(updateState({ isResetPassword: false, ResetPasswordData: {} }))
            reset({
                modalEmail: "",
            })
            openNotification('success', 'Success', ResetPasswordData.successMessage || "Email has been sent", true, true)
        }

    }, [isResetPassword, dispatch, reset, openNotification, ResetPasswordData])

    return (
        <form onSubmit={modalHandleSubmit(onSubmitEmail)}>
            <div className="p-4 !bg-white dark:!bg-navy-900">
                {/* Input Field */}
                <div className="relative pt-6 w-full">
                    <div className="relative">
                        <InputField
                            variant="auth"
                            extra="mb-3"
                            label="Email"
                            placeholder="demo@mail.com"
                            type="text"
                            maxLength={50}
                            {...modalRegister("modalEmail", {
                                required: "Email Address is required",
                                pattern: {
                                    value: ServiceRegExr.emailRegExr,
                                    message: "Invalid email format",
                                },
                            })}
                            state={modalErrors.modalEmail?.message ? "error" : "default"}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                    <ButtonComponent disabled={isResetPasswordFetching}>Send Email</ButtonComponent>
                </div>
            </div>
        </form>
    )
}
