/*
 * @Description:
 * @Author: FXF
 * @LastEditors: FXF
 * @Date: 2021-11-24 20:06:27
 * @LastEditTime: 2021-11-25 15:09:09
 */
$(function () {
  const elBlockWrapper = document.querySelector('#block-wrapper')
  let data = null

  class Block {
    constructor(data) {
      this.elBlockModule = null
      this.elContent = null
      this.elsShow = []
      this.elsNavItem = []
      this.navIdx = 0
      this.type = data.type
      this.promo = data.promo
      this.content = data.content
      this.sorts = []
      this.shows = []
    }

    init() {
      this.initData()

      this.initBlockModule()

      this.iniHd()

      this.initContent()

      this.iniPromo()

      this.initShow()
    }

    initData() {
      this.content.forEach((itemContent) => {
        this.sorts.push(itemContent.sort)
        this.shows.push(itemContent.list)
      })
      console.log('type:', this.type)
      console.log('promo:', this.promo)
      console.log('sorts:', this.sorts)
      console.log('shows:', this.shows)
    }

    initBlockModule() {
      this.elBlockModule = document.createElement('div')
      this.elBlockModule.className = 'block-module'
      elBlockWrapper.appendChild(this.elBlockModule)
    }

    iniHd() {
      let rightStr = ''
      // nav list
      if (this.sorts.length === 1) {
        rightStr = `
          <span>查看更多</span>
          <i class="icon">></i>
        `
      } else {
        this.sorts.forEach((sort, idx) => {
          let template = `
            <li class="${this.navIdx === idx ? 'active' : ''}">${sort}</li>
          `
          rightStr += template
        })
        rightStr = `<ul class="nav">${rightStr}</ui>`
      }

      let hdTemplate = `
        <div class="hd clearfix">
          <h3>${this.type}</h3>
          <div class="right">${rightStr}</div>
        </div>
      `

      this.elBlockModule.innerHTML = hdTemplate

      // elsNavItem
      this.elsNavItem.push(
        ...Array.from(this.elBlockModule.querySelectorAll('.hd .nav li'))
      )
      console.log('els navItem', this.elsNavItem)
    }

    initContent() {
      this.elContent = document.createElement('div')
      this.elContent.className = 'content clearfix'
      this.elBlockModule.appendChild(this.elContent)
    }

    iniPromo() {
      let promoStr = ''

      if (this.promo.length === 1) {
        promoStr = `
          <div class="promo-1 block">
            <div class="thumb"><img src="${this.promo[0]}"></img></div>
          </div
        `
      } else {
        promoStr = `
          <div class="promo-2">
            <div class="thumb block"><img src="${this.promo[0]}"></img></div>
            <div class="thumb block"><img src="${this.promo[1]}"></img></div>
          </div
        `
      }

      this.elContent.innerHTML += promoStr
    }

    initShow() {
      let showWrapperStr = ''
      this.shows.forEach((show) => {
        let showInnerStr = ''

        show.forEach((item) => {
          let blockTemplate = `
            <div class="block">
              <div class="thumb"><img src="${item.img}" /></div>
              <p class="name">${item.name}</p>
              <div class="desc">${item.brief}</div>
              <p class="price"><em>${item.price}</em><span class="through-line">${item.oldPrice}</span></p>
            </div>
          `

          showInnerStr += blockTemplate
        })

        let showTemplate = `
          <div class="show">
            ${showInnerStr}
            <div class="block half-block more">
              <div class="left">
                <div>浏览更多</div>
                <span>${this.sorts[this.navIdx]}</span>
              </div>
              <i class="icon-more">▶</i>
            </div>
          </div>
        `
        showWrapperStr += showTemplate
      })

      this.elContent.innerHTML += `<div class="show-wrapper">${showWrapperStr}</div>`

      // elsShow
      this.elsShow.push(...Array.from(this.elContent.querySelectorAll('.show')))

      // 如果 block 满 8 个, 最后一个添加 .half-block
      // 且对 .block.more 定位处理
      this.elsShow.forEach((show, idx) => {
        if (this.shows[idx].length === 8) {
          const lastItem = show.querySelectorAll('.block')[7]
          const moreItem = show.querySelector('.block.more')

          lastItem.classList.add('half-block')

          moreItem.style.position = 'absolute'
          moreItem.style.right = 0
          moreItem.style.bottom = 0
        }
      })

      // 显示
      this.elsShow[this.navIdx].style.display = 'block'

      // 绑定事件
      this.navItemEvents()
    }

    navItemEvents() {
      this.elsNavItem.forEach((el, idx) => {
        $(el).hover(() => {
          this.toggleShow(this.navIdx, idx)
        })
      })
    }

    toggleShow(prevIdx, curIdx) {
      this.elsShow[prevIdx].style.display = 'none'
      this.elsShow[curIdx].style.display = 'block'
      this.elsNavItem[prevIdx].classList.remove('active')
      this.elsNavItem[curIdx].classList.add('active')
      this.navIdx = curIdx
    }
  }

  $.getJSON('./home-content.json', function (res) {
    data = res.data

    data.forEach((dataItem) => {
      console.log('data item:', dataItem)
      const block = new Block(dataItem)
      block.init()
    })
  })
})
