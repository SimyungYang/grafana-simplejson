var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();
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
		json: alamrJson
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





app.use(bodyParser.json());

var timeserie = require('./series');

var now = Date.now()+36000000;  // 3600000 > 1시간 // 86400000 > 1일 
console.log('now : ' + now);
//var now2 = Date.now();
//console.log('now2 : ' + now2);

for (var i = timeserie.length - 1; i >= 0; i--) {
	var series = timeserie[i];
	var decreaser = 50000 * -20;
	//if (series.target == "2XX") {
	//	console.log(series.datapoints.length, '======');
	//}
	//for (var y = series.datapoints.length-1; y >= 0; y--) {
	for (var y = series.datapoints.length-1; y >= 0; y--) {
		if (series.target == "2XX") {
			series.datapoints[y][0] = 100 - timeserie[i + 1].datapoints[y][0]
					- timeserie[i + 2].datapoints[y][0]
					- timeserie[i + 3].datapoints[y][0];
		} else if (series.target == "3XX") {
			series.datapoints[y][0] = Math.round(Math.random() * 10) + 10;
		} else if (series.target == "4XX") {
			series.datapoints[y][0] = Math.round(Math.random() * 10) + 0;
		} else if (series.target == "5XX") {
			var diff = (series.datapoints.length - y)%1000;
			if ((diff > 30 && diff < 40) || (diff > 150 && diff < 170) || (diff > 350 && diff < 360) || (diff > 390 && diff < 410) || (diff > 650 && diff < 665) || (diff > 730 && diff < 745) || (diff > 860 && diff < 890)) {
				series.datapoints[y][0] = Math.round(Math.random() * 20) + 20
			} else {
				series.datapoints[y][0] = Math.round(Math.random() * 10) + 0;
			}
		}if (series.target == "xpg_2XX") {
			series.datapoints[y][0] = 100 - timeserie[i + 1].datapoints[y][0]
					- timeserie[i + 2].datapoints[y][0]
					- timeserie[i + 3].datapoints[y][0];
		} else if (series.target == "xpg_3XX") {
			series.datapoints[y][0] = Math.round(Math.random() * 4) + 7;
		} else if (series.target == "xpg_4XX") {
			series.datapoints[y][0] = Math.round(Math.random() * 2) + 5;
		} else if (series.target == "xpg_5XX") {
			var diff = (series.datapoints.length - y)%1000;
			if ((diff > 30 && diff < 40) || (diff > 150 && diff < 170) || (diff > 350 && diff < 360) || (diff > 390 && diff < 410) || (diff > 650 && diff < 665) || (diff > 730 && diff < 745) || (diff > 860 && diff < 890)) {
				series.datapoints[y][0] = Math.round(Math.random() * 20) + 10
			} else {
				series.datapoints[y][0] = Math.round(Math.random() * 5) + 0;
			}
		}if (series.target == "scs_2XX") {
			series.datapoints[y][0] = 100 - timeserie[i + 1].datapoints[y][0]
					- timeserie[i + 2].datapoints[y][0]
					- timeserie[i + 3].datapoints[y][0];
		} else if (series.target == "scs_3XX") {
			series.datapoints[y][0] = Math.round(Math.random() * 6) + 2;
		} else if (series.target == "scs_4XX") {
			series.datapoints[y][0] = Math.round(Math.random() * 8) + 4;
		} else if (series.target == "scs_5XX") {
			var diff = (series.datapoints.length - y)%1000;
			if ((diff > 30 && diff < 40) || (diff > 900 && diff < 910)) {
				series.datapoints[y][0] = Math.round(Math.random() * 20) + 7
			} else {
				series.datapoints[y][0] = Math.round(Math.random() * 3) + 0;
			}
		}if (series.target == "metv_2XX") {
			series.datapoints[y][0] = 100 - timeserie[i + 1].datapoints[y][0]
					- timeserie[i + 2].datapoints[y][0]
					- timeserie[i + 3].datapoints[y][0];
		}else if (series.target == "metv_3XX") {
			series.datapoints[y][0] = Math.round(Math.random() * 12) + 9;
		}else if (series.target == "metv_4XX") {
			series.datapoints[y][0] = Math.round(Math.random() * 5) + 4;
		}else if (series.target == "metv_5XX") {
			var diff = (series.datapoints.length - y)%1000;
			if ((diff > 230 && diff < 240) || (diff > 450 && diff < 460) || (diff > 750 && diff < 765) || (diff > 860 && diff < 890)) {
				series.datapoints[y][0] = Math.round(Math.random() * 10) + 14
			} else {
				series.datapoints[y][0] = Math.round(Math.random() * 5) + 0;
			}
		}else if (series.target == "XPG"){
			var diff = (series.datapoints.length - y)%1000;
			if ((diff > 30 && diff < 40) || (diff > 150 && diff < 170) ||  (diff > 390 && diff < 410) || (diff > 550 && diff < 565) || (diff > 730 && diff < 745) || (diff > 860 && diff < 865)) {
				series.datapoints[y][0] = Math.round(Math.random() * 700) + 200;
			}else{
				series.datapoints[y][0] = Math.round(Math.random() * 200) + 30;
			}
		}else if (series.target == "SCS"){
			var diff = series.datapoints.length - y;
			series.datapoints[y][0] = Math.round(Math.random() * 300) + 60;
		}else if (series.target == "MeTV"){
			series.datapoints[y][0] = Math.round(Math.random() * 100) + 10;
		}else if (series.target == "AVG"){
			series.datapoints[y][0] = Math.round(Math.random() * 10) + 50;
		}else if (series.target == "upper_25"){
			if(Math.random()>0.95)
				series.datapoints[y][0] = Math.round(Math.random() * 10) + 20;
		}else if (series.target == "upper_50"){
			if(Math.random()>0.95)
				series.datapoints[y][0] = Math.round(Math.random() * 20) + 20;
		}else if (series.target == "upper_75"){
			if(Math.random()>0.95)
				series.datapoints[y][0] = Math.round(Math.random() * 30) + 32;
		}else if (series.target == "upper_90"){
			if(Math.random()>0.95)
				series.datapoints[y][0] = Math.round(Math.random() * 40) + 29;
		}else if (series.target == "upper_95"){
			if(Math.random()>0.95)
			series.datapoints[y][0] = Math.round(Math.random() * 50) + 50;
		}else if (series.target == "redis_cpu"){
			series.datapoints[y][0] = Math.round(Math.random() * 25) + 50;
		}else if (series.target == "redis_mem"){
			series.datapoints[y][0] = Math.round(Math.random() * 35) + 30;
		}else if (series.target == "redis_disk"){
			series.datapoints[y][0] = Math.round(Math.random() * 10) + 25;
		}else if (series.target == "redis_tps"){
			series.datapoints[y][0] = Math.round(Math.random() * 30) + 80;
		}else if (series.target == "redis_rsp"){
			series.datapoints[y][0] = Math.round(Math.random() * 20) + 80;
		}else if (series.target == "mq_cpu"){
			series.datapoints[y][0] = Math.round(Math.random() * 15) + 45;
		}else if (series.target == "mq_mem"){
			series.datapoints[y][0] = Math.round(Math.random() * 25) + 50;
		}else if (series.target == "mq_disk"){
			series.datapoints[y][0] = Math.round(Math.random() * 4) + 65;
		}else if (series.target == "mq_tps"){
			series.datapoints[y][0] = Math.round(Math.random() * 35) + 150;
		}else if (series.target == "mq_rsp"){
			series.datapoints[y][0] = Math.round(Math.random() * 20) + 120;
		}else if (series.target == "rdb_cpu"){
			series.datapoints[y][0] = Math.round(Math.random() * 25) + 50;
		}else if (series.target == "rdb_mem"){
			series.datapoints[y][0] = Math.round(Math.random() * 33) + 30;
		}else if (series.target == "rdb_disk"){
			series.datapoints[y][0] = Math.round(Math.random() * 6) + 39;
		}else if (series.target == "rdb_tps"){
			series.datapoints[y][0] = Math.round(Math.random() * 15) + 10;
		}else if (series.target == "rdb_rsp"){
			series.datapoints[y][0] = Math.round(Math.random() * 40) + 350;
		}else if (series.target == "xpg_gw_health"){
			if(y%500 < 260 && y%500 >250){
				series.datapoints[y][0] = 2 ;
			}else if(y%10 == Math.round(Math.random() * 10) )
				series.datapoints[y][0] = 1 ;
			else
				series.datapoints[y][0] = 0;
		}else if (series.target == "scs_gw_health"){
			if(y%500 < 170 && y%500 >165){
				series.datapoints[y][0] = 2 ;
			}else if(y%8 == Math.round(Math.random() * 8) )
				series.datapoints[y][0] = 1 ;
			else
				series.datapoints[y][0] = 0;
		}else if (series.target == "mtv_gw_health"){
			if(y%500 < 470 && y%500 >460){
				series.datapoints[y][0] = 2 ;
			}else if(y%13 == Math.round(Math.random() * 13) )
				series.datapoints[y][0] = 1 ;
			else
				series.datapoints[y][0] = 0;
		}else if(series.target.startsWith("paas_")){
			series.datapoints[y][0] = Math.round(Math.random() * 69) + 30;
		}else if (series.target == "xpg/home/m078"){
			var diff = (series.datapoints.length - y)%1000;
			if ((diff > 30 && diff < 40) || (diff > 150 && diff < 170) ||  (diff > 390 && diff < 410) || (diff > 550 && diff < 565) || (diff > 730 && diff < 745) || (diff > 860 && diff < 865)) {
				series.datapoints[y][0] = Math.round(Math.random() * 700) + 200;
			}else{
				series.datapoints[y][0] = Math.round(Math.random() * 200) + 30;
			}
		}else if (series.target == "xpg/home/m012"){
			series.datapoints[y][0] = Math.round(Math.random() * 300) + 60;
		}else if (series.target == "xpg/synop/m002"){
			series.datapoints[y][0] = Math.round(Math.random() * 200) + 70;
		}else if (series.target == "xpg/guide/m001"){
			series.datapoints[y][0] = Math.round(Math.random() * 160) + 40;
		}else if (series.target == "xpg/guide/m005"){
			series.datapoints[y][0] = Math.round(Math.random() * 100) + 30;
		}else if (series.target == "scs/purchase/auth-002"){
			var diff = (series.datapoints.length - y)%1000;
			if ((diff > 30 && diff < 40) || (diff > 900 && diff < 910)) {
				series.datapoints[y][0] = Math.round(Math.random() * 700) + 200;
			}else{
				series.datapoints[y][0] = Math.round(Math.random() * 200) + 30;
			}
		}else if (series.target == "scs/main/stbauth-001"){
			series.datapoints[y][0] = Math.round(Math.random() * 300) + 60;
		}else if (series.target == "scs/purchase/auth-008"){
			series.datapoints[y][0] = Math.round(Math.random() * 200) + 70;
		}else if (series.target == "scs/main/stbauth-005"){
			series.datapoints[y][0] = Math.round(Math.random() * 160) + 40;
		}else if (series.target == "scs/purchase/cancel-002"){
			series.datapoints[y][0] = Math.round(Math.random() * 100) + 30;
		}else if (series.target == "metv/purhist/001"){
			var diff = (series.datapoints.length - y)%1000;
			if ((diff > 230 && diff < 240) || (diff > 450 && diff < 460) || (diff > 750 && diff < 765) || (diff > 860 && diff < 890)) {
				series.datapoints[y][0] = Math.round(Math.random() * 700) + 200;
			}else{
				series.datapoints[y][0] = Math.round(Math.random() * 200) + 30;
			}
		}else if (series.target == "metv/recommand/main"){
			series.datapoints[y][0] = Math.round(Math.random() * 200) + 70;
		}else if (series.target == "metv/recommand/top10"){
			series.datapoints[y][0] = Math.round(Math.random() * 160) + 40;
		}else if (series.target == "metv/favorite/002"){
			series.datapoints[y][0] = Math.round(Math.random() * 100) + 30;
		}else if (series.target == "metv/guide/005"){
			series.datapoints[y][0] = Math.round(Math.random() * 300) + 60;
		}else if(series.target.startsWith("err_")){
			series.datapoints[y][0] = ((Math.round(Math.random() * 1000)>995)?1:0 ) ;
		}
		
		
		series.datapoints[y][1] = Math.round((now - decreaser) / 1000) * 1000;
		
		decreaser += 50000;
	}
	//console.log('timeseries ====> ', timeserie[i]);
}

