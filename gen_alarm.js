var request = require('request');


var alarmList = [{
		  alrmNm: 'APIGW memory overusage',
		  alrmMsg: 'APIGW-G3 memory over 90%',
		  alrmLvlNm: 'Critical',
		  alrmStmTypNm: 'API GW',
		  dataCtrNm: 'ss',
		  stmNm: 'API GW'
		}, {
		  alrmNm: 'MS Heavy Traffic',
		  alrmMsg: 'XPG Home-03 Service Heavy Traffic',
		  alrmLvlNm: 'Critical',
		  alrmStmTypNm: 'PaaS',
		  dataCtrNm: 'SU',
		  stmNm: 'XPG'
		}, {
		  alrmNm: 'APIGW-G3 memory overusage',
		  alrmMsg: 'APIGW-G3 memory over 90%',
		  alrmLvlNm: 'Critical',
		  alrmStmTypNm: 'API GW',
		  dataCtrNm: 'ss',
		  stmNm: 'API GW'
		}]

var alarmCount = 1;
function gen_alarm() {
	console.log('gen_alarm');
	var alarmJson = alarmList[alarmCount%3];
	alarmJson.alrmId = Date.now();
	
	request.post({
		url:'http://localhost/alarm/new', 
		method: "POST",
		json: alarmJson
	}, function(err,httpResponse,body){ 
		console.log(err);
		console.log(httpResponse);
		console.log(body);
		setTimeout_alarm();
	});
}


function setTimeout_alarm() {
	var time = parseInt(Math.random() * 100000);
	console.log('waiting:::', time);
	setTimeout(gen_alarm, time);
}
setTimeout_alarm();