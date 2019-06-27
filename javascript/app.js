
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

// sets firstArrival as a date object
function firstArrivalDate() {
    firstArrival = new Date(
        dateFns.getYear(new Date()),
        dateFns.getMonth(new Date()),
        dateFns.getDate(new Date()),
        firstHrs,
        firstMins);
};

// calculates nextArrival time and minAway
function doMath() {
    currentTime = new Date();

    if (firstArrival < currentTime) {
        timeDiff = dateFns.differenceInMinutes(currentTime, firstArrival);
        remainder = timeDiff % frequency;
        minAway = frequency - remainder;
        nextArrival = dateFns.format(new Date(dateFns.addMinutes(currentTime, minAway)), "h:mm A");
    } else {
        minAway = dateFns.differenceInMinutes(firstArrival, currentTime);
        nextArrival = dateFns.format(new Date(firstArrival), "h:mm A");
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
        $("<td>").attr("class", "next-arrival").text(nextArrival),
        $("<td>").attr("class", "min-away").text(minAway)
    );

    $("#table-body").append(tableRow);  

},  function(errorObject) {
        console.log("Error: " + errorObject.code);  
});

// First Bonus Challenge Pseudocoding
// to update nextArrival and minAway in real time:
// 1) make a "timer" that recognizes when a minute has elapsed
// 2) update Firebase with new Date() from the "timer" using database.ref().push()
// 3) replace NextArrival and minAway values in HTML with most current ones:
// database.ref().on("value", function(snapshot) {
//     $("next-arrival").text(snapshot.val().nextArrival);
//     $("min-away").text(snapshot.val().minAway);
// },  function(errorObject) {
//     console.log("Error: " + errorObject.code);  
// });