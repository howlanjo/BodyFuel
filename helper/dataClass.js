class DataEntriesPerDay {
    constructor(date){
        this.date = date
        this.dataArr = []
        this.max = 0.0
    }

    insertEntry(newEntry){
        this.dataArr.push(newEntry)
        this.$calculateMax()
    }

    $calculateMax(){
        this.max = this.dataArr[0]

        for (const num of this.dataArr){
            if (num > this.max){
                this.max = num
            }
        }
    }
    
}

export class WorkoutDataBase {
    constructor(){
        this.weight = []
        this.food = []
        this.sleep = []
        this.water = []
    }

    insertData(newData, date){
        console.log("newData: ", newData)
        we = new DataEntriesPerDay(date)
        f = new DataEntriesPerDay(date)
        s = new DataEntriesPerDay(date)
        wa = new DataEntriesPerDay(date)
        const keys = Object.keys(newData)

        for (const item of keys){
            we.insertEntry(newData[item].weight)
            f.insertEntry(newData[item].food)
            s.insertEntry(newData[item].sleep)
            wa.insertEntry(newData[item].water)
        }
        this.weight.push(we)
        this.food.push(f)
        this.sleep.push(s)
        this.water.push(wa)
    }

    getWeightData(){
        let weightArr = []
        for (const item of this.weight){
            weightArr.push(item.max)
        }

        return weightArr
    }

    getWaterData(){
        let waterArr = []
        for (const item of this.water){
            waterArr.push(item.max)
        }

        return waterArr
    }

    getSleepData(){
        let sleepArr = []
        for (const item of this.sleep){
            sleepArr.push(item.max)
        }

        return sleepArr
    }

    getFoodData(){
        let foodArr = []
        for (const item of this.food){
            foodArr.push(item.max)
        }

        return foodArr
    }
}