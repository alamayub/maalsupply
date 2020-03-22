import fb from '../../js/firebase'
const FileModule = {
  state: {
    image_url: 'https://nagriksevakendra.in/default/login/avatar.png',
    files: null,
    images: [],
    group_image_url: 'https://cdn0.iconfinder.com/data/icons/social-media-glyph-1/64/Facebook_Social_Media_User_Interface-39-512.png'
  },
  getters: {
    image_url:state=>state.image_url,
    files:state=>state.files,
    images:state=>state.images,
    group_image_url:state=>state.group_image_url
  },
  mutations: {
    setImageURL(state, payload) {
      state.image_url = payload
    },
    setGroupImageURL(state, payload) {
      state.group_image_url = payload
    },
    setFiles(state, payload) {
      state.files = payload
    },
    setImages(state, payload) {
      state.images = payload
    },
  },
  actions: {
    readFileMessage({commit}) {
      const files = event.target.files;
      for(var i = 0; i < files.length; i++) {
        var file = files[i]
        if(!file.type.match('image')) {
          continue;
        }
        var picReader = new FileReader();
        var images = []
        picReader.addEventListener('load', (event) => {
          var picFile = event.target;
          images.push(picFile.result)
        })
        commit('setImages', images)
        picReader.readAsDataURL(file)
      }
    },
    uploadChatImages({commit}, payload) {
      return new Promise((resolve, reject) => {
        var number = Math.random();
        var unique_id = number.toString(36).substr(2, 9);
        var storageRef = fb.storage().ref('chat_images/'+`${unique_id}.png`)
        var task = storageRef.putString(payload, 'data_url', {
          contentType: 'image/png'
        })
        task.on('state_changed', (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (err) => {
          reject(err)
        }, () => {
          task.snapshot.ref.getDownloadURL().then( (downloadURL) => {
            resolve(downloadURL)
          });
        });
      })
    },
    readFile({commit}, action_name) {
      const files = event.target.files;
      commit('setFiles', files);
      const fileReader = new FileReader();
      let file = files[0]
      if(file['size'] < 200000) {
        fileReader.readAsDataURL(file)
        fileReader.addEventListener('load', () => {
          var imageUrl = fileReader.result
          commit(action_name, imageUrl)
        })        
      } else {
        commit('setAlertMessage', 'Please chose an image less than 2MB')
        return
      }
    },
    uploadFile({commit, state}) {
      return new Promise((resolve, reject) => {
        var file = state.files[0];
        var storageRef = fb.storage().ref('profile/'+file.name)
        var task = storageRef.put(file)
        task.on('state_changed', (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, (err) => {
          reject(err)
        }, () => {
          task.snapshot.ref.getDownloadURL().then( (downloadURL) => {
            resolve(downloadURL)
            console.log('File available at', downloadURL);
          });
        });
      })
    }
  }
}
export default FileModule