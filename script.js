// Disable swipe to navigate back (only affecting touch start and move)
document.addEventListener('touchstart', function(event) {
    // Block swipe navigation only if the user is swiping from the left edge of the screen
    // without affecting other touch events such as dragging puzzle pieces
    if (event.touches.length === 1 && event.touches[0].clientX < 50) {
        event.preventDefault();  // Disable swipe gesture (left)
    }
}, { passive: false });

// Prevent the swipe gesture for touchmove if necessary
document.addEventListener('touchmove', function(event) {
    event.preventDefault(); // Prevent swipe gestures while moving
}, { passive: false });




var pieces = $(".piece");

var width = 100;
var height = 100;
var rows = 5;
var cols = 5;

var outline = null;
var selectedPiece = null;

//correct locations
const correctPositions = {
    a1: { top: 300, left: 900 },
    a2: { top: 300, left: 800 },
    a3: { top: 500, left: 1000 },
    a4: { top: 500, left: 800 },
    a5: { top: 400, left: 900 },
    a6: { top: 300, left: 800 },
    
    b1: { top: 250, left: 750 },
    b2: { top: 450, left: 850 },
    b3: { top: 450, left: 750 },
    b4: { top: 350, left: 750 },
    b5: { top: 350, left: 1050 },
    b6: { top: 250, left: 850 },
    b7: { top: 550, left: 750 },
    b8: { top: 350, left: 850 },
    b9: { top: 550, left: 1150 },
    b10: { top: 550, left: 950 },

    c1: { top: 500, left: 800 },
    c2: { top: 500, left: 800 },
    c3: { top: 600, left: 800 },
    c4: { top: 300, left: 800 },
    c5: { top: 400, left: 1100 },
    c6: { top: 300, left: 1000 },
    c7: { top: 300, left: 800 },
    c8: { top: 300, left: 900 },
    c9: { top: 600, left: 1000 },
    c10: { top: 600, left: 1100 },
    c11: { top: 400, left: 800 },

    d1: { top: 475, left: 775 },
    d2: { top: 375, left: 825 },
    d3: { top: 375, left: 825 },
    d4: { top: 475, left: 775 },
    d5: { top: 575, left: 775 },
    d6: { top: 675, left: 875 },
    d7: { top: 575, left: 825 },
    d8: { top: 575, left: 1025 },
    d9: { top: 575, left: 875 },
    d10: { top: 625, left: 1075 },
    d11: { top: 275, left: 775 },
    d12: { top: 575, left: 775 },
    d13: { top: 375, left: 775 },
    d14: { top: 475, left: 875 },

    e1: { top: 450, left: 750 },
    e2: { top: 550, left: 850 },
    e3: { top: 350, left: 950 },
    e4: { top: 250, left: 900 },
    e25: { top: 350, left: 800 },
    e6: { top: 450, left: 1000 },
    e7: { top: 450, left: 850 },
    e8: { top: 550, left: 900 },
    e9: { top: 400, left: 1150 },
    e10: { top: 450, left: 1250 },
    e11: { top: 450, left: 1050 },
    e12: { top: 500, left: 1000 },
    e13: { top: 250, left: 950 },
    e14: { top: 350, left: 850 },
    e15: { top: 500, left: 950 },
    e16: { top: 250, left: 1000 },
    e17: { top: 350, left: 1050 },
    e18: { top: 400, left: 700 },
    e19: { top: 400, left: 1000 },
    e20: { top: 500, left: 700 },
    e21: { top: 550, left: 1100 },
    e22: { top: 700, left: 900 },
    e23: { top: 700, left: 1050 },
    e24: { top: 200, left: 950 },

    f1: { top: 590, left: 1100 },
    f2: { top: 410, left: 600 },
    f3: { top: 500, left: 1100 },
    f4: { top: 140, left: 750 },
    f5: { top: 320, left: 850 },
    f6: { top: 320, left: 1000 },
    f7: { top: 320, left: 1150 },
    f8: { top: 140, left: 1100 },
    f9: { top: 680, left: 750 },
    f10: { top: 410, left: 750 },
    f11: { top: 590, left: 650 },
    f12: { top: 140, left: 900 },
    f13: { top: 680, left: 1000 },
    f14: { top: 500, left: 900 },
    f15: { top: 230, left: 600 },
    f16: { top: 680, left: 950 },

    g1: { top: 590, left: 1100 },
    g2: { top: 680, left: 1125 },
    g3: { top: 455, left: 875 },
    g4: { top: 635, left: 950 },
    g5: { top: 635, left: 925 },
    g6: { top: 725, left: 675 },
    g7: { top: 185, left: 950 },
    g8: { top: 770, left: 1275 },
    g9: { top: 545, left: 1150 },
    g10: { top: 590, left: 850 },
    g11: { top: 410, left: 1050 },
    g12: { top: 545, left: 950 },
    g13: { top: 410, left: 850 },
    g14: { top: 680, left: 850 },
    g15: { top: 365, left: 975 },
    g16: { top: 410, left: 975 },
    g17: { top: 635, left: 700 },
    g18: { top: 455, left: 800 },
    g19: { top: 365, left: 875 },
    g20: { top: 680, left: 800 },
    g21: { top: 455, left: 1075 },
    g22: { top: 545, left: 750 },
    g23: { top: 635, left: 1025 },
    g24: { top: 725, left: 775 },
    g25: { top: 545, left: 1050 },
    g26: { top: 635, left: 1175 },
    g27: { top: 725, left: 975 },
    g28: { top: 275, left: 900 },
    g29: { top: 725, left: 650 },
    g30: { top: 275, left: 950 },
    g31: { top: 455, left: 875 },
    g32: { top: 545, left: 1000 },
    g33: { top: 545, left: 775 },
    g34: { top: 590, left: 1200 },
    
}

