import "./sidebar.scss"
import InsertChartIcon from "@mui/icons-material/InsertChart";
import PersonIcon from "@mui/icons-material/Person";
import NotesIcon from "@mui/icons-material/Notes";
import { Link } from "react-router-dom";



export default function Sidebar() {
  return (
    <div className="sidebar">
        <div className="top">
            <span className="logo">병원재무관리</span>
        </div>
        <hr />
        <div className="center">
            <ul>
                <li>
                    <Link to='/' >
                    <InsertChartIcon className="icon"/>
                    <span>
                        대시보드
                    </span>
                    </Link>
                </li>
                <li>
                    <Link to='/admin'>   
                    <PersonIcon className="icon"/>
                    <span>
                        관리
                    </span>
                    </Link>
                </li>
            </ul>
        </div>   
        <div className="bottom"></div>       
    </div>
  )
}

