import Featured from '../../components/featured/Featured';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Widget from '../../components/widget/Widget';
import Chart from '../../components/chart/Chart';
import Chart2 from '../../components/chart2/Chart2';
import MainChart from '../../components/mainchart/Mainchart';
import './home.scss';
import { useEffect, useState } from 'react';
import { getMyInfo, getLedgersSummary } from '../../api';
import useToken from '../../store/token';
import moment from 'moment';

function getWeekFromDate(date) {
    const oneJan = new Date(date.getFullYear(),0,1);
    const numberOfDays = Math.floor((date.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));

    return Math.ceil(( date.getDay() + 1 + numberOfDays) / 7);
}

const Home = () => {
  const { token } = useToken();
  const [weeklyData, setWeeklyData] = useState({});
  const [lastWeekData, setLastWeekData] = useState({});
  const [last2WeekData, setLast2WeekData] = useState({});
  const [annualGoal, setAnnualGoal] = useState({});
  const [totalSales, setTotalSales] = useState({});

  useEffect(()=>{
    const date = moment();
    const year = date.year();
    const lwNumber = date.week() - 1;

    getMyInfo(token).then(user => {
      setAnnualGoal(user.group.annualGoal);
    });
    
    getLedgersSummary(token, year).then(raw => {
      const wd = raw.forEach(element => {
        element.nonBenefitRate = element.nonBenefitRate * 100;
        element.revisitRate = element.revisitRate * 100;
      });
      setWeeklyData(raw);
      const lwd = raw.find(e=> e.week === lwNumber);
      if(lwd) setLastWeekData(lwd);
      else {
        setLastWeekData({
          newSalesPerUser: 0,
          nonBenefitRate: 0,
          revisitRate: 0,
          revisitSalesPerUser: 0,
          sales: 0,
          salesPerUser: 0,
          visitors: 0,
          week: lwNumber,
        });
      }
      const l2wd = raw.find(e=> e.week === lwNumber - 1);
      if(l2wd) setLast2WeekData(l2wd);
      else {
        setLast2WeekData({
          newSalesPerUser: 0,
          nonBenefitRate: 0,
          revisitRate: 0,
          revisitSalesPerUser: 0,
          sales: 0,
          salesPerUser: 0,
          visitors: 0,
          week: lwNumber - 1,
        });
      }

      let sum = 0;
      raw.forEach(element => {
        sum = sum + element.sales;
      });
      setTotalSales(sum);
    });
  }, [token]);
  return (
    <div className='home'>
        <Sidebar />
        <div className='homeContainer'>
            <Navbar />
            <div className='widgets'>
                <Widget type='총매출' value={lastWeekData.sales} percentage={(lastWeekData.sales - last2WeekData.sales)/last2WeekData.sales * 100}/>
                <Widget type='객단가' value={lastWeekData.salesPerUser} percentage={(lastWeekData.salesPerUser - last2WeekData.salesPerUser)/last2WeekData.salesPerUser * 100}/>
                <Widget type='비급여율' value={lastWeekData.nonBenefitRate} percentage={(lastWeekData.nonBenefitRate - last2WeekData.nonBenefitRate)/last2WeekData.nonBenefitRate * 100}/>
                <Widget type='방문자수' value={lastWeekData.visitors} percentage={(lastWeekData.visitors - last2WeekData.visitors)/last2WeekData.visitors * 100}/>
                <Widget type='재방문율' value={lastWeekData.revisitRate} percentage={(lastWeekData.revisitRate - last2WeekData.revisitRate)/last2WeekData.revisitRate * 100}/>    
            </div> 
            <div className='maincharts'>  
                <MainChart weeklyData={weeklyData} />
                <Featured annualGoal={annualGoal | 0} sales={totalSales | 0} /> 
            </div>
            <div className='subcharts'> 
                <Chart  weeklyData={weeklyData}/>
                <Chart2  weeklyData={weeklyData}/>    
            </div>
        </div>
    </div>
    )    
}

export default Home


/*

시나리오 #1
- 뷰어(보기만 가능)와 어드민(보기와 수정 가능) 2명 아이디/패스워드 할당
- 첫 페이지는 로그인 페이지
- 뷰어는 어드민 탭 미노출
- 어드민은 뷰어+어드민에서 조작 가능
- 게시판 기능은 논의 후 결정
- 뷰어, 어드민의 아이디/패스워드는 데이터베이스에서 수동 조작 가능

시나리오 #2
- 로그인 기능 없음
- 접속자는 보기만 가능
- 어드민은 데이터베이스를 직접 만져 수정 후 반영하는 형태

시나리오 #3
- 평범한 방식(세션/토큰)의 로그인 / 회원가입 방식

*/