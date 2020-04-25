document.querySelector('.icon-list-bullet').addEventListener('click', (e) => {
    e.target.style.display = 'none'
    document.querySelector('.menu > span').style.display = 'block'
    document.querySelector('nav ul').classList.add('ul-active')
})
document.querySelector('.menu > span').addEventListener('click', (e) => {
    e.target.style.display = 'none'
    document.querySelector('.icon-list-bullet').style.display = 'block'
    document.querySelector('nav ul').classList.remove('ul-active')
})

// валидация и отправка формы
let form = document.querySelector('.feedback')
let email = document.querySelector('#email')
let theme = document.querySelector('#theme')
let name = document.querySelector('#name')
let text = document.querySelector('#text')
let mwin = document.querySelector('.modelWin')
let closeG = document.querySelector('.good > span')
let closeEr = document.querySelector('.error > span')
let load = document.querySelector('.wite')
let error = document.querySelector('.error')
let good = document.querySelector('.good')

let regEXP = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/

document.querySelector('#sendData').addEventListener('click', (e) => {
    e.preventDefault();
    if (-1 != email.value.search(regEXP) && theme.value != '' && name.value != '' && text.value != '') {
        mwin.classList.add('modelWin-active')

        fetch('./php/server.php', {
            method: 'post',
            body: new FormData(form)
        })
            .then(data => data.json())
            .then((data) => {
                if (data.reply == 'good') {
                    load.classList.add('wite-off')
                    good.classList.add('good-active')
                    closeG.addEventListener('click', (e) => {
                        good.classList.remove('good-active')
                        load.classList.remove('wite-off')
                        mwin.classList.remove('modelWin-active')
                        email.value = ''
                        theme.value = ''
                        text.value = ''
                        name.value = ''
                    })

                } else {
                    load.classList.add('wite-off')
                    error.classList.add('error-active')
                    closeG.addEventListener('click', (e) => {
                        error.classList.remove('error-active')
                        load.classList.remove('wite-off')
                        mwin.classList.remove('modelWin-active')                 
                    })
                }
            }).catch(() => {
                load.classList.add('wite-off')
                error.classList.add('error-active')
                closeEr.addEventListener('click', (e) => {
                    error.classList.remove('error-active')
                    load.classList.remove('wite-off')
                    mwin.classList.remove('modelWin-active')
                })
            })



    } else {
        if (-1 == email.value.search(regEXP)) {
            {
                email.classList.add('error');
                email.addEventListener('input', (e) => {
                    if (-1 != email.value.search(regEXP)) {
                        email.classList.remove('error');
                    } else {
                        email.classList.add('error');
                    }

                })
            }
        }

        if (theme.value == '') {
            theme.classList.add('error');
            theme.addEventListener('input', (e) => {
                if (theme.value != '') {
                    theme.classList.remove('error');
                } else {
                    theme.classList.add('error');
                }

            })
        }

        if (name.value == '') {
            name.classList.add('error');
            name.addEventListener('input', (e) => {
                if (name.value != '') {
                    name.classList.remove('error');
                } else {
                    name.classList.add('error');
                }

            })
        }

        if (text.value == '') {
            text.classList.add('error');
            text.addEventListener('input', (e) => {
                if (text.value != '') {
                    text.classList.remove('error');
                } else {
                    text.classList.add('error');
                }

            })
        }

    }




})