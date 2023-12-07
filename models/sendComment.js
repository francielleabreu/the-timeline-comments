function sendComment() {
    const messageId = prompt('Enter the ID of the message you want to comment on:');
    const commentInput = document.getElementById('commentInput');
    const comment = commentInput.value;
  
    if (!comment) {
      alert('Please enter a comment');
      return;
    }
  
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('PUT', `http://localhost:3000/api/messages/${messageId}/comments`, true);
    xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
  
    xmlHttpRequest.onreadystatechange = function () {
      if (xmlHttpRequest.readyState === 4) {
        if (xmlHttpRequest.status === 200) {
          alert('Comment added successfully');
          commentInput.value = '';
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
  
    const data = JSON.stringify({ comment });
    xmlHttpRequest.send(data);
  }  