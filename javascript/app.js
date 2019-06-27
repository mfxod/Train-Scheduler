
// ----- GLOBAL VARIABLES -----

const firebaseConfig = {
    apiKey: "AIzaSyA5kKlwHTUsEAqxWdaR2hsrxQ3HxgBQ8ao",
    authDomain: "train-scheduler-5bb4d.firebaseapp.com",
    databaseURL: "https://train-scheduler-5bb4d.firebaseio.com",
    projectId: "train-scheduler-5bb4d",
    storageBucket: "",
    messagingSenderId: "164660802657",
    appId: "1:164660802657:web:ff1c81d82ed43b1f"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// for user input
let trainName = "";
let destination = "";
let firstHrs = 0;
let firstMins = 0;
let firstArrival = false;
let frequency = 0;

// for calculations
let currentTime = false;
let timeDiff = 0;
let remainder = 0;
let minAway = 0;
let nextArrival = false;



// ----- FUNCTIONS -----

function firstArrivalDate() {
    firstArrival = new Date(
        dateFns.getYear(new Date()),
        dateFns.getMonth(new Date()),
        dateFns.getDate(new Date()),
        firstHrs,
        firstMins);
    console.log("First Arrival: " + firstArrival);
};

// function test() {
//     if (firstArrival < currentTime) {
//         console.log("true")
//     } else {
//         console.log("false");
//     }
// }

function doMath() {
    currentTime = new Date();

    if (firstArrival < currentTime) {
        // timeDiff = currentTime - firstArrival;
        timeDiff = dateFns.differenceInMinutes(currentTime, firstArrival);
        console.log("timeDiff: " + timeDiff);
        remainder = timeDiff % frequency;
        minAway = frequency - remainder;
        // nextArrival = currentTime + minAway;
        nextArrival = dateFns.addMinutes(currentTime, minAway);
    } else {
        // minAway = firstArrival - currentTime;
        minAway = dateFns.differenceInMinutes(firstArrival, currentTime);
        nextArrival = firstArrival;
    }
};



// ----- PROCESS -----

$("#submit").on("click", function(event) {
    event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstHrs = $("#first-hrs").val().trim();
    firstMins = $("#first-mins").val().trim();
    frequency = $("#frequency").val().trim();

    firstArrivalDate();
    doMath();

    // why isn't nextArrival going to Firebase??
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstHrs: firstHrs,
        firstMins: firstMins,
        frequency: frequency,
        nextArrival: nextArrival,
        minAway: minAway
    });
    
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-hrs").val("");
    $("#first-mins").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function(snapshot) {

    trainName = snapshot.val().trainName;
    destination = snapshot.val().destination;
    frequency = snapshot.val().frequency;
    nextArrival = snapshot.val().nextArrival;
    minAway = snapshot.val().minAway;

    const tableRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minAway)
    );

    $("#table-body").append(tableRow);
});

// may have to add this to update timers:
// database.ref().on("value", function(snapshot) {
//     nextArrival = snapshot.val().nextArrival;
//     minAway = snapshot.val().minAway;
// });