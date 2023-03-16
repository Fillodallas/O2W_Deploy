function extracDate(str) {
  var ext = str.split(".");
  tm =
    ext[1].substring(0, 2) +
    ":" +
    ext[1].substring(2, 4) +
    "." +
    ext[1].substring(4, 6);
  return tm;
}

function toggleBTNs(chbox, chart) {
  document
    .getElementById(chbox)
    .addEventListener("click", function handleClick() {
      if (document.getElementById(chbox).checked) {
        document.getElementById(chart).style.display = "block";
        window.scroll(0, 65);
      } else {
        document.getElementById(chart).style.display = "none";
        window.scroll(0, -65);
      }
    });
}

function isToggled(chbox) {
  document.getElementById(chbox);
  if (document.getElementById(chbox).checked) {
  } else {
  }
}

function maptoNum(str) {
  arr = str.split(",").map(Number);
  arr = arr.filter((val) => !isNaN(val) && val !== undefined)
  return arr

}



function reLoad(Chart, data1, label, maxDSL) {
  adddata(Chart, data1, label, maxDSL);
}

function adddata(Chart, val1, label1, maxDSL) {
  var labels1 = Chart.data.labels;
  var val1DataSet = Chart.data.datasets[0].data;
  var val1DataLength = val1DataSet.length;

  // if data set has more than MAX_DATA_SET_LENGTH entries,
  // remove the first one entry and push on a new data entry
  var didRemoveData1 = false;
  if (val1DataLength > maxDSL) {
    if (Array.isArray(val1)) {
      val1DataSet.splice(0, val1.length);
    } else {
      val1DataSet.shift();
    }

    didRemoveData1 = true;
  }

  // If data was removed we also need to remove
  // the first label to keep the data from squeezing in.
  if (didRemoveData1) {
    if (Array.isArray(val1)) {
      labels1.splice(0, val1.length);
    } else {
      labels1.shift();
    }
  }

  Chart.data.labels = Chart.data.labels.concat(label1);
  Chart.data.datasets[0].data = Chart.data.datasets[0].data.concat(val1);
  Chart.update();
}

/*
      myInterval = setInterval(sayHi, 500);
      */

function checkCollapse(collapsable, idDisplay, idKey) {
  var myCollapsible = document.getElementById(collapsable);
  myCollapsible.addEventListener("hidden.bs.collapse", function () {
    document.getElementById(idDisplay).style.display = "inline-block";
    document.getElementById(idKey).className = "bi bi-chevron-down ms-auto";
  });

  myCollapsible.addEventListener("show.bs.collapse", function () {
    document.getElementById(idDisplay).style.display = "none";
    document.getElementById(idKey).className = "bi bi-chevron-up ms-auto";
  });
}

function changeArrow(iconID) {
  if (document.getElementById(iconID).className == "bi bi-chevron-up ms-auto") {
    document.getElementById(iconID).className = "bi bi-chevron-down ms-auto";
  } else {
    document.getElementById(iconID).className = "bi bi-chevron-up ms-auto";
  }
}

//#region Sidebar Controller

let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", () => {
  if (window.innerWidth > 605) {
    sidebar.classList.toggle("open");
    menuBtnChange(); //calling the function(optional)
  }
});

searchBtn.addEventListener("click", () => {
  if (window.innerWidth > 605) {
    // Sidebar open when you click on the search iocn
    sidebar.classList.toggle("open");
    menuBtnChange(); //calling the function(optional)
  }
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
  }
}



//#endregion Sidebar Controller

//#region parameters.html functions

//#region ScrollBar SpO2 
const rangeInput_SpO2 = document.querySelectorAll(
    ".wrapper-SpO2 .range-input input"
  ),
  valueInput_SpO2 = document.querySelectorAll(
    ".wrapper-SpO2 .value-input input"
  ),
  rangedown = document.querySelector(".wrapper-SpO2 .slider-SPO2 .preprogress"),
  range = document.querySelector(".wrapper-SpO2 .slider-SPO2 .progress"),
  rangeup = document.querySelector(".wrapper-SpO2 .slider-SPO2 .postprogress");
let valueGap_SpO2 = 2;

valueInput_SpO2.forEach((input) => {
  input.addEventListener("input", (e) => {
    updateBarInput(e);
  });
});

