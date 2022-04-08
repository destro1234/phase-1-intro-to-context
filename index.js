// Your code here
function createEmployeeRecord (array) {
    let newEmployee = { 
        
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return newEmployee
}

function createEmployeeRecords(arrays) {
    let records = []
    arrays.forEach( array => {
        let newRecord = createEmployeeRecord(array)
        records.push(newRecord)
    });
    return records
}

function createTimeInEvent(employee, date) {
    let [day, time] = date.split(" ")
    
    let obj = {
        type: "TimeIn",
        hour: parseInt(time), 
        date: day
    }
    employee.timeInEvents.push(obj)
    return employee
    
}

function createTimeOutEvent(employee, date) {
    let [day, time] = date.split(' ')
    let obj = {
        type: "TimeOut",
        hour: parseInt(time),
        date: day

    }
    employee.timeOutEvents.push(obj)
    return employee
}

function hoursWorkedOnDate(employee, date) {

    let timeIn =  employee.timeInEvents.find(element => element.date == date)
    let timeOut = employee.timeOutEvents.find(element => element.date == date)
    return timeOut.hour/100 - timeIn.hour/100
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
    const finalArray = []
    employee.timeInEvents.forEach((event1)=> 
        employee.timeOutEvents.forEach((event2)=>
            {if (event1.date == event2.date) {
                    let wages = wagesEarnedOnDate(employee, event1.date) 
                    finalArray.push(wages)                            
                }}))
    
    return finalArray.reduce((previousValue, currentValue) => previousValue + currentValue)
    
}

function calculatePayroll(records) {
    const payRoll = []
    records.forEach(function (record) {
        let wages = allWagesFor(record)
        payRoll.push(wages)
    })
    return payRoll.reduce((previousValue, currentValue) => previousValue + currentValue)
}