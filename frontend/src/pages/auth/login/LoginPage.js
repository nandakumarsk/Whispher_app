import { useState } from "react";
import { Link } from "react-router-dom";


import WSvg from "../../../components/svgs/W"; // W logo

import { FaUser } from "react-icons/fa";
import  { MdOutlinePassword } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "../../../constant/url";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/common/LoadingSpinner";




const LoginPage = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

const queryclient = useQueryClient();	


	const { mutate: login , isPending, isError, error } = useMutation({
		mutationFn: async ({username, password}) => {
		  try {
			const res = await fetch(`${baseUrl}/api/auth/login`, {
			  method: "POST",
			  credentials: "include",
			  headers: {
				"Content-Type": "application/json", // Fixed property name
			  },
			  body: JSON.stringify({ username, password }),
			});
	  
		const data = await res.json();
	  
			if (!res.ok) {
			  throw new Error(data.error || "Something went wrong"); 
			}
	  
			return data; 
		  } 
		  catch (error) {
			throw error; 
		  }
		  
		},

		onSuccess: (data) => {
		  toast.success("Login successful")
		  queryclient.invalidateQueries({
			queryKey : ["authUser"]
		  })
		},
		
	  });
	  

	const handleSubmit = (e) => {
		e.preventDefault();
		login(formData);
		
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	

	return (
		<div className="max-w-screen-xl mx-auto flex h-screen">
			<div className="flex-1 hidden lg:flex items-center justify-center">
				<WSvg className="lg:w-2/3 fill-white" />
			</div>
			<div className="flex-1 flex flex-col justify-center items-center">
				<form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
					<WSvg className="w-24 lg:hidden fill-white" />
					<h1 className="text-4xl font-extrabold text-white">{"Let's"} go.</h1>
					<label className="input input-bordered rounded flex items-center gap-2">
						<FaUser  />
						<input
							type="text"
							className="grow"
							placeholder="Username"
							name="username"
							onChange={handleInputChange}
							value={formData.username}
						/>
						
					</label>
					<label className="input input-bordered rounded flex items-center gap-2">
          <MdOutlinePassword />
						<input
							type="password"
							className="grow"
							placeholder="Password"
							name="password"
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>
					<button className="btn rounded-full btn-primary text-white">
						{isPending ? <LoadingSpinner /> : "Login"}
					</button>
					{isError && <p className='text-red-500'>{error.message || "An error occurred. Please try again."}</p>}
				</form>
				<div className="flex flex-col gap-2 mt-4">
					<p className="text-white text-lg">{"Don't"} have an account?</p>
					<Link to="/signup">
						<button className="btn rounded-full btn-primary text-white btn-outline w-full">
							Sign up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
