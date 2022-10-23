import  scheduler from "./main.js"

// 1440000 = 24hours
// Run every|24hours (1440000) day at 9:30am and skip saturday and sunday
scheduler({
    runAt:{ hour:9, minute:30 },
    every:1440000,
    skipDays:[6,7],
    func:()=>{ 
        console.log("Running function")
    }
})

// Run function right alway every 5 seconds
scheduler({
    // Set { hour:-1, minute:-1 } to run right alway
    runAt:{ hour:-1, minute:-1 },
    // 5 Seconds = 5000 milliseconds
    every:5000,
    // Do not skip any day
    skipDays:[],
    func:()=>{ 
        console.log("Running function")
    }
})