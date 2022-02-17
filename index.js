/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
 function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

function createEmployeeRecords(array) {
    let employeeRecords = [];
    array.forEach(employee => {
        let newEmployee = createEmployeeRecord(employee);
        employeeRecords.push(newEmployee)
    })
    return employeeRecords;
};


function createTimeInEvent(date){
    let time = date.split(' ');
    let newobj = {
        type: 'TimeIn',
        hour: Number(time[1]),
        date: time[0]
    }
    this.timeInEvents.push(newobj)
    return this
};

function createTimeOutEvent(date){ //auto takes object, date is passed in
    let time = date.split(' ');
    let newobj = {
        type: 'TimeOut',
        hour: Number(time[1]),
        date: time[0]
    }
    this.timeOutEvents.push(newobj)
    return this
};

function hoursWorkedOnDate(time){
    let timeIn = this.timeInEvents.find(x => x.date === time).hour;
    let timeOut = this.timeOutEvents.find(x => x.date === time).hour;
    let hoursWorked = ((timeOut - timeIn) / 100);
    return hoursWorked
    // console.log(this.timeInEvents.find(x => x.date === time).hour)   
};

function wagesEarnedOnDate(time){
    let hoursWorked = hoursWorkedOnDate.call(this, time)
    let wagePaid = (hoursWorked * this.payPerHour)
    return wagePaid
};

function allWagesFor(){
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(array, name){
    let obj = array.find(x => x.firstName === name)
    return obj
}

function calculatePayroll(array){
    let payRoll = 0;
    array.forEach(x => {
        payRoll += allWagesFor.call(x)
    })
    
    return payRoll
}
const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
  ]

  const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-03 1700", "2018-01-05 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
  ]

  const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Natalia", ["2018-01-03 2300", "2018-01-05 2300", "2018-01-03 2300"]],
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
  ]
let employeeRecords = createEmployeeRecords(csvDataEmployees)
employeeRecords.forEach(function (rec) {
    let timesInRecordRow = csvTimesIn.find(function (row) {
      return rec.firstName === row[0]
    })

    let timesOutRecordRow = csvTimesOut.find(function (row) {
      return rec.firstName === row[0]
    })

    timesInRecordRow[1].forEach(function(timeInStamp){
      createTimeInEvent.call(rec, timeInStamp)
    })

    timesOutRecordRow[1].forEach(function(timeOutStamp){
      createTimeOutEvent.call(rec, timeOutStamp)
    })
  }) 
calculatePayroll(employeeRecords)