/*
 * @Description:
 * @Author: FXF
 * @LastEditors: FXF
 * @Date: 2021-11-24 01:41:38
 * @LastEditTime: 2021-11-24 12:38:31
 */
$(function () {
  let data = null
  let activeIdx = -1

  $.getJSON('./category.json', function (res) {
    data = res.data
    _initCategory()
    // active
    $('.category-list li').hover(
      function () {
        let curIdx = $('.category-list li').index($(this))
        if (activeIdx !== curIdx) {
          activeIdx = curIdx
          $(this).addClass('active')
          $('.category-details').show()
          _renderDetails()
        }
      },
      function () {
        // mouseleave
        activeIdx = -1
        $(this).removeClass('active')
      }
    )

    // 非active
    $('.home-main-box').mouseleave(function () {
      $('.category-details').hide()
    })
  })

  // get data

  function _initCategory() {
    console.log(data)
    let str = ''
    data.forEach((item) => {
      let template = `
        <li class="clearfix">
          <span class="text">${item.name}</span>
          <span class="icon">></span>
        </li>
      `
      str += template
    })
    $('.category-list').html(str)
  }

  function _renderDetails() {
    // 1. ul
    // 2. li
    const maxLen = 6
    const content = data[activeIdx].content
    let ulStr = ''

    let ulLen = Math.ceil(content.length / maxLen)
    let curIdx = 0

    // 创建 ul
    for (let i = 0; i < ulLen; i++) {
      let template = `
        <ul class="category-details-list"></ul>
      `
      ulStr += template
    }
    $('.category-details').html(ulStr)

    // 每个ul 插入 li
    for (let i = 0; i < maxLen; i++) {
      let str = ''
      for (let j = 0; j < maxLen && curIdx < content.length; j++) {
        let item = content[curIdx]
        let template = `
          <li>
            <img src="${item.img_url}" alt="">
            ${item.name}
          </li>
        `
        str += template
        curIdx++
      }
      $(`.category-details-list:eq(${i})`).html(str)
    }
  }
})
