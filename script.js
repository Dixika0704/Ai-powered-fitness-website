let select = document.querySelector(".select-heading")
let arrow = document.querySelector(".select-heading img")
let options = document.querySelector(".options")
let option = document.querySelectorAll(".option")
let selectetext= document.querySelector(".select-heading span")

select.addEventListener("click", () => {
    options.classList.toggle("active-options")
    arrow.classList.toggle("rotate");
})

option.forEach((item) => {
    item.addEventListener("click", () => {
      selectetext.innerText = item.innerText
    
    })
})

//chat bot

let prompt = document.querySelector(".prompt")
let chatContainer = document.querySelector(".chat-container")
let chatbtn = document.querySelector(".input-area button")
let chatimg = document.querySelector("#chatbotimg")
let chatbox = document.querySelector(".chat-box")


let userMessage ="";
chatimg.addEventListener("click", () => {
 chatbox.classList.toggle("active-chat-box")
})


let Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAkrfuq_nj-dSibfswCVbMRCmkqwy3tCQw";

async function generateApiResponse(aiChatBox) {
  const textElement = aiChatBox.querySelector(".text")
  try{
    const response = await fetch(Api_url, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        contents: [{
          "role": "user",
          "parts" : [{text :`${userMessage} in 10 words`}]
          }]
        })
      })

      const data = await response.json()
      const aiReaponse=data?.candidates[0].content.parts[0].text.trim();
      textElement.innerText = aiReaponse
    } 
    catch (error) {
      console.log(error)
    }
    finally  {
      aiChatBox.querySelector(".loading").style.display = "none";
    }
    }

   

function createChatBox (html, className) {
  const div = document.createElement("div")
  div.classList.add(className)
  div.innerHTML = html;
  return div
}

function showLoading() {
  const html = `<p class="text"></p>
  <img src="load.gif"  class="loading" width="50px>`
  let aiChatBox = createChatBox(html, "Ai-chat-box")
  chatContainer.appendChild(aiChatBox)
  generateApiResponse(aiChatBox)
}
  


chatbtn.addEventListener("click", () => {
  userMessage = prompt.value;
  const html = `<p class="text"></p>`
  let userChatBox = createChatBox(html, "user-chat-box")
  userChatBox.querySelector(".text").innerText = userMessage
  chatContainer.appendChild(userChatBox)
  prompt.value = ""
  setTimeout(showLoading, 500) 
})

//virtual assistant

let ai = document.querySelector(".virtual-assistant img")
let speakpage = document.querySelector(".speak-page")
let content = document.querySelector(".speak-page h1")



function speak(text){
  let text_speak= new SpeechSynthesisUtterance(text)
  text_speak.rate = 1
  text_speak.pitch = 1
  text_speak.volume = 1
  text_speak.lang = "hi-GB"
  window.speechSynthesis.speak(text_speak)
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()

recognition.onresult = (event) => { 
  speakpage.style.display = "none"
  let currentIndex = event.resultIndex
  let transcript = event.results[currentIndex][0].transcript
  content.innerText = transcript
  takeCommand(transcript.toLowerCase())
}

function takeCommand(message){
  if (message.includes("close")) {
    speak("sure ")
    chatbox.classList.remove("active-chat-box")
  } else if (message.includes("open") && (message.includes("chat"))) {
    speak("sure ")
    chatbox.classList.add("active-chat-box")
  } else if(message.includes("back")){
    speak("sure ")
    window.open("http://127.0.0.1:5500/back.html","self")
  } else if(message.includes("chest")){
    speak("sure ")
    window.open("http://127.0.0.1:5500/chest.html","self")
  }else if(message.includes("biceps") && message.includes("triceps")){
    speak("sure ")
    window.open("http://127.0.0.1:5500/biceps-triceps.html","self")
  }else if(message.includes("leg")){
    speak("sure ")
    window.open("http://127.0.0.1:5500/leg.html", "self")
  }else if(message.includes("shoulder")){
    speak("sure ")
    window.open("http://127.0.0.1:5500/shoulder.html","self")
  }else if(message.includes("home")){
    speak("sure ")
    window.open("http://127.0.0.1:5500/index.html","self")
  }
}



ai.addEventListener("click", () => {
  recognition.start()
  speakpage.style.display = "flex";  
})
