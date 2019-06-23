
// if (firstArrival already occurred) {
//     x = currentTime - firstArrival;
//     remainder = x % frequency;
//     minAway = frequency - remainder;
//     nextArrival = currentTime + minAway;
// } else {
//     nextArrival = firstArrival;
//     minAway = firstArrival - currentTime;
// }

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
let firstArrival = "";
let frequency = "";

// for calculations
let currentTime = "";
let timeDiff = "";
let remainder = "";
let minAway = "";
let nextArrival = "";



// ----- FUNCTIONS -----

function doMath() {
    if (firstArrival < currentTime) {
        timeDiff = currentTime - firstArrival;
        remainder = timeDiff % frequency;
        minAway = frequency - remainder;
        nextArrival = currentTime + minAway;
    } else {
        nextArrival = firstArrival;
        minAway = firstArrival - currentTime;
    }
};



// ----- PROCESS -----

$("#submit").on("click", function(event) {
    event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstArrival = $("#first-arrival").val().trim();
    frequency = $("#frequency").val().trim();

    doMath();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstArrival: firstArrival,
        frequency: frequency,
        nextArrival: nextArrival,
        minAway: minAway    
    });
    
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-arrival").val("");
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
