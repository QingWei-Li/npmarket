// From: https://www.zhihu.com/question/38869928/answer/81242646

/* eslint-disable */
function rgbToHex(r, g, b) {
    var hex = ((r<<16) | (g<<8) | b).toString(16);
    return "#" + new Array(Math.abs(hex.length-7)).join("0") + hex;
}

function hexToRgb(hex) {
    var rgb = [];
    for(var i=1; i<7; i+=2){
        rgb.push(parseInt("0x" + hex.slice(i,i+2)));
    }
    return rgb;
}

export default function gradient (startColor, endColor, step) {
//将hex转换为rgb
var sColor = hexToRgb(startColor),
    eColor = hexToRgb(endColor);

//计算R\G\B每一步的差值
var rStep = (eColor[0] - sColor[0]) / step,
    gStep = (eColor[1] - sColor[1]) / step,
    bStep = (eColor[2] - sColor[2]) / step;

var gradientColorArr = [];
for(var i=0;i<step;i++){
    //计算每一步的hex值
    gradientColorArr.push(rgbToHex(parseInt(rStep*i+sColor[0]),parseInt(gStep*i+sColor[1]),parseInt(bStep*i+sColor[2])));
}
return gradientColorArr;
}
/* eslint-enable */
