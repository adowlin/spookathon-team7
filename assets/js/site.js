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

// Run functions when the page has loaded.
window.addEventListener('load',function(){
    document.getElementById("title-page-art-owl").addEventListener("click", owlAction, false);
    addBats(3);
    setInterval(batFlutter, 50);
    slideUp.forEach(slider => {
        slideUpOnScroll.observe(slider);
    })
});

// Intersection Observers
const slideUp = document.querySelectorAll('.slide-up');

// Observer options
const options = {
    root: null,
    // Section needs to be 100% on screen before triggering
    threshold: 0,
    //rootMargin: "0px 0px -500px 0px"
};

const slideUpOnScroll = new IntersectionObserver(function(entries, slideUpOnScroll) {
    entries.forEach(entry => {
        console.log(entry.target, entry.isIntersecting);
        if(!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            slideUpOnScroll.unobserve(entry.target);
        }
    })
}, options);


