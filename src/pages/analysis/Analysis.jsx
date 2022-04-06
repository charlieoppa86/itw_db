import './analysis.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

export default function Analysis() {
  return (
    <div className='analysis'>
        <Sidebar />
        <div className="newContainer">
            <Navbar />
            <div className="top">
                <h2>LESSON & LEARN</h2>    
            </div>
            <div className="bottom">
              <div className='paragraph'> GOOD
                <li>오픈 후 가장 높은 매출 (2월 2주차가 2위)</li>
                <li>오픈 후 가장 많은 방문자 수 (신속항원검사자의 병원 및 진료과목 인지)</li> 
                <li>병원 첫 방문자가 크게 증가 (전주 대비 200% 이상)</li>  
              </div>
              <div className='paragraph'> NOT GOOD
                <li>재진 환자 객단가 1개월째 하락세 (원인 파악 필요)</li>
                <li>신규 객단가 크게 하락했지만, 신속항원검사가 원인으로 추후 회복 기대</li> 
                <li>비급여 매출 크게 하락했지만, 상동</li>  
              </div>
              <div className='paragraph'> NEXT STEP
                <li>재진 환자 객단가 하락 원인 파악 및 대응책 마련</li>
                <li>네이버 키워드 광고 집행으로 신규 환자 유치 시작 (월 200만 원~)</li> 
                <li>네이버 키워드 광고비 소진 트렌드 파악 후 DM 비용 이월</li>  
              </div>
          </div>
        </div>
    </div>
  )
}
