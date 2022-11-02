import './App.css';
import { useState, useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import { randomColor } from 'randomcolor';
import Draggable from 'react-draggable';
import Form from './components/Form';



function App() {
  const input = useRef();
  const [todo, setTodo] = useState('');
  const [renameTodo, setRenameTodo] = useState('');
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('items', 'deletedItems')) || []
  );

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(todos))
  }, [todos]);

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

  const updatePos = (data, index) => {
    let newArr = [...todos];
    newArr[index].defaultPos = { x: data.x, y: data.y };
    setTodos(newArr);
  };

  const randomPos = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;;
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const toggleEditTodo = (id) => {
    let selectedTodo = todos.find(item => item.id === id);
    selectedTodo.edit = !selectedTodo.edit;
  };

  const renameTodoHandler = (id) => (e) => {
    e.preventDefault()
    if (renameTodo !== '') {
      let selectedTodo = todos.find(item => item.id === id);
      selectedTodo.text = renameTodo;
      selectedTodo.edit = !selectedTodo.edit;
      let newArr = todos.filter(item => item.id === selectedTodo.id ? item = selectedTodo : item);
      setTodos(newArr);
      setRenameTodo('');
    }
  };


  return (
    <div className="App">
      <div className="wrapper">
        <Form todo={todo} setTodo={setTodo} addTodoHandler={addTodoHandler} input={input} />
        {todos.map((todo, index) => {
          return (
            <Draggable key={index} defaultPosition={todo.defaultPos} onStop={(_, data) => { updatePos(data, index) }}>
              <div className="todo-item" style={{ backgroundColor: todo.color }} onDoubleClick={() => toggleEditTodo(todo.id)}>
                {!todo.edit
                  ? `${todo.text}`
                  : <form onSubmit={(e) => renameTodoHandler(todo.id)(e)}>
                    <input className='editTodo-input' type='text' style={{ backgroundColor: todo.color }}
                      placeholder={todo.text} onChange={(e) => setRenameTodo(e.target.value)} />
                    <button type='submit' className='renameTodo-btn'>✓</button>
                  </form>}
                <button onClick={() => deleteTodo(todo.id)} className='todo-btn-delete'>X</button>
              </div>
            </Draggable>
          )
        })}
      </div>
    </div>
  );
}

export default App;