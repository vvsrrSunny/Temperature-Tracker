'use strict'
const prompt = require('prompt-sync')({
    sigint: true
})
/* 
Class to track temperatures and find maximum, minimum and average temperature we have found through the inputs
space complexity of the class is O(n) where n is the lenght of the user input array and constant for a single value input or single value array  
*/
class TempTracker {
    // maximum temperature recorded is maintaing in this variable
    #maxTemp
    // minimum temperature recorded is maintaing in this variable
    #minTemp
    // average temperature recorded is maintaing in this variable
    #avgTemp
    // size of inputs received so far 
    #size = 0
    constructor(data) {

        this.newTempetature = data
    }

    // An attempt to add a temperature value or values is this function
    //  time complexity is O(n)for numbers array and time complexity is O(k*n) for string array where k is number of chars on average in a string and n is length of  array
    // space compllexity is O(n) where n is tyhe lenght of the input array and O(1) for a single value or array with single value
    set newTempetature(usersNewTemperature) {
        try {
            if (Array.isArray(usersNewTemperature)) {
                // space complexity is O(n)
                return this.newTemperatureArray(usersNewTemperature) // time complexity is O(k*n) where k is number of chars in a string and n is length of string array and time complexity is O(n)for numbers array
            }
            // if input is not array and we want to find whether its a valid temperature and if not then exception will be thrown
            usersNewTemperature = this.validateUsersTemperature(usersNewTemperature) // time complexity is O(k) where k is number of chars in string and time complexity is O(1) for numbers and objects
            // user input is valid and checking whether is max or min temperatures
            this.checkForMaxandMinTemperatures(usersNewTemperature) // time and space complexities are constant 
            // calculating average temperature
            this.calculateAverageTemperature(usersNewTemperature, 1) // time and space complexities are constant 
        } catch (e) {
            console.error(e)
        }
    }

    
    // checks whether the string is having valid value else appropriate exception is thrown
    // time complexity is O(k) where k is number of chars in string and time complexity is O(1) for numbers and objects
    // space complexity is O(5) or constant
    validateUsersTemperature(usersNewTemperature) {
        if (typeof(usersNewTemperature) === 'string') {
            let tempScaleFlag = 'celsius'
            let patternForCelsius = /c$|celsius$|degrees?$|degrees? c$|degrees? celsius$/i
            let patternForFahrenheit = /f$|fahrenheit$|degrees? f$|degrees? fahrenheit$/i
            let patternForKelvin = /k$|kelvin$|degrees? k$|degrees? kelvin$/i
            usersNewTemperature = usersNewTemperature.trim()

            // checking if the celsius or Fahrenheit or kelvin and removing them in the string and turning on appropriate flag
            if (patternForCelsius.test(usersNewTemperature))
                usersNewTemperature = usersNewTemperature.replace(patternForCelsius, '') // time complexity is O(k), where k is number of chars in input string

            else if (patternForFahrenheit.test(usersNewTemperature)) {
                usersNewTemperature = usersNewTemperature.replace(patternForFahrenheit, '') // time complexity is O(k), where k is number of chars in input string
                tempScaleFlag = 'fahrenheit'
            } else if (patternForKelvin.test(usersNewTemperature)) {
                usersNewTemperature = usersNewTemperature.replace(patternForKelvin, '') // time complexity is O(k), where k is number of chars in input string
                tempScaleFlag = 'kelvin'
            }

            usersNewTemperature = usersNewTemperature.trim() //time complexity is O(k), where k is number of chars in input string

            // throw empty exception if empty 
            if (usersNewTemperature == '')
                throw ' Expected tempetature but received "", make sure that you are not providing empty data'

            // check of having valid integer or float value else throwing exception 
            if (/^[-+]?\d*(\.\d+)?$/.test(usersNewTemperature)) // time complexity is O(k), where k is number of chars in input string
                usersNewTemperature = Number(usersNewTemperature)
            else
                throw '"' + usersNewTemperature + '"' + ' could not resolve to a value of tempetature'

            // returning the value adjusted to celsius if flag of other temperature scales are on 
            if (tempScaleFlag === 'celsius')
                return usersNewTemperature
            else if (tempScaleFlag === 'fahrenheit')
                return (5 / 9) * (usersNewTemperature - 32)
            else if (tempScaleFlag === 'kelvin')
                return usersNewTemperature - 273.15


            // if object throw object exception 
        } else if (typeof(usersNewTemperature) === 'object')
            throw ' There is object in the input, ' + usersNewTemperature + ' The provided input has an object please provide array or specific string or specific string array or teperature value in fahrenheit'
        return usersNewTemperature

    }

