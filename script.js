console.log("alive and well");
const lock = document.querySelector('#lock');
const setting = document.querySelector('#setting');
let navbar = document.getElementById("navbar");
let battery = navigator.getBattery();
let performance = window.performance;
navbar.style.display = "inline-flex";

const pHour = document.createElement("p");
pHour.classList.add("hourConf");

const pMin = document.createElement("p");
pMin.classList.add("minConf");

const pSec = document.createElement("p");
pSec.classList.add("secConf");

const pAn = document.createElement("p");
pAn.classList.add("anConf");

const pMois = document.createElement("p");
pMois.classList.add("moisConf");

const pJour = document.createElement("p");
pJour.classList.add("jourConf");

const pBatt = document.createElement("p");
pBatt.classList.add("battConf");

setInterval(function() {
    navbar.innerHTML = "";
    let date = new Date();
    let heure = date.getHours();

    pHour.innerHTML = "";
    let txtHour = document.createTextNode(heure + ":");
    pHour.appendChild(txtHour);

    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = "0".concat(minutes);
    }

    pMin.innerHTML = "";
    let txtMin = document.createTextNode(minutes);
    pMin.appendChild(txtMin);

    let secondes = date.getSeconds();
    if (secondes < 10) {
      secondes = "0".concat(secondes);
    }

    pSec.innerHTML = "";
    let txtSec = document.createTextNode(":"+secondes);
    pSec.appendChild(txtSec);

    let jour = date.getDate();

    pJour.innerHTML = "";
    let txtJour = document.createTextNode(jour + "/");
    pJour.appendChild(txtJour);

    let mois = date.getMonth() + 1;
    if (mois < 10) {
      mois = "0".concat(mois);
    }
    pMois.innerHTML = "";
    let txtMois = document.createTextNode(mois + "/");
    pMois.appendChild(txtMois);

    let annee = date.getFullYear();

    pAn.innerHTML = "";
    let txtAn = document.createTextNode(annee);
    pAn.appendChild(txtAn);

    navbar.appendChild(pHour);
    navbar.appendChild(pMin);
    navbar.appendChild(pSec);

    const sp = document.createElement("p");
    let txtSp = document.createTextNode("");
    sp.appendChild(txtSp);
    sp.style.marginLeft = "10px";
    sp.style.marginRight = "10px";

    navbar.appendChild(sp);

    navbar.appendChild(pJour);
    navbar.appendChild(pMois);
    navbar.appendChild(pAn);

    const sp1 = document.createElement("p");
    sp1.appendChild(txtSp);
    sp1.style.marginLeft = "10px";
    sp1.style.marginRight = "10px";

    navbar.appendChild(sp1);

    battery.then(function(battery) {
      pBatt.innerHTML = "";

      let batteryLevel = battery.level;
      let batteryCharging = battery.charging ? "⚡" : "🔋";

      let txtBatt = document.createTextNode("  Battery: " + Math.round(batteryLevel * 100) + "% (" + batteryCharging + ")");
      pBatt.appendChild(txtBatt);

      navbar.appendChild(pBatt);
    });
  }, 1000);

lock.addEventListener("click", function() {
  const newDiv = document.createElement("div");
  newDiv.style.position = "absolute";
  newDiv.style.width = "100%";
  newDiv.style.top = "0%";
  newDiv.style.color = "white";
  newDiv.style.zIndex = "99";
  newDiv.style.opacity = "85%";
  newDiv.style.display = "flex";
  newDiv.style.alignItems = "center";
  newDiv.style.justifyContent = "center";
  newDiv.style.background = "linear-gradient(to left top, grey, black)";
  document.documentElement.append(newDiv);

  var x=0;
  var interval = setInterval(function() {
    x++;
    let StrX = x.toString();
    newDiv.style.height = StrX.concat('%');
    if(x === 100){
        clearInterval(interval);
        const divTime = document.createElement("div");
        divTime.style.color = "white";
        divTime.style.position = "absolute";
        divTime.style.fontSize = "50px";
        divTime.style.fontWeight = "bold";
        divTime.style.fontFamily = "system-ui";

        const spanTime = document.createElement("span");
        divTime.appendChild(spanTime);
        newDiv.appendChild(divTime);

        var intervalTime = setInterval(function() {
            spanTime.innerHTML = "";
            let date = new Date();
            let heure = date.getHours();
            let minutes = date.getMinutes();
            if (minutes < 10) {
              minutes = "0".concat(minutes);
            }
            let secondes = date.getSeconds();
            if (secondes < 10) {
              secondes = "0".concat(secondes);
            }
            let txtTime = document.createTextNode(heure + ":" + minutes + ":" + secondes);
            spanTime.appendChild(txtTime);
            const body = document.querySelector('body');
            document.documentElement.addEventListener("click", function() {
              clearInterval(intervalTime);
              var intervalUnlock = setInterval(function() {
                x--;
                let StrX = x.toString();
                newDiv.style.height = StrX.concat('%');
                if(x === 0){
                    clearInterval(intervalUnlock);
                    newDiv.remove();
                }
              }, 10);
            });
        }, 1000);
    }
  }, 3);

});


