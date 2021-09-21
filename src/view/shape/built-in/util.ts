function parse(input) {
    const numberAry = input.split(' ').map(i=>parseInt(i)).filter(i=>!isNaN(i));
    const x = numberAry.filter((item, i)=>i%2===1);
    const y = numberAry.filter((item, i)=>i%2===0);
    const rect = {

        x:Math.min(...x),
        y:Math.min(...y),
        width:Math.max(...x)-Math.min(...x),
        height:Math.max(...y)-Math.min(...y)
    };
    return numberAry.map((item, index)=>{

        if(index%2===1){
            return (item-rect.x)/rect.width;
        }else {
            return (item-rect.y)/rect.height;
        }
    }).map(item=>parseFloat(item.toFixed(3)));
}
