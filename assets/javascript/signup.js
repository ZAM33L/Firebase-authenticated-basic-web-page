// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword ,signOut} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore , doc,setDoc,getDoc ,collection,getDocs} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIyPEC_zo3DrvDbheijNhSLFVW39rQUu8",
  authDomain: "atlantic-theme-63f14.firebaseapp.com",
  projectId: "atlantic-theme-63f14",
  storageBucket: "atlantic-theme-63f14.appspot.com",
  messagingSenderId: "445342387982",
  appId: "1:445342387982:web:428b08e8a72523bdcf915f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

function signUpAccount(){
        const fname=document.getElementById("fname").value;
        const lname=document.getElementById("lname").value;
        const email=document.getElementById("email").value;
        const password=document.getElementById("password").value;
        console.log(fname,lname,email,password);


createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
   
    const user = userCredential.user;
    await setDoc(doc(db, "accounts", email), {
        firstName:fname,
        lastName:lname,
        
    }).then(()=>{
        console.log("added to the database");
        window.location.href="http://127.0.0.1:5500/login.html";
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  
  });
}

function loginAccount(){
        const email=document.getElementById("email").value;
        const password=document.getElementById("password").value;
        
 signInWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    
    const user = userCredential.user;
    const docRef = doc(db, "accounts", user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        localStorage.setItem("fname",docSnap.data().firstName);
        localStorage.setItem("lname",docSnap.data().lastName);
        localStorage.setItem("email",user.email);
        window.location.href="http://127.0.0.1:5500/index.html";
        } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        }
      })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}
function logOut(){
        signOut(auth).then(() => {
                // Sign-out successful.
                localStorage.removeItem("fname");
                localStorage.removeItem("lname");
                localStorage.removeItem("email");
                window.location.href="http://127.0.0.1:5500/";
              }).catch((error) => {
                // An error happened.
              });
}

async function getProductData(){
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  var template=`<div class="flex flex-col">
  <img src ="${doc.data().imageURL}" alt="card1" class="w-full"> 
  <div class="my-2 flex flex-col gap-2">
  <p class="font-light">${doc.data().company}</p>
  <h5 class="font-medium text-xl">${doc.data().productName}</h5>
  <p class="font-light">${doc.data().price}</p>
  </div>
  </div>`;
  document.getElementById("productData").insertAdjacentHTML("beforeend",template);
});
}




module.createAccount=signUpAccount;
module.loginAccount=loginAccount;
module.logOut=logOut;
module.getProductData=getProductData;

console.log(module);