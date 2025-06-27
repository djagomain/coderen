// Variable reps vermoeidheid 
let vermoeidheid = 0;
let totaalReps = 0;

// Timers 
let vermoeidheidTimer;
let timerNaarDown;
let timerNaarWacht;
let timerVermoeidheid; 

// Knop voor gym muziek
const oortjesKnop = document.getElementById("oortjes-knop");
const gymMuziekElementen = [
  document.getElementById("gym-muziek-1"),
  document.getElementById("gym-muziek-2"),
  document.getElementById("gym-muziek-3"),
  document.getElementById("gym-muziek-4"),
];

let actieveGymMuziek = null; // Houdt bij welke gym muziek nu speelt

// muziek stukje eingen onderzoek 
oortjesKnop.addEventListener("click", () => {
  // Check of er geen muziek speelt of pauze staat
  if (!actieveGymMuziek || actieveGymMuziek.paused) {
    // Kies random muziek
    const randomIndex = Math.floor(Math.random() * gymMuziekElementen.length);
    actieveGymMuziek = gymMuziekElementen[randomIndex];

    // Start muzeik
    actieveGymMuziek.currentTime = 0;
    actieveGymMuziek.play();

    // tekst knop 
    oortjesKnop.textContent = "⏸️ Oortjes uit";

    // Hier kun je eventueel andere muziek pauzeren als die speelt
  } else {
    // Muziek pauzeren als die al speelt
    actieveGymMuziek.pause();

    // teskt knop weer aan 
    oortjesKnop.textContent = "▶️ Oortjes aan";
  }
});

// Alle oefening knoppen koppelen 
document.querySelectorAll('button[data-oefening]').forEach(button => {
    button.addEventListener('click', () => {
        const oefening = button.getAttribute('data-oefening');
        verhoogVermoeidheid(oefening);
    });
});

// Functie die de vermoeidheid verhoogt bij een oefening
function verhoogVermoeidheid(oefening) {
    // Als vermoeidheid nog onder 100% zit, verhogen we die met 15%
    if (vermoeidheid < 100) {
        vermoeidheid += 15;
        updateVermoeidheidTekst();
    }

    // Als vermoeidheid 70% of hoger vermoeidfoto en tekst 
    if (vermoeidheid >= 70) {
        document.getElementById("oefening-info").innerText = "Ik moet rusten, even wachten!";
        
        const afbeelding = document.getElementById("oefening-foto");
        afbeelding.src = "images/vermoeid.jpg"; 

        // Na 3 seconden verandert de afbeelding weer naar 'wachten'
        clearTimeout(timerVermoeidheid); // voorkom stapeling timers
        timerVermoeidheid = setTimeout(() => {
            afbeelding.src = "images/wachten.jpg";
        }, 3000);

    
        return;
    }

    // reps teller functie 
    totaalReps++;

    // Update tekst met welke oefening en hoeveel reps totaal
    document.getElementById("oefening-info").innerText = `Je hebt ${oefening} gedaan! (${totaalReps}/30)`;

    // Check of het spel (30 reps) al voorbij is
    controleerEindeSpel();

    // Wissel de afbeelding die de beweging laat zien
    veranderAfbeelding(oefening);

    // Reset en start een timer om vermoeidheid langzaam te laten zakken
    clearTimeout(vermoeidheidTimer);
    vermoeidheidTimer = setTimeout(verlaagVermoeidheid, 3000);
}

// Wisselt de oefening-afbeelding: eerst 'up', dan na 1.2 sec 'down', daarna 'wachten'
function veranderAfbeelding(oefening) {
    if (totaalReps >= 30) return; // Als klaar, geen animatie meer

    const afbeelding = document.getElementById("oefening-foto");

    // Stop bestaande timers om flikkering te voorkomen
    clearTimeout(timerNaarDown);
    clearTimeout(timerNaarWacht);

    // Toon direct de 'up' positie
    afbeelding.src = `images/${oefening}_up.jpg`;

    // Na 1.2 seconden toon 'down' positie
    timerNaarDown = setTimeout(() => {
        afbeelding.src = `images/${oefening}_down.jpg`;

        // Na 1.5 seconden daarna weer terug naar wacht afbeelding
        timerNaarWacht = setTimeout(() => {
            afbeelding.src = "images/wachten.jpg";
        }, 1500);
    }, 1200);
}

// Laat vermoeidheid langzaam zakken als je even niks doet
function verlaagVermoeidheid() {
    if (vermoeidheid > 0) {
        vermoeidheid -= 10; // Verlaag met 10
        updateVermoeidheidTekst();

        // verlaagvermoeidheid 10 p/s 
        vermoeidheidTimer = setTimeout(verlaagVermoeidheid, 1000);
    }
}

// Update de tekst die de vermoeidheid weergeeft
function updateVermoeidheidTekst() {
    document.getElementById("vermoeidheid-level").innerText = vermoeidheid + "%";
}

// Controleer einde spel 30  laat klaar foto zien 
function controleerEindeSpel() {
    if (totaalReps >= 30) {
        document.getElementById("oefening-info").innerText = "🎉 Je hebt 30 herhalingen gedaan! Genoeg voor vandaag!";
        document.getElementById("oefening-foto").src = "images/klaar.jpg";

        // Stop timers zodat animatie stopt
        clearTimeout(timerNaarDown);
        clearTimeout(timerNaarWacht);
    }
}
