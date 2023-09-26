import React, { useState , useEffect} from "react";
import styled from "styled-components";
import { Link , useParams} from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import UserService from '../service/UserService'

const Nav = styled.div`
background: #15171c;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const SidebarNav = styled.nav`
background: #15171c;
width: 250px;
height: 100vh;
display: flex;
justify-content: center;
position: fixed;
top: 0;
left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
transition: 350ms;
z-index: 10;
`;

const SidebarWrap = styled.div`
width: 100%;
`;

const Sidebar = () => {
const [sidebar, setSidebar] = useState(false);

const showSidebar = () => setSidebar(!sidebar);
const { id } = useParams();
const [userDetails,setUserDetails]=useState({user_id:"",user_name:"",email:""});
const [user_name, setUserName] = useState('');
useEffect(() => {
    // Fetch user details based on the ID
    UserService.getUserById(id)
      .then(response => {
        setUserDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, [id]);
return (
	<>
	<IconContext.Provider value={{ color: "#fff" }}>
		<Nav>
		<NavIcon to="#">
			<FaIcons.FaBars onClick={showSidebar} />
		</NavIcon>&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h1 style={{color:"white"}}> Hi, {userDetails.user_name} </h1>
		</Nav>
		<h1>Hi, {userDetails.user_name}</h1>
		<SidebarNav sidebar={sidebar}>
		<SidebarWrap>
			<NavIcon to="#">
			<AiIcons.AiOutlineClose onClick={showSidebar} />
			</NavIcon>
			{SidebarData.map((item, index) => {
  const linkTo = item.path.replace(':id', id); // Replace :id with the actual id

  return (
    <SubMenu
      item={{ ...item, path: linkTo }}
      key={index}
    />
  );
})}
					{/* {SidebarData.map((item, index) => {
//  const linkTo = item.path.includes(':id') ? `/transaction/${id}` : item.path;
  return (
    <SubMenu
      item={{ ...item, path: linkTo }}
      key={index}
    />
  );
})} */}
		</SidebarWrap>
		</SidebarNav>
	</IconContext.Provider>
	</>
);
};

export default Sidebar;
