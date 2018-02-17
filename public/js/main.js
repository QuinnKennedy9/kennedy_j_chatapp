(function() {
  const socket = io();

  let messageList = document.querySelector('#messages'),
      chatForm = document.querySelector('form'),
      nameInput = document.querySelector('.nickname'),
      nickName = null,
      colour,
      chatMessage = chatForm.querySelector('.message'),
      joinbutton = document.querySelector('#join'),
      images = ["icon.png","icon2.png","icon3.png","icon4.png","icon5.png","icon6.png"];

   var user = new Object();

  function setNickname() {
    nickName = nameInput.value;
    colour = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
    user.name = nickName;
    user.colour = colour;
    user.image = images[Math.floor(Math.random() * images.length)];
    appendUser(nickName);
    nameInput.value = '';
  }

  function handleSendMessage(e) {
    e.preventDefault();
    nickName = (nickName && nickName.length > 0) ? nickName : 'user';
    msg = ` <li style="color:${user.colour};"> <img src="images/${user.image}" alt="Chat Icon" class="images"> ( ${nickName} ) ${chatMessage.value} </li>`;

    socket.emit('chat message', msg);
    chatMessage.value = '';
    return false;
  }

  function appendMessage(msg) {
    //debugger;
    let newMsg = `${msg.message}`
    messageList.innerHTML += newMsg;
  }

  function appendDMessage() {
    let newMsg = `<li>${socket.id} has left the conversation</li>`
    messageList.innerHTML += newMsg;
  }

  function appendUser(nickName){
    nickname = `${nickName}`;
    msg = `${nickName} has joined the conversation`
    socket.emit('chat message', msg);
  }



  joinbutton.addEventListener('click', setNickname, false);
  chatForm.addEventListener('submit', handleSendMessage, false);
  socket.addEventListener('chat message', appendMessage, false);
  socket.addEventListener('disconnect message', appendDMessage, false);
})();
