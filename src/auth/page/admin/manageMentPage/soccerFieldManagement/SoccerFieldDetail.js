import MapComponent from '../../../../../soccerField/MapComponent';
import SoccerFieldImageSlide from '../../../../../soccerField/SoccerFieldImageSlide';
import styles from "./SoccerField.module.css"
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ShowerIcon from '@mui/icons-material/Shower';
import WcIcon from '@mui/icons-material/Wc';

const SoccerFieldDetail = ({row, timeFormat, setPageState, setSelectSoccerField}) => {
    const on = { color : "#444444", marginBottom : "-3px"};
      const off = { color : "#aaaaaa", marginBottom : "-3px"};
    return (
            <div style={{backgroundColor:"#F5F5F5"}}>      
    <div className={styles.container}>                
    {row && 
    <SoccerFieldImageSlide fieldInfo={row} />}
      {row && 
          <div className={styles.flexContainer}>
            <div className={styles.infoContainer}>
              <div className={styles.info}>
                <div className={styles.infoText}>{row.region} / {row.province}</div>
                <div className={styles.infoTitle}>{row.fieldName}</div>
                <div className={styles.infoText}>
                  <span>{row.fieldSize} / </span>                
                  <span>{row.grassWhether === "1" ? "천연잔디 / " : "인조잔디 / "}</span>                
                  <span>{row.inOutWhether === "1" ? "실내" : "실외"}</span>     
                </div>                                                 
              </div>
              <div className={styles.info}>
                <h3>시설 이용 정보</h3>
                <div>
                 <span className={styles.on}> 영업시간 : {timeFormat(row.operatingHours)} ~ {timeFormat(row.closingTime)}</span>
                </div>
                <br/>
                <div>
                  {row.parkingStatus ?
                <>
                <DirectionsCarIcon sx={on}/> <span className={styles.on}>주차장 - 사용가능</span>
                </> : 
                <>
                <DirectionsCarIcon sx={off}/> <span className={styles.off}>주차장</span>
                </>
                }
                </div>
                <div>
                  {row.showerStatus ?
                <>
                <ShowerIcon sx={on}/> <span className={styles.on}>샤워실 - 사용가능</span>
                </> : 
                <>
                <ShowerIcon sx={off}/> <span className={styles.off}>샤워실</span>
                </>
                }
                </div>
                <div>
                  {row.toiletStatus ?
                <>
                <WcIcon sx={on}/> <span className={styles.on}>화장실 - 사용가능</span>
                </> : 
                <>
                <WcIcon sx={off}/> <span className={styles.off}>화장실</span>
                </>
                }
                </div>
                <hr className={styles.separator}/>
                <h3>시설 특이사항</h3>
                <div>{row.content && row.content}</div>                  
              </div>
              <div className={styles.info}>
                <h3>위치 정보</h3>
                  <div className={styles.infoText}>
                    {row.address}
                  </div> 
              </div>                            
            </div>
          </div>
      }
    <div className={styles.btnDiv}>
      <button className={styles.btn} onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setSelectSoccerField(row)
          setPageState(3)
        }}>수정</button>
    </div>
    </div>
  </div>
    );
}

export default SoccerFieldDetail;