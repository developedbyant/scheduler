# Simple node.js scheduler
Node.js scheduler using while loop and await
### Scheduler takes a prop
```typescript
interface Props{
    /** Run at given hour and minute */
    runAt:{ hour:0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23,minute:number } | { hour:-1,minute:-1 }
    /** (Milliseconds) run function every given time */
    every:number
    /** Do not run on given week days (1=monday) */
    skipDays?:number[]
    /** Tell function to run passed func first or after wait(every) time */
    runFuncFirst?:boolean
    /** Function to run */
    func:Function
    /** TimeZone */
    TZ?:string
}
```
### Import module
```typeScript
import scheduler from "@developedbyant/scheduler"
```
### Examples of how to use
```typeScript
// Import function
import scheduler from "@developedbyant/scheduler"

// Run every|24hours (1440000)
// At 9:30am and skip saturday and sunday
scheduler({
    runAt:{ hour:9, minute:30 },
    every:1440000,
    skipDays:[6,7],
    func:()=> { 
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

// Run function right alway every 5 seconds
// Set runFuncFirst to run function and wait for prop.every after
scheduler({
    // Set { hour:-1, minute:-1 } to run right alway
    runAt:{ hour:-1, minute:-1 },
    // Set runFuncFirst to run function and wait for prop.every after
    runFuncFirst:true,
    // 5 Seconds = 5000 milliseconds
    every:5000,
    // Do not skip any day
    skipDays:[],
    func:()=>{ 
        console.log("Running function")
    }
})
```