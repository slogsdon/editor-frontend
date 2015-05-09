/*jshint strict:true, esnext:true */
/*global WebSocket*/

class Socket {
  constructor(options) {
    this.options = options || {};
    this.defaults = {
      onMessage(that) {
        return function onMessage(e) {
          var obj = JSON.parse(e.data);
          var callback = that.topicCallbacks[obj.event];
          if (callback) {
            callback(obj.data);
          }
        };
      }
    };
    this.topicCallbacks = {};
    this.websocket = null;
    this.init();
  }

  init() {
    if (!this.options.uri) {
      this.error('Missing URI');
    }
    this.websocket = new WebSocket(this.options.uri);
    this.websocket.onmessage = this.defaults.onMessage(this);
  }

  error(message, shouldReturn = false) {
    var err = new Error('Socket: ' + message);
    if (shouldReturn === false) {
      throw err;
    }
    return err;
  }

  send(event, data = {}) {
    var message = JSON.stringify({
      event: event,
      data: data
    });
    this.websocket.send(message);
  }

  close() {
    this.websocket.close();
  }

  on(topic, callback) {
    this.topicCallbacks[topic] = callback;
    return this;
  }

  onOpen(callback) {
    this.websocket.onopen = callback;
    return this;
  }

  onClose(callback) {
    this.websocket.onclose = callback;
    return this;
  }

  onError(callback) {
    this.websocket.onerror = callback;
    return this;
  }

  onMessage(callback) {
    this.websocket.onmessage = callback;
    return this;
  }
}
