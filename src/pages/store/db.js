import fb from '../../js/firebase'
export let firerequest = fb.database().ref('/requests');
export let firefriends = fb.database().ref('/friends');