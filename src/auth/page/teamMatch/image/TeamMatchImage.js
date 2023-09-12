import React from "react";
import TestImg1 from "./testImg1.jpg";

const TeamMatchImage = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
    }}>
      <img 
        src={TestImg1} alt="이미지" className="img" 
        style={{
          marginTop: '2%', 
          width: '700px',
          height: '900px' 
        }}
      />
    </div>
  )
}

export default TeamMatchImage;
