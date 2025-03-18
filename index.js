window.onload = function () {
    let buttons = document.querySelectorAll("button:not(#reset-mood):not(#clear-all):not(#show-all)");
    let resetButton = document.getElementById("reset-mood");
    let clearButton = document.getElementById("clear-all");
    let showAllButton = document.getElementById("show-all");
    let moodList = document.getElementById("mood-list");

    // ✅ Get today's date in "DD-MM-YYYY" format
    let today = new Date();
    let formattedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;

    // ✅ Disable buttons if today's mood is already set
    if (localStorage.getItem(formattedDate)) {
        buttons.forEach(button => button.disabled = true);
    }

    // ✅ Handle mood selection
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            let mood = `${this.className} ${this.textContent}`;
            if (!localStorage.getItem(formattedDate)) {
                localStorage.setItem(formattedDate, mood);
                buttons.forEach(button => button.disabled = true);
                displayMoods(); // Update mood list
            }
        });
    });

    // ✅ Handle resetting today's mood
    resetButton.addEventListener("click", function () {
        localStorage.removeItem(formattedDate); // Remove today's mood
        buttons.forEach(button => button.disabled = false); // Enable buttons again
        displayMoods(); // Update mood list
    });

    // ✅ Handle clearing all moods
    clearButton.addEventListener("click", () => {
        localStorage.clear(); // Clear all stored moods
        buttons.forEach(button => button.disabled = false); // Enable all mood buttons again
        moodList.innerHTML = ""; // Clear displayed mood history
    });

    // ✅ Handle "Show All" button
    showAllButton.addEventListener("click", function () {
        displayMoods(true);
    });

    // ✅ Function to display stored moods
    function displayMoods(showAll = false) {
        moodList.innerHTML = ""; // Clear the list
    
        if (showAll) {
            // Show all stored moods
            let keys = Object.keys(localStorage).sort(); 
            keys.forEach(key => {
                let listItem = document.createElement("li");
                listItem.textContent = `${key} - ${localStorage.getItem(key)}`;
                moodList.appendChild(listItem);
            });
        } else {
            // Show only today’s mood
            let todayMood = localStorage.getItem(formattedDate);
            if (todayMood) {
                let listItem = document.createElement("li");
                listItem.textContent = `${formattedDate} - ${todayMood}`;
                moodList.appendChild(listItem);
            }
        }
    }

    displayMoods(); // Call function to show stored moods on page load
};
