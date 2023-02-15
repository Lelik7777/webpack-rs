import {test} from './test';
import img2 from './assets/image.jpg';
//таким образом я могу получить картинку для динамической вставки
//через import не могу,поскольку ts будет ругаться,чтобы решить это ,нужно написать файл с декларациями types.d.ts
const img = require('./assets/leafs.png');
// я перезатру все боди и запишу в него две кортинки
//  document.body.innerHTML = `
// <img scr="${img}" alt='Yoda'>
// <img src="${img2}" alt="Yoda">
// `
console.log('it is webpack');
test();