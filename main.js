alert_sound = "";
status = "";
objects = [];

function preload()
{
    alert_sound = loadSound("alert.mp3");
}

function setup()
{
    canvas = createCanvas(350,350);
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model is successfully Loaded!");
    status = true;
}

function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0,0,350,350);

    if(status != "")
    {
        objectDetector.detect(video,gotResults);
        for(i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Detecting Objects";
            fill("#FFC300");
            text(objects[i].label, objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#FFC300");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "person")
            {
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                alert_sound.stop();
            }
            else 
            {
                document.getElementById("number_of_objects").innerHTML = "Baby NOT Found!";
                alert_sound.play();
            }
        }
        
        if(objects.length == 0)
        {
            document.getElementById("number_of_objects").innerHTML = "Baby NOT Found!";
            alert_sound.play();
        }
    }
}