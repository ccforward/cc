# Simple Date Calculator: DateCalc

A simple date calculator from my personal project [Zhihu-Spider](https://github.com/ccforward/zhihu)


## NPM

[DateCalc](https://www.npmjs.com/package/date-calc)

## update

@v1.0.1

* update: method `now()` can receive a parameter like `now(20161001)`

``` js
  const DateCalc = require('date-calc')
  let d = new DateCalc();
  console.log(d.now()) // returns now date
  d.now('20161002')  // changs DateCalc's inner data
  console.log(d.now()) // returns 20161002
  console.log(d.before()) // returns 20161001
  console.log(d.after(10)) // returns 20161012
```

* add: method `weekDay()`
  
returns an Object of weekdays info

``` js
  const DateCalc = require('date-calc')
  let d = new DateCalc('20161001');
  d.weekDay() // returns { day: 6, en: 'Sat', cn: '六' }
```

## Usage

``` js
const DateCalc = require('date-calc')
// or ES2015
// import DateCalc from 'date-calc'

let d = new DateCalc('20460818');
d.before();
d.after();
d.before(2);
d.after(2);
d.now();
d.month();
d.beforeMonth()
d.afterMonth()

```

## Parameters

* `new DateCalc()` no parameters means today
* `new DateCalc('20460818')`  reference date

## Instance Method

* `d.before()` the day before reference date 20460817
* `d.after()` the day after reference date 20460819
* `d.before(2)` twos days before reference date 忽略初始天数 20460816
* `d.after(2)` twos days after reference date 20460820
* `d.now()` now date 20460818
* `d.month()` the month of reference date 204608
* `d.beforeMonth()` the month before reference date 204607
* `d.afterMonth()` the month after reference date 204609
* month English descripe
  * `new DateCalc('20460118').monthEN()` returns 'Jan'
  * `new DateCalc('20460218').monthEN()` returns 'Feb'
  * `new DateCalc('20460318').monthEN()` returns 'Mar'
  * `new DateCalc('20460418').monthEN()` returns 'Apr'
  * `new DateCalc('20460518').monthEN()` returns 'May'
  * `new DateCalc('20460618').monthEN()` returns 'Jun'
  * `new DateCalc('20460718').monthEN()` returns 'Jul'
  * `new DateCalc('20460818').monthEN()` returns 'Aug'
  * `new DateCalc('20460918').monthEN()` returns 'Sep'
  * `new DateCalc('20461018').monthEN()` returns 'Oct'
  * `new DateCalc('20461118').monthEN()` returns 'Nov'
  * `new DateCalc('20461218').monthEN()` returns 'Dec'
* month Chinese descripe  
  `new DateCalc('20460118').CHN()` returns '2046年01月18日'
