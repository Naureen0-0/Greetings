const inputField = document.querySelector("input");
const button = document.querySelector("button");
const errorMessage = document.querySelector(".error-message");
const greetingMessage = document.querySelector(".greeting-message");

button.addEventListener("click", async (event) => {
    event.preventDefault(); 

    const name = inputField.value.trim();

    // Clear previous messages
    errorMessage.textContent = "";
    greetingMessage.textContent = "";

    if (name === "") {
        errorMessage.textContent = "Name is required";
        inputField.classList.add("input-err");

        // Clear error message after 1 seconds
        setTimeout(() => {
            inputField.classList.remove("input-err");
            errorMessage.textContent = ""; 
        }, 1000); 
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/greet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Name: name }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            errorMessage.textContent = errorData.message || "Failed to get greeting. Please try again.";

            // Clear error message after 3 seconds
            setTimeout(() => {
                errorMessage.textContent = ""; 
            }, 3000);
            return;
        }

        // Display greeting message
        const data = await response.json();
        greetingMessage.textContent = data.message; 

        //clear greeting message after some sec
        setTimeout(() => {
            greetingMessage.textContent = ""; 
        }, 3000);
    } catch (error) {
        errorMessage.textContent = 'Failed to get greeting. Please try again.';

        //clear error message after some sec
        setTimeout(() => {
            errorMessage.textContent = ""; 
        }, 1000);
    }
    //clear the name input field 
    finally{
        inputField.value = ""; 
    }
});