$(document).ready(function() {

   var config = {
    apiKey: "AIzaSyBXEJDdEnyuISnX-Z8oUwuWw77KGKO_tHc",
    authDomain: "train-time-925dc.firebaseapp.com",
    databaseURL: "https://train-time-925dc.firebaseio.com",
    projectId: "train-time-925dc",
    storageBucket: "train-time-925dc.appspot.com",
    messagingSenderId: "606470477354"
  };

  firebase.initializeApp(config);

  var trainNumber = 0;
  var rowNumber = 0;
  var database = firebase.database();
  var dataFire = 0;
  var dataTime = 0;


database.ref().on("child_added", function(snapshot) {


  var tableRow = $("<tr>")
  
  tableRow.attr("data-train", "train-" + trainNumber)
  tableRow.attr("id", "row-" + rowNumber)
  tableRow.addClass("trainRows")
  $("#main").append(tableRow)

  input = [snapshot.val().trainName, snapshot.val().destination, snapshot.val().time, snapshot.val().frequency, "blank"]

  for (var i = 0; i < 5; i++) {

  if (i === 2) {

    var tableData = $("<td>")

  tableData.attr("data-time-" + dataTime, input[i])
  tableData.text(input[i])
  $("#row-" + rowNumber).append(tableData)
  tableData.addClass("time-" + dataTime)

  }

  else if (i === 3) {

    var tableData = $("<td>")

  tableData.attr("data-frequency-" + dataFire, input[i])
  tableData.text(input[i])
  $("#row-" + rowNumber).append(tableData)
  tableData.addClass("frequent-" + dataFire)

  }

  else if (i === 4) {

    var tableData = $("<td>")

  tableData.text(input[i])
  $("#row-" + rowNumber).append(tableData)
  tableData.addClass("minutes-" + dataFire)

  }

  else {

  var tableData = $("<td>")

  tableData.text(input[i])
  $("#row-" + rowNumber).append(tableData)
}

}

  var tFrequency = $("td.frequent-" + dataFire).attr("data-frequency-" + dataFire)
  var startTime = $("td.time-" + dataTime).attr("data-time-" + dataTime)
  var firstTimeConverted = moment(startTime, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    $("td.minutes-" + dataFire).html(tMinutesTillTrain)
    $("td.time-" + dataTime).html(moment(nextTrain).format("hh:mm"))

dataFire++
dataTime++
trainNumber++
rowNumber++

}, function(errorObject) {

      console.log("The read failed: " + errorObject.code);

    });


$("#submit").on("click", function() {

  var input = [$("#name").val().trim(), $("#destination").val().trim(), $("#time").val().trim(), $("#frequency").val().trim(), "blank"]

  database.ref().push({
    trainName: input[0],
    destination: input[1],
    time: input[2],
    frequency: input[3]
  });

if ($("#name").val() === "" || $("#destination").val() === "" || $("#time").val() === "" || $("#frequency").val() === ""){

  alert("***Please fill out all fields***")
}

$("#name").val("")
$("#destination").val("")
$("#time").val("")
$("#frequency").val("")

  trainNumber++
  rowNumber++
     
  });

});