const x_class='x';
const c_class='circle';

const win_com=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]
const cellele=document.querySelectorAll('[data-cell]');
const boarde=document.getElementById("board");
const winmsgtxt=document.getElementById('win-txt');
const winmsg=document.querySelector('[data-win-mesg-txt]');
const btn=document.getElementById('restart');
const xw=document.getElementById('x_win');
const ow=document.getElementById('o_win');
const t=document.getElementById('tie');
const turn=document.querySelector('.turn');
const ref=document.querySelector('.refresh')
ref.addEventListener('click', function() {
    location.reload();
});

let cturn;
var xwin=0;
var owin=0;
var tie=0;
startgame();

btn.addEventListener('click',startgame);

function startgame(){
    cturn=false;
    cellele.forEach(cell=>{
        cell.classList.remove(x_class);
        cell.classList.remove(c_class);
        cell.removeEventListener('click',handle);
        cell.addEventListener('click',handle,{once:true})
    });
    setBoardHoverClass();
    winmsgtxt.classList.remove('show');

}

function handle(e){
    const cell=e.target;
    const curr=cturn?c_class:x_class;
    //placemark
    placemark(cell,curr);
    //check for draw
    if(chechwin(curr)){
        endgame(false);
    } else if(isdraw()){
        endgame(true);
    }
    else{
        swapturn();
        setBoardHoverClass();
    }
}

function endgame(draw){
    if(draw){
        winmsg.innerText="Draw!"
        tie+=1;
        t.innerHTML="Ties : "+tie;
    } else{
        winmsg.innerText=`${cturn ?"O's":"X's"} Wins! `;
        if(cturn){
            owin+=1;
            ow.innerHTML="O : "+owin;
        }else{
            xwin+=1;
            xw.innerHTML="X : "+xwin;
        }
    }
    winmsgtxt.classList.add('show');
}
function isdraw(){
    return [...cellele].every(cell=>{
        return cell.classList.contains(x_class) || cell.classList.contains(c_class);
    })
}

function placemark(cell,curr){
    cell.classList.add(curr);
}
function swapturn(){
    if(cturn==false){
        turn.innerHTML="O Turn"
    }else{
        turn.innerHTML="X Turn"
    }
    cturn=!cturn;
    

}
function setBoardHoverClass(){
    boarde.classList.remove(x_class);
    boarde.classList.remove(c_class);
    if(cturn){
        boarde.classList.add(c_class);
    }else{
        boarde.classList.add(x_class);
    }
}

function chechwin(curr){
    return win_com.some(combination=>{
        return combination.every(index=>{
            return cellele[index].classList.contains(curr);
        })
    })
}