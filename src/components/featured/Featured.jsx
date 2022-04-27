import './featured.scss';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

export default function Featured({annualGoal, sales}) {
  return (
    <div className='featured'>
        <div className="top">
            <h2 className="title">매출 달성률</h2>
            <MoreVertIcon fontSize='small'/>
        </div>
        <div className="bottom">
            <div className="featuredChart" style={{width: 200, height: 200}}>
                <CircularProgressbar 
                value={sales / annualGoal} text={(sales / annualGoal)+'%'} strokeWidth={15}
                
                styles={buildStyles({
                    pathColor: 'rgb(14, 77, 161)',
                    textColor: 'rgb(14, 77, 161)',
                    textSize: '20px'
                })}
                />
            </div>
            <span className='objective'>연 매출 {annualGoal} 목표 대비</span> 
        </div>    
    </div>
  )
}
