$(function () {
  // nav details
  let activeIdx = 0
  let data = null
  $.getJSON('./nav.json', function (res) {
    data = res.data
    _initNavDetails()

    $('.home-nav li').hover(function () {
      if ($('.home-nav li').index($(this)) > 6) {
        $('.nav-details').slideUp()
        return
      }
      $('.nav-details').slideDown()
      activeIdx = $('.home-nav li').index($(this))
      _initNavDetails(activeIdx)
    })

    $('.home-nav-box').mouseleave(function () {
      $('.nav-details').slideUp()
    })
  })

  function _initNavDetails() {
    let str = ''
    data[activeIdx].content.forEach((item) => {
      let template = `
        <li>
          <a href="#">
            <div class="thumb">
              <img width="160" height="110" src="${item.img_url}" alt="">
            </div>
            <span class="desc">${item.name}</span>
            <em class="price">${item.price}</em>
          </a>
        </li>
      `
      str += template
    })
    $('.nav-details-list').html(str)
  }
})
