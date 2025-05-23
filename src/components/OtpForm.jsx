
import { useState } from "react";
import { verify_otp_register_user } from "../api/user.api";
import { useNavigate } from "@tanstack/react-router";

function OtpForm({ msg="Enter The OTP Sent to your Email" }) {
  const [otp,setOtp] = useState("");
  const [response,setResponse] = useState(msg);

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await verify_otp_register_user(otp);
      
     console.log(data.data)
   
      if(data.data?.success){
        setResponse(()=>data?.data.message);
        setTimeout(() => {
          navigate({to:"/dashboard"})
        },3000);
      }
    } catch (error) {
      setResponse(()=>error.response.data?.message);
      console.error(error.response.data);
    }
  };
  return (
    <form className="w-full max-w-md mx-auto border-2 rounded-md" >
      <div className="flex flex-col justify-evenly h-fit gap-y-4 px-5 pb-3">
      
         <label className="block  text-sm font-bold mt-2 mb-2 bg-sky-200 p-1 rounded-md" htmlFor="name">
        { msg}
          </label>
        {response && <p className="text-red-500">{response}</p>}
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            id="name"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Submit</button>
      </div>
    </form>
  );
}

export default OtpForm;
