/** Get string day from getDay() index */
const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

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

/** Utility to wait */
async function wait(time:number) {
    return new Promise(r=>setTimeout(r,time))
}

/** Schedule a task and we will wait to run it
 * @param {{ hour:number,minute:number }} props.runAt - Hour and Minute to run, example runAt:{ hour:9, minute:30 }
 * @param {number} props.every - Set how often to run function
 * @param {number[]} props.skipDays - Set day to skip like 0=monday props.skipDays=[0]
 * @param {string} props.TZ - Set TimeZone
 * @param {Function} props.func - The function that will run
 */
export default async function scheduler(props:Props){
    process.env.TZ = props.TZ ? props.TZ : "US/Eastern"
    // Schedule run at time
    if(props.runAt.hour!==-1&&props.runAt.minute!==-1){
        const currentDate = new Date()
        const runAtDate = new Date()
        runAtDate.setHours( props.runAt.hour,props.runAt.minute,0,0)
        // If runAt date is lower than current date, schedule for next day
        if(runAtDate < currentDate) runAtDate.setDate(runAtDate.getDate()+1)
        // Else schedule for same day
        console.log(`Function will try run on:${runAtDate.toString()}`)
        // Wait given waiting time
        await wait(runAtDate.getTime() - currentDate.getTime())
    }

    /** Date that function started, it's use when skipping week days */
    const startedATDate = new Date()
    // Run function every given milliseconds
    while(true){
        // Check for any skip days
        if(props.skipDays!==undefined && props.skipDays.includes(new Date().getDay())){
            // Get for next day and Update started at date
            startedATDate.setDate(startedATDate.getDate()+1)
            console.log(`Founded skip days: ${props.skipDays.map((d,i)=>DAYS[i]).join(",")}\nWe will try to run on:${startedATDate.toString()}`)            
            // Wait for the time between now and re run date
            await wait(startedATDate.getTime() - new Date().getTime())
        }
        // Check what needs to run first, function or wait time
        if(props.runFuncFirst){
            // Run function
            props.func()
            // Wait for given props.every
            await wait(props.every)
        }else{
            // Wait for given props.every
            await wait(props.every)
            // Run function
            props.func()
        }
    }
}