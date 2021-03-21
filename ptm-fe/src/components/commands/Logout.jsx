const createCookie = (name,value,days)=> {        
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    }
    else expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

// const readCookie = (name) => {
//     var nameEQ = name + "=";
//     var ca = document.cookie.split(';');
//     for(var i=0;i < ca.length;i++) {
//         var c = ca[i];
//         while (c.charAt(0)===' ') c = c.substring(1,c.length);
//         if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
//     }
//     return null;
// }

const eraseCookie=(name) => {
    createCookie(name,"",-1);
}

export const LogOut = () => {
     localStorage.clear(); 
     sessionStorage.clear();  
     var cookies = document.cookie.split(";");
     for (var i = 0; i < cookies.length; i++)
     eraseCookie(cookies[i].split("=")[0]);
     window.location.reload(false);
}