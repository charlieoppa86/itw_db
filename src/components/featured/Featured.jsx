import './featured.scss';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

export default function Featured() {
  return (
    <div className='featured'>
        <div className="top">
            <h2 className="title">매출 달성률</h2>
            <MoreVertIcon fontSize='small'/>
        </div>
        <div className="bottom">
            <div className="featuredChart" style={{width: 200, height: 200}}>
                <CircularProgressbar 
                value={8.10} text={"8.10%"} strokeWidth={15}
                
                styles={buildStyles({
                    pathColor: 'rgb(14, 77, 161)',
                    textColor: 'rgb(14, 77, 161)',
                    textSize: '20px'
                })}
                />
            </div>
            <span className='objective'>연 매출 24억 목표 대비</span>   
            <span className='period'>2022년 오픈~3월 중순 기준</span>    
        </div>    
    </div>
  )
}
