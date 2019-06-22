
const firebaseConfig = {
    apiKey: "AIzaSyClx_AC_pqxs7pn6fLE_JTVse0ZDIFIMe0",
    authDomain: "test-db-605ab.firebaseapp.com",
    databaseURL: "https://test-db-605ab.firebaseio.com",
    projectId: "test-db-605ab",
    storageBucket: "test-db-605ab.appspot.com",
    messagingSenderId: "728031710801",
    appId: "1:728031710801:web:b1354a4ffcc1e41c"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

let trainName = "";
let destination = "";
let firstTime = "";
let frequency = 0;

const newTrain = {
    trainName: trainName,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency
}

$("#submit").on("click", function (event) {
    event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTime = $("#first-time").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().push(newTrain);
});

database.ref().on("child_added", function (childSnapshot) {

    // trainName = childSnapshot.val().trainName;
    // destination = childSnapshot.val().destination;
    // firstTime = childSnapshot.val().firstTime;
    // frequency = childSnapshot.val().frequency;

    const tableRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstTime),
        $("<td>").text(frequency)
    );

    $("#table-body").append(tableRow);
});