function register() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(username && password){
        localStorage.setItem("user", username);
        localStorage.setItem("pass", password);
        alert("Registered Successfully!");
    }
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(username === localStorage.getItem("user") &&
       password === localStorage.getItem("pass")){
        document.getElementById("authSection").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    } else {
        alert("Invalid Credentials");
    }
}

function logout(){
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("authSection").style.display = "block";
}

function checkSpam(){
    let text = document.getElementById("emailText").value.toLowerCase();
    let loading = document.getElementById("loading");

    loading.style.display = "block";

    setTimeout(() => {

        let spamWords = ["win", "free", "offer", "money", "urgent", "lottery", "prize"];
        let score = 0;

        spamWords.forEach(word => {
            if(text.includes(word)){
                score++;
            }
        });

        let resultText = "";
        let confidence = 0;

        if(score > 1){
            resultText = "Spam";
            confidence = Math.min(70 + score * 5, 95);
        } else {
            resultText = "Not Spam";
            confidence = 80 - score * 5;
        }

        document.getElementById("result").innerText = "Result: " + resultText;
        document.getElementById("confidence").innerText = "Confidence: " + confidence + "%";

        saveHistory(text, resultText, confidence);

        loading.style.display = "none";

    }, 1500);
}

function saveHistory(message, result, confidence){
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push({
        message: message,
        result: result,
        confidence: confidence,
        time: new Date().toLocaleString()
    });
    localStorage.setItem("history", JSON.stringify(history));
}

function showHistory(){
    let history = JSON.parse(localStorage.getItem("history")) || [];
    let output = "<h3>Previous Analysis</h3>";

    history.forEach(item => {
        output += `
            <p><b>Message:</b> ${item.message}</p>
            <p>Result: ${item.result} | Confidence: ${item.confidence}%</p>
            <hr>
        `;
    });

    document.getElementById("historySection").innerHTML = output;
}
