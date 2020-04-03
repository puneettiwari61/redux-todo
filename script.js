import { createStore } from "redux";
console.log("start");

const input = document.querySelector("#input");
const add = document.querySelector(".add");
const ul = document.querySelector("ul");

function counter(state = [], action) {
  switch (action.type) {
    case "add":
      return (state = state.concat({
        todo: input.value,
        id: Date.now(),
        completed: false
      }));
    case "del":
      return (state = state.filter(t => {
        if (t.id == action.id) {
          return false;
        } else return true;
      }));
    case "done":
      return (state = state.map(t => {
        if (t.id == action.id) {
          t.completed = true;
        }
        return t;
      }));
    case "active":
      return (state = state.map(t => {
        if (t.id == action.id) {
          t.completed = false;
        }
        return t;
      }));
    default:
      return state;
  }
}

let store = createStore(counter);

store.subscribe(() => {
  ul.innerHTML = "";
  store.getState().forEach(t => {
    const checkIt = document.createElement("input");
    checkIt.setAttribute("type", "checkbox");
    const li = document.createElement("li");
    li.classList.add("li");
    const p = document.createElement("p");
    checkIt.checked = t.completed;
    t.completed ? p.classList.add("done") : p.classList.add("active");
    p.innerText = t.todo;
    li.setAttribute("data-id", t.id);
    const del = document.createElement("button");
    del.innerText = "X";
    li.append(checkIt, p, del);
    ul.append(li);
    checkIt.addEventListener("click", e => {
      console.log(e.target.checked);
      if (e.target.checked) {
        store.dispatch({ type: "done", id: t.id });
      } else if (!e.target.checked) {
        store.dispatch({ type: "active", id: t.id });
      }
    });
    del.addEventListener("click", e => {
      // store.getState().filter(d => {
      //   d.id == e.target.dataset.id;
      // });
      store.dispatch({ type: "del", id: t.id });
    });
  });
});

add.addEventListener("click", () => {
  store.dispatch({ type: "add" });
  input.value = "";
});

input.addEventListener("keyup", e => {
  if (e.keyCode == 13 && input.value) {
    store.dispatch({ type: "add" });
    input.value = "";
  }
});
// (state = state.filter(t => {
//   if(t.id == )
// })