setting.addEventListener("click", function() {

  var settCheck = document.getElementsByClassName('settMult');

  if (settCheck.length == 0) {

    const divSett = document.createElement("div");
    divSett.style.color = "white";
    divSett.style.position = "fixed";
    divSett.style.fontSize = "20px";
    divSett.style.fontWeight = "bold";
    divSett.style.width = "60%";
    divSett.style.height = "50%";
    divSett.style.top = "25%";
    divSett.style.left = "20%";
    divSett.style.zIndex = "5";
    divSett.style.fontFamily = "Montserrat";
    divSett.style.overflowY = "scroll";
    divSett.style.paddingLeft = "20px";
    divSett.style.background = "linear-gradient(to left top, rgb(20, 20, 24), rgb(173, 156, 156))";

    divSett.classList.add("settMult");

    divSett.innerHTML = `<p>Configuration de l'heure:</p>

                      <ul><li><label style="margin-right: 20px; font-family:"Montserrat";" for="heure">Afficher/masquer l'heure</label><label class="switch">
                        <input id="heure" type="checkbox" checked>
                        <span class="slider round"></span>
                      </label></li>
                      <li><label style="margin-right: 20px;" for="minute">Afficher/masquer les minutes</label><label class="switch">
                        <input id="minute" type="checkbox" checked>
                        <span class="slider round"></span>
                      </label></li>
                      <li><label style="margin-right: 20px;" for="seconde">Afficher/masquer les secondes</label><label class="switch">
                        <input id="seconde" type="checkbox" checked>
                        <span class="slider round"></span>
                      </label></li>
                      </ul></br>
                      `;

    divSett.innerHTML += `<p>Configuration de la date:</p>

                        <ul><li><label style="margin-right: 20px;" for="jour">Afficher/masquer le jour</label><label class="switch">
                          <input id="jour" type="checkbox" checked>
                          <span class="slider round"></span>
                        </label></li>
                        <li><label style="margin-right: 20px;" for="mois">Afficher/masquer le mois</label><label class="switch">
                          <input id="mois" type="checkbox" checked>
                          <span class="slider round"></span>
                        </label></li>
                        <li><label style="margin-right: 20px;" for="annee">Afficher/masquer l'année'</label><label class="switch">
                          <input id="annee" type="checkbox" checked>
                          <span class="slider round"></span>
                        </label></li>
                        </ul></br>
                        `;

    divSett.innerHTML += `<p>Configuration de la vibration:</p>

                        <ul><li><label style="margin-right: 20px;" for="jour">Afficher/masquer l'état de la vibration'</label><label class="switch">
                          <input id="vibrat" type="checkbox" checked>
                          <span class="slider round"></span>
                        </label></li>
                        <li><label style="margin-right: 20px;" for="mois">Activer/désactiver les retours haptiques</label><label class="switch">
                          <input id="haptique" type="checkbox" checked>
                          <span class="slider round"></span>
                        </label></li>
                        </ul></br>
                        `;
              
    divSett.innerHTML += `<p>Configuration de la batterie</p>

                        <ul><li><label style="margin-right: 20px;" for="jour">Afficher/masquer l'état de la batterie</label><label class="switch">
                          <input id="batterie" type="checkbox" checked>
                          <span class="slider round"></span>
                        </label></li>
                        </ul></br>
                        `;

    const divClose = document.createElement("div");
    const iTag = document.createElement("i");

    iTag.classList.add("fa", "fa-close");
    divClose.appendChild(iTag);

    divClose.style.position = "absolute";
    divClose.style.top = "10px";
    divClose.style.right = "10px";
    divClose.classList.add("closeSett");

    divSett.appendChild(divClose);

    document.body.append(divSett);

    var hour = document.getElementById('heure');
    hour.addEventListener('change', function(){
      var hC = document.querySelector('.hourConf');
      if (hour.checked == false) {
        hC.style.display = "none";
      }else{
        hC.style.display = "block";
      }
    });

    var min = document.getElementById('minute');
    min.addEventListener('change', function(){
      var mC = document.querySelector('.minConf');
      if (min.checked == false) {
        mC.style.display = "none";
      }else{
        mC.style.display = "block";
      }
    });

    var sec = document.getElementById('seconde');
    sec.addEventListener('change', function(){
      var sC = document.querySelector('.secConf');
      if (sec.checked == false) {
        sC.style.display = "none";
      }else{
        sC.style.display = "block";
      }
    });

    var jour = document.getElementById('jour');
    jour.addEventListener('change', function(){
      var dC = document.querySelector('.jourConf');
      if (jour.checked == false) {
        dC.style.display = "none";
      }else{
        dC.style.display = "block";
      }
    });

    var mois = document.getElementById('mois');
    mois.addEventListener('change', function(){
      var dC = document.querySelector('.moisConf');
      if (mois.checked == false) {
        dC.style.display = "none";
      }else{
        dC.style.display = "block";
      }
    });

    var an = document.getElementById('annee');
    an.addEventListener('change', function(){
      var dC = document.querySelector('.anConf');
      if (an.checked == false) {
        dC.style.display = "none";
      }else{
        dC.style.display = "block";
      }
    });

    var batt = document.getElementById('batterie');
    batt.addEventListener('change', function(){
      var dC = document.querySelector('.battConf');
      if (batt.checked == false) {
        dC.style.display = "none";
      }else{
        dC.style.display = "block";
      }
    });

    const closeSett = document.querySelector('.closeSett');
    closeSett.addEventListener("click", function() {
      document.body.removeChild(divSett);
    });
    }

});

