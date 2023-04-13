const imges = document.querySelectorAll('.slide-bar .slider-line img')
const sliderLine = document.querySelector('.slider-line')
const rightBtn = document.querySelector('.right-button') 
const leftBtn = document.querySelector('.left-button') 

let index = 0
let width = document.querySelector('.slide-bar').clientWidth
let height = document.querySelector('.slide-bar').clientHeight

function init() {
    sliderLine.style.width = width * imges.length + 'px'
    sliderLine.style.height = height / imges.length + 'px'

    for (const img of imges) {
        img.style.width = width + 'px'
        img.style.height = 'auto'
    }
    rollSlider()
}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') {
        index++
        if (index >= imges.length) {
            index = 0
        }
    } else if (event.key === 'ArrowLeft') {
        index--
        if (index < 0) {
            index = imges.length - 1
        }
    }
    rollSlider()
})
window.addEventListener('resize', init)
init()

rightBtn.addEventListener('click', () => {
    index++
    if (index >= imges.length) {
        index = 0
    }
    rollSlider()
})

leftBtn.addEventListener('click', () => {
    index--
    if (index < 0) {
        index = imges.length - 1
    }
    rollSlider()
})

function rollSlider() {
    sliderLine.style.transform = 'translateX(-'+index*width+'px)'
}

// sliderNum2 ============================

const carousel = document.querySelector('.pro-slider-line'),
firstImg = carousel.querySelectorAll('img')[0]
arrowIcons = document.querySelectorAll('.pro-products-slide i')


let isDragStart = false, prevPageX, prevScrollLeft

function hideArrowBtn() {
    let scrollCarouselWidth = carousel.scrollWidth - carousel.clientWidth
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'block'
    arrowIcons[1].style.display = carousel.scrollLeft == scrollCarouselWidth ? 'none' : 'block'
}

arrowIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        let firstImgWidth = firstImg.clientWidth + 14
        carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth
        setTimeout(() => hideArrowBtn(), 60)
    })
})    

function mouseEventStart(e) {
    isDragStart = true
    prevPageX = e.pageX || e.touches[0].pageX
    prevScrollLeft = carousel.scrollLeft
}

function mouseEvent(e) {
    if (!isDragStart) return
    e.preventDefault()
    carousel.classList.add('dragging')
    let posDefault =( e.pageX || e.touches[0].pageX) - prevPageX
    carousel.scrollLeft = prevScrollLeft - posDefault
    hideArrowBtn()
}

function mouseEventStop() {
    isDragStart = false
    carousel.classList.remove('dragging')
}

carousel.addEventListener('mousedown', mouseEventStart)
carousel.addEventListener('touchStart', mouseEventStart)

carousel.addEventListener('mousemove', mouseEvent)
carousel.addEventListener('touchmove', mouseEvent)

carousel.addEventListener('mouseup', mouseEventStop)
carousel.addEventListener('mouseleave', mouseEventStop)
carousel.addEventListener('touchend', mouseEventStop)

// =======================================================================================

