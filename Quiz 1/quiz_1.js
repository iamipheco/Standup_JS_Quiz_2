/* REAL-TIME CHAT APPLICATION
With the use of MINIMAL DESIGN, Build a simple real-time chat application that takes two inputs used as a chat medium between them

The actions to implement are thus:
- When sender 1 sends a message, the message gets delivered to sender 2’s screen while
- If Sender 2 sends a message, it gets delivered to Sender 1’s screen in real-time
*/



// Get references to HTML elements for Sender 1's input fields and button
const msgBox1 = document.getElementById("msgBox1");
const nameInput1 = document.getElementById("nameInput1");
const msgInput1 = document.getElementById("msgInput1");
const sendBtn1 = document.getElementById("sendBtn1");

// Get references to HTML elements for Sender 2's input fields and button
const msgBox2 = document.getElementById("msgBox2");
const nameInput2 = document.getElementById("nameInput2");
const msgInput2 = document.getElementById("msgInput2");
const sendBtn2 = document.getElementById("sendBtn2");

// Add click event listeners for Sender 1's send button
sendBtn1.addEventListener("click", () => sendMessage(nameInput1.value, "Sender1", "Sender2", msgInput1));

// Add click event listeners for Sender 2's send button
sendBtn2.addEventListener("click", () => sendMessage(nameInput2.value, "Sender2", "Sender1", msgInput2));

// Function to send a message
function sendMessage(senderName, sender, receiver, inputElement) {
  const message = inputElement.value.trim();
  if (message !== "") {
    // Append the message to the appropriate chat box
    appendMessage(senderName, message, sender, receiver);
    // Save the message to local storage
    saveMessage(sender, receiver, senderName, message);
    // Clear the input field
    inputElement.value = "";
  }
}

// Function to append a message to the chat box
function appendMessage(senderName, message, sender, receiver) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerText = `${senderName}: ${message}`;
  messageElement.style.color = "#552f0c";
  messageElement.style.fontFamily = "Arial, sans-serif"
  messageElement.style.fontSize = "12px"
  
  // Append the message to the appropriate chat box
  if (sender === "Sender1") {
    msgBox2.appendChild(messageElement); // Append to Sender 2's box
  } else if (sender === "Sender2") {
    msgBox1.appendChild(messageElement); // Append to Sender 1's box
  }
  
  // Scroll the chat boxes to show the latest message
  msgBox1.scrollTop = msgBox1.scrollHeight;
  msgBox2.scrollTop = msgBox2.scrollHeight;
}

// Function to save a message to local storage
function saveMessage(sender, receiver, senderName, message) {
  const messages = JSON.parse(localStorage.getItem(`${sender}-${receiver}`)) || [];
  messages.push({ senderName, message, timestamp: new Date() });
  localStorage.setItem(`${sender}-${receiver}`, JSON.stringify(messages));
}

// Function to retrieve and display messages from local storage
function retrieveMessages(sender, receiver, messageBox) {
  const messages = JSON.parse(localStorage.getItem(`${sender}-${receiver}`)) || [];
  for (const messageObj of messages) {
    appendMessage(messageObj.senderName, messageObj.message, sender, receiver);
  }
}

// Retrieve and display messages between Sender 1 and Sender 2
retrieveMessages("Sender1", "Sender2", msgBox2);
retrieveMessages("Sender2", "Sender1", msgBox1);
