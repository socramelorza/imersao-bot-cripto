//BTCBUSD
//36291
//35764

function calcRSI(closes) {
    let gains = 0;
    let losses = 0;

    for (let i = closes.length - 14; i < closes.length; i++) {
        const diff = closes[i] - closes[i - 1];
        if (diff >= 0)
            gains += diff;
        else
            losses -= diff;
    }

    const strength = gains / losses;
    return 100 - (100 / (1 + strength));
}

let bought = false;

async function process() {
    const axios = require("axios");
    const response = await axios.get("https://api.binance.com/api/v3/klines?symbol=BTCBUSD&interval=1m");

    const closes = response.data.map(candle => parseFloat(candle[4]));
    const rsi = calcRSI(closes);
    console.log(rsi);

    if (rsi > 70 && bought){
        console.log("Sobrecomprado!");
        bought = false;
    }
    else if (rsi < 30 && !bought){
        console.log("Sobrevendido!");
        bought = true;
    }
}

setInterval(process, 60000);

process();