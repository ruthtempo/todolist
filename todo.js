function addTodo(text, list){

    const todo={
        text,
        checked:false,
        id:Date.now()
    };

    const newList = list.concat(todo);

    return newList;

}

function deleteTodo(id, list){

    function checkId (todo){
        return todo.id !== id
    };

    const newList= list.filter(
        todo=>todo.id !== id
    );

    return newList;
}

function checkTodo(id, list){
    
    const newList = list.map(todo =>
        (todo.id === id) ? {
            ...todo,
            checked: !todo.checked, 
        } : (
            todo
        )
    );

    return newList;

}

function List(list){
    return `
        <h1>My Todo List</h1>

        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <div class="input-group">
                    <input id="inputarea" type="text" class="form-control" placeholder="i.e. Do yoga">
                    <button class="btn btn-outline-secondary addbutton" type="button">Add Todo</button>
                </div>
            </div>

            <ul class="list-group list-group-flush" >
            
                ${list.map(ListItem).join(" ")}

            </ul>
        </div>
    `;
}

function ListItem(todo){
    return `
        <li class="list-group-item todo ${todo.checked ? "text-decoration-line-through":""}" data-id="${todo.id}">
            <input class="form-check-input me-1 checkbox" type="checkbox" ${todo.checked ? 'checked="checked"' : "" } />
            ${todo.text}
        </li>
    `;
}



function render(list){
    // = means assign. it is assigned to the return value of the function, because we are calling it.
    document.querySelector('.container').innerHTML = List(list);
}


let testList = [
    {text: 'yoga',
    checked:true,
    id:1},

    {text: 'meditation',
    checked:true,
    id:2},

    {text: 'popo',
    checked:false,
    id:3},

    {text: 'bocadillo',
    checked:false,
    id:4}
]

render(testList)

//console.log(testList.map(ListItem))


document.addEventListener('click', (ev)=>{ 
    if(ev.target.classList.contains("addbutton")){
        
        const input= document.getElementById('inputarea')
        testList = addTodo(input.value, testList);

        //console.log(input.value)
        render(testList)

    }else if(ev.target.classList.contains('todo')|| ev.target.classList.contains('checkbox')){
        
        const id = parseInt(ev.target.dataset.id);
        testList=checkTodo(id, testList);
        render(testList)

    }
  
})

