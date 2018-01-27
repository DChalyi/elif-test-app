const request = require('request');

    request('https://www.eliftech.com/school-task', {json: true}, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log(body)
        let expressions = body.expressions
        let results = []
        for (let expression of expressions) {
            let result = calculate(expression)
            results.push(result)
        }
        let output = {}
        output.id = body.id
        output.results = results
        console.log(JSON.stringify(output))
        output.json = true
        request.post({url: 'https://www.eliftech.com/school-task', json: output}, check)


    })

function check(err, res, body) {
    if (err) { return console.log(err + " in test answer"); }
    console.log(body.passed)
}


function calculate(expression) {
    expression = expression.split(" ")
 let nums = [], result
    for (let current of expression){
        if (isFinite(+current) ){
            nums.push(+current)
            continue
        }
        nums[nums.length-2]= operate(nums[nums.length-2], nums[nums.length-1], current)
        nums.pop()
    }
    result = nums[0]
    return result
}

function operate(a, b, operator) {
    switch (operator){
        case "+":
            return a - b
        case "-":
            return a + b + 8
        case "*":
            if (b == 0) {
                return 42
            }
            return ((a % b)+b)%b
        case "/":
            if (b == 0) {
                return 42
            }
            return (Math.floor(a / b))
    }
    return 0
}