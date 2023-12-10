"use strict";
function domReady(condition = ["complete", "interactive"]) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}
const safeDOM = {
  append(parent, child) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      return parent.appendChild(child);
    }
  },
  remove(parent, child) {
    if (Array.from(parent.children).find((e) => e === child)) {
      return parent.removeChild(child);
    }
  }
};
function useLoading() {
  const className = `loaders-css__square-spin`;
  const styleContent = `
  @keyframes square-spin {
    25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
    50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
    75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
    100% { transform: perspective(100px) rotateX(0) rotateY(0); }
  }
  .${className} > div {
    animation-fill-mode: both;
    width: 50px;
    height: 50px;
    background: #fff;
    animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
  }
  .app-loading-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #282c34;
    z-index: 9;
  }
      `;
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");
  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  oDiv.className = "app-loading-wrap";
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`;
  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    }
  };
}
const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);
window.onmessage = (ev) => {
  ev.data.payload === "removeLoading" && removeLoading();
};
setTimeout(removeLoading, 4999);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL2VsZWN0cm9uL3ByZWxvYWQvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZG9tUmVhZHkoY29uZGl0aW9uPSBbJ2NvbXBsZXRlJywgJ2ludGVyYWN0aXZlJ10pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICBpZiAoY29uZGl0aW9uLmluY2x1ZGVzKGRvY3VtZW50LnJlYWR5U3RhdGUpKSB7XHJcbiAgICAgICAgcmVzb2x2ZSh0cnVlKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICBpZiAoY29uZGl0aW9uLmluY2x1ZGVzKGRvY3VtZW50LnJlYWR5U3RhdGUpKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICBcclxuICBjb25zdCBzYWZlRE9NID0ge1xyXG4gICAgYXBwZW5kKHBhcmVudCwgY2hpbGQpIHtcclxuICAgICAgaWYgKCFBcnJheS5mcm9tKHBhcmVudC5jaGlsZHJlbikuZmluZChlID0+IGUgPT09IGNoaWxkKSkge1xyXG4gICAgICAgIHJldHVybiBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZW1vdmUocGFyZW50LCBjaGlsZCkge1xyXG4gICAgICBpZiAoQXJyYXkuZnJvbShwYXJlbnQuY2hpbGRyZW4pLmZpbmQoZSA9PiBlID09PSBjaGlsZCkpIHtcclxuICAgICAgICByZXR1cm4gcGFyZW50LnJlbW92ZUNoaWxkKGNoaWxkKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH1cclxuICBcclxuICAvKipcclxuICAgKiBodHRwczovL3RvYmlhc2FobGluLmNvbS9zcGlua2l0XHJcbiAgICogaHR0cHM6Ly9jb25ub3JhdGhlcnRvbi5jb20vbG9hZGVyc1xyXG4gICAqIGh0dHBzOi8vcHJvamVjdHMubHVrZWhhYXMubWUvY3NzLWxvYWRlcnNcclxuICAgKiBodHRwczovL21hdGVqa3VzdGVjLmdpdGh1Yi5pby9TcGluVGhhdFNoaXRcclxuICAgKi9cclxuICBmdW5jdGlvbiB1c2VMb2FkaW5nKCkge1xyXG4gICAgY29uc3QgY2xhc3NOYW1lID0gYGxvYWRlcnMtY3NzX19zcXVhcmUtc3BpbmBcclxuICAgIGNvbnN0IHN0eWxlQ29udGVudCA9IGBcclxuICBAa2V5ZnJhbWVzIHNxdWFyZS1zcGluIHtcclxuICAgIDI1JSB7IHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwcHgpIHJvdGF0ZVgoMTgwZGVnKSByb3RhdGVZKDApOyB9XHJcbiAgICA1MCUgeyB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDE4MGRlZykgcm90YXRlWSgxODBkZWcpOyB9XHJcbiAgICA3NSUgeyB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDApIHJvdGF0ZVkoMTgwZGVnKTsgfVxyXG4gICAgMTAwJSB7IHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwcHgpIHJvdGF0ZVgoMCkgcm90YXRlWSgwKTsgfVxyXG4gIH1cclxuICAuJHtjbGFzc05hbWV9ID4gZGl2IHtcclxuICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XHJcbiAgICB3aWR0aDogNTBweDtcclxuICAgIGhlaWdodDogNTBweDtcclxuICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICBhbmltYXRpb246IHNxdWFyZS1zcGluIDNzIDBzIGN1YmljLWJlemllcigwLjA5LCAwLjU3LCAwLjQ5LCAwLjkpIGluZmluaXRlO1xyXG4gIH1cclxuICAuYXBwLWxvYWRpbmctd3JhcCB7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgd2lkdGg6IDEwMHZ3O1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMjgyYzM0O1xyXG4gICAgei1pbmRleDogOTtcclxuICB9XHJcbiAgICAgIGBcclxuICAgIGNvbnN0IG9TdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcclxuICAgIGNvbnN0IG9EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gIFxyXG4gICAgb1N0eWxlLmlkID0gJ2FwcC1sb2FkaW5nLXN0eWxlJ1xyXG4gICAgb1N0eWxlLmlubmVySFRNTCA9IHN0eWxlQ29udGVudFxyXG4gICAgb0Rpdi5jbGFzc05hbWUgPSAnYXBwLWxvYWRpbmctd3JhcCdcclxuICAgIG9EaXYuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCIke2NsYXNzTmFtZX1cIj48ZGl2PjwvZGl2PjwvZGl2PmBcclxuICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGFwcGVuZExvYWRpbmcoKSB7XHJcbiAgICAgICAgc2FmZURPTS5hcHBlbmQoZG9jdW1lbnQuaGVhZCwgb1N0eWxlKVxyXG4gICAgICAgIHNhZmVET00uYXBwZW5kKGRvY3VtZW50LmJvZHksIG9EaXYpXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbW92ZUxvYWRpbmcoKSB7XHJcbiAgICAgICAgc2FmZURPTS5yZW1vdmUoZG9jdW1lbnQuaGVhZCwgb1N0eWxlKVxyXG4gICAgICAgIHNhZmVET00ucmVtb3ZlKGRvY3VtZW50LmJvZHksIG9EaXYpXHJcbiAgICAgIH0sXHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBcclxuICBjb25zdCB7IGFwcGVuZExvYWRpbmcsIHJlbW92ZUxvYWRpbmcgfSA9IHVzZUxvYWRpbmcoKVxyXG4gIGRvbVJlYWR5KCkudGhlbihhcHBlbmRMb2FkaW5nKVxyXG4gIFxyXG4gIHdpbmRvdy5vbm1lc3NhZ2UgPSAoZXYpID0+IHtcclxuICAgIGV2LmRhdGEucGF5bG9hZCA9PT0gJ3JlbW92ZUxvYWRpbmcnICYmIHJlbW92ZUxvYWRpbmcoKVxyXG4gIH1cclxuICBcclxuICBzZXRUaW1lb3V0KHJlbW92ZUxvYWRpbmcsIDQ5OTkpXHJcbiAgIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTLFNBQVMsWUFBVyxDQUFDLFlBQVksYUFBYSxHQUFHO0FBQ3RELFNBQU8sSUFBSSxRQUFRLENBQUMsWUFBWTtBQUM5QixRQUFJLFVBQVUsU0FBUyxTQUFTLFVBQVUsR0FBRztBQUMzQyxjQUFRLElBQUk7QUFBQSxJQUNwQixPQUFhO0FBQ0wsZUFBUyxpQkFBaUIsb0JBQW9CLE1BQU07QUFDbEQsWUFBSSxVQUFVLFNBQVMsU0FBUyxVQUFVLEdBQUc7QUFDM0Msa0JBQVEsSUFBSTtBQUFBLFFBQ2I7QUFBQSxNQUNYLENBQVM7QUFBQSxJQUNGO0FBQUEsRUFDUCxDQUFLO0FBQ0Y7QUFFRCxNQUFNLFVBQVU7QUFBQSxFQUNkLE9BQU8sUUFBUSxPQUFPO0FBQ3BCLFFBQUksQ0FBQyxNQUFNLEtBQUssT0FBTyxRQUFRLEVBQUUsS0FBSyxPQUFLLE1BQU0sS0FBSyxHQUFHO0FBQ3ZELGFBQU8sT0FBTyxZQUFZLEtBQUs7QUFBQSxJQUNoQztBQUFBLEVBQ0Y7QUFBQSxFQUNELE9BQU8sUUFBUSxPQUFPO0FBQ3BCLFFBQUksTUFBTSxLQUFLLE9BQU8sUUFBUSxFQUFFLEtBQUssT0FBSyxNQUFNLEtBQUssR0FBRztBQUN0RCxhQUFPLE9BQU8sWUFBWSxLQUFLO0FBQUEsSUFDaEM7QUFBQSxFQUNGO0FBQ0Y7QUFRRCxTQUFTLGFBQWE7QUFDcEIsUUFBTSxZQUFZO0FBQ2xCLFFBQU0sZUFBZTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBT3BCLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQW9CVixRQUFNLFNBQVMsU0FBUyxjQUFjLE9BQU87QUFDN0MsUUFBTSxPQUFPLFNBQVMsY0FBYyxLQUFLO0FBRXpDLFNBQU8sS0FBSztBQUNaLFNBQU8sWUFBWTtBQUNuQixPQUFLLFlBQVk7QUFDakIsT0FBSyxZQUFZLGVBQWUsU0FBUztBQUV6QyxTQUFPO0FBQUEsSUFDTCxnQkFBZ0I7QUFDZCxjQUFRLE9BQU8sU0FBUyxNQUFNLE1BQU07QUFDcEMsY0FBUSxPQUFPLFNBQVMsTUFBTSxJQUFJO0FBQUEsSUFDbkM7QUFBQSxJQUNELGdCQUFnQjtBQUNkLGNBQVEsT0FBTyxTQUFTLE1BQU0sTUFBTTtBQUNwQyxjQUFRLE9BQU8sU0FBUyxNQUFNLElBQUk7QUFBQSxJQUNuQztBQUFBLEVBQ0Y7QUFDRjtBQUlELE1BQU0sRUFBRSxlQUFlLGNBQWUsSUFBRyxXQUFZO0FBQ3JELFNBQVUsRUFBQyxLQUFLLGFBQWE7QUFFN0IsT0FBTyxZQUFZLENBQUMsT0FBTztBQUN6QixLQUFHLEtBQUssWUFBWSxtQkFBbUIsY0FBZTtBQUN2RDtBQUVELFdBQVcsZUFBZSxJQUFJOyJ9
