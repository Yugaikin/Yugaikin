let input = document.querySelector('.input');
let list = document.querySelector('#ul');
let listToDo = [];
let count = document.querySelector('.count');

list.style.listStyleType="none";

function add(){ // добавить объект с задачей в массив
    let task = {
        id : Date.now(),
        text : input.value,
        check : ''
    }
    listToDo.push(task);
    todo(listToDo);
}

function clearAll(){ //удалить все задачи
    list.innerHTML='';
    listToDo=[];
    count.innerHTML= 'Количество задач:';
}

function del(id){ // удалить задачу 
    listToDo = listToDo.filter(elem=>elem.id!==id);
     todo(listToDo);
}

function checkAll(){ // отметить все задачи
    listToDo.map(item=>{
        if(item.check==''){
            item.check='checked';
        }
    })
    todo(listToDo);
}

function uncheckAll(){ // снять отметку с задач
    listToDo.map(item=>{
        if(item.check=='checked'){
            item.check='';
        }
    })
    todo(listToDo);
}

function delCheckAll(){ // удалить все отмеченные задачи
    let filterUncheck=listToDo.filter(item=>{ return item.check==''})
    listToDo=filterUncheck;
    todo(listToDo);
}

function delUncheckAll(){ // удалить все не отмеченные задачи
    let filterCheck=listToDo.filter(item=>{ return item.check=='checked'})
    listToDo=filterCheck;
    todo(listToDo);
}

let select;
let arrCheck;
let arrUnCheck;
function sortToDo(){ // отсортировать задачи
    select = document.querySelector('.sort');
    arrCheck = listToDo.filter(item=>{return item.check=='checked'});
    arrUnCheck = listToDo.filter(item=>{return item.check==''});

    if(select.value=="check"){
        todo(arrCheck.concat(arrUnCheck));
    } 
    else if(select.value=="unCheck"){
        todo(arrUnCheck.concat(arrCheck));
    }
    else if(select.value=="all"){
        todo(listToDo);
    }
}

function numberCase(){ // счётчик задач
    let check=0;
    let unCheck=0;
    listToDo.map(item=>{
        item.check=='checked' ? ++check : ++unCheck;
    })
    count.innerHTML= 'Выполненных дел: ' + check + ' Невыполненных дел: ' + unCheck;
}

let firstIndex = 0;
let lastIndex = 3;

function handlerPagination(page){  // пролистывание
    if(page==='next'){
        if(firstIndex + lastIndex < listToDo.length){
            firstIndex+=lastIndex;
        }
    }
    else{
        if(firstIndex>0){
            firstIndex-=lastIndex;
        }
    }
    sortToDo();
}

function handlerTodoOnPage(){ // количество отображаемых задач
    let pagNum = document.querySelector('.pag');  
    lastIndex= +pagNum.value;
    while(firstIndex%lastIndex!==0){
        firstIndex--;
    }
    sortToDo();
}

function checkThis(index,id){ // отметить задачу
    let checks = document.querySelectorAll('input[type=checkbox]');
    listToDo.map(elem=>{
        if(elem.id===id){
            elem.check=checks[index-firstIndex].checked ? 'checked' : '';
            return;
        }
    })
    sortToDo();
    numberCase();
}

function editing(index,id){ // редактировать задачу
    let texts = document.querySelectorAll('input[type=text]');
    listToDo.map(elem=>{
        if(elem.id===id){
            elem.text=texts[index-firstIndex].value;
        }
    })
    todo(listToDo);
}

function todo(listToDo){ // добавить задачу на страницу
    list.innerHTML='';
    listToDo.map((task,index)=>{
        if(index>=firstIndex && index<firstIndex+lastIndex){
            let todo = `<li>
                <input type="text" value="${task.text}" class="${task.id}" onchange="editing(${index},${task.id})">
                <input type="checkbox" ${task.check} onclick="checkThis(${index},${task.id})">
                <button onClick="del(${task.id})">X</button>
            </li>`;
        list.innerHTML+=todo;
        }
    })
    numberCase();
    console.log(listToDo);
}