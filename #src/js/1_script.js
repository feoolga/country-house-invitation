let preloader = document.querySelector('#preloader')
window.onload = function(){
    preloader.remove()
}

;(function() {

    let sectionParallax = document.querySelector('.hero')

	sectionParallax.addEventListener('mousemove', e => {
        Object.assign(document.documentElement, {
            style: `
                --move-x: ${(e.clientX - window.innerWidth / 2) * -.005}deg;
                --move-y: ${(e.clientY - window.innerHeight / 2) * -.01}deg;
            `
        })
    })

})();

;(function() {

    let blockLargeImg = document.querySelector('.large-img')
    let srcImg = './img/list/'

    document.querySelectorAll('.col-image').forEach(function(item,index){
        item.addEventListener('click', function() {
            console.log(index);
            blockLargeImg.classList.add('open')
            let template = `
            <div class="large-img__card">
                <img src="${srcImg + (index+1) + '_img.jpg'}" alt="где она?">
            </div>
            `
            blockLargeImg.innerHTML = template;
        })
    })

    blockLargeImg.addEventListener('click', function(){
        this.classList.remove('open')
    })

})();

;(function() {

    let isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    let heroParallax = document.querySelector('.hero__content-parallax')
    let heroTouch = document.querySelector('.hero__content-touch-large')
    
    if (isMobile.any()) {
        heroParallax.classList.add('hide')
        heroTouch.classList.add('show')
    } else {
        heroParallax.classList.add('show')
        heroTouch.classList.add('hide')
    }

})();

const btnUp = {
    el: document.querySelector('.btn-up'),
    show() {
      this.el.classList.remove('btn-up_hide');
    },
    hide() {
      this.el.classList.add('btn-up_hide');
    },
    addEventListener() {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        scrollY > 400 ? this.show() : this.hide();
      });
      document.querySelector('.btn-up').onclick = () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    }
  }
  
  btnUp.addEventListener();