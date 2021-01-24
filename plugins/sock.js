import SockJS from "sockjs-client";
import "./stomp.min.js";
export default (context, inject) => {
  let $sockJS = new SockJS("https://student-alumni-spring.herokuapp.com/gs-guide-websocket");
  let $stompClient = Stomp.over($sockJS);
  $stompClient.debug = () => {};
  inject('sockJS', $sockJS);
  inject('stomp', Stomp);
  inject('stompClient', $stompClient);
}
