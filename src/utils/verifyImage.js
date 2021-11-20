
const verifyUrl = async (data, timeoutT) =>{
    return await new Promise(function(resolve, reject) {
        var timeout = timeoutT || 5000;
        var timer, img = new Image();
        img.onerror = img.onabort = function() {
            clearTimeout(timer);
              reject("error");
        };
        img.onload = function() {
             clearTimeout(timer);
             resolve("success");
        };
        timer = setTimeout(function() {
            // reset .src to invalid URL so it stops previous
            // loading, but doens't trigger new load
            img.src = "//!!!!/noexist.jpg";
            reject("timeout");
        }, timeout); 
        img.src = data;
      });
}


const verifyImage = async (data, type) =>{
    if (type == 'LINK') {
        const result = await verifyUrl(data).then((result)=>{
            return result;
        }).catch((error) =>{
            return error;
       })
       return result;
    }else if(type == 'FILE'){

    }
}

export default verifyImage;