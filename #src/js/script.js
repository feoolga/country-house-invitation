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
    let srcImg = '/img/list/'

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

