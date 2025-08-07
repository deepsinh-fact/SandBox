import React from "react";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import Infodata from "data/Infodata";
import { TBSelector } from "Store/Reducers/TBSlice";
import { useSelector } from "react-redux";
import Service from "Service/Service";
import AntModalComponents from "components/ant/AntModalComponents";
import UploadPhoto from "./UploadPhoto";

const Banner = () => {
  const { isMe } = useSelector(TBSelector)
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={`data:image/png;base64,${isMe?.image}`}
            alt={isMe?.firstName || "user"}
            onError={(e) => e.target.src = Infodata.Profile} />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 capitalize dark:text-white">
          {isMe?.first_name || "Your First Name"}&nbsp;&nbsp;
          {isMe?.last_name || "Your Last Name"}
        </h4>
        <p className="text-base font-normal text-gray-600">{isMe.companyName || "Fact Byte"}</p>
      </div>

      {/* Post followers */}
      <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {Service.getCredit()}
          </p>
          <p className="text-sm font-normal text-gray-600">Total Credit</p>
        </div>
      </div>
      {/* <AntModalComponents
        ModalOpen={loginModalOpen}
        setOpen={setLoginModalOpen}
        handleCancel={() => setLoginModalOpen(false)}
        width={1000}
        title="Advanced Search"
      >
        <UploadPhoto />
      </AntModalComponents> */}
    </Card>
  );
};

export default Banner;
