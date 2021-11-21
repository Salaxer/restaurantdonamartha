
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

const verifyFile = async (file) =>{
    const expresionRegular = /\jpeg|jpg|png$/;
    if (!expresionRegular.exec(file.type)) {
        return 'error';
    }else{
        if (window.FileReader) {
            return new Promise(function(resolve, reject) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function (e) {
                    resolve(e.target.result)
                }
                reader.onerror = function (e) {
                    reject('error')
                }
            });
        }
    }
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
        const result = await verifyFile(data);
        return result
    }
}

export default verifyImage;