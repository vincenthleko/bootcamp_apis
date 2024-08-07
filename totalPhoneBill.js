
export function totalPhoneBill (data) {
    var splitData = data.split(',');
    var sum = 0;
    var call = 2.75;
    var sms = 0.65;
    for (let i=0; i<splitData.length; i++) {
      var data1 = splitData[i].trim();
      if (data1 === 'call') {
        sum += call;
      } else if (data1 === 'sms') {
        sum += sms;
      }
    }
    var total = 'R' + sum.toFixed(2);
    return total;
  } 
  
  export function phoneBill(callCount, smsCount) {
    const callCost = 2.75;
    const smsCost = 0.65;
    return {
        call: 'R' + (callCount * callCost).toFixed(2),
        sms: 'R' + (smsCount * smsCost).toFixed(2)
    };
}

  