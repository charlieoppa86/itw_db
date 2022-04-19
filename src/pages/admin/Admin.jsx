import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './admin.scss';
import {upsertLedger, getLedger } from '../../api';
import useToken from '../../store/token';

export default function Admin() {
  const { token } = useToken();
  const [date, setDate] = useState(new Date());
  const [sales, setSales] = useState(0);
  const [newSales, setNewSales] = useState(0);
  const [visitors, setVisitors] = useState(0);
  const [newVisitors, setNewVisitors] = useState(0);
  const [nonBenefit, setNonBenefit] = useState(0);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if(!init) {
      getLedger(token, getFormatDate(new Date()))
          .then(res => {
            setSales(res.sales);
            setNewSales(res.newSales);
            setVisitors(res.visitors);
            setNewVisitors(res.newVisitors);
            setNonBenefit(res.nonBenefit);
          })
    }
    setInit(true);
  });

  function dateChanged(changed) {
    getLedger(token, getFormatDate(changed))
      .then(res => {
        setDate(changed);
        setSales(res.sales);
        setNewSales(res.newSales);
        setVisitors(res.visitors);
        setNewVisitors(res.newVisitors);
        setNonBenefit(res.nonBenefit);
      })
  }
  function getFormatDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth());
    month = month >= 10 ? month : '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;

    return  year + '-' + month + '-' + day;
  }
  function save() {
    if(sales && newSales && visitors && newVisitors && nonBenefit) {
      upsertLedger(token, {date: getFormatDate(date),sales: sales, newSales: newSales, visitors: visitors, newVisitors: newVisitors, nonBenefit: nonBenefit});
      alert('Saved');
    } else {
      alert('Field is empty');
      return;
    }
  }
  return (
    <div className='admin'>
        <Sidebar />
        <div className="newContainer">
            <Navbar />
            <div className="top">
                <h2>데이터 추가</h2>    
            </div>
            <div className="bottom">
                <div className="left">
                    <Calendar onChange={dateChanged} value={date}/>

                </div>
                <div className="right">
                    <form>
                        <div className='formInput'>      
                            <label>총매출</label>
                            <input type={"text"} value={sales || ''} placeholder='단위: 십 만원' onChange={e=>setSales(e.target.value)}/>
                        </div>
                        <div className='formInput'>
                            <label>신규방문자매출</label>
                            <input type={"text"} value={newSales || ''} placeholder='단위: 천 원' onChange={e=>setNewSales(e.target.value)}/>
                        </div>
                        <div className='formInput'>
                            <label>총방문자수</label>
                            <input type={"text"} value={visitors || ''} placeholder='단위: 명' onChange={e=>setVisitors(e.target.value)}/>
                        </div>
                        <div className='formInput'>
                            <label>신규방문자수</label>
                            <input type={"text"} value={newVisitors || ''} placeholder='단위: 명' onChange={e=>setNewVisitors(e.target.value)}/>
                        </div>
                        <div className='formInput'>
                            <label>비급여매출</label>
                            <input type={"text"} value={nonBenefit || ''} placeholder='단위: 천 원' onChange={e=>setNonBenefit(e.target.value)}/>
                        </div>
                        
                    </form>
                    <button onClick={save}>저장</button>
                </div>
            </div>    
        </div>
    </div>
  )
}