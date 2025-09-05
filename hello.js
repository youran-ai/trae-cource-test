// 如果在浏览器环境中，在页面上显示消息
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    const messageElement = document.createElement("h1");
    messageElement.textContent = "你好，欢迎来到 Trae 课程学习";
    document.body.appendChild(messageElement);
  });
}