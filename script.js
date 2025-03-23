let vermoeidheid = 0; // Startwaarde
let totaalReps = 0; // Aantal uitgevoerde herhalingen
let vermoeidheidTimer; // Timer voor dalen

function verhoogVermoeidheid(oefening) {
    if (vermoeidheid < 100) {
        vermoeidheid += 10; // Vermoeidheid stijgt
        updateVermoeidheidTekst();
    }

    // Rusten wanneer vermoeidheid 100 is
    if (vermoeidheid === 100) {
        document.getElementById("oefening-info").innerText = "Ik moet rusten, even wachten!";
        return;
    }

    // Reps optellen en game klaar
    totaalReps++;
    document.getElementById("oefening-info").innerText = `Je hebt ${oefening} gedaan! (${totaalReps}/30)`;
    controleerEindeSpel();

    // Verander de afbeelding op basis van de oefening
    veranderAfbeelding(oefening);

    // Reset de timer zodat het dalen pas begint na 3 sec rust
    clearTimeout(vermoeidheidTimer);
    vermoeidheidTimer = setTimeout(verlaagVermoeidheid, 3000);
}

// Verlaag vermoeidheid timer
function verlaagVermoeidheid() {
    if (vermoeidheid > 0) {
        vermoeidheid -= 10;
        updateVermoeidheidTekst();
        vermoeidheidTimer = setTimeout(verlaagVermoeidheid, 1000);
    }
}

function updateVermoeidheidTekst() {
    document.getElementById("vermoeidheid-level").innerText = vermoeidheid + "%";
}

// foto veranderen
function veranderAfbeelding(oefening) {
    let afbeelding = document.getElementById("oefening-foto");

    if (oefening === 'deadlift') {
        afbeelding.src = "images/deadlift_up.png";  // deadlift up      van het internet placeholder
        setTimeout(function () {
            afbeelding.src = "images/deadlift_down.png"; // deadlift down na 1 sec
        }, 1000);
    } else if (oefening === 'squat') {
        afbeelding.src = "images/squat_up.png";
        setTimeout(function () {
            afbeelding.src = "images/squat_down.png";
        }, 1000);
    } else if (oefening === 'pushup') {
        afbeelding.src = "images/pushup_up.png";
        setTimeout(function () {
            afbeelding.src = "images/pushup_down.png";
        }, 1000);
    } else if (oefening === 'curls') {
        afbeelding.src = "images/curls_up.png";
        setTimeout(function () {
            afbeelding.src = "images/curls_down.png";
        }, 1000);
    } else if (oefening === 'shoulders') {
        afbeelding.src = "images/shoulders_up.png";
        setTimeout(function () {
            afbeelding.src = "images/shoulders_down.png";
        }, 1000);
    } else if (oefening === 'raises') {
        afbeelding.src = "images/raises_up.png";
        setTimeout(function () {
            afbeelding.src = "images/raises_down.png";
        }, 1000);
    }
}

// Game einde
function controleerEindeSpel() {
    if (totaalReps >= 4) {
        document.getElementById("oefening-info").innerText = "🎉 Je hebt 30 herhalingen gedaan! Genoeg voor vandaag!";

        document.getElementById("oefening-foto").src = "images/klaar.jpg";
    }
}