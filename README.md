[![npm version](https://badge.fury.io/js/mm3p-uploader.svg)](https://badge.fury.io/js/mm3p-uploader)

# mm3p-uploader
file uploader with pure js

# demo image
![demo](./mm3p-demo.png)


# install
```
npm install mm3p-uploader
```

# usage 
```
import mm3p from 'mm3p-uploader'

// simple
 mm3p(element)

// <div id="file_application"></div>
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