// For each input in the bar we run the funtion to update the bar style
rangeInput_SpO2.forEach((input) => {
  input.addEventListener("input", (e) => {
    updateBarScroll(e);
  });
});

// Function to update bar style when scrolling:
function updateBarScroll(e) {
  let minVal = parseInt(rangeInput_SpO2[0].value),
    maxVal = parseInt(rangeInput_SpO2[1].value);

  if (maxVal - minVal < valueGap_SpO2) {
    if (e.target.className === "range-min") {
      rangeInput_SpO2[0].value = maxVal - valueGap_SpO2;
    } else {
      rangeInput_SpO2[1].value = minVal + valueGap_SpO2;
    }
  } else {
    valueInput_SpO2[0].value = minVal;
    valueInput_SpO2[1].value = maxVal;

    SPo2_Min = (minVal / rangeInput_SpO2[0].max) * 100;

    SPo2_Max = (maxVal / rangeInput_SpO2[1].max) * 100;

    range.style.left = (minVal / rangeInput_SpO2[0].max) * 100 + "%";
    rangedown.style.right = 100 - (minVal / rangeInput_SpO2[0].max) * 100 + "%";

    range.style.right = 100 - (maxVal / rangeInput_SpO2[1].max) * 100 + "%";
    //rangeup.style.left =(maxVal / rangeInput_SpO2[1].max) * 100 + "%";
  }
}

// Function to update bar style when input value in box:
function updateBarInput(e) {
  let minValue = parseInt(valueInput_SpO2[0].value),
    maxValue = parseInt(valueInput_SpO2[1].value);

  if (
    maxValue - minValue >= valueGap_SpO2 &&
    maxValue <= rangeInput_SpO2[1].max
  ) {
    if (e.target.className === "input-min") {
      rangeInput_SpO2[0].value = minValue;
      range.style.left = (minValue / rangeInput_SpO2[0].max) * 100 + "%";
      rangedown.style.right =
        100 - (minValue / rangeInput_SpO2[0].max) * 100 + "%";
      range.style.right = 100 - (maxValue / rangeInput_SpO2[1].max) * 100 + "%";
    } else {
      rangeInput_SpO2[1].value = maxValue;
      range.style.right = 100 - (maxValue / rangeInput_SpO2[1].max) * 100 + "%";
    }
  }
}

//#endregion ScrollBar SpO2 


//#region ScrollBar RR 
const rangeInput_RR = document.querySelectorAll(
  ".wrapper-RR .range-input input"
),
valueInput_RR = document.querySelectorAll(".wrapper-RR .value-input input"),
redLow_RR = document.querySelector(".wrapper-RR .slider-RR .redLow"),
yelLow_RR = document.querySelector(".wrapper-RR .slider-RR .yelLow"),
greenCenter_RR = document.querySelector(
  ".wrapper-RR .slider-RR .greenCenter"
),
yelHigh_RR = document.querySelector(".wrapper-RR .slider-RR .yelHigh"),
redHigh_RR = document.querySelector(".wrapper-RR .slider-RR .redHigh");
let valueGap_RR = 2;

valueInput_RR.forEach((input) => {
input.addEventListener("input", (e) => {
  updateBarInput_RR(e);
});
});

// For each input in the bar we run the funtion to update the bar style
rangeInput_RR.forEach((input) => {
input.addEventListener("input", (e) => {
  updateBarScroll_RR(e);
});
});

