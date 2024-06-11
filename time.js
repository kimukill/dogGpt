function updateClock() {
    const now = new Date();
    let hours = null;
    if(now.getHours() > 12){
        const instHour = now.getHours() - 12;
        hours = String("오후 " + instHour).padStart(2, '0');
    }else{
        hours = String("오전 " + now.getHours()).padStart(2, '0');
    }
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    
    document.getElementById('divClock').textContent = currentTime;
}

setInterval(updateClock, 1000);
updateClock(); // 페이지 로드 후 즉시 시간 표시