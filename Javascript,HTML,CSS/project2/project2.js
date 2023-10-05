// lista asemista
var asemat = {};
var asemat2 = [];

function loadJSONdata(){
    //create ajax object
    var xmlhtpp = new XMLHttpRequest();
    //haetaan data
    xmlhtpp.open("GET", "https://rata.digitraffic.fi/api/v1/metadata/stations", true);
    xmlhtpp.send();
    console.log("executed");
    //käsittelee vastausta
    xmlhtpp.onreadystatechange=function() {
        if (xmlhtpp.readyState == 4 && xmlhtpp.status == 200) {
            console.log("response get")
            
            var jsonDoc = xmlhtpp.response;
            var jsonData = JSON.parse(jsonDoc);

            var text = "";
            // käydään läpi kaikki asemat
            for (var i = 0; i < jsonData.length; i++) {
                // jos asemalla matkustajaliikennettä
                if (jsonData[i].passengerTraffic == true){
                    //dropdown menuun tulee aseman koko nimi, jonnekkin talteen jää kuitenki nimen lyhennys, koska sillä haetaan jatkossa lisää tietoa. katso konsoli
                    text += "<option value="+jsonData[i].stationShortCode +">" + jsonData[i].stationName + "</option>";
                    // var asemat listaan indeksiin tulee aseman lyhenne ja sitä vastaava arvo koko nimi
                    asemat[jsonData[i].stationShortCode] = jsonData[i].stationName;
                    asemat2.push(jsonData[i].stationName);
                
            }
        }
            // tieto html
            document.getElementById("stations").innerHTML = text;
         }
    }
}

function getOption() {
    // tässä sitten pitkä nimi muutetaan lyhyeksi
    var e = document.getElementById("stations");
    var value = e.value;
    var text = e.options[e.selectedIndex].text;
    console.log(value);
    console.log(text); 
    generateTimetable(value);
}

function generateTimetable(stationName){
    console.log(stationName);
    var xmlhtpp = new XMLHttpRequest();
    
    xmlhtpp.open("GET", "https://rata.digitraffic.fi/api/v1/live-trains/station/"+stationName + "?departing_trains=10", true);
    xmlhtpp.send();

    xmlhtpp.onreadystatechange=function() {
        if (xmlhtpp.readyState == 4 && xmlhtpp.status == 200) {
            console.log("response get")
            
            var jsonDoc = xmlhtpp.response;
            var jsonObj = JSON.parse(jsonDoc);
            console.log(jsonObj[1].trainNumber);
            console.log(jsonObj[0].timeTableRows[0].stationShortCode);
            console.log(jsonObj);

            var text = "<table class = 'greenTable'>";
                text += "<tr>" 
                + "<th>" + "Junatyyppi" + "</th>"
                + "<th>" + "Junatunnus" + "</th>"
                + "<th>" + "Lähtöasema" + "</th>"
                + "<th>" + "Pääteasema" + "</th>"
                + "<th>" + "Lähtöraide" + "</th>"
                + "<th>" + "Lähtöaika" + "</th>"
                + "</tr>";
            // käydää läpi junat
            var departingTrains = [];
            for(i = 0; i < jsonObj.length; i++) {
                // käydään läpi junien aikataulut
                for(j = 0; j < jsonObj[i].timeTableRows.length; j++) {
                    // tässä kiinnostaa vain lähtevät kaukojunat ja lähtevät lähijunat
                    var scheduledTime = new Date(jsonObj[i].timeTableRows[j].scheduledTime);
                    var currentTime = new Date();
                    if(jsonObj[i].timeTableRows[j].stationShortCode == stationName && 
                        jsonObj[i].timeTableRows[j].type == 'DEPARTURE' && 
                        (jsonObj[i].trainCategory == 'Long-distance' || 
                        jsonObj[i].trainCategory == 'Commuter') &&
                        scheduledTime > currentTime) {
                        var departingTrain = {};
                        departingTrain.trainType = jsonObj[i].trainType;
                        if (jsonObj[i].trainCategory == 'Commuter'){
                            // jos lähijuna otetaan junan kirjain
                            departingTrain.trainNum = jsonObj[i].commuterLineID;
                        }else{
                            // jos kaukojuna otetaan junan numero
                            departingTrain.trainNum = jsonObj[i].trainNumber;
                        }
                        // tässä napataan junan lähtöasema
                        departingTrain.stationStart = jsonObj[i].timeTableRows[j].stationShortCode;
                        // tässä junan pääteasema
                        departingTrain.stationStop = jsonObj[i].timeTableRows[jsonObj[i].timeTableRows.length -1].stationShortCode;
                        // junan lähtöraide
                        departingTrain.track = jsonObj[i].timeTableRows[j].commercialTrack;
                        departingTrain.schelTime = scheduledTime;
                        // lisätään junan tiedot taulukkoon
                        departingTrains.push(departingTrain);
                    }
                }
            }
            //karsitaan jo lähteneet junat pois
            departingTrains.sort(function(a,b){
                return new Date(a.schelTime) - new Date(b.schelTime);
            })
            departingTrains.forEach((train) => {
                //tehdään taulukko
                text += "<tr>";
                text += "<td>" + train.trainType + "</td>";
                text += "<td>" + train.trainNum + "</td>";
                text += "<td>" + asemat[train.stationStart] + "</td>";
                text += "<td>" + asemat[train.stationStop] + "</td>";
                text += "<td>" + train.track + "</td>";
                text += "<td>" + train.schelTime.getHours() + ":" + (train.schelTime.getMinutes() < 10? "0" : "") + train.schelTime.getMinutes() 
                + " " + train.schelTime.getDate() + "." + (train.schelTime.getMonth() + 1) + "." + train.schelTime.getFullYear() + "</td>";
                console.log(train.schelTime.getDay());
                text += "</tr>"
            })
            text += "</table>"
            document.getElementById("tabledata").innerHTML = text;
          }
    }
}

