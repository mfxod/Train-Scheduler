
// if (firstTime already occurred) {
//     x = currentTime - firstTime;
//     remainder = x % frequency;
//     minAway = frequency - remainder;
//     nextArrival = currentTime + minAway;
// } else {
//     nextArrival = firstTime;
//     minAway = firstTime - currentTime;
// }

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

let trainName = "";
let destination = "";
let firstTime = "";
let frequency = 0;
let nextArrival = "";
let minAway = 0;
let currentTime = "";

$("#submit").on("click", function(event) {
    event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTime = $("#first-time").val().trim();
    frequency = $("#frequency").val().trim();
    // nextArrival = ;
    // minAway = ;

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        nextArrival: nextArrival,
        minAway: minAway    
    });
    
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-time").val("");
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