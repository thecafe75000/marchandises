window.onload = function () {
  // 声明一个记录点击的缩略图下标
  var bigimgIndex = 0

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


  // 放大镜的移入、移出效果
  function bigGlassBind() {
    // 获取小图框元素
    var smallPic = document.querySelector(
      '#wrapper #content .contentMain .center .left .leftTop .smallPic'
    )

    // 获取leftTop元素
    var leftTop = document.querySelector(
      '#wrapper #content .contentMain .center .left .leftTop '
    )

    // 获取数据
    var imagessrc = goodData.imagessrc

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
      bigImg.src = imagessrc[bigimgIndex].b

      // 大图框里追加大图片
      BigPic.appendChild(bigImg)

      // 小图框追加蒙版元素
      smallPic.appendChild(maskDiv)

      // 让leftTop元素追加大图框
      leftTop.appendChild(BigPic)

      // 设置移动事件
      smallPic.onmousemove = function (event) {
        var leftDistance =
          event.clientX -
          smallPic.getBoundingClientRect().left -
          maskDiv.offsetWidth / 2
        var topDistance =
          event.clientY -
          smallPic.getBoundingClientRect().top -
          maskDiv.offsetHeight / 2

        // 设置蒙版的活动边界
        if (leftDistance < 0) {
          leftDistance = 0
        } else if (leftDistance > smallPic.clientWidth - maskDiv.offsetWidth) {
          leftDistance = smallPic.clientWidth - maskDiv.offsetWidth
        }

        if (topDistance < 0) {
          topDistance = 0
        } else if (topDistance > smallPic.clientHeight - maskDiv.offsetHeight) {
          topDistance = smallPic.clientHeight - maskDiv.offsetHeight
        }

        // 设置蒙版的left和top值
        maskDiv.style.left = leftDistance + 'px'
        maskDiv.style.top = topDistance + 'px'

        // 设置放大镜的移动比例
        var scale =
          (smallPic.clientWidth - maskDiv.offsetWidth) /
          (bigImg.offsetWidth - BigPic.clientWidth)
        bigImg.style.left = -leftDistance / scale + 'px'
        bigImg.style.top = -topDistance / scale + 'px'
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


  // 动态渲染放大镜缩略图的数据
  function thunbnailData() {
    // 获取piclist下的ul元素
    var ul = document.querySelector(
      '#wrapper #content .contentMain .center .left .leftBottom .piclist ul'
    )

    // 获取imagessrc数据
    var imagessrc = goodData.imagessrc
    imagessrc.map((item, index) => {
      // console.log(item)

      // 创建li元素和image元素
      var newli = document.createElement('li')
      var newImg = document.createElement('img')
      newImg.src = item.s

      // 给li追加img元素
      newli.appendChild(newImg)

      // 给ul追加li元素
      ul.appendChild(newli)
    })
  }
  thunbnailData()


  // 点击缩略图的效果
  function thumbnailClick() {
    var smallPic_img = document.querySelector(
      '#wrapper #content .contentMain .center .left .leftTop .smallPic img'
    )

    var imagessrc = goodData.imagessrc

    // 小图路径要默认和数据里imagessrc的第1个数组元素小图的路径一致
    smallPic_img.src = imagessrc[0].s

    // 获取所有的li元素
    var liNodes = document.querySelectorAll(
      '#wrapper #content .contentMain .center .left .leftBottom .piclist ul li'
    )
    // console.log(typeof liNodes) // object

    // 循环点击所有的li
    // 先把liNodes转为数组再遍历
    Array.from(liNodes).map((item, index) => {
      // console.log(index)
      item.onclick = function () {
        bigimgIndex = index

        // 变换小图路径
        smallPic_img.src = imagessrc[index].s
      }
    })
  }
  thumbnailClick()


  // 点击缩略图左右箭头轮播图效果
  function thumbnailLeftRightClick() {
    // 获取左右两端的箭头按钮
    var prevButton = document.querySelector(
      '#wrapper #content .contentMain .center .left .leftBottom a.prev'
    )
    var nextButton = document.querySelector(
      '#wrapper #content .contentMain .center .left .leftBottom a.next'
    )

    // 获取轮播相关的ul元素和所有的li
    var ul = document.querySelector(
      '#wrapper #content .contentMain .center .left .leftBottom .piclist ul'
    )
    var liNodes = document.querySelectorAll(
      '#wrapper #content .contentMain .center .left .leftBottom .piclist ul li'
    )

    // 必要的计算：轮播的起点，轮播的步长，总体轮播的距离值
    // 轮播开始起点
    var start = 0
    // 轮播的步长
    var step = (liNodes[0].offsetWidth + 20) * 2
    // 总体运动的距离值 = ul的宽 - div的宽 = （数据里图片的总数量 - div中显示的图片数量即5张图）* (一个li的宽 + margin的大小即20)
    var endPosition = (liNodes.length - 5) * (liNodes[0].offsetWidth + 20)

    // 点击事件触发轮播
    prevButton.onclick = function () {
      start -= step
      if (start < 0) {
        start = 0
      }
      // 当你设置 ul.style.left = -start + 'px'，你将 ul 向左移动（通过负值实现）
      // 这是因为 position: absolute 允许根据 left、right、top、bottom 等属性来精确控制位置
      // 动态改变 ul 的 left 值，控制图片组水平移动，从而实现图片的轮播效果
      ul.style.left = -start + 'px'
    }

    nextButton.onclick = function () {
      start += step
      if (start > endPosition) {
        start = endPosition
      }
      ul.style.left = -start + 'px'
    }
  }
  thumbnailLeftRightClick()

  // 商品详情数据的动态渲染
  function rightTopData() {
    // 找到rightTop元素
    var rightTop = document.querySelector(
      '#wrapper #content .contentMain .center .right .rightTop'
    )

    // 获取数据源 data.js -> goodData -> goodsDetail
    var goodsDetail = goodData.goodsDetail

    // 建立一个字符串变量，把原来的布局结构贴进来，将获取的数据放在其对应的位置上重新渲染rightTop元素
    var str = `
                <h3>${goodsDetail.title}</h3>
                <p>${goodsDetail.recommend}</p>
                <div class="priceWrap">
                    <div class="priceTop">
                        <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                        <div class="price">
                          <span>￥</span>
                          <p>${goodsDetail.price}</p>
                          <i>降价通知</i>
                        </div>
                        <p>
                          <span>累计评价</span>
                          <span>${goodsDetail.evaluateNum}</span>
                        </p>
                    </div>
                  <div class="priceBottom">
                      <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                      <p>
                        <span>${goodsDetail.promoteSales.type}</span>
                        <span>${goodsDetail.promoteSales.content}</span>
                      </p>
                  </div>
                </div>
                <div class="support">
                  <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
                  <p>${goodsDetail.support}</p>
                </div>
                <div class="address">
                  <span>配&nbsp;送&nbsp;至</span>
                  <p>${goodsDetail.address}</p>
                </div>
            `

    // 重新渲染rightTop元素
    rightTop.innerHTML = str
  }
  rightTopData()


  // 商品参数数据的动态渲染
  function rightBottomData() {
    // 获取元素对象
    var choseWrap = document.querySelector(
      '#wrapper #content .contentMain .center .right .rightBottom .choseWrap'
    )

    // 获取数据源 data.js -> goodData -> goodsDetail -> crumbData
    var crumbData = goodData.goodsDetail.crumbData
    // console.log(crumbData)

    // 数据是一个数组,需要遍历它，并且需要一个动态的dl元素对象(包括dt,dd)
    crumbData.map((item) => {
      // 创建dl,dt, dd元素对象
      var dlNode = document.createElement('dl')

      var dtNode = document.createElement('dt')
      dtNode.innerText = item.title

      // dl里追加dt
      dlNode.appendChild(dtNode)

      // 遍历dd元素,即数据源data.js里 crumbData -> data
      item.data.map((subitem) => {
        //  创建dd元素
        var ddNode = document.createElement('dd')
        ddNode.innerText = subitem.type

        // dl里追加dd
        dlNode.appendChild(ddNode)
      })

      // choseWrap里追加dl
      choseWrap.appendChild(dlNode)
    })
    
  }
  rightBottomData()


  // 点击商品参数之后的颜色排他效果
  function clickbbBind() {
    // 获取所有的dl元素, 取其中第1个dl元素下的所有dd先做测试,测试完毕后在dl里嵌套一个循环
    var dlNodes = document.querySelectorAll(
      '#wrapper #content .contentMain .center .right .rightBottom .choseWrap dl'
    )
    // console.log(typeof dlNodes) // object

    var choose = document.querySelector(
      '#wrapper #content .contentMain .center .right .rightBottom .choose'
    )

    // 首先创建一个可容纳点击的dd元素值的容器即一个数组, 确定数组的起始长度并初始化值为null
    var arr = new Array(dlNodes.length).fill(null)
    // console.log(arr)

    Array.from(dlNodes).map((dlitem,dlindex) => {
      var ddNodes = dlitem.querySelectorAll('dd')

      // 循环所有的dd元素, 并添加点击事件
      Array.from(ddNodes).map((dditem) => {
        dditem.onclick = function () {
          // 清空.choose的div元素
          choose.innerHTML = ''

          // 先将所有的元素颜色重置为#666
          Array.from(ddNodes).forEach((dditem) => {
            dditem.style.color = '#666'
          })
          // 再将当前点击的元素颜色设置为红色
          this.style.color = '#cc1122'
          // console.log('this', this)

          // 点击哪一个dd元素动态产生一个新的mark标记元素
          // 然后再将点击的dd元素的值按照对应下标来写入到数组的元素身上
          arr[dlindex] = this.innerText

          // 遍历arr数组,将非0元素的值写入到mark标记中
          arr.forEach((value) => {
            // 只要有value, 就动态创建mark标签
            if (value) {
              // 创建div元素,并且设置其class属性为mark
              var markDiv = document.createElement('div')
              markDiv.className = 'mark'
              markDiv.innerText = value

              // 创建a元素,并且设置其值为X
              var aNode = document.createElement('a')
              aNode.innerText = 'X'

              // 给div里追加a
              markDiv.appendChild(aNode)

              // 让.choose的div元素追加.mark的div元素
              choose.appendChild(markDiv)
            }
          })
        }
      })
    })
  }

  clickbbBind()

 
}




