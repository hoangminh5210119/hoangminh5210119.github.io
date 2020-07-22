  // Set the configuration for your app
  // TODO: Replace with your project's config object


  const firebaseConfig = {
      apiKey: "AIzaSyBR23pvZ1NNAdqD4qdO_31Cmnh7XgDon84",
      authDomain: "multisensorkit.firebaseapp.com",
      databaseURL: "https://multisensorkit.firebaseio.com",
      projectId: "multisensorkit",
      storageBucket: "multisensorkit.appspot.com",
      messagingSenderId: "702121726593",
      appId: "1:702121726593:web:9de9542db4babdb5a73380",
      measurementId: "G-BNZVCD8CMK"
  };

  // Initialize Firebase with a "default" Firebase project
  firebase.initializeApp(firebaseConfig);
  var storage = firebase.storage();
  var storageRef = storage.ref();
  var database = firebase.database();
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  var uiConfig = {
      callbacks: {
          signInSuccessWithAuthResult: function (authResult, redirectUrl) {
              var user = authResult.user;
              var credential = authResult.credential;
              var isNewUser = authResult.additionalUserInfo.isNewUser;
              var providerId = authResult.additionalUserInfo.providerId;
              var operationType = authResult.operationType;
              return true;
          },
          uiShown: function () {
              document.getElementById('loader').style.display = 'none';
          },
          signInFailure: function (error) {
              if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
                  return Promise.resolve();
              }
              var cred = error.credential;
              return firebase.auth().signInWithCredential(cred);
          }
      },
      signInFlow: 'popup',
      signInSuccessUrl: './dashboard.html',
      signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      tosUrl: '<your-tos-url>',
      privacyPolicyUrl: '<your-privacy-policy-url>'
  };


  function startFirebaseUI() {
      ui.start('#firebaseui-auth-container', uiConfig);
  }

  function getImageFirebase(callback) {
      const ref = firebase.storage().ref();
      const image = ref.child('coverImage');
      const urlPromise = image.getDownloadURL();
      urlPromise.then(url => {
          callback(url)
      }, error => {
          callback(error)
      });
  }

  function uploadImageFirebase(callback) {
      const ref = firebase.storage().ref();
      const file = document.querySelector('#cover_image_id').files[0]
      const name = "coverImage";
      if (file != null) {

          const metadata = {
              contentType: file.type
          };
          const task = ref.child(name).put(file, metadata);
          task
              .then(snapshot => snapshot.ref.getDownloadURL())
              .then((url) => {
                  document.querySelector('#preview_frame').src = url;
                  callback(url)
              }).catch(
                  callback(console.error)
              );
      } else {
          callback(null)
      }

  }

  function firebaseSetData(child, data, callback) {
      firebase.database().ref(child).set(data, function (error) {
          if (error) {
              callback(error)
          } else {
              callback(null)
          }
      });
  }

  function firebaseOnValue(child, callback) {
      var starCountRef = firebase.database().ref(child);
      starCountRef.on('value', function (snapshot) {
          callback(snapshot.val())
      });
  }