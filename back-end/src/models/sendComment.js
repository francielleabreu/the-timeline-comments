function sendComment() {
    const messageId = prompt('Enter the ID of the message you want to comment on:');
    const commentInput = document.getElementById('commentInput');
    const comment = commentInput.value;
  
    if (!comment) {
      alert('Please enter a comment');
      return;
    }
  
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `http://localhost:3000/api/messages/${messageId}/comments`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alert('Comment added successfully');
          commentInput.value = '';
          loadMessages();
        } else {
          try {
            const data = JSON.parse(xhr.responseText);
            alert(`Error: ${data.error}`);
          } catch (error) {
            alert('Something went wrong');
          }
        }
      }
    };
  
    const data = JSON.stringify({ comment });
    xhr.send(data);
  }  