// Snap sizes for each puzzle in both x and y directions
const snapSizes = {
    puzzle1: { x: 100, y: 100 },
    puzzle2: { x: 100, y: 100 },
    puzzle3: { x: 100, y: 100 },
    puzzle4: { x: 50, y: 50 },
    puzzle5: { x: 50, y: 50 },
    puzzle6: { x: 50, y: 90 },
    puzzle7: { x: 25, y: 45 },
};

var snap = snapSizes[getPuzzleId()];

//BUTTONS
function disableButtonWithTimer(button, duration, styles = {}) {
    let timeLeft = duration;
    
    // Hide the original text while keeping its space
    const originalTextSpan = document.createElement("span");
    originalTextSpan.innerHTML = button.innerHTML;
    originalTextSpan.style.visibility = "hidden"; // Keeps size intact without removing content
    button.innerHTML = "";
    button.appendChild(originalTextSpan);

    // Create countdown overlay
    const countdownOverlay = document.createElement("div");
    countdownOverlay.style.position = "absolute";
    countdownOverlay.style.top = "-2px";
    countdownOverlay.style.left = "-2px";
    countdownOverlay.style.width = "100%";
    countdownOverlay.style.height = "100%";
    countdownOverlay.style.display = "flex";
    countdownOverlay.style.alignItems = "center";
    countdownOverlay.style.justifyContent = "center";
    countdownOverlay.style.fontSize = styles.fontSize || "23px"; // Match button text size
    countdownOverlay.style.fontWeight = styles.fontWeight || "bold";
    countdownOverlay.style.color = styles.textColor || "#fff";
    countdownOverlay.style.backgroundColor = styles.backgroundColor || "rgba(0, 0, 0, 0.5)"; // Semi-transparent overlay
    countdownOverlay.style.borderRadius = getComputedStyle(button).borderRadius;
    countdownOverlay.style.border = getComputedStyle(button).border;
    countdownOverlay.style.cursor = "not-allowed";

    button.style.position = "relative"; 
    button.appendChild(countdownOverlay); 

    // Disable button interaction
    button.disabled = true;

    // Start countdown
    const countdown = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownOverlay.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(countdown);
            button.innerHTML = originalTextSpan.innerHTML; // Restore original text
            button.disabled = false;
            
            // Remove the countdown overlay after the timer finishes
            button.removeChild(countdownOverlay);
        }
    }, 1000);
}
function reset() {
    location.reload();
}
function hint() {
    disableButtonWithTimer(document.querySelector('.Hint'), 300, {
        fontSize: "22px",
        textColor: "#fff",
        backgroundColor: "#60a100",
        padding: "5px 10px",
    });

    // Filter out pieces that are not in their correct positions
    const incorrectPieces = pieces.filter(function () {
        const piece = $(this);
        const id = piece.attr('id');
        const currentRect = piece[0].getBoundingClientRect();
        const currentTop = Math.round(currentRect.top - container.getBoundingClientRect().top); // Adjusted for container position
        const currentLeft = Math.round(currentRect.left - container.getBoundingClientRect().left); // Adjusted for container position
        const correctPosition = correctPositions[id];
        const correctTop = correctPosition.top;
        const correctLeft = correctPosition.left;
        return currentTop !== correctTop || currentLeft !== correctLeft;
    });

    // If there are no incorrect pieces, all pieces are in the correct position
    if (incorrectPieces.length === 0) {
        displayCongratulatoryMessage();
        stopTimer();
        return;
    }

    // Randomly select a piece from the array of incorrect pieces
    const randomIndex = Math.floor(Math.random() * incorrectPieces.length);
    const randomPiece = $(incorrectPieces[randomIndex]);
    const id = randomPiece.attr('id');
    const correctPosition = correctPositions[id];
    const correctTop = correctPosition.top;
    const correctLeft = correctPosition.left;

    // Get the current position of the randomly selected piece
    const currentRect = randomPiece[0].getBoundingClientRect();
    const currentTop = Math.round(currentRect.top - container.getBoundingClientRect().top); // Adjusted for container position
    const currentLeft = Math.round(currentRect.left - container.getBoundingClientRect().left); // Adjusted for container position

    // Calculate the differences between the current and correct positions
    const diffTop = correctTop - currentTop;
    const diffLeft = correctLeft - currentLeft;

    // Move the randomly selected piece towards its correct position
    randomPiece.animate({
        top: `+=${diffTop}px`, // Adjusted for positive difference
        left: `+=${diffLeft}px` // Adjusted for positive difference
    }, 50); // Adjust the duration as needed

    // Update the draggable instance position after the animation completes
    setTimeout(function() {
        Draggable.get(randomPiece[0]).update();
    });
}
function check() {
    disableButtonWithTimer(document.querySelector('.Check'), 120, {
        fontSize: "22px",
        textColor: "#fff",
        backgroundColor: "#4154ff",
        padding: "6px 12px",
    });

    // Comment/Uncomment the line below to log piece positions
    logPiecePositions();

    let correctCount = 0;
    let totalPieces = pieces.length;
    const containerRect = document.getElementById('container').getBoundingClientRect();

    pieces.each(function () {
        const piece = $(this);
        const id = piece.attr('id');
        const pieceRect = piece[0].getBoundingClientRect();

        const currentTop = Math.round(pieceRect.top - containerRect.top);
        const currentLeft = Math.round(pieceRect.left - containerRect.left);

        const correctTop = correctPositions[id].top;
        const correctLeft = correctPositions[id].left;

        if (currentTop === correctTop && currentLeft === correctLeft) {
            correctCount++;
        }
    });

    const proportionCorrect = correctCount / totalPieces;
    alert(`Correct pieces: ${correctCount}/${totalPieces} (${(proportionCorrect * 100).toFixed(2)}%)`);

    // Check if all pieces are correct and display a congratulatory message if they are
    if (correctCount === totalPieces) {
        displayCongratulatoryMessage();
        stopTimer();
    }
}

