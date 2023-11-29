
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
 import { getFirestore , collection, addDoc , onSnapshot ,doc, deleteDoc ,updateDoc}from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
 

 const firebaseConfig = {
   apiKey: "AIzaSyC6oMeNwkP0ARZrM_eU3zl6YjQvgUxXzP8",
   authDomain: "todo--app-c4dce.firebaseapp.com",
   projectId: "todo--app-c4dce",
   storageBucket: "todo--app-c4dce.appspot.com",
   messagingSenderId: "19494461043",
   appId: "1:19494461043:web:26579034b9eb5c2482d406",
   measurementId: "G-FL02EVVF4W"
  };
  let ul=document.querySelector("#getul")
 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
window.addtodo=  async function(){
    let getinp=document.querySelector("#getinp")
    const docRef = await addDoc(collection(db, "todos"), {
        name: getinp.value,
        time:new Date().toLocaleString()
      });
      console.log("Document written with ID: ", docRef.id);
    }
function  getdata(){
    onSnapshot(collection(db,'todos'),(data)=>{
        data.docChanges().forEach((newdate)=>{
            if(newdate.type  =='removed'){
                let del =document.getElementById(newdate.doc.id)
                del.remove()
            }
            else if(newdate.type =="added")     {
            //     console.log(newdate);
                ul.innerHTML +=`
                <li  class="lib"   id=${newdate.doc.id}>${newdate.doc.data().name}   ${newdate.doc.data().time} <button class="db"  onclick="deltodo('${newdate.doc.id}')"
                >Delet</button>
                <button  class="eb" onclick="edit(this,'${newdate.doc.id}')">Edit</button>
                </li>
                `
            }})})}
getdata()
 async function deltodo(id){
    await deleteDoc(doc(db, "todos", id));
}
 async function edit( e,id){
let editval=prompt("Enter edit value" )
 e.parentNode.firstChild.nodevalue =editval
await updateDoc( doc(db, "todos", id), {
  name:editval,
  time:new Date().toLocaleString()
});
}


window.dltAll = async function () {
 const Tcollection = collection(db,"todos")
 const todoSnapShot=await getDocs(Tcollection)

  const deletePromises=[]
  
  todoSnapShot.forEach((data)=>{
    deletePromises.push(deleteDoc(data.docRef))
  })

  ul.innerHTML=''
}











window.getdata=getdata
window.deltodo=deltodo
window.edit=edit
