import './mainchart.scss';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  YAxis,
} from 'recharts';

export default function MainChart({weeklyData}) {
  console.log(weeklyData);
  return (
    <div className="mainchart">
        <div className="top">
            <h2 className="title">매출 지표</h2>
            <MoreVertIcon fontSize='small'/>
        </div>
        <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          width={500}
          height={400}
          data={weeklyData}
        >
          <CartesianGrid stroke="#f5f5f5" className='chartGrid'/>
          <XAxis dataKey="week" scale="band"/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" barSize={40} fill="rgb(14, 77, 161)" />
          <Line type="monotone" dataKey="nonBenefitRate" stroke="red" />
          <Line type="monotone" dataKey="salesPerUser" stroke="gray" />
        </ComposedChart>
      </ResponsiveContainer>
      
    </div>

  )
}
