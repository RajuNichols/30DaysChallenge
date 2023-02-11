/*
  Helpful resources: 
  - https://firebase.google.com/docs/database/web/start
  - https://www.educative.io/courses/complete-guide-firebase-web/gkJGzkWK7zk
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getDatabase, ref, set, child, get, remove } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyBC_HeFNe_YZksC9p7axJWkbS6ktgIsYX4",
  authDomain: "dayschallenge-d8b3c.firebaseapp.com",
  databaseURL: "https://dayschallenge-d8b3c-default-rtdb.firebaseio.com",
  projectId: "dayschallenge-d8b3c",
  storageBucket: "dayschallenge-d8b3c.appspot.com",
  messagingSenderId: "718109439350",
  appId: "1:718109439350:web:7cf1441683172cd6efb657",
  measurementId: "G-JKM4RHLFHS"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);

// Create: Add a city to the 'cities' database
export function createCity()
{
  const city = "CHI";
  set(ref(db, 'cities/' + city), {
    name: "Chicago",
    state: "IL",
    country: "USA"
  });
  console.log("Added city.");
}

// Read: Read a city by the ID from the 'cities' database
export function readCity()
{
  const city = "CHI";
  get(child(dbRef, `cities/${city}`)).then((snapshot) => {
    if (snapshot.exists())
    {
      console.log(snapshot.val());
    } else {
      console.log("City doesn't exist");
    }
  }).catch((error) => {
    console.error(error);
  });
}

// Update: Update a city by overriding it's previous state 
export function updateCity()
{
  const city = "CHI";
  set(ref(db, 'cities/' + city), {
    name: "Chi-town",
    state: "IL",
    country: "USA"
  });
  console.log("Updated city.");
}

// Delete: Delete a city by the ID from the 'cities' database
export function deleteCity()
{
  const city = "CHI";
  const laRef = ref(db, `cities/${city}`);
  remove(laRef).then(() => {
    console.log("removed city.")
  });
}

