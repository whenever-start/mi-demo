/*
 * @Description:
 * @Author: FXF
 * @LastEditors: FXF
 * @Date: 2021-11-24 13:09:28
 * @LastEditTime: 2021-11-24 13:31:44
 */
var mySwiper = new Swiper('.swiper-container', {
  loop: true, // 循环模式选项

  autoplay: true,

  effect: 'fade',

  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
})
