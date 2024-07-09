var open_ai_response;

var b=document.getElementById("send-btn");

b.addEventListener('click',openai_test);

async function openai_test() {

    console.log("helloo");
  
  var url = "https://api.openai.com/v1/engines/text-davinci-002/completions";

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer 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");

  xhr.onreadystatechange = function () {
     if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
        open_ai_response = xhr.responseText;
        console.log(open_ai_response);
     }};

  var data = `{
    "prompt": "Hello",
    "temperature": 0.7,
    "max_tokens": 256,
    "top_p": 1,
    "frequency_penalty": 0.75,
    "presence_penalty": 0
  }`;

  xhr.send(data);
}