    // checking input to current max and min temperatures
    // time complexity is O(6) or constant
    // space complexity is constant 
    checkForMaxandMinTemperatures(usersNewTemperature) {

        if (typeof(usersNewTemperature) === 'number') {
            this.#maxTemp = (this.#maxTemp >= usersNewTemperature && this.#maxTemp != undefined) ? this.#maxTemp : usersNewTemperature
            this.#minTemp = (this.#minTemp <= usersNewTemperature && this.#minTemp != undefined) ? this.#minTemp : usersNewTemperature
        }
    }

    // calculating the average of the temperatures
    // time complexity is O(8) or constant 
    // space complexity is constant
    calculateAverageTemperature(newTempetatureSum, newSize) {
        if (typeof(newTempetatureSum) === 'number') {

            this.#avgTemp = (this.#size * (this.#avgTemp === undefined ? 0 : this.#avgTemp) + newTempetatureSum) / (this.#size + newSize)
            this.#size += newSize
        }


    }

    // if the input is array of temperature values
    // time complexity is O(k*n) where k is number of chars in a string and n is length of string array and time complexity is O(n)for numbers array
    // space complexity of this function is O(n) where n is the lenght of the input array 
    newTemperatureArray(usersNewTemperatureArray) {
        // size of local input array
        let newSize = 0
        // max and min temp of the local input array
        let max, min = undefined

        // to make the sum of the values in array and calculate max, min in array and check the validity 
        // time complexity is O(k) where k is number of chars in string and time complexity is O(1)for numbers
        const reducer = (accumulator, usersNewTemperature) => {

            //checking whether value is valid or not else an exception is thrown in "validateUsersTemperature" function thus ending the execution
            usersNewTemperature = this.validateUsersTemperature(usersNewTemperature) // time complexity is O(k) where k is number of chars in string and time complexity is O(1)for numbers

            // local max, min and size of the array is calculated
            if (typeof(usersNewTemperature) === 'number') { // time complexity is O(2) or constant 
                max = (max >= usersNewTemperature && max != undefined) ? max : usersNewTemperature // time complexity is  constant 
                min = (min <= usersNewTemperature && min != undefined) ? min : usersNewTemperature // time complexity is constant 
                newSize++
                return accumulator + usersNewTemperature
            } else
                return accumulator + 0
        }
        // passing each value in the to reducer prototype function to get sum of values and max and min in array only if all values are valid
        const newTempetatureArraySum = usersNewTemperatureArray.reduce(reducer, 0) // time complexity is O(k*n) where k is number of chars in string and n is lenght of array and time complexity is O(n)for numbers array

        // execution reaching here means all the values in the array were valid and max and min of the array can be checked to 
        //global max and min temp and global average can be calculated.
        this.checkForMaxandMinTemperatures(max) //time and space complexities are constant
        this.checkForMaxandMinTemperatures(min) //time and space complexities are constant
        this.calculateAverageTemperature(newTempetatureArraySum, newSize) //time and space complexities are constant

    }

    // time and space complexities are O(1)
    get maxTemperature() {
        return this.#maxTemp
    }

    // time and space complexities are O(1)
    get minTemperature() {
        return this.#minTemp
    }

    // time and space complexities are O(1)
    get avgTemperature() {
        return this.#avgTemp
    }

    // time and space complexities are O(1)
    get size() {
        return this.#size
    }
}
let t = new TempTracker()

