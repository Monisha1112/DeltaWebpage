var itemlist=[];
var bmi=0;
var totalCalorie = 0;
var dailyCalorieLimit = 0;

function init(){
    if(localStorage.data){
        itemlist=JSON.parse(localStorage.data);
        for(var i=0;i<itemlist.length;i++){
            var display = document.getElementById("food-details");
            var totalCalorieElement = document.getElementById("total-calorie");



            
            var value = document.createElement("p");
            
            value.innerText = itemlist[i].item + " - " + itemlist[i].itemcal + " calories";
            
            display.appendChild(value);
            
            totalCalorieElement.innerHTML = itemlist[itemlist.length - 1].calories;
            
            var bmidisplay = document.getElementById("bmi-display");
            
            bmidisplay.innerText = itemlist[0].BMI;
            
            var dailyCalorieLimitDisplayElement = document.getElementById("daily-limit-display");
            
            dailyCalorieLimitDisplayElement.innerHTML = itemlist[0].callim;
            
            if(itemlist[itemlist.length - 1].calories > itemlist[0].callim) {
                // Display the warning  
                var warningMessage = document.getElementById("overeatting-warning");
                warningMessage.style.display = "block";
            }


        }
    }

}



function calculateBMI() {
    var heightElement = document.getElementById("height");
    var weightElement = document.getElementById("weight");
    var display = document.getElementById("bmi-display");

    var height = parseInt(heightElement.value);
    var weight = parseInt(weightElement.value);
    if(isNaN(weight) || isNaN(height) || weight === 0 || height === 0) {
        display.innerText = "Not valid input";
        return;
    }
    height = height/100;


    bmi = weight/(height * height);

    display.innerText = bmi;
}

function setLimitPerDay(limit) {
    var calorieLimitElement = document.getElementById("calorie-limit");
    var dailyCalorieLimitDisplayElement = document.getElementById("daily-limit-display");

    //TODO: Perform input validation here
    dailyCalorieLimit = parseInt(calorieLimitElement.value);

    dailyCalorieLimitDisplayElement.innerHTML = dailyCalorieLimit;
    
}

function addFood() {
    var foodNameElement = document.getElementById("food-name");
    var calorieElement = document.getElementById("calorie");
    var display = document.getElementById("food-details");
    var totalCalorieElement = document.getElementById("total-calorie");

    
    //TODO: Perform input validation here


    totalCalorie += parseInt(calorieElement.value);
    var value = document.createElement("p");
    value.innerText = foodNameElement.value + " - " + calorieElement.value + " calories";
    display.appendChild(value);
    totalCalorieElement.innerHTML = totalCalorie;
    var newitem={item:foodNameElement.value, itemcal:calorieElement.value ,calories:totalCalorie, BMI:bmi, callim:dailyCalorieLimit};
    itemlist.push(newitem);
    localStorage.data=JSON.stringify(itemlist);

    if(totalCalorie > dailyCalorieLimit) {
        // Display the warning  
        var warningMessage = document.getElementById("overeatting-warning");
        warningMessage.style.display = "block";
    }
}

function getTodayDateString() {
    var d = new Date();
    var date = d.getDate() + "-" +  d.getMonth() + "-" + d.getFullYear();
    return date;
    
}

function cleardata(){
    localStorage.clear();
    document.location.reload();
}