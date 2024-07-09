const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.getElementById("main");

let userText;
const API_KEY = "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";
const createElement = (html, className) => {

    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = html;
    return  chatDiv;
}

const getChatResponse = async (incomingChatDiv) => {
    const API_URL="https://api.openai.com/v1/completions";
    const pElement = document.createElement("p");

    const requestOptions = {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
        model: "davinci",
        prompt: userText,
        max_tokens: 7,
        temperature: 0,
        n: 1,
        stop: null
    })};



try{
    const response = await (await fetch(API_URL, requestOptions)).json();
    pElement.textContent = response.choices[0].text;
    console.log(response);
} catch(error) {
    console.log(error);
}
incomingChatDiv.querySelector(".typing-animation").remove();
incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
}

const copyResponse = (copyBtn) => {
        const responseTextElement = copyBtn.parentElement.querySelector("p");
        const textToCopy = responseTextElement.textContent;
    
        // Create a temporary textarea element to copy text to clipboard
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = textToCopy;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);
    
        // Provide some user feedback, e.g., by changing the button text
        copyBtn.textContent = "Copied!";
    };


const showTypingAnimation = () =>{
    const html =  `<div class="chat-content">
                     <div class="chat-details">
                       <img src="chatgpt .png" alt="chatgpticon.png">  
                       <div class="typing-animation">
                          <div class="typing-dot" style="--delay:0.2s"></div>
                          <div class="typing-dot"style="--delay:0.3s"></div>
                          <div class="typing-dot"style="--delay:0.4s"></div>
                       </div>
                     </div>
                     <span onclick="copyResponse(this)"class="material-symbols-rounded">content_copy</span>
                 </div>`;


const incomingChatDiv = createElement(html,"incoming");
chatContainer.appendChild(incomingChatDiv);
getChatResponse(incomingChatDiv);
}



function handleOutgoingChat(){
    console.log("hello");
    userText = chatInput.value.trim();
    const html= `<div class="chat-content">
                   <div class="chat-details">
                      <img src="images/user.jpg" alt="user.png">
                      <p>${userText}</p>
                   </div>
               </div>`;
    const outgoingChatDiv = createElement(html, "outgoing");
    chatContainer.appendChild(outgoingChatDiv);
    setTimeout(showTypingAnimation, 500);

}
sendButton.addEventListener("click",handleOutgoingChat);