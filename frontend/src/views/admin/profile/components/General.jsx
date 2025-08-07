import ButtonComponet from "components/button/ButtonComponet";
import Card from "components/card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";
import RefreshBtn from "components/RefreshBtn";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LiaEdit } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfile, TBSelector } from "Store/Reducers/TBSlice";


const General = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isMe, isUpdateProfile, isUpdateProfileFetching } = useSelector(TBSelector);
  const dispatch = useDispatch()

  const [editinfo, seteditinfo] = useState(false)
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("login", isMe?.email);
    formData.append("firstName", data.firstname);
    formData.append("lastName", data.lastname);
    formData.append("companyAddress", data.companyAddress);
    dispatch(UpdateProfile(formData));
  }
  const handleRefresh = () => {
    seteditinfo((e) => !e)
  }

  React.useEffect(() => {
    if (isUpdateProfile) {
      seteditinfo(false);
    }

  }, [isUpdateProfile])

  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 flex justify-between mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          General Information
        </h4>
        <RefreshBtn handleRefresh={handleRefresh}>
          <div className="flex">
            <span><LiaEdit className="text-xl" /></span>
            <span className="pl-2">Edit Info</span>
          </div>
        </RefreshBtn>
      </div>
      {/* Cards */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 px-2">
          <InputField defaultValue={isMe?.first_name} disabled={!editinfo} {...register("firstname", { required: true })} label="First Name" />
          <InputField defaultValue={isMe?.last_name} disabled={!editinfo} {...register("lastname", { required: true })} label="Last Name" />
          <InputField defaultValue={isMe?.email} label="Email" disabled={true} />
          <InputField defaultValue={isMe?.mobile} label="Mobile Number" disabled={true} />
          <InputField defaultValue={isMe?.pan} label="PAN Number" disabled={true} />
          <InputField defaultValue={isMe?.gstin} label="GST" disabled={true} />
          <div className="col-span-1 mb-4 md:col-span-2">
            {/* <textarea disabled={!editinfo} className="border h-full  border-gray-300 p-2 w-full resize-none" cols="50"></textarea> */}
            <TextField cols={50} disabled={!editinfo} defaultValue={isMe?.company_address} resizenone {...register("address", { required: true })} label="Address"></TextField>
            {/* <InputField defaultValue={isMe?.company_address} disabled={!editinfo} {...register("address", { required: true })}  /> */}
          </div>
        </div>
        {editinfo &&
          <ButtonComponet className="w-full" disabled={isUpdateProfileFetching || !editinfo} type="submit">Submit</ButtonComponet>
        }
      </form>
    </Card>
  );
};

export default General;
