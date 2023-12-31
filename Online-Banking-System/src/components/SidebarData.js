// import React from "react";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
// import * as IoIcons from "react-icons/io";
// import * as RiIcons from "react-icons/ri";

import { Link , useParams} from "react-router-dom";

export const SidebarData = [
	{
		title: "Open New Account",
		path: "/openNewAccount/:id",
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
		title: "All Transactions",
		path: "/allTransactions/:id"
	},
	{
		title: "Change Password",
		path: "/changePassword/:id",
	},
	{
		title: "Dashboard",
		path: "/dashboard/:id",
	},
	{
		title: "Logout",
		path: "/"
	}
];
