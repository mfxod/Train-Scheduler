
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

$("#submit").on("click", function (event) {
    event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTime = $("#first-time").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().set({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    });
});

database.ref().on("value", function (snapshot) {
    const tableRow = $("<tr>");
    const tdTrainName = $("<td>").text(snapshot.val().trainName);
    const tdDestination = $("<td>").text(snapshot.val().destination);
    const tdFirstTime = $("<td>").text(snapshot.val().firstTime);
    const tdFrequency = $("<td>").text(snapshot.val().frequency);

    $("#table-body").append(tableRow);
    tableRow.append(tdTrainName);
    tableRow.append(tdDestination);
    tableRow.append(tdFirstTime);
    tableRow.append(tdFrequency);
});