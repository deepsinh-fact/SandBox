import Card from 'components/card';
import { useNotificationContext } from 'createContextStore/NotificationContext';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function MadModifyFilter() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [verified, setVerified] = useState(false);

    const { openNotification } = useNotificationContext();

    const onSubmit = (data) => {
        console.log("Submitted Data:", data);
        setVerified(true);
        openNotification(
            "error",
            "Error",
            "Please select valid PAN and Mobile Number",
            true,
            true
        );
    };

    return (
        <div className="mt-10 px-4 sm:px-2">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
                    MAD (Mule Account Detection)
                </h1>
                <p className="text-gray-600 mt-3">
                    Modify your MAD filters to search for relevant information.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
                <Card extra="w-full h-full py-6 sm:overflow-auto px-6">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                            Filter Details
                        </h2>
                        <div className=' flex flex-col gap-6'>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Nature of Industry */}
                                    <div>
                                        <label htmlFor="industryType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Nature of Industry
                                        </label>
                                        <select
                                            id="industryType"
                                            {...register("industryType")}
                                            className={`w-full dark:bg-navy-800 rounded-lg border p-3 focus:ring-2 ${errors.industryType ? "border-red-500 ring-red-100" : "border-gray-300"}`}
                                        >
                                            <option value="">All</option>
                                            <option value="ABCDE1234F">ABCDE1234F</option>
                                            <option value="XYZAB5678C">XYZAB5678C</option>
                                            <option value="LMNOP9876Z">LMNOP9876Z</option>
                                        </select>
                                    </div>

                                    {/* Mobile Number */}
                                    <div>
                                        <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Select Mobile Number
                                        </label>
                                        <select
                                            id="mobileNumber"
                                            {...register("mobileNumber")}
                                            className={`w-full dark:bg-navy-800 rounded-lg border p-3 focus:ring-2 ${errors.mobileNumber ? "border-red-500 ring-red-100" : "border-gray-300"}`}
                                        >
                                            <option value="">All</option>
                                            <option value="9876543210">9876543210</option>
                                            <option value="9123456789">9123456789</option>
                                            <option value="9000011111">9000011111</option>
                                        </select>
                                    </div>

                                    {/* Limit */}
                                    <div>
                                        <label htmlFor="limit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Record Limit
                                        </label>
                                        <input
                                            type="number"
                                            id="limit"
                                            min={1}
                                            max={10}
                                            defaultValue={5}
                                            {...register("limit", { required: true })}
                                            className={`w-full dark:bg-navy-800 rounded-lg border p-3 focus:ring-2 ${errors.limit ? "border-red-500 ring-red-100" : "border-gray-300"}`}
                                            style={{
                                                appearance: 'none',
                                                MozAppearance: 'none',
                                                WebkitAppearance: 'none',
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
                        >
                            SUBMIT
                        </button>
                    </div>
                </Card>
            </form>
        </div>
    );
}
