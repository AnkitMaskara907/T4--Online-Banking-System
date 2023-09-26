// import React from "react";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
// import * as IoIcons from "react-icons/io";
// import * as RiIcons from "react-icons/ri";

import { Link , useParams} from "react-router-dom";

export const SidebarData = [
{
	
	title: "Account Details",
	path: "/accountDetails/:id",
},
{
	title: "Account Summary",
	path: "/accountSummary/:id",
},
{
	title: "Transfer Funds",
	path: "/transaction/:id",
},
{
	title: "Open New Account",
	path: "/openNewAccount/:id",
},
{
	title: "Change Password",
	path: "/changePassword/:id",
},
];
