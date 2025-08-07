import React, { useState } from 'react';
import { Button, message, Steps, } from 'antd';
import data from 'pdf/U74999GJ2018PLC104895.json';
import { Chart } from "react-google-charts";
import Service from 'Service/Service';
import Card from 'components/card';


const ChartRow = ({ label, value, highlight = false, footer = "" }) => {
    const isPositive = value >= 0;

    return (
        <div>
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{label}</span>
                <span
                    className={`text-sm font-semibold ${highlight ? "text-blue-600" : "text-gray-700"
                        }`}
                >
                    {value.toFixed(1)}
                </span>
            </div>
            <div className="relative h-4 bg-gray-100 rounded-lg overflow-hidden mt-2">
                <div
                    className={`absolute h-full ${isPositive ? "bg-[#6ec794]" : "bg-[#f8aca6]"
                        }`}
                    style={{
                        width: `${Math.min(Math.abs(value) * 2, 100)}%`,
                        left: isPositive ? "0%" : "auto",
                        right: isPositive ? "auto" : "0%",
                    }}
                />
            </div>
            {footer && (
                <div className="text-xs text-gray-500 text-right mt-1">{footer}</div>
            )}
        </div>
    );
};


const First = () => {
    return (
        <div className="p-6 bg-gray-100">
            <div
                className="flex justify-between sm:flex-nowrap flex-wrap sm:flex-row flex-col-reverse items-center border-b pb-4 mb-6"
                data-aos="fade-down" // Adds fade-down animation to the header
            >
                <h2 className="text-2xl font-bold text-blue-600"><strong>FACTBYTE ANNUAL FINANCIAL REPORT</strong></h2>
                <p className="text-gray-500 text-sm">Report generated on {Service.CurontData("ll")}</p>
            </div>
            <div className="grid py-6 bg-white md:grid-cols-2 px-3 grid-cols-1 gap-6">
                {/* Left Section */}
                <div className="p-6">
                    <h4 className="text-xl font-semibold py-2 text-gray-800">
                        Due-Diligence for Underwriting
                    </h4>
                    <p className="text-[17px] py-5 text-gray-700 leading-7">
                        FACT-BYTE’s Underwriter Module is a comprehensive, intuitive, and
                        dynamic platform designed to streamline underwriting processes. It
                        provides a standardized and user-friendly interface that delivers
                        company-level and principal-level data, simplifying decision-making
                        for financial institutions, insurers, and other stakeholders.
                    </p>
                    <p className="text-[17px] py-2 text-gray-700 font-medium">
                        Empowering Underwriting with FACT-BYTE
                    </p>
                    <p className="text-[17px] pt-1 text-gray-700 leading-7">
                        The Underwriter Module combines advanced analytics and a modern
                        interface to provide users with actionable insights, robust data
                        sets, and unparalleled adaptability. Whether you're assessing
                        financial stability, evaluating compliance, or analyzing loan
                        details, FACT-BYTE ensures that underwriting decisions are faster,
                        smarter, and more reliable.
                    </p>
                    <div className="text-center mt-10">
                        <button className="inline-block py-3 px-5 cursor-default text-[17px] font-medium text-white bg-blue-500  rounded-lg shadow-md">
                            Start Today
                        </button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="border rounded-lg p-6 bg-gray-50 shadow-sm">
                    <h5 className="text-xl font-semibold py-2 text-gray-800">
                        Key Benefits of the Underwriter Module
                    </h5>
                    <ul className="list-decimal list-inside space-y-3 text-gray-700">
                        <li className="text-[17px]">
                            <strong>Standardized Financial Data:</strong> Gain a uniform view
                            of financial data across companies and LLPs, eliminating the need
                            to interpret complex local filing formats.
                        </li>
                        <li className="text-[17px]">
                            <strong>Seamless Adaptability:</strong> The platform is adaptable
                            to different filing formats from Local Registry (MCA), including
                            versions V2 and V3, ensuring effortless procurement and analysis
                            of data.
                        </li>
                        <li className="text-[17px]">
                            <strong>Comprehensive Financial Insights:</strong> Access over
                            [##] financial derivations and ratios, enabling you to select
                            relevant metrics aligned with your internal analysis standards.
                        </li>
                        <li className="text-[17px]">
                            <strong>Directors’ Profile and UBO Information:</strong> Obtain a
                            detailed overview of directors’ profiles, including other
                            directorships and ultimate beneficial ownership (UBO) data, for a
                            deeper understanding of business operations.
                        </li>
                        <li className="text-[17px]">
                            <strong>Advanced Bank Loan Charge Details:</strong> Easily access
                            detailed information on bank loan charges, including loan nature,
                            amount, interest rate, tenure, and asset details, to facilitate
                            informed lending decisions.
                        </li>
                        <li className="text-[17px]">
                            <strong>Compliance and Negative Data:</strong> Evaluate businesses
                            and principals with comprehensive compliance reports and negative
                            data alerts, ensuring risk-free and informed decision-making.
                        </li>
                        <li className="text-[17px]">
                            <strong>Enhanced Data Accessibility:</strong> Effortlessly search,
                            list, analyze, and export all data elements for self-use,
                            enhancing flexibility and efficiency.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const Second = () => {
    return (
        <div
            data-aos="fade-up"
            className="p-6 bg-gray-100"
        >
            <div
                className="flex justify-between sm:flex-nowrap flex-wrap sm:flex-row flex-col-reverse items-center border-b pb-4 mb-6"
                data-aos="fade-down" // Adds fade-down animation to the header
            >
                <h2 className="text-2xl font-bold text-blue-600">FINANCIAL STATEMENT REPORT</h2>
                <p className="text-gray-500 text-sm">Report generated on {Service.CurontData("ll")}</p>
            </div>
            <div className="grid grid-cols-1">
                <div
                    data-aos="fade-right"
                    className="border rounded-lg p-6 bg-gray-50"
                >
                    <h4 className="text-xl font-semibold py-2 text-gray-800">
                        {Service.toCapitalize(data.overview.company)}{" "}
                        <span className="text-lg text-gray-600">{data.overview.CIN}</span>
                    </h4>
                    <h5
                        data-aos="zoom-in"
                        className="text-lg font-semibold py-3 text-gray-700"
                    >
                        Company Overview
                    </h5>
                    <ol
                        data-aos="fade-up"
                        className="list-decimal list-inside divide-y divide-gray-200"
                    >
                        {Object.entries(data.overview).map(([key, value], index) =>
                            value !== "-" ? (
                                <li
                                    key={index}
                                    className="py-3 px-2 text-gray-800 flex justify-between flex-wrap"
                                >
                                    <span className="font-medium text-gray-700">
                                        {Service.toCapitalize(key.replace(/_/g, " "))}:
                                    </span>
                                    <span className="text-gray-600">
                                        {value || (
                                            <span className="italic text-gray-500">
                                                Not Available
                                            </span>
                                        )}
                                    </span>
                                </li>
                            ) : null
                        )}
                    </ol>
                </div>
            </div>
        </div>
    );
};

const ThirdData = () => {
    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
            {/* Report Header */}
            <div data-aos="fade-in" className="flex justify-between sm:flex-nowrap flex-wrap sm:flex-row flex-col-reverse items-center border-b pb-4 mb-6">
                <h2 className="text-2xl font-bold text-blue-600">COMPANY SUMMARY</h2>
                <p className="text-gray-500 text-sm">Report generated on {Service.CurontData("ll")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Section */}
                <div
                    data-aos="fade-right"
                    className="col-span-1 bg-white rounded-md shadow p-6 border"
                >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                        {data?.overview?.company}
                    </h3>
                    <p className="text-gray-600 mb-2">
                        <strong>CIN:</strong>{data?.overview?.CIN} &nbsp;&nbsp;
                        <strong>DOI:</strong>{data?.overview?.dateOfIncorporation}
                    </p>
                    <p className="text-gray-600 mb-4 uppercase">
                        <strong>PAN:</strong> xxxxxxxxx
                    </p>

                    <div className="text-gray-700 border-t pt-3">
                        <p className="mb-2">
                            <strong>Authorized capital (INR):</strong><span className='uppercase'>xxxxxxxxx</span>
                        </p>
                        <p className="mb-2">
                            <strong>Paid-up capital (INR):</strong> <span className='uppercase'>xxxxxxxxx</span>
                        </p>
                        <p className="mb-2">
                            <strong>Sum of Charges (INR):</strong> <span className='uppercase'>xxxxxxxxx</span>
                        </p>
                        <p>
                            <strong>Active status:</strong> <span>-</span>
                        </p>
                    </div>

                    {/* CIRP Status */}
                    <div className="mt-6 border-t pt-4">
                        <div className="flex justify-between flex-wrap items-center gap-4">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                CIRP Status
                            </h4>
                            <span className={`inline-block px-3 ${Service.toUpperCase(data?.overview?.llpStatus) == "ACTIVE" ? "bg-green-100 text-green-800 border-green-400" : "bg-red-100 text-red-800 border-red-400"} py-1 text-sm font-medium  rounded border`}>
                                {data?.overview?.llpStatus}
                            </span>
                        </div>
                        <div className="text-gray-700 mt-3">
                            <p className="mb-2">
                                <strong>Type of Entity:</strong> Company
                            </p>
                            <p className="mb-2">
                                <strong>Listing status:</strong> YES
                            </p>
                            <p className="mb-2">
                                <strong>Date of Incorporation:</strong> 12/26/2013
                            </p>
                            <p className="mb-2">
                                <strong>Date of last AGM:</strong> 09/29/2023
                            </p>
                            <p>
                                <strong>LEI:</strong> 00EHHQ2ZHDCFJXCPLC46
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        {
                            title: "REGISTERED ADDRESS",
                            content:
                                "No.55 Sy No.8-14, Ground Floor, I&J Block, Embassy Tech Village, Outer Ring Road, Devarabisanahalli Bengaluru Karnataka 560103",
                        },
                        {
                            title: "BUSINESS ADDRESS",
                            content: "11-25-15 K.T.ROAD, VIJAYAWADA, Andhra Pradesh 520001",
                        },
                        {
                            title: "CONTACT",
                            content: "www.swiggy.com\nsecretarial@swiggy.in\n08067913300",
                        },
                        {
                            title: "ORIGIN",
                            content: "Indian\nRegistration no. 096530",
                        },
                        {
                            title: "INDUSTRY",
                            content:
                                "Sector: Trade and Commerce\nCategories: Services\nDescription: Other food and beverage activities",
                        },
                        {
                            title: "KEY MEMBERS",
                            content: "NO# of Directors: 12\nNumber of Shareholders: 2",
                        },
                        {
                            title: "KPI MEASURE 4",
                            content:
                                "KPI Measures for Goal #4 and Strategies for Goal #4",
                        },
                        {
                            title: "KPI MEASURE 5",
                            content: "Add your tactical actions here",
                        },
                    ].map((card, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            className="bg-blue-50 rounded-md p-4 border border-blue-200 shadow-sm"
                        >
                            <h5 className="font-semibold text-blue-900 mb-2">{card.title}</h5>
                            <p className="text-blue-700 whitespace-pre-line">{card.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Fourth = () => {
    const metrics = [
        { label: "Revenue", previous: "₹180,000", current: "₹200,000", change: "11%", increase: true },
        { label: "Operating expenses", previous: "₹78,897", current: "₹76,971", change: "-2%", increase: false },
        { label: "Operating profit", previous: "₹50,162", current: "₹84,984", change: "69%", increase: true },
        { label: "Depreciation", previous: "₹11,388", current: "₹11,388", change: "N/A", increase: null },
        { label: "Interest", previous: "₹8,316", current: "₹10,031", change: "21%", increase: true },
        { label: "Net profit", previous: "₹43,630", current: "₹93,248", change: "114%", increase: true },
    ];

    const cards = [
        { title: "Revenue", value: "₹200,000", change: "25%", increase: true, previous: "₹180,000" },
        { title: "Operating Profit", value: "₹84,984", change: "69%", increase: true, previous: "₹50,162" },
        { title: "Net Profit", value: "₹93,248", change: "114%", increase: true, previous: "₹43,630" },
        { title: "Profit After Tax", value: "₹76,989", change: "-13%", increase: false, previous: "₹88,123" },
    ];
    return (
        <div
            className="bg-gray-50 p-6 rounded-lg shadow-lg"
            data-aos="fade-up" // Adds fade-up animation to the entire component
        >
            {/* Header */}
            <div
                className="flex justify-between sm:flex-nowrap flex-wrap sm:flex-row flex-col-reverse items-center border-b pb-4 mb-6"
                data-aos="fade-down" // Adds fade-down animation to the header
            >
                <h2 className="text-2xl font-bold text-blue-600">FINANCIAL OVERVIEW</h2>
                <p className="text-gray-500 text-sm">Report generated on {Service.CurontData("ll")}</p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mb-6" data-aos="zoom-in">
                <table className="min-w-full border border-gray-200 rounded-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left p-3 font-medium text-gray-600">Metric</th>
                            <th className="text-left p-3 font-medium text-gray-600">Previous Year</th>
                            <th className="text-left p-3 font-medium text-gray-600">Current Year</th>
                            <th className="text-left p-3 font-medium text-gray-600">% Change</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {metrics.map((metric, index) => (
                            <tr key={index}>
                                <td className="p-3 text-gray-800">{metric.label}</td>
                                <td className="p-3 text-gray-600">{metric.previous}</td>
                                <td className="p-3 text-gray-600">{metric.current}</td>
                                <td
                                    className={`p-3 font-medium ${metric.increase === true
                                        ? "text-green-600"
                                        : metric.increase === false
                                            ? "text-red-600"
                                            : "text-gray-600"
                                        }`}
                                >
                                    {metric.change}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`rounded-lg p-4 shadow border ${card.increase ? "bg-green-50" : "bg-red-50"
                            }`}
                        data-aos="zoom-in-up" // Adds zoom-in-up animation to each card
                    >
                        <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                        <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                        <p
                            className={`text-sm font-medium ${card.increase ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {card.change}
                        </p>
                        <p className="text-gray-600 text-sm">
                            Previous: <span>{card.previous}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const Fifth = () => {
    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
            <div
                className="flex justify-between sm:flex-nowrap flex-wrap sm:flex-row flex-col-reverse items-center border-b pb-4 mb-6"
                data-aos="fade-down" // Adds fade-down animation to the header
            >
                <h2 className="text-2xl font-bold text-blue-600">Financial Statements Overview</h2>
                <p className="text-gray-500 text-sm">Report generated on {Service.CurontData("ll")}</p>
            </div>
            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                data-aos="fade-up"
            >
                {/* Income Statement */}
                <div className="bg-white p-6 rounded-lg shadow-lg border">
                    <h3 className="text-xl font-semibold text-blue-600 mb-4">
                        Income Statement (in millions)
                    </h3>
                    <table className="w-full overflow-scroll text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-50 border-b">
                                <th className="px-4 py-2 text-blue-900">Metric</th>
                                <th className="px-4 py-2 text-blue-900">Dec. 31, 2023</th>
                                <th className="px-4 py-2 text-blue-900">Dec. 31, 2024</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["Revenues", "₹74,452", "₹83,492"],
                                ["Growth %", "—", "12.1%"],
                                ["Cost of goods sold (COGS)", "₹64,440", "₹72,524"],
                                ["% of sales", "86.6%", "86.9%"],
                                ["Gross profit", "₹10,012", "₹10,968"],
                                ["% of sales", "13.4%", "13.1%"],
                                ["Operating expenses (SG&A)", "₹6,389", "₹6,545"],
                                ["% of sales", "8.6%", "7.8%"],
                                ["Operating income (EBIT)", "₹3,623", "₹4,423"],
                                ["Interest Expense", "₹518", "₹474"],
                                ["Pretax income", "₹3,105", "₹3,949"],
                                ["Income tax expense", "₹1,087", "₹1,382"],
                                ["Net income", "₹2,018", "₹2,567"],
                                ["Depreciation", "₹2,648", "₹2,981"],
                                ["Amortization", "₹0", "₹0"],
                                ["EBITDA", "₹6,271", "₹7,404"],
                            ].map(([metric, value2023, value2024], index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } border-b`}
                                >
                                    <td className="px-4 py-2">{metric}</td>
                                    <td className="px-4 py-2">{value2023}</td>
                                    <td className="px-4 py-2">{value2024}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Balance Sheet */}
                <div className="bg-white p-6 rounded-lg shadow-lg border">
                    <h3 className="text-xl font-semibold text-blue-600 mb-4">
                        Balance Sheet (in millions)
                    </h3>
                    <table className="w-full overflow-scroll text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-50 border-b">
                                <th className="px-4 py-2 text-blue-900">Metric</th>
                                <th className="px-4 py-2 text-blue-900">Dec. 31, 2023</th>
                                <th className="px-4 py-2 text-blue-900">Dec. 31, 2024</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["Assets", "—", "—"],
                                ["Current assets", "₹14,779", "₹18,401"],
                                ["Cash", "₹1,773", "₹2,000"],
                                ["Accounts receivable", "₹7,750", "₹8,852"],
                                ["Inventory", "₹4,800", "₹5,700"],
                                ["Prepaid expenses", "₹456", "₹1,849"],
                                ["Non-current assets", "₹10,913", "₹10,932"],
                                ["PP&E, net of depreciation", "₹10,913", "₹10,932"],
                                ["Total assets", "₹25,692", "₹29,333"],
                                ["Liabilities", "—", "—"],
                                ["Current liabilities", "₹6,957", "₹8,531"],
                                ["Accounts payable", "₹5,665", "₹6,656"],
                                ["Line of credit", "₹792", "₹1,375"],
                                ["Current maturities of long-term debt", "₹500", "₹500"],
                                ["Long-term liabilities", "₹5,000", "₹4,500"],
                                ["Equity", "₹13,735", "₹16,302"],
                                ["Common stock", "₹15", "₹15"],
                                ["Additional paid in capital", "₹5,000", "₹5,000"],
                                ["Retained earnings", "₹8,720", "₹11,287"],
                                ["Total liabilities and equity", "₹25,692", "₹29,333"],
                            ].map(([metric, value2023, value2024], index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } border-b`}
                                >
                                    <td className="px-4 py-2">{metric}</td>
                                    <td className="px-4 py-2">{value2023}</td>
                                    <td className="px-4 py-2">{value2024}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const Sixth = () => {
    const data = {
        cashFlow: {
            operating: [
                ["Net income", "₹3,034", "₹3,337", "₹3,671", "₹4,038", "₹4,442"],
                ["Add back non-cash items", "—", "—", "—", "—", "—"],
                ["Depreciation", "₹0", "₹0", "₹0", "₹0", "₹0"],
                ["Amortization", "₹0", "₹0", "₹0", "₹0", "₹0"],
                ["Accounts receivable", "(₹797)", "(₹965)", "(₹1,061)", "(₹1,167)", "(₹1,284)"],
                ["Inventory", "(₹395)", "(₹610)", "(₹670)", "(₹738)", "(₹811)"],
                ["Accounts payable", "₹499", "₹715", "₹787", "₹866", "₹952"],
                ["Net cash provided by operating activities", "₹2,340", "₹2,478", "₹2,726", "₹2,999", "₹3,298"],
            ],
            investing: [
                ["Capital expenditures - purchase of PP&E", "₹0", "₹0", "₹0", "₹0", "₹0"],
                ["Net cash used in investing activities", "₹0", "₹0", "₹0", "₹0", "₹0"],
            ],
            financing: [
                ["Revolving credit facility (line of credit)", "₹0", "₹0", "₹0", "₹0", "₹0"],
                ["Long-term debt", "₹0", "₹0", "₹0", "₹0", "₹0"],
                ["Net cash provided by (used in) financing activities", "₹0", "₹0", "₹0", "₹0", "₹0"],
            ],
        },
        summary: {
            netCashFlow: ["₹2,340", "₹2,478", "₹2,726", "₹2,999", "₹3,298"],
            beginningBalance: ["₹2,000", "₹4,340", "₹6,819", "₹9,545", "₹12,543"],
            endingBalance: ["₹4,340", "₹6,819", "₹9,545", "₹12,543", "₹15,841"],
        },
    };
    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <div
                className="flex justify-between sm:flex-nowrap flex-wrap sm:flex-row flex-col-reverse items-center border-b pb-4 mb-6"
                data-aos="fade-down" // Adds fade-down animation to the header
            >
                <h2 className="text-2xl font-bold text-blue-600">Cash Flow Statement (in millions)</h2>
                <p className="text-gray-500 text-sm">Report generated on {Service.CurontData("ll")}</p>
            </div>
            <div
                className="bg-white p-6 rounded-lg shadow-md"
                data-aos="fade-up"
            >
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-blue-50">
                            <th className="px-4 py-2 text-left text-blue-600 font-semibold border-b border-gray-300">Metric</th>
                            <th className="px-4 py-2 text-left text-blue-600 font-semibold border-b border-gray-300">2022</th>
                            <th className="px-4 py-2 text-left text-blue-600 font-semibold border-b border-gray-300">2023</th>
                            <th className="px-4 py-2 text-left text-blue-600 font-semibold border-b border-gray-300">2024</th>
                            <th className="px-4 py-2 text-left text-blue-600 font-semibold border-b border-gray-300">2025</th>
                            <th className="px-4 py-2 text-left text-blue-600 font-semibold border-b border-gray-300">2026</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Operating Activities */}
                        <tr className="bg-gray-50">
                            <td colSpan="6" className="px-4 py-2 font-semibold text-blue-600">
                                Cash Flow from Operating Activities
                            </td>
                        </tr>
                        {data.cashFlow.operating.map((row, index) => (
                            <tr key={index} className="even:bg-gray-100 odd:bg-white">
                                {row.map((cell, i) => (
                                    <td key={i} className="px-4 py-2 border-b border-gray-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* Investing Activities */}
                        <tr className="bg-gray-50">
                            <td colSpan="6" className="px-4 py-2 font-semibold text-blue-600">
                                Cash Flow from Investing Activities
                            </td>
                        </tr>
                        {data.cashFlow.investing.map((row, index) => (
                            <tr key={index} className="even:bg-gray-100 odd:bg-white">
                                {row.map((cell, i) => (
                                    <td key={i} className="px-4 py-2 border-b border-gray-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* Financing Activities */}
                        <tr className="bg-gray-50">
                            <td colSpan="6" className="px-4 py-2 font-semibold text-blue-600">
                                Cash Flow from Financing Activities
                            </td>
                        </tr>
                        {data.cashFlow.financing.map((row, index) => (
                            <tr key={index} className="even:bg-gray-100 odd:bg-white">
                                {row.map((cell, i) => (
                                    <td key={i} className="px-4 py-2 border-b border-gray-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* Summary */}
                        <tr className="bg-gray-50">
                            <td colSpan="6" className="px-4 py-2 font-semibold text-blue-600">
                                Summary
                            </td>
                        </tr>
                        <tr className="even:bg-gray-100 odd:bg-white">
                            <td className="px-4 py-2 font-semibold border-b border-gray-300">Net Cash Flow</td>
                            {data.summary.netCashFlow.map((value, index) => (
                                <td key={index} className="px-4 py-2 border-b border-gray-300">
                                    {value}
                                </td>
                            ))}
                        </tr>
                        <tr className="even:bg-gray-100 odd:bg-white">
                            <td className="px-4 py-2 font-semibold border-b border-gray-300">Beginning Cash Balance</td>
                            {data.summary.beginningBalance.map((value, index) => (
                                <td key={index} className="px-4 py-2 border-b border-gray-300">
                                    {value}
                                </td>
                            ))}
                        </tr>
                        <tr className="even:bg-gray-100 odd:bg-white">
                            <td className="px-4 py-2 font-semibold border-b border-gray-300">Ending Cash Balance</td>
                            {data.summary.endingBalance.map((value, index) => (
                                <td key={index} className="px-4 py-2 border-b border-gray-300">
                                    {value}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const Seventh = () => {
    const data = {
        assets: {
            current: [
                { label: "Cash", value: "₹92" },
                { label: "Accounts receivable", value: "₹50" },
                { label: "Inventory", value: "₹30" },
            ],
            longTerm: [
                { label: "Equipment", value: "₹230" },
                { label: "Buildings", value: "₹90" },
            ],
            totalAssets: "₹492",
        },
        liabilitiesEquity: {
            currentLiabilities: [
                { label: "Accounts payable", value: "₹92" },
                { label: "Short-term debt", value: "₹50" },
            ],
            longTermLiabilities: [
                { label: "Long-term debt", value: "₹200" },
            ],
            equity: [
                { label: "Stock", value: "₹2" },
                { label: "+Additional paid-in capital", value: "₹50" },
                { label: "+Retained earning", value: "₹30" },
            ],
            totalLiabilitiesEquity: "₹492",
        },
    };
    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <div
                className="grid gap-6 md:grid-cols-2"
                data-aos="fade-up"
            >
                {/* Assets Section */}
                <div className="bg-blue-50 rounded-lg shadow-md p-6 border border-blue-200">
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-300 pb-2">
                        Assets (in millions)
                    </h3>

                    {/* Current Assets */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-blue-500 mb-2">CURRENT ASSET</h4>
                        <div className="grid grid-cols-1 gap-2 border divide-y divide-gray-200 border-blue-100 p-4 rounded-md bg-white">
                            {data.assets.current.map((item, index) => (
                                <div key={index} className="flex justify-between">
                                    <span>{item.label}</span>
                                    <span>{item.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between font-bold mt-2 border-t border-blue-300 pt-2">
                            <span>Total current assets</span>
                            <span>₹172</span>
                        </div>
                    </div>

                    {/* Long-Term Assets */}
                    <div>
                        <h4 className="font-semibold text-blue-500 mb-2">LONG-TERM ASSETS</h4>
                        <div className="grid grid-cols-1 gap-2 border divide-y divide-gray-200 border-blue-100 p-4 rounded-md bg-white">
                            {data.assets.longTerm.map((item, index) => (
                                <div key={index} className="flex justify-between">
                                    <span>{item.label}</span>
                                    <span>{item.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between font-bold mt-2 border-t border-blue-300 pt-2">
                            <span>Total long-term assets</span>
                            <span>₹320</span>
                        </div>
                    </div>

                    {/* Total Assets */}
                    <div className="flex justify-between bg-blue-500 divide-y divide-gray-200 text-white font-bold p-2 mt-6 rounded-lg shadow-md">
                        <span>TOTAL ASSETS</span>
                        <span>{data.assets.totalAssets}</span>
                    </div>
                </div>

                {/* Liabilities and Equity Section */}
                <div className="bg-gray-50 rounded-lg shadow-md p-6 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-600 mb-4 border-b border-gray-300 pb-2">
                        Liabilities & Owners Equity (in millions)
                    </h3>

                    {/* Current Liabilities */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-500 mb-2">CURRENT LIABILITIES</h4>
                        <div className="grid grid-cols-1 gap-2 border border-gray-100 p-4 divide-y divide-gray-200 rounded-md bg-white">
                            {data.liabilitiesEquity.currentLiabilities.map((item, index) => (
                                <div key={index} className="flex justify-between">
                                    <span>{item.label}</span>
                                    <span>{item.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between font-bold mt-2 border-t border-gray-300 pt-2">
                            <span>Total current liabilities</span>
                            <span>₹50</span>
                        </div>
                    </div>

                    {/* Long-Term Liabilities */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-500 mb-2">LONG-TERM LIABILITIES</h4>
                        <div className="grid grid-cols-1 gap-2 border border-gray-100 p-4 rounded-md bg-white">
                            {data.liabilitiesEquity.longTermLiabilities.map((item, index) => (
                                <div key={index} className="flex justify-between">
                                    <span>{item.label}</span>
                                    <span>{item.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between font-bold mt-2 border-t border-gray-300 pt-2">
                            <span>Total long-term liabilities</span>
                            <span>₹200</span>
                        </div>
                    </div>

                    {/* Owners' Equity */}
                    <div>
                        <h4 className="font-semibold text-gray-500 mb-2">OWNERS’ EQUITY</h4>
                        <div className="grid grid-cols-1 gap-2 border divide-y divide-gray-200 border-gray-100 p-4 rounded-md bg-white">
                            {data.liabilitiesEquity.equity.map((item, index) => (
                                <div key={index} className="flex justify-between">
                                    <span>{item.label}</span>
                                    <span>{item.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between font-bold mt-2 border-t border-gray-300 pt-2">
                            <span>Total shareholders’ equity</span>
                            <span>₹172</span>
                        </div>
                    </div>

                    {/* Total Liabilities and Equity */}
                    <div className="flex justify-between bg-gray-500 text-white font-bold p-2 mt-6 rounded-lg shadow-md">
                        <span>TOTAL LIABILITY & OWNERS’ EQUITY</span>
                        <span>{data.liabilitiesEquity.totalLiabilitiesEquity}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Eighth = () => {
    const data = {
        years: ["2024", "2023", "2022", "2021"],
        sections: [
            { title: "Net income", values: ["--", "₹720,100", "₹785,516", "₹855,582"] },
            { title: "Depreciation", values: ["--", "₹120,300", "₹140,000", "₹160,000"] },
            { title: "Change in accounts receivable", values: ["--", "(₹59,945)", "₹28,721", "(₹4,249)"] },
            { title: "Change in inventory", values: ["--", "(₹329,144)", "(₹185,620)", "(₹100,591)"] },
            { title: "Change in prepaid expenses", values: ["--", "(₹24,800)", "(₹4,992)", "(₹5,192)"] },
            { title: "Change in accounts payable", values: ["--", "₹173,462", "₹65,429", "₹49,556"] },
            { title: "Cash from operations", values: ["--", "₹611,973", "₹841,534", "₹931,085"] },
            { title: "Change in fixed assets", values: ["--", "(₹203,000)", "(₹197,000)", "(₹200,000)"] },
            { title: "Cash from investing", values: ["--", "(₹203,000)", "(₹197,000)", "(₹200,000)"] },
            { title: "Change in debt", values: ["--", "(₹200,000)", "(₹200,000)", "(₹200,000)"] },
            { title: "Ending cash", values: ["₹500,000", "₹708,973", "₹1,153,507", "₹1,684,592"] },
        ],
    };

    return (
        <div className="p-6 bg-gray-100">
            <div
                className="flex justify-between sm:flex-nowrap flex-wrap sm:flex-row flex-col-reverse items-center border-b pb-4 mb-6"
                data-aos="fade-down" // Adds fade-down animation to the header
            >
                <h2 className="text-2xl font-bold text-blue-600">Statement of Cash Flows</h2>
                <p className="text-gray-500 text-sm">Report generated on {Service.CurontData("ll")}</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-left border-collapse text-xs sm:text-sm lg:text-base">
                        <thead>
                            <tr>
                                <th className="p-4 font-bold text-white bg-gray-700">Description</th>
                                {data.years.map((year, index) => (
                                    <th
                                        key={index}
                                        className={`p-4 text-white font-semibold text-center ${index === data.years.length - 1 ? "bg-blue-500" : "bg-gray-700"
                                            }`}
                                    >
                                        {year}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.sections.map((section, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0
                                        ? "bg-gray-100"
                                        : "bg-white"
                                        } ${section.title === "Ending cash" ? "bg-blue-100 font-bold text-blue-600" : ""}`}
                                >
                                    <td className="p-4">{section.title}</td>
                                    {section.values.map((value, valueIndex) => (
                                        <td
                                            key={valueIndex}
                                            className={`p-4 text-center ${value.includes("(") ? "text-red-500" : ""
                                                }`}
                                        >
                                            {value}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
const Ninth = () => {
    const data = [
        ["From", "To", "Value"],
        ["Cash & equivalents", "Current Assets", 23.6],
        ["Marketable securities", "Current Assets", 24.6],
        ["Accounts receivable", "Current Assets", 28.2],
        ["Inventories", "Current Assets", 4.9],
        ["Vendor receivable", "Current Assets", 32.7],
        ["Other current", "Current Assets", 21.2],
        ["Current Assets", "Assets", 135.4],
        ["Marketable securities", "Fixed Assets", 120.8],
        ["Property, plant & equipment", "Fixed Assets", 42.1],
        ["Other non-current", "Fixed Assets", 54.4],
        ["Fixed Assets", "Assets", 217.4],
        ["Assets", "AssetsLiabilities", 352.8],
        ["AssetsLiabilities", "Current Liabilities", 154.0],
        ["Accounts payable", "Current Liabilities", 64.1],
        ["Other current", "Current Liabilities", 60.8],
        ["Deferred revenue", "Current Liabilities", 7.9],
        ["Commercial paper", "Current Liabilities", 10.0],
        ["Short-term debt", "Current Liabilities", 11.1],
        ["AssetsLiabilities", "Long-term Liabilities", 148.1],
        ["AssetsLiabilities", "Shareholder's Equity", 64.9],
        ["Retained earnings", "Shareholder's Equity", -3.1],
        ["Accumulated loss", "Shareholder's Equity", -11.1],
    ];

    const options = {
        sankey: {
            node: {
                colors: [
                    "#22c55e", // Green
                    "#16a34a", // Dark Green
                    "#ef4444", // Red
                    "#f97316", // Orange
                    "#3b82f6", // Blue
                    "#818cf8", // Light Blue
                ],
                label: { fontSize: 14 },
            },
            link: {
                colorMode: "gradient",
                colors: ["#22c55e", "#ef4444"],
            },
        },
        chartArea: { width: "90%", height: "80%" },
    };
    return (
        <div className='p-6 bg-gray-100'>
            <div
                className="flex justify-between sm:flex-nowrap flex-wrap sm:flex-row flex-col-reverse items-center border-b pb-4 mb-6"
                data-aos="fade-down" // Adds fade-down animation to the header
            >
                <h2 className="text-2xl font-bold text-blue-600">Balance Sheet Graph</h2>
                <p className="text-gray-500 text-sm">Report generated on {Service.CurontData("ll")}</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <div className='flex justify-center'>
                    <div className="text-center mb-6 px-4 py-4 rounded-lg shadow-md bg-gray-100">
                        <p className="text-gray-500 text-sm">As of December 31, 2023</p>
                        <p className="text-gray-500 text-sm">All figures in billion ₹</p>
                    </div>
                </div>
                <Chart
                    chartType="Sankey"
                    data={data}
                    options={options}
                    width={"100%"}
                    height={"500px"}
                    loader={<div>Loading Chart...</div>}
                />
            </div>
        </div>
    );
};

const Tenth = () => {
    const data = [
        {
            title: "Previous Year",
            revenue: 111,
            expenses: -84.7,
            operatingIncome: 26.1,
            otherIncome: 1.0,
            taxes: -14.5,
            netIncome: 12.7,
            eps: 18.0,
        },
        {
            title: "Current Year",
            revenue: 137,
            expenses: -110,
            operatingIncome: 26.3,
            otherIncome: 8.6,
            taxes: -4.2,
            netIncome: 30.7,
            eps: 43.7,
        },
        {
            title: "Y-o-Y Change",
            revenue: 26.0,
            expenses: -25.8,
            operatingIncome: 0.2,
            otherIncome: 7.5,
            taxes: 10.4,
            netIncome: 18.1,
            eps: 25.7,
        },
    ];

    return (
        <div className="p-6 bg-gray-100 rounded-md shadow-lg">
            {/* Title Section */}
            <div
                className="flex justify-between sm:flex-nowrap flex-wrap sm:flex-row flex-col-reverse items-center border-b pb-4 mb-6"
                data-aos="fade-down" // Adds fade-down animation to the header
            >
                <h2 className="text-2xl font-bold text-blue-600">Income Statement as Waterfall Chart</h2>
                <p className="text-gray-500 text-sm">Report generated on {Service.CurontData("ll")}</p>
            </div>
            <div className="mb-8">
                <p className="text-gray-600 text-sm">
                    All numbers in billion USD
                </p>
            </div>

            {/* Chart Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg pb-6 border border-gray-200"
                    >
                        {/* Heading with Background and Blur */}
                        <h2
                            className={`text-lg font-semibold text-white text-center mb-4 py-2 rounded-t-lg ${index === 0
                                ? "bg-blue-800 bg-opacity-90"
                                : index === 1
                                    ? "bg-blue-800 bg-opacity-90"
                                    : "bg-blue-800 bg-opacity-90"
                                } backdrop-blur-md`}
                        >
                            {item.title}
                        </h2>
                        <div className="space-y-4 p-6">
                            <ChartRow label="Revenues" value={item.revenue} />
                            <ChartRow label="Total Costs & Expenses" value={item.expenses} />
                            <ChartRow
                                label="Operating Income"
                                value={item.operatingIncome}
                                highlight
                            />
                            <ChartRow label="Other Income (Expense)" value={item.otherIncome} />
                            <ChartRow label="Income Taxes" value={item.taxes} />
                            <ChartRow
                                label="Net Income"
                                value={item.netIncome}
                                highlight
                                footer={`EPS: ${item.eps.toFixed(2)}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Eleventh = () => {
    const ratios = [
        {
            title: "Price to Earnings Ratio",
            current: { value: 12, label: "Q2 FYX2" },
            previous: { value: 9, label: "Q2 FYX1", change: 33 },
        },
        {
            title: "Debt to Equity Ratio",
            current: { value: 1.2, label: "Q2 FYX2" },
            previous: { value: 1.4, label: "Q2 FYX1", change: -14 },
        },
        {
            title: "Current Ratio",
            current: { value: 2.4, label: "Q2 FYX2" },
            previous: { value: 2.4, label: "Q2 FYX1", change: 0 },
        },
        {
            title: "Return on Assets",
            current: { value: 22, label: "Q2 FYX2" },
            previous: { value: 19, label: "Q2 FYX1", change: 16 },
        },
        {
            title: "Return on Equity",
            current: { value: 18, label: "Q2 FYX2" },
            previous: { value: 15, label: "Q2 FYX1", change: 20 },
        },
        {
            title: "Return on Investment",
            current: { value: 13, label: "Q2 FYX2" },
            previous: { value: 18, label: "Q2 FYX1", change: -28 },
        },
    ];

    return (
        <div className="p-6 bg-gray-100">
            {/* Header Section */}
            <div
                className="flex justify-between sm:flex-nowrap flex-wrap sm:flex-row flex-col-reverse items-center border-b pb-4 mb-6"
                data-aos="fade-down"
            >
                <h2 className="text-2xl font-bold text-blue-600">Key Financial Ratios</h2>
                <p className="text-gray-500 text-sm">Report generated on {Service.CurontData("ll")}</p>
            </div>

            {/* Ratios Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ratios.map((ratio, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
                        data-aos="fade-up"
                    >
                        <h2 className="text-lg font-bold text-gray-700 text-center mb-4">
                            {ratio.title}
                        </h2>
                        <div className="text-center">
                            <div className="text-sm text-gray-500">{ratio.current.label}</div>
                            <div className="text-3xl font-semibold text-blue-600">
                                {ratio.current.value}
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                            <div className="text-sm text-gray-500">
                                {ratio.previous.label}
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="text-gray-700 font-semibold">
                                    {ratio.previous.value}
                                </div>
                                <div
                                    className={`text-sm font-semibold px-2 py-1 rounded-lg ${ratio.previous.change > 0
                                        ? "bg-green-100 text-green-600"
                                        : ratio.previous.change < 0
                                            ? "bg-red-100 text-red-600"
                                            : "bg-gray-100 text-gray-500"
                                        }`}
                                >
                                    {ratio.previous.change > 0 ? "▲" : ratio.previous.change < 0 ? "▼" : ""}
                                    {Math.abs(ratio.previous.change)}%
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Twelfth = () => {
    const financialSummary = [
        { value: '60MM', title: 'EBITA', description: 'Earning before interest, taxes, depreciation and amortization.' },
        { value: '65%', title: 'Net Profit Margin', description: 'Calculated by finding the net profit as a percentage of the revenue.' },
        { value: '80MM', title: 'Net Revenue', description: 'Revenue minus cost of goods sold, expense & taxes for accounting.' },
        { value: '20%', title: 'Q-o-Q Growth', description: 'Compare current quarter to the same quarter of the previous year.' },
        { value: '90MM', title: 'Net Profit', description: 'Actual profit after taking working expenses into considerations.' },
    ];
    return (
        <div className="p-6 bg-gray-100 rounded-md shadow-lg">
            {/* Header Section */}
            <div
                className="flex justify-between sm:flex-nowrap flex-wrap sm:flex-row flex-col-reverse items-center border-b pb-4 mb-6"
                data-aos="fade-down" // Adds fade-down animation to the header
            >
                <h2 className="text-2xl font-bold text-blue-600">Income Statement as Waterfall Chart</h2>
                <p className="text-gray-500 text-sm">Report generated on {Service.CurontData("ll")}</p>
            </div>
            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {financialSummary.map((item, index) => (
                    <div>
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg flex flex-col justify-between items-center p-6 relative border border-gray-200"
                            data-aos="fade-up"
                            data-aos-delay={`${index * 100}`}
                        >
                            {/* Circular Value */}
                            <div
                                className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-100 text-blue-600 font-semibold text-xl mb-4"
                                style={{ border: '3px solid #E5E7EB' }} // Tailwind doesn't allow inline-border-width
                            >
                                {item.value}
                            </div>

                            {/* Title */}
                            <h3 className="text-base font-bold text-gray-700 text-center mb-2">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-xs text-gray-500 text-center">
                                {item.description}
                            </p>
                        </div>
                        <div className="mt-6  bg-blue-600 text-white text-sm rounded-lg p-4">
                            <div className="text-center">
                                <h4 className="font-semibold text-base mb-1">{item.title}</h4>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Section */}
            <div className="mt-6 bg-blue-600 hidden text-white text-sm rounded-lg p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {financialSummary.map((item, index) => (
                    <div key={index} className="text-center">
                        <h4 className="font-semibold text-base mb-1">{item.title}</h4>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


const steps = [
    // {
    //     title: '',
    //     content: <First />
    // },
    {
        title: '',
        content: <Second />,
    },
    {
        title: '',
        content: <ThirdData />,
    },
    {
        title: '',
        content: <Fourth />,
    },
    {
        title: '',
        content: <Fifth />,
    },
    {
        title: '',
        content: <Sixth />,
    },
    {
        title: '',
        content: <Seventh />,
    },
    {
        title: '',
        content: <Eighth />,
    },
    {
        title: '',
        content: <Ninth />,
    },
    {
        title: '',
        content: <Tenth />,
    },
    {
        title: '',
        content: <Eleventh />,
    },
    {
        title: '',
        content: <Twelfth />,
    },
];
const FinancialReport = () => {

    const [current, setCurrent] = useState(1);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    return (
        <Card extra="flex w-full h-full flex-col px-3 py-3">
            <Steps current={current} items={items} />
            <div className='rounded-md p-2 min-h-80 my-2'>{steps[current].content}</div>
            <div
                style={{
                    marginTop: 24,
                    textAlign: "right",
                }}
            >
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        Previous
                    </Button>
                )}
            </div>
        </Card>
    );
};
export default FinancialReport;


