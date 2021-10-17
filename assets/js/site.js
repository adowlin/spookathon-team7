// Return a random number between 2 passed in numbers
function getRandomBetweenRange(min, max) {
    if (max < min) {
        console.log("Incorrect values passed to getRandomBetweenRange. Max should be > min");
        return 0;
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// On click action for owl on title page
function owlAction() {
    let actionElement = document.getElementById("title-page-art-owl-action");
    // Play audio on click. Sound effect obtained from https://www.zapsplat.com (https://www.zapsplat.com/music/owl-hoot-nighttime-1/) 
    let audioHoot = new Audio("assets/audio/owlhoot.mp3");
    audioHoot.play();
    // Set text opacity to 1 so it's visible
    actionElement.style.opacity = "1";
    // Set text to opacity 0 after 2s
    window.setTimeout(function() {
        opacityZero(actionElement);
    }, 2000);
}

// Toggle the visibility of an element
function toggleVisibility(element) {
    if(element.style.display != "block") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

// Set opacity of passed in element to 0
function opacityZero(element) {
    element.style.opacity = "0";
}

// Spawn bats on title page
function addBats(numBats) {
    let batSpawner = document.getElementById("title-page-art-bat-spawner");
    // Loop through number of bats passed in
    for(let i = 0; i < numBats; i++) {
        // Spawn at random position between 20 and 200 px from top of window
        let batTop = getRandomBetweenRange(20, 200);
        // Spawn at random position off the left of the screen, so they fly in at different intervals
        let batLeft = getRandomBetweenRange(-(window.innerWidth), -10);
        // Add bat element HTML to page
        let batHTML = `<img src="assets/images/title_bat.svg" alt="" class="art bat" id="title-page-art-bat" style="top: ${batTop}px; left: ${batLeft}px">`
        batSpawner.innerHTML += batHTML;
    }
}

// Move any bats that are on the page
function batFlutter() {
    let bats = document.getElementsByClassName("bat");
    for(let bat of bats){
        // Update bat vertical position so it looks like it's flapping around.
        let batTop = parseInt(bat.style.top, 10);
        batTop += getRandomBetweenRange(-5, 5);
        
        // Update bat left position so it moves across the screen
        let batLeft = parseInt(bat.style.left, 10);
        // If bat has gone off the right of the screen, re-spawn it on the left
        if(batLeft > window.innerWidth) {
            batLeft = getRandomBetweenRange(-(window.innerWidth), -10);
            batTop = getRandomBetweenRange(20, 200);
        } else {
            batLeft += getRandomBetweenRange(5, 10);
        }

        // Set new position on bat element
        bat.style.top = batTop + "px";
        bat.style.left = batLeft + "px";
    }
}

// Function to add CCS animation class to witch on page 1
function witchAnimate() {
    let witch = document.getElementById("page-one-art-witch");
    // Audio credit: https://www.freesoundeffects.com/free-track/cackle3-466439/
    let audioCackle = new Audio("assets/audio/cackle3.mp3");
    witch.classList.toggle("move-right");
    // Play audio on click if animation is also triggered
    if (witch.classList.contains("move-right")) {
        audioCackle.play();
    }
}

// Function for "Begin Story" audio
function beginAudio() {
    let audioLaugh = new Audio("assets/audio/evil-laugh.mp3");
    audioLaugh.play();
}

// Run functions when the page has loaded.
window.addEventListener('load',function(){
    document.getElementById("title-page-art-owl").addEventListener("click", owlAction, false);
    document.getElementById("page-one-art-witch").addEventListener("click", witchAnimate);
    document.getElementById("title-page-button").addEventListener("click", beginAudio);
    addBats(3);
    setInterval(batFlutter, 50);
    
    animateOnScroll.forEach(slider => {
        actionOnScroll.observe(slider);
    })
});

// Intersection Observers
const animateOnScroll = document.querySelectorAll('.animate-on-scroll');

// Observer options
const options = {
    root: null,
    // Section needs to be 100% on screen before triggering
    threshold: 0,
    rootMargin: "0px 0px 0px -500px"
};

const actionOnScroll = new IntersectionObserver(function(entries, actionOnScroll) {
    entries.forEach(entry => {
        console.log(entry.target, entry.isIntersecting);
        if(!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            actionOnScroll.unobserve(entry.target);
        }
    })
}, options);

// page 4 animations (JQuery)

$(document).ready(function() {
    
    $("#page-four").mouseenter(function() {
        $("#fog-above-monster").fadeOut(5000);
    }).mouseleave(function() {
        $("#fog-above-monster").fadeIn(2000);
    });

    $("#monster").mouseleave(function(){
        // $(this).css({left: 0})
        $(this).addClass("make-biger");
    });

    $("#monster").mouseenter(function(){
        // $(this).css({left: 0})
        $(this).removeClass("make-biger");
    });

    
});
