function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const commentInput = document.getElementById('commentInput');

    const message = messageInput.value;
    const comment = commentInput.value;
  
    if (!message) {
      alert('Please enter a message');
      return;
    }
  
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('POST', 'http://localhost:3000/api/messages', true);
    xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
  
    xmlHttpRequest.onreadystatechange = function () {
      if (xmlHttpRequest.readyState === 4) {
        if (xmlHttpRequest.status === 200) {
          alert('Message sent successfully');
          messageInput.value = '';
          loadMessages();
        } else {
          try {
            const data = JSON.parse(xmlHttpRequest.responseText);
            alert(`Error: ${data.error}`);
          } catch (error) {
            alert('Something went wrong');
          }
        }
      }
    };
  
    const data = JSON.stringify({ message, comment });
    xmlHttpRequest.send(data);
  }

  async function loadMessages() {
    const messageList = document.getElementById('messageList');

    try {
      const response = await fetch('http://localhost:3000/api/messages');
      const messages = await response.json();

      messageList.innerHTML = '';

      messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'alert alert-info';
        messageDiv.innerHTML = `<strong>${new Date(message.timestamp).toLocaleString()}</strong><br>${message.message}`;
        messageList.appendChild(messageDiv);
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load messages');
    }
  }

loadMessages();