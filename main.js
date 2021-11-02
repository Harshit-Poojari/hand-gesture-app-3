Webcam.set( {
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function captureimage() {
    Webcam.snap(function(data_uri){
      document.getElementById("result").innerHTML = '<img id="capturedimage" src="'+data_uri+'"/>';    
  })
}
console.log('ml5.version',ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/mSL1Sgwu8/model.json",modelLoaded);


function modelLoaded() {
    console.log('modelLoaded');
}
function speak() {
    synth = window.speechSynthesis;
    speakData1 = "The First Prediction is"+prediction_1;
    speakData2 = "The Second Prediction is"+prediction_2;
    utterThis = new SpeechSynthesisUtterance(speakData1+speakData2);
    synth.speak(utterThis);
}

function result() {
    img = document.getElementById("capturedimage");
    classifier.classify(img,got_results);
}

function got_results(error,results) 
{
if (error) {
    console.error(error);
} else {
    console.log(results);
    document.getElementById("result_gesture_name").innerHTML = results[0].label;
    document.getElementById("result_gesture_name2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();
    if(results[0].label == "Amazing") {
        document.getElementById("update_gesture-1").innerHTML = "&#9995;";
    }
    if(results[0].label =="Best") {
        document.getElementById("update_gesture-1").innerHTML = "&#9996;";
    }
    if(results[0].label =="Victory") {
        document.getElementById("update_gesture-1").innerHTML = "&#128077;";
    }


    if(results[1].label =="Amazing") {
        document.getElementById("update_gesture-2").innerHTML = "&#9995;";
    }
    if(results[1].label =="Best") {
     document.getElementById("update_gesture-2").innerHTML = "&#9996;";
    }
    if(results[1].label =="Victory") {
        document.getElementById("update_gesture-2").innerHTML = "&#128077;";
    }
}
}
