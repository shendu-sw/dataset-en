(function ($) {
  // 判断当前地址
  if (location.pathname === "/dataset") {
    location.href = location.origin + "/dataset/main/";
  }
  if (location.pathname === "/dataset/") {
    // 如果没有 #data 标识，则认为进入首页
    if (location.hash !== "#data") {
      location.href = location.origin + "/dataset/main/";
    }
  }
})(jQuery);