function updateBarScroll_RR(e) {
let lowestVal = parseInt(rangeInput_RR[0].value),
  lowerVal = parseInt(rangeInput_RR[1].value),
  higerVal = parseInt(rangeInput_RR[2].value),
  highestVal = parseInt(rangeInput_RR[3].value);

/*----------------------------
# Higest/Higer interval
----------------------------*/
if (highestVal - higerVal < valueGap_RR) {
  if (e.target.className === "range-higher") {
    rangeInput_RR[2].value = highestVal - valueGap_RR;

    //valueInput_RR[2].value = highestVal - valueGap_RR;
  } else {
    rangeInput_RR[3].value = higerVal + valueGap_RR;
  }
} else {
  if (higerVal - lowerVal < valueGap_RR) {
    rangeInput_RR[2].value = lowerVal + valueGap_RR;
  } else {
    valueInput_RR[2].value = higerVal;
    yelHigh_RR.style.left = (higerVal / rangeInput_RR[2].max) * 100 + "%";
  }

  valueInput_RR[3].value = highestVal;

  RR_Higer = rangeInput_RR[2].value;

  RR_Highest = rangeInput_RR[3].value;

  yelHigh_RR.style.right =
    100 - (highestVal / rangeInput_RR[3].max) * 100 + "%";

  redHigh_RR.style.left = (highestVal / rangeInput_RR[3].max) * 100 + "%";
}
//#region Higer/Lower interval interval

/*----------------------------
# Higer/Lower interval
----------------------------*/

if (higerVal - lowerVal < valueGap_RR) {
  if (e.target.className === "range-lower") {
    rangeInput_RR[1].value = higerVal - valueGap_RR;
  } else {
    rangeInput_RR[2].value = lowerVal + valueGap_RR;
  }
} else {
  if (lowerVal - lowestVal < valueGap_RR) {
    rangeInput_RR[1].value = lowestVal + valueGap_RR;
  } else {
    valueInput_RR[1].value = lowerVal;
  }

  if (highestVal - higerVal < valueGap_RR) {
    valueInput_RR[2].value = rangeInput_RR[3].value - 2;
  }

  RR_Lower = (lowerVal / rangeInput_RR[1].max) * 100;

  RR_Higer = rangeInput_RR[2].value;

  greenCenter_RR.style.right =
    100 - (higerVal / rangeInput_RR[2].max) * 100 + "%";
}

//#endregion

//#region Lower/Lowest interval

/*----------------------------
# Lower/Lowest interval
----------------------------*/

if (lowerVal - lowestVal < valueGap_RR) {
  if (e.target.className === "range-lowest") {
    rangeInput_RR[0].value = lowerVal - valueGap_RR;
  } else {
    rangeInput_RR[1].value = lowestVal + valueGap_RR;
  }
} else {
  valueInput_RR[0].value = lowestVal;
  valueInput_RR[1].value = lowerVal;

  RR_Lowest = rangeInput_RR[0].value;

  RR_Lower = rangeInput_RR[1].value;

  redLow_RR.style.right =
    100 - (lowestVal / rangeInput_RR[0].max) * 100 + "%";
  greenCenter_RR.style.left = (lowerVal / rangeInput_RR[1].max) * 100 + "%";
  yelLow_RR.style.right = 100 - (lowerVal / rangeInput_RR[1].max) * 100 + "%";

  yelLow_RR.style.left = (lowestVal / rangeInput_RR[0].max) * 100 + "%";
}
//#endregion Lower/Lowest interval
}
//#endregion ScrollBar RR 

//FadeIn and FadeOut text
function tempText(idTxt) {
  document.getElementById(idTxt).classList.add("animate__fadeIn");

  setTimeout(function () {
    document.getElementById(idTxt).classList.add("animate__fadeOut");
    document.getElementById(idTxt).classList.remove("animate__fadeIn");
  }, 700);
  setTimeout(function () {
    document.getElementById(idTxt).classList.remove("animate__fadeOut");
  }, 1000);
}

function isChecked(idChecbox) {
  if (document.getElementById(idChecbox).checked == true) {
    return true;
  } else {
    return false;
  }
}

function update_Alarm(idChecbox) {
  if (isChecked(idChecbox)) {
    localStorage.setItem("AlarmState", "active");
  } else {
    localStorage.setItem("AlarmState", "inactive");
  }
}

function update_COMState(idChecbox) {
  if (isChecked(idChecbox)) {
    localStorage.setItem("COMState", "active");
  } else {
    localStorage.setItem("COMState", "inactive");
  }
}

//#endregion parameters.html functions

