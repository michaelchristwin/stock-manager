"use client";

import AddStock from "@/components/AddStock";
import DeleteStock from "@/components/DeleteStock";
import UpdateStock from "@/components/UpdateStock";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type stock = {
  id: number;
  description: string;
  units: number;
  unit_price: number;
};
function Admin() {
  const [stocks, setStocks] = useState<stock[] | undefined>(undefined);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "https://gin-backend.onrender.com/admin/stocks",
          {
            withCredentials: true,
          }
        );
        if (!res.data) {
          return;
        }
        let data = res.data.map((item: any) => {
          let inventory: stock = {
            id: item.ID,
            description: item.Description,
            unit_price: item.Unit_price,
            units: item.Units,
          };
          return inventory;
        });
        //console.log(data);
        setStocks(data);
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          router.push("/");
          console.log("pushed");
        }
        console.error(err);
      }
    })();
  }, []);
  return (
    <div className={`w-full space-y-5 p-5`}>
      <div className={`w-full flex justify-start space-x-8 items-center`}>
        <button
          onClick={() => window.location.reload()}
          className={`w-fit h-[35px] p-2 rounded-lg text-black hover:opacity-75 active:opacity-60 bg-indigo-600 flex justify-center items-center`}
        >
          <svg
            fill="none"
            height="20"
            width="20"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <AddStock>
          <button
            className={`w-fit p-2 h-[35px] flex justify-center items-center rounded-lg bg-indigo-600`}
          >
            <svg
              enableBackground="new 0 0 50 50"
              height="20px"
              width="20px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 50 50"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect fill="none" height="50" width="50" />
              <line
                fill="none"
                stroke="#ffffff"
                strokeMiterlimit="10"
                strokeWidth="4"
                x1="9"
                x2="41"
                y1="25"
                y2="25"
              />
              <line
                fill="none"
                stroke="#ffffff"
                strokeMiterlimit="10"
                strokeWidth="4"
                x1="25"
                x2="25"
                y1="9"
                y2="41"
              />
            </svg>
          </button>
        </AddStock>
        <input
          type="text"
          name="search"
          className={`w-[500px] text-black focus:outline-none h-[40px] rounded-lg ps-2`}
          placeholder="Search"
        />
      </div>
      <table className={`w-[90%] mx-auto border border-yellow-500`}>
        <thead>
          <tr className={`text-center h-[50px]`}>
            <th className={`border border-yellow-500 w-[100px]`}>ID</th>
            <th className={`border border-yellow-500`}>Description</th>
            <th className={`border border-yellow-500`}>Units</th>
            <th className={`border border-yellow-500 w-[120px]`}>Unit Price</th>
            <th className={`border border-yellow-500`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks?.map((item, index) => (
            <tr className={`text-center h-[50px]`} key={index}>
              <td className={`border border-yellow-500`}>{item.id}</td>
              <td className={`border border-yellow-500`}>{item.description}</td>
              <td className={`border border-yellow-500`}>{item.units}</td>
              <td className={`border border-yellow-500`}>${item.unit_price}</td>
              <td className={`border border-yellow-500`}>
                <div className={`w-full flex mx-auto justify-center space-x-4`}>
                  <UpdateStock data={item}>
                    <button
                      className={`w-[35px] p-2 h-[35px] rounded-[6px] flex justify-center items-center bg-blue-600`}
                    >
                      <svg
                        className="feather feather-edit"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  </UpdateStock>
                  <DeleteStock data={item}>
                    <button
                      className={`w-[35px] h-[35px] rounded-[6px] p-2 flex justify-center items-center  bg-red-600`}
                    >
                      <svg
                        width={`24`}
                        fill="#ffffff"
                        height={`24`}
                        viewBox="0 0 448 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z" />
                      </svg>
                    </button>
                  </DeleteStock>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
