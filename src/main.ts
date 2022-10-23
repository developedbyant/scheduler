interface Props{
    /** Run on given Date */
    runAt:{ hour:1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23,minute:number } | { hour:-1,minute:-1 }
    /** (Miliseconds) run function every given time */
    every:number
    /** Do not run on given week day (0=monday) */
    skipDays?:number[]
    /** TimeZone */
    TZ?:string
    /** Function to run */
    func:Function
}

/** Get next day Date */
function getNextDay(){
    const date = new Date()
    date.setHours(0,0,0,0)
    date.setDate(date.getDate()+1)
    return date
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
        const currentHour = currentDate.getHours()
        const currentMinute = currentDate.getMinutes()
        const waitTimeDate = new Date()
        // Set given hour and minute
        waitTimeDate.setHours( props.runAt.hour,props.runAt.minute,0,0)
        // If  given hour is lower than current hour schudule for next day
        if((props.runAt.hour<currentHour) || (props.runAt.hour===currentHour && props.runAt.minute<currentMinute)) waitTimeDate.setDate(currentDate.getDate()+1)
        // Set waitTime props.waitTime
        // Sub future time with current time to get time between
        console.log(`Function will run on:${waitTimeDate.toString()}`)
        // Wait given waitting time
        await wait(waitTimeDate.getTime() - currentDate.getTime())
    }

    /** Date that function started, it's use when skipping week days */
    let startDate = new Date()
    // Run function every given miniseconds
    while(true){
        // Skip days, this will allow to wait to run the function next day
        // At the same time it was started at
        if(props.skipDays!==undefined && props.skipDays.includes(new Date().getDay())){
            // Get for next day
            const nextDay = getNextDay()
            const reRunDate = nextDay.setHours(startDate.getHours(),startDate.getMinutes(),startDate.getSeconds(),startDate.getMilliseconds())
            // Update startDate
            startDate = new Date(reRunDate)
            console.log(`SkipDays founded:${props.skipDays.join(",")}, we will try to run on:${new Date(reRunDate).toString()}`)
            // Wait for the time between now and re run date
            await wait(reRunDate - new Date().getTime())
        }
        // Break function if props.every is negative number
        if(props.every<0) break
        // Wait for given props.every
        await wait(props.every)
        // Run function
        props.func()
    }
}