var annotation = {
  name : "annotation name",
  enabled: true,
  datasource: "generic datasource",
  showLine: true,
}

var annotations = [
  { annotation: annotation, "title": "Donlad trump is kinda funny", "time": 1450754160000, text: "teeext", tags: "taaags" },
  { annotation: annotation, "title": "Wow he really won", "time": 1450754160000, text: "teeext", tags: "taaags" },
  { annotation: annotation, "title": "When is the next ", "time": 1450754160000, text: "teeext", tags: "taaags" }
];

var now = Date.now();
var decreaser = 0;
for (var i = 0;i < annotations.length; i++) {
  var anon = annotations[i];

  anon.time = (now - decreaser);
  decreaser += 1000000
}

var table =
  {
    columns: [{text: 'Time', type: 'time'}, {text: 'Country', type: 'string'}, {text: 'Number', type: 'number'}],
    values: [
      [ 1234567, 'SE', 123 ],
      [ 1234567, 'DE', 231 ],
      [ 1234567, 'US', 321 ],
    ]
  };
  
function setCORSHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "accept, content-type");  
}


var now = Date.now();
var decreaser = 0;
for (var i = 0;i < table.values.length; i++) {
  var anon = table.values[i];

  anon[0] = (now - decreaser);
  decreaser += 1000000
}

app.all('/', function(req, res) {
  setCORSHeaders(res);
  res.send('I have a quest for you!');
  res.end();
});

app.all('/search', function(req, res){
  setCORSHeaders(res);
  var result = [];
  _.each(timeserie, function(ts) {
    result.push(ts.target);
  });

  res.json(result);
  res.end();
});

app.all('/annotations', function(req, res) {
  setCORSHeaders(res);
  //console.log(req.url);
  //console.log(req.body);

  res.json(annotations);
  res.end();
})

app.all('/query', function(req, res){
  setCORSHeaders(res);
  //console.log(req.url);
  //console.log(req.body);

  var tsResult = [];
  _.each(req.body.targets, function(target) {
    if (target.type === 'table') {
      tsResult.push(table);
    } else {
      var k = _.filter(timeserie, function(t) {
        return t.target === target.target;
      });

      _.each(k, function(kk) {
        tsResult.push(kk)
      });
    }
  });

  res.json(tsResult);
  res.end();
});

app.listen(3333);

console.log("Server is listening to port 3333");

