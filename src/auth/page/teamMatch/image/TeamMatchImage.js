import React from "react";
// import TestImg1 from "https://kr.object.ncloudstorage.com/goalddae-bucket/team-match-detail/testImg1.webp";

const TeamMatchImage = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
    }}>
      <img 
        src="https://kr.object.ncloudstorage.com/goalddae-bucket/team-match-detail/testImg1.webp" alt="이미지" className="img" 
        style={{
          marginTop: '3%', 
          width: '1000px',
          height: '900px' 
        }}
      />
    </div>
  )
}

export default TeamMatchImage;
