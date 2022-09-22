
const input = document.querySelector('input')
const add = document.querySelector('.add');
const ul = document.querySelector('ul');
let str="";
let url = 'http://localhost:3000';
init(`${url}/todolist`)
//增加事項
add.addEventListener('click',()=>{
    axios.post(`${url}/todolist`,{
        todos:input.value,
        done:false
    }).then(
    ).catch(err=>console.log(err));
})

    //依照選擇項目查看內容
    const todoStatue = document.querySelectorAll('div.top>section');
    todoStatue.forEach((item,index)=>{
        todoStatue[index].addEventListener('click',function(){
            todoStatue.forEach(item=>{
                item.classList.remove('active');
            })
            this.classList.add('active');
        })
    })
    todoStatue[0].addEventListener('click',()=>{
        ul.innerHTML=''
        init(`${url}/todolist`);
    })
    todoStatue[1].addEventListener('click',function(){
        ul.innerHTML=''
   init(`${url}/todolist/?done=false`)
    })
    todoStatue[2].addEventListener('click',function(){
        ul.innerHTML=''
   init(`${url}/todolist/?done=true`)
    })

//基礎畫面渲染以及操作
function init(apiURL) {
    axios.get(apiURL).then((response)=>{

        let data = response.data;
        data.forEach((item,index) => {
            if(item.done){
                str =` <li data-id="${item.id}" class="done">
                <label for="checkbox">
                <input type="checkbox">
                <i class="fi fi-br-check"></i>
                <p>${item.todos}</p>
                </label>
                <div class="clear">
                <i class="fi fi-br-cross"></i>
                </div>
                </li> `;
            }else{
                str =` <li data-id="${item.id}">
                <label for="checkbox">
                <input type="checkbox">
                <i class="fi fi-br-check"></i>
                <p>${item.todos}</p>
                </label>
                <div class="clear">
                <i class="fi fi-br-cross"></i>
                </div>
                </li> `;
            }
            ul.innerHTML+=str;
        });
    //todo項目操作
    const lis = document.querySelectorAll('li');
    lis.forEach(function (item,index){
        //改變li的完成or未完成狀態
        lis[index].addEventListener('click',function(){
            if(this.className != 'done'){
                axios.patch(`${url}/todolist/${this.dataset.id}`,{
                    done:true
                })
            }else{
                this.classList.add('done')
                axios.patch(`${url}/todolist/${this.dataset.id}`,{
                    done:false
                })
            }
        })
        //點擊 X 刪除
        const clear = lis[index].querySelector('.clear');
        clear.addEventListener('click',(e)=>{
            const id = e.target.parentElement.dataset.id;
            axios.delete(`${url}/todolist/${id}`).then(res=>console.log(res)).catch(e=>console.log(e));
        })
        //代完成數目
        const notDone_number = document.querySelector('.num');
        axios(`${url}/todolist/?done=false`).then(res=>{
            let notDone = res.data;
            let number = 0;
            notDone.forEach(item=>{
                number++;
            })
            notDone_number.textContent = number;
            }
            )
        //刪除已完成的項目
        const clearAll = document.querySelector('.clearAll');
        clearAll.addEventListener('click',(e)=>{
            data.forEach(item=>{
                if(item.done){
                    axios.delete(`${url}/todolist/${item.id}`).then(res=>console.log(res)).catch(e=>console.log(e));
                }
            })
        })
    
    
    })
    
    }).catch(err=>console.log(err)); 
}