// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const firebaseConfig = {
  apiKey: "AIzaSyCwVTYtyUPnFW-q5Crh8gCrKK1sSJvXLWI",
  authDomain: "wedding-blessing.firebaseapp.com",
  projectId: "wedding-blessing",
  storageBucket: "wedding-blessing.appspot.com",
  messagingSenderId: "1027424395640",
  appId: "1:1027424395640:web:534c3780b3aee2c2c8288d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

const usedMessage = []
let message = []

let ref = db.collection('blessing');
ref.where('read','==',false).onSnapshot(querySnapshot => {
  const array = []
  querySnapshot.forEach(doc => {
    array.push({id: doc.id, ...doc.data()})
  });
  message = array
  if(!querySnapshot) {
    console.log('empty');
  }
});

let count = 0

const flowerTimer = setInterval( () => {
  const dom = {
    0: document.getElementById('flower'),
    1: document.getElementById('firework')
  }

  if(message.length <= 0) {
    if(dom[0].style.display === 'flex') dom[0].style.display = 'none'
    if(dom[1].style.display === 'flex') dom[1].style.display = 'none'
    return
  }

  count++
  const target = count % 2

  dom[target].style.display = 'none'

  dom[target].innerHTML = `
    ${message[0].name}: ${message[0].msg}
  `
  const ref1 = db.collection('blessing').doc(message[0].id)
  ref1.update({
    read: true,
  }).then(() => {
    console.log('update data successful');
  });

  setTimeout(() => {
    dom[target].style.display = 'flex'
    const randomFireWorkHeight = Math.floor(Math.random() * 70)
    dom[target].style.top = `${randomFireWorkHeight}vh`
  }, 600)
}, 7000)