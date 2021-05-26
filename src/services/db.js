import firebase from "firebase/app";
import fireb from "firebase/database";
// Set the configuration for your app
// TODO: Replace with your project's config object
let config = {
  apiKey: "AIzaSyAODVv8rBzcGCHrw6H1aJDohxRLp7KkWvo",
  authDomain: "infopelis-f050d.firebaseapp.com",
  // For databases not in the us-central1 location, databaseURL will be of the
  // form https://[databaseName].[region].firebasedatabase.app.
  // For example, https://your-database-123.europe-west1.firebasedatabase.app
  databaseURL:
    "https://infopelis-f050d-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "infopelis-f050d.appspot.com",
};

firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();
export default database;
