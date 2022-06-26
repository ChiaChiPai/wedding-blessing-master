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

const flowerTimer = setInterval( () => {
  const dom = document.getElementById('flower')
  if (!dom) {
    clearInterval(flowerTimer)
    return
  }
  document.getElementById('flower').style.display = 'none'
  if(message.length <= 0) return

  document.getElementById('flower').innerHTML = `
    ${message[0].name}: ${message[0].msg}
  `
  const ref = db.collection('blessing').doc(message[0].id)
  ref.update({
    read: true,
  }).then(() => {
    console.log('update data successful');
  });

  setTimeout(() => {
    document.getElementById('flower').style.display = 'flex'
    const randomHeight = Math.floor(Math.random() * 70)
    document.getElementById('flower').style.top = `${randomHeight}vh`
  }, 600)
}, 7000)

const fireworkTimer = setInterval(() => {
  const dom = document.getElementById('firework')
  if (!dom) {
    clearInterval(fireworkTimer)
    return
  }

  document.getElementById('firework').style.display = 'none'
  if(message.length <= 0) return
  document.getElementById('firework').innerHTML = `
    ${message[0].name}:  ${message[0].msg}
  `
  const ref = db.collection('blessing').doc(message[0].id)
  ref.update({
    read: true,
  }).then(() => {
    console.log('update data successful');
  });

  setTimeout(() => {
    document.getElementById('firework').style.display = 'flex'
    const randomHeight = Math.floor(Math.random() * 70)
    document.getElementById('firework').style.top = `${randomHeight}vh`
  }, 500)
}, 8000)
