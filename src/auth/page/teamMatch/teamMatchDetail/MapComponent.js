/* global kakao */
import React, { useEffect } from 'react';

const { kakao } = window;

const MapComponent = ( props ) => {

    //처음 지도 그리기
    useEffect(()=>{
        const container = document.getElementById('map');
        const options = { center: new kakao.maps.LatLng(33.450701, 126.570667) };
        const map = new kakao.maps.Map(container, options);

        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch( props.fieldInfo.address , function(result, status) {

            // 정상적으로 검색이 완료됐으면 
             if (status === kakao.maps.services.Status.OK) {
        
                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        
                // 결과값으로 받은 위치를 마커로 표시합니다
                const marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
        
                // 인포윈도우로 장소에 대한 설명을 표시합니다
                const infowindow = new kakao.maps.InfoWindow({
                    content: `<div style="width:250px;text-align:center;padding:6px 0;">${props.fieldInfo.fieldName}</div>`
                });
                infowindow.open(map, marker);
        
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            } 
        });
        
    },[])

    return (
        <div
            style={{
                width: '100%',
                display: 'inline-block',
                marginLeft: '5px',
                marginRight: '5px',
            }}
        >
            <div id="map" style={{ width: '99%', height: '500px' }}></div>
        </div>
    );
};

export default MapComponent;