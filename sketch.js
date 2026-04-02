let capture, pg;
let isPlaying = false, hY = 0, hV = 0, obsX = 350;
const words = ["Behind the little puppets, there is always a beautiful story. Take the time to dream.", "Overheating emmotionel", "Be safe", "You are beautiful"];

function setup() {
    createCanvas(windowWidth, windowHeight);
    pg = createGraphics(windowWidth, windowHeight);
    pg.clear(); 
    
    capture = createCapture(VIDEO);
    capture.size(360, 200);
    capture.hide();
}

function draw() {
    clear(); // Nettoie le canvas principal pour voir fond + vidéo

    // 1. Effet de traînée sur le calque de bug uniquement
    pg.push();
    pg.blendMode(REMOVE);
    pg.fill(255, 255, 255, 15); 
    pg.rect(0, 2, width, height);
    pg.pop();

    // 2. Gestion de la capture vidéo avec effet de tranches
    if (capture) {
        // Suppression du pg.pop() en trop qui traînait au début de ton if
        for (let i = 0; i < 10; i++) {
            let h = capture.height / 10;
            let y = i * h;
            let xOffset = random(-1, 1);
            pg.copy(capture, 0, y, capture.width, h, 15 + xOffset, 15 + y, 300, h);
        }
        // J'ai corrigé tes filtres : INVERT n'a pas besoin de "2"
        pg.filter(INVERT); 
        pg.filter(INVERT); // Un petit posterize pour le style
    }

    // 3. Texte qui suit la souris sur le calque de bug
    if (mouseX !== 0 || mouseY !== 0) {
        pg.fill(0, 255, 0);
        pg.noStroke();
        pg.textSize(12);
        pg.text(random(words), mouseX + 15, mouseY);
    }

    // ⚠️ --- AJOUT DE LA LOGIQUE DU SECRET ICI --- ⚠️
    // On définit le point secret (ex: en haut à droite)
    let triggerX = width - 100; 
    let triggerY = 100; 
    let d = dist(mouseX, mouseY, triggerX, triggerY);
    
    // On va chercher l'élément HTML du nouveau GIF
    let secret = document.getElementById('photo-secret');
    if (secret) {
        if (d < 180) { // Si la souris est proche (moins de 180px)
            secret.style.opacity = "1";
        } else {
            secret.style.opacity = "0";
        }
    }
    // ⚠️ ------------------------------------------ ⚠️

    image(pg, 0, 0); // On affiche le calque de bug

    if (isPlaying) drawHorseGame();
}
// Configuration du texte à taper
const bootText = "LOADING VERACRUZ_ROOT...\nSYSTEM: OK\nNETWORK: CONNECTED\nSTATUS: ENCRYPTED...\nREADY FOR RECONSTRUCTION.";
let charIndex = 0;

// Cette fonction se lance au chargement de la page
window.onload = function() {
    // 1. On essaie de lancer le son (Attention: certains navigateurs bloquent l'auto-play)
    let modem = document.getElementById('modem-sound');
    modem.play().catch(e => console.log("Le son attend une interaction."));

    // 2. On lance l'effet machine à écrire
    runTypewriter();
};

function runTypewriter() {
    if (charIndex < bootText.length) {
        document.getElementById("typewriter").innerHTML += bootText.charAt(charIndex);
        charIndex++;
        // Vitesse : 50 millisecondes entre chaque lettre
        setTimeout(runTypewriter, 50); 
    } else {
        // Une fois fini, on montre le bouton "Enter"
        document.getElementById("enter-btn").style.display = "block";
    }
}

// Fonction pour fermer l'écran et entrer sur le site
function startSystem() {
    let screen = document.getElementById('boot-screen');
    let modem = document.getElementById('modem-sound');
    
    // On coupe le son et on cache l'écran
    modem.pause();
    screen.style.display = "none";
    
    // Optionnel : Lancer ton jeu ou une musique de fond ici
    console.log("System Started");
}
// ... (Le reste de tes fonctions drawHorseGame, openWin, etc. ne change pas)