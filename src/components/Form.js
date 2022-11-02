const Form = ({todo, setTodo, addTodoHandler, input}) => {
    return (
        <form>
            <input className='addTodo-input' ref={input} value={todo} onChange={(e) => setTodo(e.target.value)} type="text" placeholder='input your task' />
            <button onClick={addTodoHandler} className='addTodo-btn'>+</button>
        </form>
    )
}

export default Form;