while (true) {

    // providing options to the users 
    console.log('Enter "1" to provide temperature inputs')
    console.log('Enter "2" to get maximum temperature recorded')
    console.log('Enter "3" to get minumum temperature recorded')
    console.log('Enter "4" to get calculate average temperature')
    console.log('Enter "Ctrl+c" to exit the application\n')
    // Get user input
    let input = prompt('Enter a number from 1 to 4: ')
    // Convert the string input to a number
    if (/^[-+]?(\d+|Infinity)$/.test(input)) {
        input = Number(input)
        switch (input) {
            case 1: {
                console.log('Enter single temperature value or list of temperature inputs with comma seperated')
                console.log('By default temperature value is considered as celsius')
                console.log('However, you can enter fahrenheit values by entering "10 f" or "10 degrees fahrenheit" or "10 fahrenheit"')
                console.log('Similarly, you can enter kelvin values by entering "10 k" or "10 degrees kelvin" or "10 kelvin"')
                // input form user
                let input = prompt('Enter temperature or tempetatures by comma seperated : ')

                let size = t.size
                // convert input string t array and send as input to temp tracker class object
                // An attempt to add a temperature value or values is this function
                //  time complexity is O(n)for numbers array and time complexity is O(k*n) for string array where k is number of chars on average in a string and n is length of  array
                // space compllexity is O(n) where n is tyhe lenght of the input array and O(1) for a single value or array with single value
                t.newTempetature = input.split(',')
                if (size == t.size)
                    console.log(input + '\nUnfortunaly, your previous temperature data was unsuccessful for temperature tracker\n')
                else
                    console.log(input + '\nTemperature data entry successful!\n')
                break
            }
            case 2: {
                // time and space complexities are O(1) or constant 
                console.log((t.maxTemperature != undefined)?' maximum temperature recorded so far ' + t.maxTemperature + '\n' : 'no temperatures are recorded yet\n')
                break
            }
            case 3: {
                // time and space complexities are O(1) or consatant
                console.log((t.minTemperature!= undefined)?' minimum temperature recorded so far ' + t.minTemperature + '\n':'no temperatures are recorded yet\n')
                break
            }
            case 4: {
                // time and space complexities are O(1) or constant 
                console.log((t.avgTemperature!= undefined)?' average temperature calculated  ' + t.avgTemperature + '\n':'no temperatures are recorded yet\n')
                break
            }
            default: {
                console.log(input + ', is your input and it does not contain in between 1 and 4 as per the prompt\n\n')
                continue
            }

        }


    } else {
        console.log(input + ' data is not valid, please provide data as per the prompt\n\n')
        continue
    }

}



