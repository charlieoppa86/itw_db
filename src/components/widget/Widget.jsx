import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleIcon from '@mui/icons-material/People';
import './widget.scss';


export default function Widget({type, value, percentage}) {

  let data;

    switch(type){
      case "총매출":
        data = {
          title : "총매출",
          value : value,
          link : "단위 : 십만 원",
          icon : < MonetizationOnOutlinedIcon className='icon' />,
          percentage : percentage,
        }
        break;
      case "객단가":
        data = {
          title : "객단가",
          value : value,                        
          link : "단위 : 천 원",
          icon : < PersonAddIcon className='icon' />,
          percentage : percentage,
        }
        break;
      case "비급여율":
        data = {
          title : "비급여율",
          value : value,                      
          link : "단위 : %",
          icon : < ReceiptIcon className='icon' />,
          percentage : percentage,
        }
        break;                
      case "방문자수":
        data = {
          title : "방문자수",
          value : value,
          link : "단위 : 명",
          icon : < PeopleIcon className='icon' />,
          percentage : percentage,
        }
        break;
      case "재방문율":
        data = {
          title : "재방문율",
          value : value,           
          link : "단위 : %",
          icon : < HandshakeIcon className='icon' />,
          percentage : percentage,
        }
        break;
        
        default:
          break;
    }


  return (
    <div className='widget'>
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.value}</span>
        <span className="link">{data.link}</span>  
      </div>
      <div className="right">
      <span className='last'>전주 대비</span>
        <div className="percentages">
          {data.percentage}% </div>
        {data.icon}
        </div>
      </div>
  );
};