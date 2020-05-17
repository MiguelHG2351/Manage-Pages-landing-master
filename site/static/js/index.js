// 'use strict'

const slider = document.getElementById("slider");
const $btn = document.getElementsByClassName("btn");
const $image = document.getElementById("slider-image");
const $user = document.getElementById("slider-user");
const $description = document.getElementById("slider-description");
let timer = 4000

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
  const data = await fetch("api.json");
  const response = await data.json();
  return response;
}
async function validSlider() {
  let data = await getData();
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
  // alert()
}

setInterval(validSlider, timer)
