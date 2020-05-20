// 'use strict'

const slider = document.getElementById("slider");
const $btn = document.getElementsByClassName("btn");
const menu = document.getElementById('btn-menu');
const sidenav = document.getElementById('list-nav');
const $overlay = document.querySelector('.overlay')
const $image = document.getElementById("slider-image");
const $user = document.getElementById("slider-user");
const $description = document.getElementById("slider-description");
const $form = document.getElementById('form');
let timer = 4000

document.addEventListener('keydown', (event) => {
  if (event.key == 'F12') {
    alert('Muy sospechoso xD')
  }
});

$form.addEventListener('submit', e => e.preventDefault())

menu.addEventListener('click', () => {
  sidenav.classList.toggle('d-flex')
  menu.children[0].src = 'static/images/icon-close.svg'
  $overlay.classList.toggle('active')
})

$overlay.addEventListener('click', () => { sidenav.classList.remove('d-flex'); $overlay.classList.remove('active'); menu.children[0].src = 'static/images/icon-hamburger.svg'})

for (const key in $btn) {
    if(key <=3) {
        $btn[key].addEventListener('click', async () => {
            const data = await getData()
            $description.textContent = data[key].description
            $image.setAttribute('src', data[key].image)
            $user.textContent = data[key].user
            $btn[key - 1].classList.remove('active')
            $btn[key].classList.add('active')
        })
    }
}


async function getData() {
  const data = await fetch('https://miguelhg2351.github.io/Manage-Pages-landing-master/site/static/js/api.json');
  const response = await data.json();
  this.hola = response;
  return response
}

class API {
 
  renderTemplate(url, description, user) {
    return `
    <div>
      <div class="card-image">
            <figure>
              <img src="${url}" id="slider-image" alt="Testimonio de los que utilizarón el servicio" />
              <p id="slider-user">${user}</p>
            </figure>
          </div>
          <div class="card-description">
              <p id="slider-description">${description}</p>
          </div>
    </div>
        `
  }

  async validSlider() {
      let data =  await getData();
      if(matchMedia('(max-width:1024px)').matches) {
        if ($image.getAttribute('src') == 0) {
          $image.setAttribute("src", `${data[0].image}`);
          $user.textContent = data[0].user
          $description.textContent = data[0].description
        } else if($image.getAttribute('src') === data[0].image) {
          $user.textContent = data[1].user
          $description.textContent = data[1].description
          $image.setAttribute('src', `${data[1].image}`)
          $btn[0].classList.remove('active')
          $btn[1].classList.add('active');
        } else if($image.getAttribute('src') === data[1].image) {
          $user.textContent = data[2].user
          $description.textContent = data[2].description
          $image.setAttribute('src', `${data[2].image}`)
          $btn[1].classList.remove('active')
          $btn[2].classList.add('active');
        } else if($image.getAttribute('src') === data[2].image) {
          $user.textContent = data[3].user
          $description.textContent = data[3].description
          $image.setAttribute('src', `${data[3].image}`)
          $btn[2].classList.remove('active')
          $btn[3].classList.add('active');
        } else if($image.getAttribute('src') === data[3].image) {
          $user.textContent = data[0].user
          $description.textContent = data[0].description
          $image.setAttribute('src', `${data[0].image}`)
          $btn[3].classList.remove('active')
          $btn[0].classList.add('active');
        }
      } else {
        slider.innerHTML = ""
        const html = document.implementation.createHTMLDocument()
        data.forEach(element => {
          let {user, image, description} = element
          debugger
          const html_string = this.renderTemplate(image, description, user)
          html.body.innerHTML = html_string
          const elementos = html.body.children[0]
          slider.append(elementos)
        });
      }
    }
    
}

  const app = new API()
  console.log(app)
  if(matchMedia('(max-width: 1024px)').matches) {
    setInterval(app.validSlider, timer)
  } else {
    app.validSlider()
  }

