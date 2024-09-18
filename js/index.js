window.onload = function () {
  // 路径导航的数据渲染
  function navPathDataBind() {
    // 获取页面元素
    var navPath = document.querySelector(
      '#wrapper #content .contentMain .navPath'
    )

    // 获取数据
    var path = goodData.path
    path.map((item, index) => {
      if (index == path.length - 1) {
        var aNode = document.createElement('a')
        aNode.innerHTML = path[index].title
        navPath.appendChild(aNode)
      } else {
        // 创建a标签
        var aNode = document.createElement('a')
        aNode.href = path[index].url
        aNode.innerHTML = path[index].title

        // 创建i标签
        var iNode = document.createElement('i')
        iNode.innerText = '/'

        // 让navPath来追加元素a和i
        navPath.appendChild(aNode)
        navPath.appendChild(iNode)
      }
    })
  }

  navPathDataBind()


  // 放大镜的移入移出
  function bigGlassBind() {
    // 获取小图框元素
    var smallPic = document.querySelector(
      '#wrapper #content .contentMain .center .left .leftTop .smallPic'
    )

    // 获取leftTop元素
    var leftTop = document.querySelector(
      '#wrapper #content .contentMain .center .left .leftTop '
    )

    // 设置移入事件
    smallPic.onmouseenter = function () {
      // 创建蒙版元素
      var maskDiv = document.createElement('div')
      maskDiv.className = 'mask'

      // 创建大图框元素
      var BigPic = document.createElement('div')
      BigPic.className = 'bigPic'

      // 创建大图片元素
      var bigImg = document.createElement('img')
      bigImg.src = 'images/b1.png'

      // 大图框里追加大图片
      BigPic.appendChild(bigImg)

      // 小图框追加蒙版元素
      smallPic.appendChild(maskDiv)

      // 让leftTop元素追加大图框
      leftTop.appendChild(BigPic)


      // 设置移动事件
      smallPic.onmousemove = function (event) {
        var leftDistance = event.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth / 2
        var topDistance = event.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetHeight / 2
        
        // 设置蒙版的活动边界
        if (leftDistance < 0) {
          leftDistance = 0
        } else if(leftDistance > smallPic.clientWidth - maskDiv.offsetWidth) {
          leftDistance = smallPic.clientWidth - maskDiv.offsetWidth
        }

        if (topDistance < 0) {
          topDistance = 0
        } else if(topDistance > smallPic.clientHeight - maskDiv.offsetHeight) {
          topDistance = smallPic.clientHeight - maskDiv.offsetHeight
        }
        
        // 设置蒙版的left和top值
        maskDiv.style.left = leftDistance + 'px'
        maskDiv.style.top = topDistance + 'px'

        // 设置放大镜的移动比例
        var scale = (smallPic.clientWidth - maskDiv.offsetWidth) / (bigImg.offsetWidth - BigPic.clientWidth)
        bigImg.style.left = - leftDistance / scale + 'px'
        bigImg.style.top = - topDistance / scale + 'px'

      }


      // 设置移出事件
      smallPic.onmouseleave = function () {
        // 小图框去除蒙版元素
        smallPic.removeChild(maskDiv)

        // 让leftTop元素移除大图框
        leftTop.removeChild(BigPic)
      }
    }
  }

  bigGlassBind()
  
}