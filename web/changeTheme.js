function changeTheme(){
    theme = document.body.getAttribute('class');
    
    if(theme=='dark'){
        document.body.setAttribute('class', 'light')
    }
    else{
        document.body.setAttribute('class', 'dark')
    }
}