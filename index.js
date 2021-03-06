var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();
var scheduler = require('./gen_alarm');
var patterns = require('./series');

app.use(bodyParser.json());

// start와 end사이 랜덤값 생성
function randomBetween(start, end) {
	var diff = end - start;
	if (start >= end)
		return start;
	return start + parseInt(Math.random() * 100000 % diff);
}
/*
// Date.now() 단위는 ms
// 1000 = 1s
// 60000 = 1m
// 3600000 = 1h

// var timestamp = Date.now()-36000;
var interval = 30000; // 30s // 1d = 3600*24 => 2880 metric 필요
var maxtime = 100;
var metric_source = [];

function insert(array, timestamp, min, max) {
	// console.log(array, min, max);
	var arr = [];
	arr.push(randomBetween(min, max));
	arr.push(timestamp);
	array.push(arr);
	timestamp += interval;
	return timestamp;
}

for (var i = 0; i < patterns.length; i++) {
	var timestamp = Date.now() - 3600000;
	var metric = {};
	var definedPattern = patterns[i];
	metric.target = definedPattern.target;
	metric.datapoints = [];

	var frequency = definedPattern.frequency;
	var pattern = definedPattern.pattern;

	var min, max, index = 0;
	for (var k = 0; k < pattern.length; k++) {
		var x = pattern[k].x;
		min = pattern[k].min;
		max = pattern[k].max;
		for (; index <= x; index++) {
			timestamp = insert(metric.datapoints, timestamp, min, max);
		}
	}
	while (index < maxtime) {
		timestamp = insert(metric.datapoints, timestamp, min, max);
	}
	metric_source.push(metric);
}
*/
// console.log(JSON.stringify(metric_source));

var annotation = {
	name : "annotation name",
	enabled : true,
	datasource : "generic datasource",
	showLine : true,
}

var annotations = [ {
	annotation : annotation,
	"title" : "Donlad trump is kinda funny",
	"time" : 1450754160000,
	text : "teeext",
	tags : "taaags"
}, {
	annotation : annotation,
	"title" : "Wow he really won",
	"time" : 1450754160000,
	text : "teeext",
	tags : "taaags"
}, {
	annotation : annotation,
	"title" : "When is the next ",
	"time" : 1450754160000,
	text : "teeext",
	tags : "taaags"
} ];

var now = Date.now();
var decreaser = 0;
for (var i = 0; i < annotations.length; i++) {
	var anon = annotations[i];

	anon.time = (now - decreaser);
	decreaser += 1000000
}

function setCORSHeaders(res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST");
	res.setHeader("Access-Control-Allow-Headers", "accept, content-type");
}

app.all('/', function(req, res) {
	console.log('/ =====>');
	setCORSHeaders(res);
	res.send('I have a quest for you!');
	res.end();
});

app.all('/search', function(req, res) {
	console.log('search =====>');
	setCORSHeaders(res);
	var result = [];
	_.each(patterns, function(key) {
		result.push(key);
	});

	res.json(result);
	res.end();
});

app.all('/annotations', function(req, res) {
	console.log('annotations =====>');
	setCORSHeaders(res);
	// console.log(req.url);
	// console.log(req.body);

	res.json(annotations);
	res.end();
})

app.all('/query', function(req, res) {
	//console.log('1query =====>', req.body.range);
	//for(var key in req) {
	//	console.log('key====>', key);
	//	if(key == 'range') break;
	//}
		
	setCORSHeaders(res);
	// console.log(req.url);
	// console.log(req.body);

	var tsResult = [];
	var loopcount = 100, 
		starttime = Date.now(), 
		endtime = starttime+300000, 
		interval=10000;
	if(req.body.range) {
		starttime = (new Date(req.body.range.from)).getTime();
		endtime = (new Date(req.body.range.to)).getTime();
		interval = req.body.intervalMs;
		loopcount = parseInt((endtime - starttime) / interval);
		
	}
	
	// console.log(req.body);
	_.each(req.body.targets, function(target) {
		var result = {};
		result.target = target.target;
		result.datapoints = [];
		if(patterns[target.target]) {
			var pattern = patterns[target.target].pattern;
			curInterval = 0;
			
			// generate data by pattern
			var patternQ = [];
			for (var k = 0; k < pattern.length; k++) {
				for(var z=0; z<pattern[k].duration; z++) {
					patternQ.push(randomBetween(pattern[k].min, pattern[k].max));
				}
			}
			
			var frequency = patterns[target.target].frequency;
			var tcount = loopcount / frequency;
			var tinterval = interval * frequency;
			
			//console.log('loopcount ==============>',loopcount);
			var index = starttime % patternQ.length;
			console.log('================',starttime, index);
			for (var i = 0; i < tcount; i++) {
				var arr = [];
				arr.push(patternQ[index++]);
				arr.push(starttime+curInterval);
				curInterval += tinterval;
				result.datapoints.push(arr);
				if(index>=patternQ.length-1) {
					index = 0;
				}
			}
			tsResult.push(result);
			
		}
		
	});
	//console.log('result ====>',tsResult);
	res.json(tsResult);
	res.end();
});

app.listen(3333);

console.log("Server is listening to port 3333");
