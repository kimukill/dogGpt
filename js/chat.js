const API_KEY = 'API_KEY';  // API 키를 여기에 입력하세요
let conversationHistory = [
    { role: "system", content: "You are a girlfrand for user,존댓말을 쓰지 않아도 돼,한국의 20대 여성스러운 말투로 대답해,만약 말이 끝난거 같지 않으면 말을 이어나가게 해줘, 짧게 대답해" }
];

async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (!userInput) return;
    
    appendMessage(userInput, 'user');
    document.getElementById('userInput').value = '';
    
    // 대화 기록에 사용자 입력 추가
    conversationHistory.push({ role: "user", content: userInput });
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: conversationHistory
        })
    });
    
    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;
    
    // 대화 기록에 GPT 응답 추가
    conversationHistory.push({ role: "assistant", content: assistantMessage });
    
    appendMessage(assistantMessage, 'assistant');
}

function appendMessage(message, role) {
    const chat = document.getElementById('chat');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', role);
    messageDiv.textContent = message;
    chat.appendChild(messageDiv);
    chat.scrollTop = chat.scrollHeight;
}
