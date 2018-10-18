import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import './App.css';

const particlesOptions = {
  particles: {
    number:{
      value:50,
      density:{
        enable:true,
        value_area:800
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
  boxes: '',
  route: 'signin',
  isSignedIn: false,
  usuario: {
    id: '',
    nome: '',
    email: '',
    postagens: 0,
    inscricao: new Date() 
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({usuario: {
        id: data.id,
        nome: data.nome,
        email: data.email,
        postagens: data.postagens,
        inscricao: data.inscricao
    }});
  }

  componentDidMount() {
    //Teste de comunicação entre o servidor e o view(Front-end).
    fetch('https://frozen-caverns-42300.herokuapp.com/')
      .then(response => console.log(response));
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

  displayFaceBox = (boxes) => {
    console.log(boxes);
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
    console.log(event.target.value);
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});

    fetch('https://frozen-caverns-42300.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input,
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://frozen-caverns-42300.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
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

      this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(error => console.log(error));

    console.log('click');
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }

    this.setState({route: route})
  }

  render() {
    return (
      <div className='App'>
      <Particles className='particles' params={ particlesOptions} />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
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
      </div>
    );
  }
}

export default App;
  