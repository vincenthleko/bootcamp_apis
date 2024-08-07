import express from "express";
import cors from 'cors';
import { longestWord, shortestWord, wordLengths } from "./wordCrush.js";
import { totalPhoneBill, phoneBill } from "./totalPhoneBill.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

//wordCrush section
app.get("/api/word_game", function (httpRequest, httpResponse) {
  const sentence = httpRequest.query.sentence;

  httpResponse.json({
    longestWord: longestWord(sentence),
    shortestWord: shortestWord(sentence),
    sum: wordLengths(sentence),
  });
});

// totalPhoneBill section
app.post("/api/phonebill/total", function (httpRequest, httpResponse) {
    const { bill } = httpRequest.body;
    const total = totalPhoneBill(bill);
     

    httpResponse.json ({
       total
  });
});


app.get('/api/phonebill/prices', function(httpRequest, httpResponse) {
    const {call, sms } = httpRequest.query;
    const callCount = parseFloat(call);
    const smsCount = parseFloat(sms);

    const costs = phoneBill(callCount, smsCount);
     

    httpResponse.json ({
        call: costs.call,
        sms: costs.sms
    });

});

// calculate total phoneBill section
app.get("/api/phonebill/prices", function (httpRequest, httpResponse) {
  const { call, sms } = httpRequest.query;

  httpResponse.json({
    call: totalPhoneBill(call),
    sms: totalPhoneBill(sms),
  });
});

// set price section
app.post("/api/phonebill/price", function (httpRequest, httpResponse) {
  const { type, price } = httpRequest.body;
  
  if ((type === 'sms' || type === 'call') && typeof price === 'number') {
    httpResponse.status(200).json({
        status: 'success',
        message: `The ${type} was set to ${price}`
    });
} else {
  httpResponse.status(400).json({
        status: 'error',
        message: 'Invalid request'
    });
}
});

// calculate usage section
app.post('/api/enough', (req, res) => {
  const { usage, available } = req.body;
  const totalCost = totalPhoneBill(usage);
  const remainingBalance = available - totalCost;

  res.json({ result: remainingBalance.toFixed(2) });
});



app.listen(3000, function () {
  console.log("Example add listening on port 3000");
});