// Variables for timer
let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;
let timerElement;
let isTimerRunning = false;
// Function to start the timer
function startTimer() {
    if (!isTimerRunning) {
        // Create the timer element if it doesn't exist
        if (!timerElement) {
            timerElement = document.createElement('div');
            timerElement.id = 'timer';  // Set the id so we can style it
            document.body.appendChild(timerElement);
        }

        // Start the timer interval
        timerInterval = setInterval(function() {
            seconds++;

            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }

            if (minutes === 60) {
                minutes = 0;
                hours++;
            }

            // Format the time in hh:mm:ss
            const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            timerElement.textContent = formattedTime;
        }, 1000);  // Update every second

        isTimerRunning = true; // Mark the timer as running
    }
}
// Function to stop (pause) the timer
function stopTimer() {
    if (isTimerRunning) {
        clearInterval(timerInterval); // Stop the timer without resetting it
        isTimerRunning = false; // Mark the timer as stopped
    }
}

// Your existing code here, such as puzzle logic, drag-and-drop, etc.

// Example: Call startTimer() when the page loads
window.onload = function() {
    // Get the current page's URL
    const currentPage = window.location.pathname;

    // Only start the timer if the current page is not 'menu.html'
    if (!currentPage.includes('menu.html')) {
        startTimer(); // Start the timer only on pages that are not 'menu.html'
    }
};