//#region Loading settings
function getAlarmState() {
  //#region Alarm Option State:
  if (localStorage.getItem("AlarmState") == null) {
    localStorage.setItem("AlarmState", AlarmState);
  } else if (localStorage.getItem("AlarmState") == "inactive") {
    document.getElementById("alarmChecbox").checked = false;
  } else {
    document.getElementById("alarmChecbox").checked = true;
  }

  if (isChecked("alarmChecbox")) {
    localStorage.setItem("AlarmState", "active");
  } else {
    localStorage.setItem("AlarmState", "inactive");
  }
  //#endregion Alarm Option State:

  //#region COM Data State:
  if (localStorage.getItem("COMState") == null) {
    localStorage.setItem("COMState", COMState);
  } else if (localStorage.getItem("COMState") == "inactive") {
    document.getElementById("digitalChecbox").checked = false;
  } else {
    document.getElementById("digitalChecbox").checked = true;
  }

  if (isChecked("digitalChecbox")) {
    localStorage.setItem("COMState", "active");
  } else {
    localStorage.setItem("COMState", "inactive");
  }
  //#endregion COM Data State:
}

//#endregion Loading settings

//#region Show COM: check if the COM option is checked/unchecked and show/hide the graph
function showCOM() {
  if (localStorage.getItem("COMState") == "active") { //If COM reception is actie show the graph
    console.log("Vedooooo");
    document.getElementById("COM").style.display = "block";
  } else if (localStorage.getItem("COMState") == "inactive") {//If COM reception is inactive  DON'T show the graph
    console.log("Non vedooooo");
    document.getElementById("COM").style.display = "none";
  }
}

//#endregion Show COM

function sayHi() {
  console.log("Hi");
}

function alarmOn() {
  if (localStorage.getItem("AlarmState") == "active") {
    //#region SpO2 parmaeters check:
    if (
      Po2_Perc >= localStorage.getItem("SPo2_Min") &&
      Po2_Perc < localStorage.getItem("SPo2_Max")
    ) {
      document.getElementById("spo2Left").classList.add("dangerYell");
    } else if (Po2_Perc < localStorage.getItem("SPo2_Min")) {
      document.getElementById("spo2Left").classList.add("dangerRed");
      document.getElementById("spo2Left").classList.remove("dangerYell");
    } else if (Po2_Perc > localStorage.getItem("SPo2_Max")) {
      document.getElementById("spo2Left").classList.remove("dangerYell");
      document.getElementById("spo2Left").classList.remove("dangerRed");
    }
    //#endregion SpO2 parmaeters check:

    //#region RR parmaeters check:
    
    if (
      RR <= localStorage.getItem("RR_Lowest") ||
      RR >= localStorage.getItem("RR_Highest")
    ) {
      document.getElementById("rr_Left").classList.add("dangerRed");
    } else if ( (RR > localStorage.getItem("RR_Lowest") && RR <= localStorage.getItem("RR_Lower") ) || ( RR > localStorage.getItem("RR_Higer") && RR <= localStorage.getItem("RR_Highest") ) ){
      document.getElementById("rr_Left").classList.remove("dangerRed");
      document.getElementById("rr_Left").classList.add("dangerYell");
    } else if ( RR > localStorage.getItem("RR_Lower") && RR <= localStorage.getItem("RR_Higer")) {
      document.getElementById("rr_Left").classList.remove("dangerYell");
      document.getElementById("rr_Left").classList.remove("dangerRed");
    }
    
    //#endregion RR parmaeters check:
  }
}

function printDate() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit'});

  return ( '' + timeString );  // convert to String
}

function saveLimSpO2(val, L_min, L_max) {

  if((parseFloat(val)>parseFloat(L_min)) && (parseFloat(val)<parseFloat(L_max))){
    s =val+","+printDate()+",Yellow"
    localStorage.setItem("SpO2_Lim", s);
  }
  if(parseFloat(val)<parseFloat(L_min)){
    s =val+","+printDate()+",Red"
      localStorage.setItem("SpO2_Lim", s);
  }
  
}


function saveLimRR(val, L_lowes, L_lower, L_Higer, L_Highest) {

  if(((parseFloat(val)>parseFloat(L_lowes)) && (parseFloat(val)<parseFloat(L_lower))) || ((parseFloat(val)>parseFloat(L_Higer)) && (parseFloat(val)<parseFloat(L_Highest)))){
    s =val+","+printDate()+",Yellow"
    localStorage.setItem("RR_Lim", s);
  }

  if((parseFloat(val)<parseFloat(L_lowes)) || ((parseFloat(val)>parseFloat(L_Highest)))){
    s =val+","+printDate()+",Red"
      localStorage.setItem("RR_Lim", s);
  }
  
}