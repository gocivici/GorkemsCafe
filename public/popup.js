import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
import insertText from 'https://cdn.jsdelivr.net/npm/insert-text-at-cursor@0.3.0/index.js'
// import tr from 'emoji-picker-element/i18n/tr';


const emojiButton = document.querySelector('#emojiButton')
const tooltip = document.querySelector('.tooltip')
Popper.createPopper(emojiButton, tooltip,{
    placement: 'top',
})

document.querySelector('#emojiButton').onclick = () => {
  tooltip.classList.toggle('shown')
//   window.addEventListener('click', function(e){   
//     if (document.querySelector('emoji-picker').contains(e.target)){
//       // Clicked in box
//     } else{
//         tooltip.classList.toggle('shown')
//     }
//   });
}

document.querySelector('emoji-picker').addEventListener('emoji-click', e => {
    insertText(document.querySelector('input'), e.detail.unicode)
    tooltip.classList.toggle('shown')

  })

