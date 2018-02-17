(function() {
  const socket = io();

  let messageList = document.querySelector('#messages'),
      chatForm = document.querySelector('form'),
      nameInput = document.querySelector('.nickname'),
      nickName = null,
      chatMessage = chatForm.querySelector('.message'),
      colour = null,
      joinbutton = document.querySelector('#join');

  function setNickname() {
    nickName = nameInput.value;
    colour = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
    appendUser(nickName,colour);
    nameInput.value = '';
  }

  function handleSendMessage(e) {
    e.preventDefault();
    nickName = (nickName && nickName.length > 0) ? nickName : 'user';
    msg = `( ${nickName} ) ${chatMessage.value}`;

    socket.emit('chat message', msg);
    chatMessage.value = '';
    return false;
  }

  function appendMessage(msg) {
    //debugger;
    let newMsg = `<li>${msg.message}</li>`
    messageList.innerHTML += newMsg;
  }

  function appendDMessage(msg) {
    let newMsg = `<li>${nickName} has left the conversation</li>`
    messageList.innerHTML += newMsg;
  }

  function appendUser(nickName,colour){
    nickname = `${nickName}`;
    colour = `${colour}`;
    msg = `${nickName} has joined the conversation`
    socket.emit('chat message', msg);
    socket.emit('set nickname', nickname);
    socket.emit('set colour', colour);
  }

  joinbutton.addEventListener('click', setNickname, false);
  chatForm.addEventListener('submit', handleSendMessage, false);
  socket.addEventListener('chat message', appendMessage, false);
  socket.addEventListener('disconnect message', appendDMessage, false);
})();
