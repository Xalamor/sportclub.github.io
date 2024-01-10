function loadData() {
    return new Promise((resolve, reject) => {
    
    
    setTimeout(resolve, 2000);
    })
    }
    
    loadData()
    .then(() => {
    let preloaderEl = document.getElementById('preloader');
    preloaderEl.classList.add('hidden');
    preloaderEl.classList.remove('visible');
    });
    let firstname=document.getElementById('firstname_field');
    let lastname=document.getElementById('lastname_field');
    let phone=document.getElementById('phone_field');
    request.addEventListener('click',function(){
    Fname.innerHTML= firstname.value;
    Lname.innerHTML= lastname.value;
    number.innerHTML=phone.value;
    order.style.opacity=1;
    })

  