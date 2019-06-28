# mm3p-uploader
file uploader with pure js


# install
```
npm install mm3p-uploader
```

# usage 
```
// simple
 mm3p(element)


// with ajax
 mm3p('file_application', {
            url: remote_host + "/api/file/upload/",
            method: "PUT",
            headers: {
                "Authorization": "Authorization " + token,
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            success: function(e) {
                console.log(e)
            },
            error: function(e) {
                console.log(e)
            }
        })
```
