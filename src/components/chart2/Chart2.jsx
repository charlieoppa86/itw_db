import './chart2.scss';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function Chart2({weeklyData}) {
  return (
    <div className="chart2">
        <div className="top">
            <h2 className="title">객단가 지표</h2>
            <MoreVertIcon fontSize='small'/>
        </div>
        <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={weeklyData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="newSalesPerUser" stroke="brown" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="revisitSalesPerUser" stroke="navy" />
        </LineChart>
      </ResponsiveContainer>
      
    </div>

  )
}
