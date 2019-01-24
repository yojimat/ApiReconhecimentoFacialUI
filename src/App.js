import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Modal from  './components/modal/Modal';
import Profile from  './components/profile/Profile';
import './App.css';

const particlesOptions = {
  particles: {
    number:{
      value:50,
      density:{
        enable:true,
        value_area:1500
      }
    },
    color:{
      value: "#ffffff"
    },
    "opacity": {
      "value": 0.4498141557303954,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3.945738208161363,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 173.61248115909999,
      "color": "#fad00c",
      "opacity": 0.4,
      "width": 1.5782952832645454
    },
    "move": {
      "enable": true,
      "speed": 12.626362266116361,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "bounce",
      "bounce": false,
      "attract": {
        "enable": true,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },

  interactivity: {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
}
  
const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  usuario: {
    id: '',
    nome: '',
    email: '',
    postagens: 0,
    pet: 'Animal preferido xD',
    idade: 'Qual a sua idade?',
    imgSource: "http://tachyons.io/img/logo.jpg",
    inscricao: new Date() 
  },
  imageLinkAnterior: false,
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
      this.setState(prevState => ({
        ...prevState,
        usuario: {
            ...prevState.usuario,
            id: data.id,
            nome: data.nome,
            email: data.email,
            postagens: data.postagens,
            inscricao: data.inscricao,
            idade: data.idade ? data.idade : initialState.usuario.idade,
            pet: data.pet ? data.pet : initialState.usuario.pet,
            imgSource: data.imageprofile ? data.imageprofile : initialState.usuario.imgSource
          }
      })); 
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token');

    if (token) {
      fetch('http://192.168.99.100:3000/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data && data.id) {
            fetch(`http://192.168.99.100:3000/profile/${data.id}`, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              }
            })
              .then(resp => resp.json())
              .then(user => {
                if (user && user.email) {
                  this.loadUser(user);
                  this.onRouteChange('home');
                }
              })
          }
        })
        .catch(console.log)
    }
  }

  calculateFaceLocation = (data) => {
    let totalRostos = data.outputs[0].data.regions.length;
    let boxes = [];

    for (let i = 0; i < totalRostos; i++) {
      const clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      boxes[i] = {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row *height)
      }
    }
    return boxes;
  }

  displayFaceBox = (boxes = []) => {
    this.setState(prevState =>({
      ...prevState,
      boxes: boxes
    }));
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
 
  onPictureSubmit = () => {
    if (this.state.input !== this.state.imageUrl) {
      this.setState(prevState =>({
        ...prevState,
        imageUrl: this.state.input,
        imageLinkAnterior: false
      }));
    }

    fetch('http://192.168.99.100:3000/imageurl'/*'https://frozen-caverns-42300.herokuapp.com/imageurl'*/, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token')
      },
      body: JSON.stringify({
        input: this.state.input,
      })
    })
    .then(response => response.json())
    .then(response => {

      if (response.outputs.length && this.state.imageLinkAnterior === false) {
        fetch('http://192.168.99.100:3000/image'/*'https://frozen-caverns-42300.herokuapp.com/image'*/, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
          },
          body: JSON.stringify({
            id: this.state.usuario.id,
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.usuario, { postagens: count}));
          })
        .catch(console.log);
      }

      this.imageLinkAnteriorComponent()
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
      .catch(error => console.log(error));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      return this.setState(initialState);
    } else if (route === 'home') {
      this.setState(prevState =>({
        ...prevState,
        isSignedIn: true
        }))
    }

    this.setState(prevState =>({
      ...prevState,
      route: route
    }))
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }));
  }

  imageLinkAnteriorComponent = () => {
    if (this.state.input !== this.state.imageUrl ) {
      return this.setState({imageLinkAnterior: false});
    } else {
      return this.setState({imageLinkAnterior: true});
    }
  }

  onChangeImageProfile = e => {
    const file = Array.from(e.target.files);

    const formData = new FormData();
    const types = ["image/png", "image/jpeg", "image/gif"];

    if (types.every(type => file[0].type !== type)) {
      console.log("erro de tipo");
      return `'${file.type}' is not a supported format`
    }
    if (file[0].size > 150000) {
      console.log("erro de tamanho");
      return `'${file.name}' is too large, please pick a smaller file`
    }
    ////
    formData.append(0,file[0]);
    formData.append('id',this.state.usuario.id);

    fetch("http://192.168.99.100:3000/image-profile-upload", {
      method: 'POST',
      headers: {
        'Authorization': window.localStorage.getItem('token')
      },
      body: formData
    })
    .then(res => {
      if (!res.ok) {
        throw res
      }
      return res.json()
    })
    .then(images => {
      this.setState(prevState => ({
        usuario: {
          ...prevState.usuario,
          imgSource: images[0].secure_url
        }
      }))
    })
    .catch(err => {
      err.json().then(e => {
        return "Erro ao postar a imagem. 😱"
      })
    })
  }

  render() {
    return (
      <div className='App'>
      <Particles className='particles' params={ particlesOptions} />
      <Navigation 
        isSignedIn={this.state.isSignedIn}
        onRouteChange={this.onRouteChange}
        toggleModal={this.toggleModal}
        imgSource={this.state.usuario.imgSource}
      />
      { this.state.isProfileOpen &&
          <Modal>
            <Profile 
              isProfileOpen={this.state.isProfileOpen}
              toggleModal={this.toggleModal}
              usuario={this.state.usuario}
              loadUser={this.loadUser}
              onChangeImageProfile={this.onChangeImageProfile}
            />
          </Modal>
      }
      { this.state.route === 'home' 
          ? <div>
          <Logo />
          <Rank 
            nome={this.state.usuario.nome} 
            postagens={this.state.usuario.postagens} 
          />
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onPictureSubmit={this.onPictureSubmit}
            imageLinkAnterior={this.state.imageLinkAnterior}
          />
          <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl} />
          </div>
          : (
              this.state.route === 'signin'
              ? <div>
              <Signin 
                onRouteChange={this.onRouteChange} 
                loadUser={this.loadUser}
              /></div>
              : <div>
              <Register 
                onRouteChange={this.onRouteChange} 
                loadUser={this.loadUser}
              /></div>
            )   
      }
      <p className='i underline white pa3 ma3'>V.N.</p>
      </div>
    );
  }
}

export default App;
  