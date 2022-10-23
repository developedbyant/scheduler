# Simple node.js scheduler
Node.js scheduler using while loop and await
```javascript
// Import function
import  scheduler from "@developedbyant/scheduler"

// Run every|24hours (1440000)
// At 9:30am and skip saturday and sunday
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

```