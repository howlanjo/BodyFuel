class DataEntriesPerDay {
    constructor(date){
        this.date = date
        this.bench = []
        this.squat = []
        this.deadLift = []
        this.run = []
        this.water = 0.0
        this.sleep = 0.0
        this.food = 0
    }

    insertEntry(bench, squat, deadLift, run, water, sleep, food){
        console.log("bench, squat, deadLift, run, water, sleep, food ", bench, squat, deadLift, run, water, sleep, food)
        
        this.bench.push(bench)
        this.squat.push(squat)
        this.deadLift.push(deadLift)
        this.run.push(run)
        this.water += parseFloat(water)
        this.sleep += parseFloat(sleep)
        this.food = food
    }
}

export class WorkoutDataBase {
    constructor(){
        this.dataByDate = [] //@TODO This should be sorted
    }

    clearData(){
        this.clearData = []
    }

    insertData(newData, date){
        console.log("newData: ", newData)
        const keys = Object.keys(newData)
        const temp = new DataEntriesPerDay(date)

        for (const item of keys){
            console.log("item: ", item)
            temp.insertEntry(newData[item].bench, 
                newData[item].squat,
                newData[item].deadLift,
                newData[item].run, 
                newData[item].water,
                newData[item].sleep,
                newData[item].food)
        }
        this.dataByDate.push(temp)
    }

    getBenchData(){
        const BenchArr = []
        for (const item of this.dataByDate){
            BenchArr.push(Math.max(...item.bench))
        }
        
        return BenchArr
    }

    getSquatData(){
        const SquatArr = []
        for (const item of this.dataByDate){
            SquatArr.push(Math.max(...item.squat))
        }

        return SquatArr
    }

    getDeadLiftData(){
        const deadLiftArr = []
        for (const item of this.dataByDate){
            deadLiftArr.push(Math.max(...item.deadLift))
            //deadLiftArr.push(item.deadLift)
        }

        return deadLiftArr
    }

    getRunData(){
        const runArr = []
        for (const item of this.dataByDate){
            runArr.push(Math.max(...item.run))
        }

        return runArr
    }

    getWaterData(){
        let waterArr = []
        
        for (const item of this.dataByDate){
            console.log("Water: ", item.water)
            waterArr.push(item.water)
        }

        return waterArr
    }

    getSleepData(){
        let sleepArr = []
        for (const item of this.dataByDate){
            sleepArr.push(item.sleep)
        }

        return sleepArr
    }

    getFoodData(){
        let foodArr = []
        for (const item of this.dataByDate){
            foodArr.push(item.food)
        }

        return foodArr
    }
}