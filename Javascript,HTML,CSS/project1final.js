function button() {
  document.getElementById("activityButton").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbutton')) {
    var dropdowns = document.getElementsByClassName("activity_content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function setDate(){
  day = prompt('For which day you want to add hours?\nYou can use abbreviation.')
  return day
}
function setHours(){
  while (true){
    hours = prompt('Input your hours please:')
    hours = parseFloat(hours);
    
    if(isNaN(hours) || hours < 0 || hours > 25){
      alert("Incorrect input!");
      return 0;
      
    }else {
      alert("Thank you!");
      return hours
    }
  }
}

var totalworkhours = [0,0,0,0,0,0,0];
function setWork(){
  
  date = setDate()
  
  if (date == "monday"||date == "mon"){
    workmon = document.getElementById("work_mon").innerHTML = setHours()
    totalworkhours[0] = workmon;
  
  } else if(day == "tuesday"|| date == "tue"){
    worktue = document.getElementById("work_tue").innerHTML = setHours()
    totalworkhours [1] = worktue;
    
  } else if(day == "wednesday"|| date == "wed"){
    workwed = document.getElementById("work_wed").innerHTML = setHours()
    totalworkhours[2] = workwed;

  } else if(day == "thursday"|| day == "thu"){
    workthu = document.getElementById("work_thu").innerHTML = setHours()
    totalworkhours[3]= workthu;
  
  } else if( day== "friday"||day == "fri"){
    workfri = document.getElementById("work_fri").innerHTML = setHours()
    totalworkhours[4]= workfri;

  } else if(day == "saturday"|| day == "sat"){
    worksat = document.getElementById("work_sat").innerHTML = setHours()
    totalworkhours[5]= worksat;
    
  } else if(day == "sunday"|| day == "sun"){
    worksun = document.getElementById("work_sun").innerHTML = setHours()
    totalworkhours[6] = worksun;
  
  } else{
    alert("Incorrect input!")
  }
  totalwork = 0;
  for (var i = 0; i < totalworkhours.length; i++) {
    console.log(totalworkhours[i]);
    totalwork += totalworkhours[i];
  }
  
  console.log(totalwork)
  document.getElementById("worktotal").innerHTML = totalwork;
  return totalwork;
}
 
totalstudyhours = [0,0,0,0,0,0,0]
function setStudies(){
  
  date = setDate()
  
  if (date == "monday"||date == "mon"){
   studymon = document.getElementById("study_mon").innerHTML = setHours()
   totalstudyhours[0] = studymon;
  
  } else if(day == "tuesday"|| date == "tue"){
    studytue = document.getElementById("study_tue").innerHTML = setHours()
    totalstudyhours[1] = studytue;
  
  } else if(day == "wednesday"|| date == "wed"){
    studywed = document.getElementById("study_wed").innerHTML = setHours()
    totalstudyhours[2] = studywed;

  } else if(day == "thursday"|| day == "thu"){
    studythu = document.getElementById("study_thu").innerHTML = setHours()
    totalstudyhours[3] = studythu;
  
  } else if( day== "friday"||day == "fri"){
    studyfri =  document.getElementById("study_fri").innerHTML = setHours()
    totalstudyhours[4] = studyfri;

  } else if(day == "saturday"|| day == "sat"){
    studysat = document.getElementById("study_sat").innerHTML = setHours()
    totalstudyhours [5] = studysat;
  
  } else if(day == "sunday"|| day == "sun"){
    studysun = document.getElementById("study_sun").innerHTML = setHours()
    totalstudyhours [6] = studysun;
  } else{
    alert("Incorrect input!")
  }
  totalstudy = 0;
  for (var i = 0; i < totalstudyhours.length; i++) {
    console.log(totalstudyhours[i]);
    totalstudy += totalstudyhours[i];
  }

  console.log(totalstudy)
  document.getElementById("studytotal").innerHTML = totalstudy;
  return totalstudy;

}

totalhobbyhours = [0,0,0,0,0,0,0]
function setHobbies(){
  date = setDate()
  
  if (date == "monday"||date == "mon"){
   hobbymon = document.getElementById("hobby_mon").innerHTML = setHours()
   totalhobbyhours[0] = hobbymon;
  
  } else if(day == "tuesday"|| date == "tue"){
    hobbytue = document.getElementById("hobby_tue").innerHTML = setHours()
    totalhobbyhours[1] = hobbytue;
  
  } else if(day == "wednesday"|| date == "wed"){
    hobbywed = document.getElementById("hobby_wed").innerHTML = setHours()
    totalhobbyhours[2] = hobbywed;

  } else if(day == "thursday"|| day == "thu"){
    hobbythu = document.getElementById("hobby_thu").innerHTML = setHours()
    totalhobbyhours[3] = hobbythu;
  
  } else if( day== "friday"||day == "fri"){
    hobbyfri = document.getElementById("hobby_fri").innerHTML = setHours()
    totalhobbyhours[4] = hobbyfri;

  } else if(day == "saturday"|| day == "sat"){
    hobbysat = document.getElementById("hobby_sat").innerHTML = setHours()
    totalhobbyhours[5] = hobbysat;

  } else if(day == "sunday"|| day == "sun"){
    hobbysun = document.getElementById("hobby_sun").innerHTML = setHours()
    totalhobbyhours[6] = hobbysun;
  } else{
    alert("Incorrect input!")
  }
  
  totalhobby = 0;
  for (var i = 0; i < totalhobbyhours.length; i++) {
    console.log(totalhobbyhours[i]);
    totalhobby += totalhobbyhours[i];
  }

  console.log(totalhobby)
  document.getElementById("hobbytotal").innerHTML = totalhobby;
  return totalhobby;
}
    
function totalWork(){
  totalwork = 0;
  for (var i = 0; i < totalworkhours.length; i++) {
    console.log(totalworkhours[i]);
    totalwork += totalworkhours[i];
  }
  return totalwork;
}

function totalStudy(){
  totalstudy = 0;
  for (var i = 0; i < totalstudyhours.length; i++) {
    console.log(totalstudyhours[i]);
    totalstudy += totalstudyhours[i];
  }
  return totalstudy;
}

function totalHobby(){
  totalhobby = 0;
  for (var i = 0; i < totalhobbyhours.length; i++) {
    console.log(totalhobbyhours[i]);
    totalhobby += totalhobbyhours[i];
  }
  return totalhobby;
}

function allTotal(){
  totalWork()
  totalStudy()
  totalHobby()
  var totalhours = totalwork + totalstudy + totalhobby
  document.getElementById("all_total").innerHTML = totalhours
  document.getElementById("total_mon").innerHTML = totalworkhours[0] + totalstudyhours[0] + totalhobbyhours[0]
  document.getElementById("total_tue").innerHTML = totalworkhours[1] + totalstudyhours[1] + totalhobbyhours[1]
  document.getElementById("total_wed").innerHTML = totalworkhours[2] + totalstudyhours[2] + totalhobbyhours[2]
  document.getElementById("total_thu").innerHTML = totalworkhours[3] + totalstudyhours[3] + totalhobbyhours[3]
  document.getElementById("total_fri").innerHTML = totalworkhours[4] + totalstudyhours[4] + totalhobbyhours[4]
  document.getElementById("total_sat").innerHTML = totalworkhours[5] + totalstudyhours[5] + totalhobbyhours[5]
  document.getElementById("total_sun").innerHTML = totalworkhours[6] + totalstudyhours[6] + totalhobbyhours[6]
  
  return totalhours;
}

function insertWeek(){
  while (true){
    week = prompt('Save/get weekly hours:\nselect week please.')
    week = parseFloat(week);
    
    if(isNaN(week) || week < 0 || week > 53){
      alert("Incorrect input!");
      break;
      
    }else {
      alert("Thank you!");
      return week
    }
   }
  }

  function save_data(){
    //print()
    weeknro = insertWeek()
    const d = new Date();
    console.log(d, weeknro)
    document.getElementById("date").innerHTML = "Your data was saved on " + d ;
    localStorage.setItem(weeknro, "week: " + weeknro + " work: " + totalwork + " hours. " + " studies: " + totalstudy + " hours. " + " hobbies: " + totalhobby + " hours.");
  }

  function get_data(){
    tallennus = document.getElementById("testi").innerHTML = localStorage.getItem(insertWeek());
    for (var i = 0; i < tallennus.length; i++) {
      console.log(tallennus[i]);
    }
  }

 
  function procent() {
    
    var hobbyprc = totalHobby() / allTotal() * 100;
    let rounder = hobbyprc.toFixed(0) + "%";
    document.getElementById("hobby%").innerHTML = rounder;
    var studyprc = totalStudy() / allTotal() * 100;
    let rounder1 = studyprc.toFixed(0) + "%";
    document.getElementById("study%").innerHTML = rounder1;
    var workprc = totalWork() / allTotal() * 100;
    let rounder2 = workprc.toFixed(0) + "%";
    document.getElementById("work%").innerHTML = rounder2;
  }
  