function logPiecePositions() {
    const containerRect = document.getElementById('container').getBoundingClientRect();
    let formattedOutput = '';

    console.log("Current Piece Positions:");
    pieces.each(function () {
        const piece = $(this);
        const id = piece.attr('id');
        const pieceRect = piece[0].getBoundingClientRect();
        const currentTop = Math.round(pieceRect.top - containerRect.top);
        const currentLeft = Math.round(pieceRect.left - containerRect.left);
        formattedOutput += `${id}: { top: ${currentTop}, left: ${currentLeft} },\n`;
    });

    console.log(formattedOutput);

    console.log("Correct Piece Positions:");
    let correctFormattedOutput = '';
    for (const id in correctPositions) {
        if (correctPositions.hasOwnProperty(id)) {
            correctFormattedOutput += `${id}: { top: ${correctPositions[id].top}, left: ${correctPositions[id].left} },\n`;
        }
    }

    console.log(correctFormattedOutput);
}




//completion
function checkAllCorrect() {
    let allCorrect = true;
    const containerRect = document.getElementById('container').getBoundingClientRect();

    pieces.each(function () {
        const piece = $(this);
        const id = piece.attr('id');
        const pieceRect = piece[0].getBoundingClientRect();

        const currentTop = Math.round(pieceRect.top - containerRect.top);
        const currentLeft = Math.round(pieceRect.left - containerRect.left);

        const correctTop = correctPositions[id].top;
        const correctLeft = correctPositions[id].left;

        if (!(currentTop === correctTop && currentLeft === correctLeft)) {
            allCorrect = false;
            return false; // Exit loop early if any piece is incorrect
        }
    });

    if (allCorrect) {
        displayCongratulatoryMessage();
        stopTimer();
    }
}
function displayCongratulatoryMessage() {
    // Create a div element for the congratulatory message
    const messageDiv = document.createElement('div');
    messageDiv.textContent = "Congratulations! Click the dropdown to select the next puzzle";
    messageDiv.style.cssText = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border: 1px solid black; z-index: 9999; font-size: 24px; cursor: pointer;";

    // Append the message div to the body
    document.body.appendChild(messageDiv);

    // Set timeout to remove the message after 5 seconds
    setTimeout(function() {
        document.body.removeChild(messageDiv);
    }, 5000);

    // Add event listener to remove message on click anywhere in the document body
    document.body.addEventListener('click', function(event) {
        if (event.target !== messageDiv) {
            document.body.removeChild(messageDiv);
        }
    });
}

//changes URL based on clicked option in dropdown
document.getElementById('dropdown').addEventListener('change', function() {
    const dropdown = this.value;
    window.location.href = dropdown;
});


function getPuzzleId() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    const puzzleId = page.replace(".html", ""); // Assuming filenames are puzzle1.html, puzzle2.html, etc.
    return puzzleId;
}

// Initialize Draggable elements
pieces.each(function () {
    Draggable.create(this, {
        bounds: container,
        onDragStart: onDragStart,
        onDrag: onDrag,
        onDragEnd: onDragEnd
    });
});

function onDragStart() {
    if (!outline) {
        outline = document.createElement('div');
        outline.classList.add('outline');
        document.body.appendChild(outline);
    }
    selectedPiece = this.target;
    updateOutlinePosition();
}
function onDrag() {
    updateOutlinePosition();
}