// the below are the test cases of the tracker class
/*
let t2 = new TempTracker(100)

console.log(' maxTemperature ' + t2.maxTemperature)
console.log(t2.maxTemperature === 100)
console.assert(t2.maxTemperature === 100,'t2.maxTemperature === 100')
console.log(' minTemperature ' + t2.minTemperature)
console.log(t2.minTemperature === 100)
console.assert(t2.minTemperature === 100, 't2.minTemperature === 100')
console.log(' avgTemperature ' + t2.avgTemperature)
console.log(t2.avgTemperature === 100)
console.assert(t2.avgTemperature === 100,'t2.avgTemperature === 100')

t2.newTempetature = undefined
console.log(' maxTemperature ' + t2.maxTemperature)
console.log(t2.maxTemperature === 100)
console.assert(t2.maxTemperature === 100,'t2.maxTemperature === 100')
console.log(' minTemperature ' + t2.minTemperature)
console.log(t2.minTemperature === 100)
console.assert(t2.minTemperature === 100,'t2.minTemperature === 100')
console.log(' avgTemperature ' + t2.avgTemperature)
console.log(t2.avgTemperature === 100)
console.assert(t2.avgTemperature === 100,'t2.avgTemperature === 100')

t2.newTempetature = 40
console.log(' maxTemperature ' + t2.maxTemperature)
console.log(t2.maxTemperature === 100)
console.assert(t2.maxTemperature === 100,'t2.maxTemperature === 100')
console.log(' minTemperature ' + t2.minTemperature)
console.log(t2.minTemperature === 40)
console.assert(t2.minTemperature === 40,'t2.minTemperature === 40')
console.log(' avgTemperature ' + t2.avgTemperature)
console.log(t2.avgTemperature === 70)
console.assert(t2.avgTemperature === 70,'t2.avgTemperature === 70')

t2.newTempetature = 2400
console.log(' maxTemperature ' + t2.maxTemperature)
console.log(t2.maxTemperature === 2400)
console.assert(t2.maxTemperature === 2400,'t2.maxTemperature === 2400')
console.log(' minTemperature ' + t2.minTemperature)
console.log(t2.minTemperature === 40)
console.assert(t2.minTemperature === 40,'t2.minTemperature === 40')
console.log(' avgTemperature ' + t2.avgTemperature)
console.log(t2.avgTemperature === 846.6666666666666)
console.assert(t2.avgTemperature === 846.6666666666666,'t2.avgTemperature === 846.6666666666666')

console.log(' size ' + t2.size)
console.log(t2.size === 3)
console.assert(t2.size === 3,'t2.size === 3')




let t = new TempTracker([undefined, 1, 2, 3, 4])

console.log(' maxTemperature ' + t.maxTemperature)
console.log(t.maxTemperature === 4)
console.assert(t.maxTemperature === 4, t.maxTemperature + 't.maxTemperature === 4')
console.log(' minTemperature ' + t.minTemperature)
console.log(t.minTemperature === 1)
console.assert(t.minTemperature === 1, 't.minTemperature === 1')
console.log(' avgTemperature ' + t.avgTemperature)
console.log(t.avgTemperature === 2.5)
console.assert(t.avgTemperature === 2.5, 't.avgTemperature === 2.5')

t.newTempetature = undefined
console.log(' maxTemperature ' + t.maxTemperature)
console.log(t.maxTemperature === 4)
console.assert(t.maxTemperature === 4, t.maxTemperature + 't.maxTemperature === 4')
console.log(' minTemperature ' + t.minTemperature)
console.log(t.minTemperature === 1)
console.assert(t.minTemperature === 1, 't.minTemperature === 1')
console.log(' avgTemperature ' + t.avgTemperature)
console.log(t.avgTemperature === 2.5)
console.assert(t.avgTemperature === 2.5, 't.avgTemperature === 2.5')

console.log(' size ' + t.size)
console.log(t.size === 4)
console.assert(t.size === 4, "t.size === 4")

t.newTempetature = 10
console.log(' maxTemperature ' + t.maxTemperature)
console.log(t.maxTemperature === 10)
console.assert(t.maxTemperature === 10, 't.maxTemperature === 10')
console.log(' minTemperature ' + t.minTemperature)
console.log(t.minTemperature === 1)
console.assert(t.minTemperature === 1, 't.minTemperature === 1')
console.log(' avgTemperature ' + t.avgTemperature)
console.log(t.avgTemperature === 4)
console.assert(t.avgTemperature === 4, 't.avgTemperature === 4')

console.log(' size ' + t.size)
console.log(t.size === 5)
console.assert(t.size === 5, 't.size === 5')

t.newTempetature = -10
console.log(' maxTemperature ' + t.maxTemperature)
console.log(t.maxTemperature === 10)
console.assert(t.maxTemperature === 10, 't.maxTemperature === 10')
console.log(' minTemperature ' + t.minTemperature)
console.log(t.minTemperature === -10)
console.assert(t.minTemperature === -10, 't.minTemperature === -10')
console.log(' avgTemperature ' + t.avgTemperature)
console.log(t.avgTemperature == 1.6666666666666667)
console.assert(t.avgTemperature == 1.6666666666666667, 't.avgTemperature == 1.6666666666666667')

console.log(' size ' + t.size)
console.log(t.size === 6)
console.assert(t.size === 6, 't.size === 6')

t.newTempetature = [undefined, 9, 5, 4, undefined, 3, -20, 100, undefined]
console.log(' maxTemperature ' + t.maxTemperature)
console.log(t.maxTemperature === 100)
console.assert(t.maxTemperature === 100, 't.maxTemperature === 100')
console.log(' minTemperature ' + t.minTemperature)
console.log(t.minTemperature === -20)
console.assert(t.minTemperature === -20, 't.minTemperature === -20')
console.log(' avgTemperature ' + t.avgTemperature)
console.log(t.avgTemperature == 9.25)
console.assert(t.avgTemperature == 9.25, 't.avgTemperature == 9.25')

console.log(' size ' + t.size)
console.log(t.size === 12)
console.assert(t.size === 12, 't.size === 12')

t.newTempetature = '6swdw'
console.log(' maxTemperature ' + t.maxTemperature)
console.log(t.maxTemperature === 100)
console.assert(t.maxTemperature === 100, 't.maxTemperature === 100')
console.log(' minTemperature ' + t.minTemperature)
console.log(t.minTemperature === -20)
console.assert(t.minTemperature === -20, 't.minTemperature === -20')
console.log(' avgTemperature ' + t.avgTemperature)
console.log(t.avgTemperature == 9.25)
console.assert(t.avgTemperature == 9.25, 't.avgTemperature == 9.25')

console.log(' size ' + t.size)
console.log(t.size === 12)
console.assert(t.size === 12, 't.size === 12')

t.newTempetature = '6 degrees'
console.log(' maxTemperature ' + t.maxTemperature)
console.log(t.maxTemperature === 100)
console.assert(t.maxTemperature === 100, 't.maxTemperature === 100')
console.log(' minTemperature ' + t.minTemperature)
console.log(t.minTemperature === -20)
console.assert(t.minTemperature === -20, 't.minTemperature === -20')
console.log(' avgTemperature ' + t.avgTemperature)
console.log(t.avgTemperature == 9)
console.assert(t.avgTemperature == 9, 't.avgTemperature == 9')

console.log(' size ' + t.size)
console.log(t.size === 13)
console.assert(t.size === 13, 't.size === 13')


t.newTempetature = '23'
console.log(' maxTemperature ' + t.maxTemperature)
console.log(t.maxTemperature === 100)
console.assert(t.maxTemperature === 100, 't.maxTemperature === 100')
console.log(' minTemperature ' + t.minTemperature)
console.log(t.minTemperature === -20)
console.assert(t.minTemperature === -20, 't.minTemperature === -20')
console.log(' avgTemperature ' + t.avgTemperature)
console.log(t.avgTemperature == 10)
console.assert(t.avgTemperature == 10, 't.avgTemperature == 10')

console.log(' size ' + t.size)
console.log(t.size === 14)
console.assert(t.size === 14, 't.size === 14')


t.newTempetature = [5,6,19]
console.log(' maxTemperature ' + t.maxTemperature)
console.log(t.maxTemperature === 100)
console.assert(t.maxTemperature === 100, 't.maxTemperature === 100')
console.log(' minTemperature ' + t.minTemperature)
console.log(t.minTemperature === -20)
console.assert(t.minTemperature === -20, 't.minTemperature === -20')
console.log(' avgTemperature ' + t.avgTemperature)
console.log(t.avgTemperature == 10)
console.assert(t.avgTemperature == 10, 't.avgTemperature == 10')

console.log(' size ' + t.size)
console.log(t.size === 17)
console.assert(t.size === 17, 't.size === 17')


t.newTempetature = ['5 degrees celsius','6 degrees','19 degree']
console.log(' maxTemperature ' + t.maxTemperature)
console.log(t.maxTemperature === 100)
console.assert(t.maxTemperature === 100, 't.maxTemperature === 100')
console.log(' minTemperature ' + t.minTemperature)
console.log(t.minTemperature === -20)
console.assert(t.minTemperature === -20, 't.minTemperature === -20')
console.log(' avgTemperature ' + t.avgTemperature)
console.log(t.avgTemperature == 10)
console.assert(t.avgTemperature == 10, 't.avgTemperature == 10')

console.log(' size ' + t.size)
console.log(t.size === 20)
console.assert(t.size === 20, 't.size === 20')

t.newTempetature = ['41 degree celsius','-50 dsxs','19 degree']
console.log(' maxTemperature ' + t.maxTemperature)
console.log(t.maxTemperature === 100)
console.assert(t.maxTemperature === 100, 't.maxTemperature === 100')
console.log(' minTemperature ' + t.minTemperature)
console.log(t.minTemperature === -20)
console.assert(t.minTemperature === -20, 't.minTemperature === -20')
console.log(' avgTemperature ' + t.avgTemperature)
console.log(t.avgTemperature == 10)
console.assert(t.avgTemperature == 10, 't.avgTemperature == 10')

console.log(' size ' + t.size)
console.log(t.size === 20)
console.assert(t.size === 20, 't.size === 20')

t.newTempetature = ['5 degree celsius',[2,1,4],'19 degree']
console.log(' maxTemperature ' + t.maxTemperature)
console.log(t.maxTemperature === 100)
console.assert(t.maxTemperature === 100, 't.maxTemperature === 100')
console.log(' minTemperature ' + t.minTemperature)
console.log(t.minTemperature === -20)
console.assert(t.minTemperature === -20, 't.minTemperature === -20')
console.log(' avgTemperature ' + t.avgTemperature)
console.log(t.avgTemperature == 10)
console.assert(t.avgTemperature == 10, 't.avgTemperature == 10')

console.log(' size ' + t.size)
console.log(t.size === 20)
console.assert(t.size === 20, 't.size === 20')


t.newTempetature = ['41 degrees f','42.8 f','66.2 degree Fahrenheit']
console.log(' maxTemperature ' + t.maxTemperature)
console.log(t.maxTemperature === 100)
console.assert(t.maxTemperature === 100, 't.maxTemperature === 100')
console.log(' minTemperature ' + t.minTemperature)
console.log(t.minTemperature === -20)
console.assert(t.minTemperature === -20, 't.minTemperature === -20')
console.log(' avgTemperature ' + t.avgTemperature)
console.log(t.avgTemperature == 10)
console.assert(t.avgTemperature == 10, 't.avgTemperature == 10')

console.log(' size ' + t.size)
console.log(t.size === 23)
console.assert(t.size === 23, 't.size === 23')


t.newTempetature = ['278.15 degrees k','279.15 k',' 292.15 degree Kelvin']
console.log(' maxTemperature ' + t.maxTemperature)
console.log(t.maxTemperature === 100)
console.assert(t.maxTemperature === 100, 't.maxTemperature === 100')
console.log(' minTemperature ' + t.minTemperature)
console.log(t.minTemperature === -20)
console.assert(t.minTemperature === -20, 't.minTemperature === -20')
console.log(' avgTemperature ' + t.avgTemperature)
console.log(t.avgTemperature == 10)
console.assert(t.avgTemperature == 10, 't.avgTemperature == 10')

console.log(' size ' + t.size)
console.log(t.size === 26)
console.assert(t.size === 26, 't.size === 26')


t.newTempetature = ['10']
console.log(' maxTemperature ' + t.maxTemperature)
console.log(t.maxTemperature === 100)
console.assert(t.maxTemperature === 100, 't.maxTemperature === 100')
console.log(' minTemperature ' + t.minTemperature)
console.log(t.minTemperature === -20)
console.assert(t.minTemperature === -20, 't.minTemperature === -20')
console.log(' avgTemperature ' + t.avgTemperature)
console.log(t.avgTemperature == 10)
console.assert(t.avgTemperature == 10, 't.avgTemperature == 10')

console.log(' size ' + t.size)
console.log(t.size === 27)
console.assert(t.size === 27, 't.size === 27')
*/