"use strict"

var mm3p = function(el, param) {

    console.log(param)
    let image_count = 0;
    let image_canvas = []

    let m_height = 150

    let root = document.getElementById(el)
    console.log(root)

    let constructor = document.createElement("div")
    constructor.style.cssText = "border:1px solid #dedede"



    let input = document.createElement("input")
    input.type = "file"
    input.id = "input_" + el
    input.style.display = "none"

    let label = document.createElement("label")
    label.setAttribute("for", input.id)
    label.style.width = "100%"
    label.style.height = "100%"
    label.style.minHeight = m_height + "px"
    label.style.background = "white"
    label.style.display = "flex"
    label.style.flexDirection = "row"
    label.style.flexWrap = "wrap"
    label.style.padding = "10px"
        // label.style.justifyContent = "space-between"


    constructor.appendChild(input)
    constructor.appendChild(label)

    let div = root.appendChild(constructor)


    input.addEventListener("change", function(e) {
        // console.log(e.target.files)
        // console.log(e)
        if (e.target.files.length > 0) {

            image_count += e.target.files.length

            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);

            if (param.url != undefined)
                makeRequest()

            //로드 한 후
            reader.onload = function() {
                //로컬 이미지를 보여주기
                // document.querySelector('#preview').src = reader.result;

                //썸네일 이미지 생성
                var tempImage = new Image(); //drawImage 메서드에 넣기 위해 이미지 객체화
                tempImage.src = reader.result; //data-uri를 이미지 객체에 주입
                tempImage.onload = function() {
                    //리사이즈를 위해 캔버스 객체 생성
                    var canvas = document.createElement('canvas');
                    var canvasContext = canvas.getContext("2d");

                    // console.log(constructor)
                    label.appendChild(canvas)





                    // console.log(image_canvas.length)



                    //캔버스 크기 설정
                    // console.log(label.clientWidth, imgCount)
                    canvas.width = label.clientWidth / 2 - 10; //가로 100px

                    // Array.prototype.forEach.call(image_canvas, function(e) {
                    //     console.log(e)
                    //     e.width = label.clientWidth / image_count
                    // })

                    canvas.height = m_height; //세로 100px
                    // image_canvas.push(canvas)

                    //이미지를 캔버스에 그리기
                    canvasContext.drawImage(this, 0, 0, canvas.width - 10, canvas.height - 10);
                    //캔버스에 그린 이미지를 다시 data-uri 형태로 변환
                    var dataURI = canvas.toDataURL("image/jpeg");


                    const path = new Path2D()
                    path.rect(0, 0, 30, 30)
                        // path.rect(25, 72, 32, 32)
                    path.closePath()
                        // canvasContext.fillStyle = "#FFFFFF"
                        // canvasContext.fillStyle = "rgba(225,225,225,0.5)"
                        // canvasContext.fill(path)
                    canvasContext.lineWidth = 2
                    canvasContext.strokeStyle = "#000000"
                    canvasContext.stroke(path)

                    canvasContext.font = '36px serif'
                    var c = 0x00d7; // 0xA9
                    canvasContext.fillText(String.fromCharCode(c), 6, 23)

                    function getXY(canvas, event) {
                        const rect = canvas.getBoundingClientRect()
                        const y = event.clientY - rect.top
                        const x = event.clientX - rect.left
                        return { x: x, y: y }
                    }

                    document.addEventListener("click", function(e) {
                            const XY = getXY(canvas, e)
                                //use the shape data to determine if there is a collision
                            if (canvasContext.isPointInPath(path, XY.x, XY.y)) {
                                // Do Something with the click
                                console.log(e.target, "clicked in rectangle")

                                e.target.remove()
                                e.preventDefault()
                            }


                        }, false)
                        // console.log(dataURI)
                        // //썸네일 이미지 보여주기
                        // document.querySelector('#thumbnail').src = dataURI;

                    // //썸네일 이미지를 다운로드할 수 있도록 링크 설정
                    // document.querySelector('#download').href = dataURI;
                }
            }
        }



    })


    // div.appendChid('input')
    // Input.attr.type = "file"

    var httpRequest;

    function makeRequest() {
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            alert('XMLHTTP 인스턴스를 만들 수가 없어요 ㅠㅠ');
            return false;
        }
        httpRequest.onreadystatechange = alertContents;

        // httpRequest.setRequestHeader(param.header)
        httpRequest.open(param.method, param.url);



        function setHeaders(headers) {
            for (let key in headers) {
                // console.log(key, headers[key])
                httpRequest.setRequestHeader(key, headers[key])
            }
        }
        setHeaders(param.headers)

        httpRequest.send();
    }

    function alertContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                // console.log(typeof param.success, typeof param.failed)
                if (typeof param.success == "function") {
                    param.success(httpRequest.responseText)
                }
            } else {
                if (typeof param.error == "function") {
                    param.error(httpRequest.responseText)
                }
            }
        }
    }
}



module.exports = mm3p;