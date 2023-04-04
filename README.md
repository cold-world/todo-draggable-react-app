ToDo draggable app.
=======================================

React, React-draggable.

Main goal -> CRUD + drag and drop.


* * *
### [Demo](https://cold-world.github.io/todo-draggable-react-app/)

![Alt Text](https://i.ibb.co/nRQHmcW/2.gif)

* * *



### A piece of code

```
const addTodoHandler = (e) => {
    e.preventDefault();
    if (todo !== '') {
      const newTodo = {
        text: todo,
        edit: false,
        id: v4(),
        color: randomColor({
          luminosity: 'light'
        }),
        defaultPos: {
          x: randomPos(100, 50),
          y: randomPos(-150, -50)
        }
      }
      setTodos(todos => [...todos, newTodo]);
      setTodo('');
    } else {
      input.current.placeholder = 'just type something...';
      setTimeout(() => {
        input.current.placeholder = 'input your task';
      }, 1500);
    }
    setTodo('');
  };
```

### Download & Installation

```shell 
git clone https://github.com/cold-world/todo-draggable-react-app.git
cd <project-dir>
npm install
npm start
```