// otetaan tarvittavat elementit talteen
const searchInput = document.querySelector(".searchInput");
const input = searchInput.querySelector("input");
const resultBox = searchInput.querySelector(".resultBox");
const icon = searchInput.querySelector(".icon");
let linkTag = searchInput.querySelector("a");
let webLink;

// if user press any key and release
input.onkeyup = (e)=>{
    let userData = e.target.value; //käyttäjän syöttämä data
    let emptyArray = [];
    if(userData){
        emptyArray = asemat2.filter((data)=>{
            // filteröidään listan arvot ja käyttäjän syöte ja palautetaan vain ne sanat jotka alkavat käyttäjän syöttämillä kirjaimilla
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
        });
        emptyArray = emptyArray.map((data)=>{
            // lisataan data listaan
            return data = '<li>'+ data +'</li>';
        });
        searchInput.classList.add("active"); //tämä näyttää ehdotukset
        showSuggestions(emptyArray);
        let allList = resultBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //lisätään onclick ominaisuus ehdotuksiin
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchInput.classList.remove("active"); //piilottaa autocomplete boxin
    }
}

function showSuggestions(list){
    // näytä ehdotukset
    let listData;
    // jos ei löydy ehdotuksia näytetään syötetty data
    if(!list.length){
        userValue = input.value;
        listData = '<li>'+ userValue +'</li>';
    }else{
        listData = list.join('');
    }
    resultBox.innerHTML = listData;
}

// haetaan lähtevät junat valitun arvon perusteella
function select(element){
    let selectData = element.textContent;
    input.value = selectData;
    searchInput.classList.remove('active');
    icon.onclick = ()=>{
        key = getKey(selectData);
        console.log(key);
        if (key) {
            generateTimetable(key);
        }else{
            document.getElementById("tabledata").innerHTML = "<p>Virheellinen valinta</p>";
        }
        
    }
}

// etsitään asemat taulukosta avainta annetulla arvolla
function getKey(value) {
    console.log(value);
    keyFound = "";
    Object.keys(asemat).forEach(key => {
        if (asemat[key] == value) {
            keyFound = key;    
        }
    });
    return keyFound;
}