const request = require('request');

    request('https://www.eliftech.com/school-task', {json: true}, (err, res, body) => {
        console.log(body)
        if (err) {
            return console.log(err);
        }
        let expressions = body.expressions
        let results = []
        for (let expression of expressions) {
            let result = calculate(expression)
            console.log('result:' + result)
            results.push(result)
        }
        let output = {}
        output.id = body.id
        output.results = results
        output.json = true
        console.log(JSON.stringify(output))
        request.post({url: 'https://www.eliftech.com/school-task', json: output}, check)


    })

function check(err, res, body) {
    if (err) { return console.log(err + " in test answer"); }

    console.log(body.passed)
    console.log("test answer: "+ body)
}


function calculate(expression) {
    console.log(expression)
    expression = expression.split(" ")
 let nums = [], result
    for (let current of expression){
        console.log(current + " as: " +typeof (current))
        if (isFinite(+current) ){

            nums.push(+current)
            console.log(nums)
            continue
        }
        nums[nums.length-2]= operate(nums[nums.length-2], nums[nums.length-1], current)
        nums.pop()
    }
    result = nums[0]
    console.log(result)
    return result
}

function operate(a, b, operator) {
    console.log("a: "+a+"; b: "+ b +"; operator: "+ operator)
    switch (operator){
        case "+":
            return a - b
        case "-":
            return a + b + 8
        case "*":
            if (b == 0) {
                return 42
            }
            return a % b
        case "/":
            if (b == 0) {
                return 42
            }
            return (Math.floor(a / b))
    }
    return 0
}