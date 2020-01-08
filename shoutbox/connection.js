

  var wsUri = "wss://lincolndoney.com:8080";
  function init()
  {
    setupWebSocket();
  }

  function setupWebSocket()
  {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };
  }

  function onOpen(evt)
  {
  }

  function onClose(evt)
  {
  }

  function onMessage(evt)
  {
    addNewMessage(JSON.parse(evt.data));
  }

  function onError(evt)
  {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
  }

  function doSend(message)
  {
    websocket.send(message);
  }

  function writeToScreen(message)
  {
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
  }

  window.addEventListener("load", init, false);

