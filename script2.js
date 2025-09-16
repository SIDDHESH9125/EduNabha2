// This is your API key. Remember, this is NOT secure for production.
const API_KEY = "AIzaSyDow8nuc3I7S8bDnILBlxjG4M_ZA4kE2y0";

// This is the correct API URL.
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

let controller, typingInterval;
const chatHistory = [];
const userData = { message: "", file: {} };

// ... (rest of your existing code)

// Make the API call and generate the bot's response
const generateResponse = async (botMsgDiv) => {
    const textElement = botMsgDiv.querySelector(".message-text");
    controller = new AbortController();

    // Add user message and file data to the chat history
    chatHistory.push({
        role: "user",
        parts: [{ text: userData.message }, ...(userData.file.data ? [{ inline_data: (({ fileName, isImage, ...rest }) => rest)(userData.file) }] : [])],
    });

    try {
        // Send the chat history to the API to get a response
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Correctly pass the API key in the X-goog-api-key header
                "X-goog-api-key": API_KEY 
            },
            body: JSON.stringify({ contents: chatHistory }),
            signal: controller.signal,
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);

        // Process the response text and display with typing effect
        const responseText = data.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g, "$1").trim();
        typingEffect(responseText, textElement, botMsgDiv);
        chatHistory.push({ role: "model", parts: [{ text: responseText }] });
    } catch (error) {
        textElement.textContent = error.name === "AbortError" ? "Response generation stopped." : error.message;
        textElement.style.color = "#d62939";
        botMsgDiv.classList.remove("loading");
        document.body.classList.remove("bot-responding");
        scrollToBottom();
    } finally {
        userData.file = {};
    }
};

// ... (rest of your existing code)