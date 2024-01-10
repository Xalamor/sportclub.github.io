var height=document.body.clientHeight;
  window.addEventListener('scroll',function(){
      var y=window.pageYOffset;
      if(y>height/2){
          up.style.opacity=1;
      }
      else{
        up.style.opacity=0;
        
     }
  });

