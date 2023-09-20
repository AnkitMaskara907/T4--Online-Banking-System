import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion';

import "../styles/MyButton.css";

const MyButton = (props) => {
    const {text,link,clickHandler} = props; 

    const navigate = useNavigate(); 

    return (
        <motion.button
            variant="outline-dark"
            size="lg"
            onClick={()=>{
                if(clickHandler)
                    clickHandler();
                else if(link)
                    navigate(link);
            }
            }
            className={`${MyButton} bg-transparent rounded-pill px-5 py-2`}
            whileHover={{
                transition: {
                    ease: "easeIn",
                }
            }}
            layout
        >
            {text}
        </motion.button>
    );
}

export default MyButton;