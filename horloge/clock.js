var heuresDiv = document.querySelector('.heures');
var dateDiv = document.querySelector('.date');

var affichageHeure = function(){
    // Déclaration des variables qui seront utilisées : 
    var today, annee, listeMois, mois, listeJours, jourNUmero, jourNom, heures, minutes, secondes, deuxChiffres;

    // Récupérer la date actuelle : 
    today = new Date();

    // Récupérer l'année : 
    annee = today.getFullYear();

    //Récupérer le mois : 
    listeMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    mois = listeMois[today.getMonth()]; //getMonth() donne l'index 1 comme on est en Février, ce qui donne la valeur "Février" depuis notre liste

    // Récupérer le numéro du jour du mois : 
    jourNUmero = today.getDate(); //donne 29

    // Récupérer le jour. Attention la semaine commence un dimanche en Javascript : 
    listeJours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    jourNom = listeJours[today.getDay()]; // getDay() donne index 6, donc samedi


    //Afficher les heures, minutes et secondes toujours avec deux chiffres : 
    deuxChiffres = function(element){
        if(element < 10){
            return element = "0" + element;
        } else {
            return element;
        }
    }

    // Récupérer les heures : 
    heures = deuxChiffres(today.getHours());

    // Récupérer les minutes : 
    minutes = deuxChiffres(today.getMinutes());

    // Récupérer les secondes : 
    secondes = deuxChiffres(today.getSeconds());

    //Affichage dans nos DIV du HTML : 
    heuresDiv.textContent = heures + ":" + minutes + ":" + secondes;
    dateDiv.textContent = jourNom + ", " + jourNUmero + " " + mois + " " + annee;

    // Lancer la fonction affichage heure toutes les 1000 ms, soit toute les secondes : 
    setTimeout(affichageHeure, 1000);
}

//Lancer la fonction une fois au début : 
affichageHeure();

/*--------------------------Minuteurs--------------------------*/
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resumeButton = document.getElementById('resume');
const resetButton = document.getElementById('reset');
const timerDisplay = document.getElementById('timer');

let timeLeft = 0;
let intervalId;

function startTimer() {
  const minutes = parseInt(minutesInput.value);
  const seconds = parseInt(secondsInput.value);

  if (isNaN(minutes) || minutes < 0 || isNaN(seconds) || seconds < 0 || seconds > 59) {
    alert('Entrez des valeurs valides');
    return;
  }

  timeLeft = minutes * 60 + seconds;

  startButton.disabled = true;
  stopButton.disabled = false;
  resumeButton.disabled = true;
  resetButton.disabled = true;

  intervalId = setInterval(() => {
    timeLeft--;

    if (timeLeft === 0) {
      stopTimer();
      playSound();
    }

    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
  resumeButton.disabled = false;
  resetButton.disabled = false;
}

function resumeTimer() {
  startButton.disabled = true;
  stopButton.disabled = false;
  resumeButton.disabled = true;
  resetButton.disabled = true;

  intervalId = setInterval(() => {
    timeLeft--;

    if (timeLeft === 0) {
      stopTimer();
      playSound();
    }

    updateTimerDisplay();
  }, 1000);
}

function resetTimer() {
  clearInterval(intervalId);
  minutesInput.value = '1';
  secondsInput.value = '0';
  timerDisplay.textContent = '';
  startButton.disabled = false;
  stopButton.disabled = true;
  resumeButton.disabled = true;
  resetButton.disabled = true;
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  timerDisplay.textContent = timeString;
}

function playSound() {
  const audio = new Audio('./file.mp3');
  audio.play();
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resumeButton.addEventListener('click', resumeTimer);
resetButton.addEventListener('click', resetTimer);


/*--------------------------Chronomètre--------------------------*/
var timer = document.getElementById('chrono');
var startBtn = document.getElementById('startBtn');
var pauseBtn = document.getElementById('pauseBtn');
var resetBtn = document.getElementById('resetBtn');

var time = 0;
var interval;
var isRunning = false; // Ajout de la variable isRunning

startBtn.addEventListener('click', function() {
  if (!isRunning) { // Exécute le code seulement si le chronomètre est arrêté
    interval = setInterval(function() {
      time++;
      timer.innerHTML = formatTime(time);
    }, 1000);
    isRunning = true; // Passe l'état à "démarré"
  }
  startBtn.disabled = true; // Désactive le bouton "Start" pour éviter les clics multiples
});

pauseBtn.addEventListener('click', function() {
  clearInterval(interval);
  isRunning = false; // Passe l'état à "arrêté"
  startBtn.disabled = false; // Réactive le bouton "Start"
});

resetBtn.addEventListener('click', function() {
  time = 0;
  timer.innerHTML = formatTime(time);
  clearInterval(interval);
  isRunning = false; // Passe l'état à "arrêté"
  startBtn.disabled = false; // Réactive le bouton "Start"
});

function formatTime(time) {
  var hours = Math.floor(time / 3600);
  var minutes = Math.floor((time - hours * 3600) / 60);
  var seconds = time - hours * 3600 - minutes * 60;
  return (
    padZero(hours) + ':' + padZero(minutes) + ':' + padZero(seconds)
  );
}

function padZero(num) {
  if (num < 10) {
    return '0' + num;
  } else {
    return num;
  }
}
