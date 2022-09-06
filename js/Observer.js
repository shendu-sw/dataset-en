let Observer = (function () {
  // 防止消息队列暴露而被篡改,故将消息容器作为静态私有变量保存
  var __messages = {};
  return {
    regist: function regist(type, fn) {
      //如果此消息不存在则应该创建一个该消息类型
      if (typeof __messages[type] === "undefined") {
        // 将动作推入到该消息对应的动作执行队列中
        __messages[type] = [fn];
      } else {
        // 将动作方法推入该消息对应的动作执行序列中
        __messages[type].push(fn);
      }
      return this;
    },
    fire: function fire(type, args) {
      // 如果该消息没有被注册,则返回
      if (!__messages[type]) return;
      // 定义消息信息
      var events = {
        type: type,
        args: args || {},
      };
      var i = 0;
      var len = __messages[type].length;
      // 遍历消息动作
      for (; i < len; i++) {
        // 依次执行注册的消息对应的动作序列
        __messages[type][i].call(this, events);
      }
      return this;
    },
    remove: function remove(type, fn) {
      // 如果消息动作队列存在
      if (__messages[type] instanceof Array) {
        // 从最后一个消息动作遍历
        var i = __messages[type].length - 1;
        for (; i >= 0; i--) {
          // 如果存在该动作则在消息动作序列中一处相应动作
          __messages[type][i] === fn && __messages[type].splice(i, 1);
        }
      }
    },
  };
})();
