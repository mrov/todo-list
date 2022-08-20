interface Category {
  description: string,
  todoList: Todo[]
}

interface Todo {
  description: string
}

export { Category, Todo }