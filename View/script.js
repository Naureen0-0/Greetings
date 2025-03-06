const inputField = document.querySelector("input");
const button = document.querySelector("button");
const errorMessage = document.querySelector(".error-message");
const greetingMessage = document.querySelector(".greeting-message");

button.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent form submission

    const name = inputField.value.trim();

    // Clear previous messages
    errorMessage.textContent = "";
    greetingMessage.textContent = "";

    if (name === "") {
        errorMessage.textContent = "Name is required";
        inputField.classList.add("input-err");

        setTimeout(() => {
            inputField.classList.remove("input-err");
            errorMessage.textContent = ""; // Clear error message after 5 seconds
        }, 1000); // 5000 milliseconds = 5 seconds
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

            setTimeout(() => {
                errorMessage.textContent = ""; // Clear error message after 5 seconds
            }, 3000);
            return;
        }

        const data = await response.json();
        greetingMessage.textContent = data.message; // Display greeting message

        setTimeout(() => {
            greetingMessage.textContent = ""; // Clear greeting message after 5 seconds
        }, 3000);
    } catch (error) {
        errorMessage.textContent = 'Failed to get greeting. Please try again.';

        setTimeout(() => {
            errorMessage.textContent = ""; // Clear error message after 5 seconds
        }, 1000);
    } finally{
        inputField.value = ""; //clear the name input field
    }
});