function onDragEnd() {
    const puzzleId = getPuzzleId();
    const snapX = snapSizes[puzzleId].x; // Snap size in the x direction
    const snapY = snapSizes[puzzleId].y; // Snap size in the y direction

    TweenLite.to(this.target, 0.5, {
        x: Math.round(this.x / snapX) * snapX, // Snap to the nearest grid in x
        y: Math.round(this.y / snapY) * snapY, // Snap to the nearest grid in y
        ease: Back.easeOut.config(2),
        onComplete: () => {
            updateOutlinePosition();
            checkAllCorrect();
            moveSelectedPiece(); // Call the function to handle arrow key movements
        }
    });
}


function updateOutlinePosition() {
    if (selectedPiece && outline) {
        outline.style.width = `${selectedPiece.offsetWidth}px`;
        outline.style.height = `${selectedPiece.offsetHeight}px`;
        outline.style.top = `${selectedPiece.getBoundingClientRect().top + window.scrollY}px`;
        outline.style.left = `${selectedPiece.getBoundingClientRect().left + window.scrollX}px`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const pieces = document.querySelectorAll('.piece');

    // Add click event to select the piece
    pieces.forEach(piece => {
        piece.addEventListener('click', function (event) {
            if (selectedPiece && outline) {
                selectedPiece.classList.remove('selected');
            }
            selectedPiece = event.target;
            selectedPiece.classList.add('selected');

            if (!outline) {
                outline = document.createElement('div');
                outline.classList.add('outline');
                document.body.appendChild(outline);
            }
            updateOutlinePosition();
        });
    });

    document.addEventListener('click', function (event) {
        // Check if the click event target is not a piece
        if (!event.target.classList.contains('piece')) {
            if (selectedPiece && outline) {
                // Remove the outline
                outline.remove();
                outline = null;
    
                // Remove the selected class from the selected piece
                selectedPiece.classList.remove('selected');
                selectedPiece = null;
    
                // Remove the ability to use arrow keys
                document.removeEventListener('keydown', moveSelectedPiece);
            }
        }
    });
    
    // Add click event to select the piece
    pieces.forEach(piece => {
        piece.addEventListener('click', function (event) {
            if (selectedPiece && outline) {
                // Remove the outline
                outline.remove();
                outline = null;
    
                // Remove the selected class from the selected piece
                selectedPiece.classList.remove('selected');
            }
            
            // Add the selected class to the clicked piece
            selectedPiece = event.target;
            selectedPiece.classList.add('selected');
    
            // Create an outline for the selected piece
            outline = document.createElement('div');
            outline.classList.add('outline');
            document.body.appendChild(outline);
    
            // Update the outline position
            updateOutlinePosition();
    
            // Add event listener for arrow key movements
            document.addEventListener('keydown', moveSelectedPiece);
        });
    });

    function moveSelectedPiece(event) {
        if (selectedPiece) {
            const keyCode = event.keyCode;
            let top = parseInt(selectedPiece.style.top || selectedPiece.offsetTop);
            let left = parseInt(selectedPiece.style.left || selectedPiece.offsetLeft);
            const stepX = snap.x; // Use the snap size for x direction movement
            const stepY = snap.y; // Use the snap size for y direction movement
            const minDistance = Math.min(stepX, stepY); // Minimum distance to the wall for movement
            
            switch (keyCode) {
                case 37: // Left arrow
                    left = Math.max(left - stepX, 0); // Move left by the x snap size
                    break;
                case 38: // Up arrow
                    top = Math.max(top - stepY, 0); // Move up by the y snap size
                    break;
                case 39: // Right arrow
                    left = Math.min(left + stepX, containerWidth - selectedPiece.offsetWidth); // Move right by the x snap size
                    break;
                case 40: // Down arrow
                    top = Math.min(top + stepY, containerHeight - selectedPiece.offsetHeight); // Move down by the y snap size
                    break;
            }
    
            selectedPiece.style.top = top + 'px';
            selectedPiece.style.left = left + 'px';
    
            // Update the outline position when the piece is moved
            updateOutlinePosition();
            checkAllCorrect();
        }
    }
    
    
});
