;(function (w) {
  var HTMLS = {
    toast: '<div class="J_CompToast comp-toast"></div>',
    popup: '<div class="J_MaskCont mask-cont"><div class="J_WinpopBox winpop-box"><div class="winpop-title">提示</div><div class="J_WinpopMain winpop-main"></div><div class="J_WinpopBtns winpop-btns"></div></div>',
    confirm: '<a href="javascript:;" class="J_AltBtn pop-btn alert-btn">确定</a>',
    prompt: '<a href="javascript:;" class="J_CfmFalse pop-btn cfm-false">取消</a><a href="javascript:;" class="J_CfmTrue pop-btn cfm-true">确定</a>',
    content: '<div class="J_MaskCont mask-cont"><div class="J_ContentBox content-box"><span class="J_CloseBtn close-btn">x</span><div class="J_InnerContent inner-content"></div></div></div>',
    loading: '<div class="J_LoadingCont loading-cont"><div class="loading-content"></div></div>'
  }
  var utils = {
    isPc: function() { // 根据是否pc写不同的样式
      var userAgentInfo = navigator.userAgent
      var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod")
      var flag = true
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
      }
      return flag
    },
    select: function () { // 传入选择器
      return document.querySelector(arguments[0])
    },
    selectAll: function () { // 传入选择器
      return document.querySelectorAll(arguments[0])
    },
    remove: function () { // 传入选择器
      var node = this.select(arguments[0])
      node && node.parentNode.removeChild(node)
    },
    toArray: Array.from || function (arg) {
      return Array.prototype.slice.call(arg)
    },
    replaceAll: function (node) {
      var _this = this
      Array.prototype.forEach.call(node.childNodes, function (item) {
        if(item.childNodes.length > 0){
          _this.replaceAll(item)
        }
      })

      return node
    },
    strToNode: function (str) {
      var docFrag = document.createDocumentFragment(),
          div = document.createElement('div')

      div.innerHTML = str

      utils.toArray(utils.replaceAll(div).childNodes).forEach(function (item) {
          docFrag.appendChild(item)
      });

      return docFrag
    }
  }
  function Layer () {
    var config = {}
    this.timer = null
    this.set = function (k, v) {
      config[k] = v
    }
    this.get = function (k) {
      return config[k]
    }
    this.init()
  }
  Layer.prototype = {
    init: function () {
      this.insertStyle()
      this.set('body', utils.select('body'))
      this.advanceAppendChild()
    },
    advanceAppendChild: function () {
      Node.prototype.appendChildAdvanced = function () {
        var docFrag = document.createDocumentFragment()

        utils.toArray(arguments).forEach(function (arg) {
          docFrag.appendChild(utils.strToNode(String(arg)))
        })

        this.appendChild(docFrag)
      }
    },
    insertStyle: function () {
      var styleEle = document.createElement('style')
      var commonStyle = '\
        .comp-toast {\
          position: fixed;\
          z-index: 999;\
          padding: 10px 20px;\
          left: 50%;\
          font-size: 16px;\
          line-height: 25px;\
          border-radius: 4px;\
          background-color: #fff;\
          pointer-events: none;\
        }\
        .mask-cont {\
          position: fixed;\
          z-index: 999;\
          top: 0;\
          left: 0;\
          width: 100%;\
          height: 100%;\
          background-color: rgba(0, 0, 0, .5);\
        }\
        .winpop-box {\
          position: absolute;\
          height: 160px;\
          left: 50%;\
          top: 50%;\
          border-radius: 2px;\
          background-color: #fff;\
          font-size: 14px;\
        }\
        .winpop-title {\
          padding: 0 80px 0 20px;\
          height: 42px;\
          line-height: 42px;\
          border: 1px solid #eee;\
          color: #666;\
          background-color: #F8F8F8;\
        }\
        .winpop-main {\
          padding: 20px;\
          line-height: 24px;\
          overflow: hidden;\
          overflow-x: hidden;\
          overflow-y: auto;\
        }\
        .winpop-btns {\
          padding: 5px 10px 10px;\
          text-align: right;\
        }\
        .loading-content {\
          margin: 100px auto;\
          font-size: 25px;\
          width: 1em;\
          height: 1em;\
          border-radius: 50%;\
          position: relative;\
          text-indent: -9999em;\
          -webkit-animation: loading 1.1s infinite ease;\
          animation: loading 1.1s infinite ease;\
          -webkit-transform: translateZ(0);\
          -ms-transform: translateZ(0);\
          transform: translateZ(0);\
        }\
        @-webkit-keyframes loading {\
          0%,\
          100% {\
            box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);\
          }\
          12.5% {\
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);\
          }\
          25% {\
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\
          }\
          37.5% {\
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\
          }\
          50% {\
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\
          }\
          62.5% {\
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\
          }\
          75% {\
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\
          }\
          87.5% {\
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff;\
          }\
        }\
        @keyframes loading {\
          0%,\
          100% {\
            box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);\
          }\
          12.5% {\
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);\
          }\
          25% {\
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\
          }\
          37.5% {\
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\
          }\
          50% {\
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\
          }\
          62.5% {\
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\
          }\
          75% {\
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\
          }\
          87.5% {\
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff;\
          }\
        }\
      '
      var pcStyle = '\
        .comp-toast {\
          width: 240px;\
          top: 60px;\
          margin-left: -140px;\
          text-align: justify;\
          box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);\
          border: 1px solid #ebeef5;\
          background-color: #fff;\
        }\
        .winpop-box {\
          width: 260px;\
          margin-left: -130px;\
          margin-top: -178px;\
        }\
        .pop-btn {\
          display: inline-block;\
          color: #333;\
          border-radius: 2px;\
          height: 28px;\
          line-height: 28px;\
          margin: 5px 5px 0;\
          padding: 0 15px;\
          text-decoration: none;\
          border: 1px solid #E9E7E7;\
          background-color: #fff;\
        }\
        .alert-btn, .cfm-true {\
          color: #fff;\
          border-color: #1E9FFF;\
          background-color: #1E9FFF;\
        }\
        .content-box {\
          position: absolute;\
          font-size: 14px;\
          left: 50%;\
          top: 50%;\
          box-sizing: border-box;\
          padding: 20px 30px 20px 20px;\
          transform: translateX(-50%) translateY(-50%);\
          -webkit-transform: translateX(-50%) translateY(-50%);\
          -moz-transform: translateX(-50%) translateY(-50%);\
          -ms-transform: translateX(-50%) translateY(-50%);\
          -o-transform: translateX(-50%) translateY(-50%);\
          background-color: #fff;\
          border-radius: 4px;\
        }\
        .close-btn {\
          position: absolute;\
          right: 5px;\
          top: 5px;\
          cursor: pointer;\
          padding: 10px;\
          line-height: 1;\
          border-radius: 4px;\
          transition: background-color ease .2s;\
        }\
        .close-btn:hover {\
          background-color: #e0e0e0;\
        }\
        .loading-cont {\
          position: fixed;\
          z-index: 999;\
          top: 50%;\
          left: 50%;\
          width: 240px;\
          border-radius: 10px;\
          background-color: rgba(0, 0, 0, .5);\
          transform: translateX(-50%) translateY(-50%) scale(.5);\
          -webkit-transform: translateX(-50%) translateY(-50%) scale(.5);\
          -moz-transform: translateX(-50%) translateY(-50%) scale(.5);\
          -ms-transform: translateX(-50%) translateY(-50%) scale(.5);\
          -o-transform: translateX(-50%) translateY(-50%) scale(.5);\
        }\
      '
      var mobileStyle = '\
        .comp-toast {\
          text-align: center;\
          width: 60%;\
          transform: translate3d(-50%, -50%, 0);\
          -webkit-transform: translate3d(-50%, -50%, 0);\
          box-sizing: border-box;\
          top: 50%;\
          color: #fff;\
          background-color: rgba(0, 0, 0, .65);\
        }\
        .winpop-box {\
          display: flex;\
          flex-direction: column;\
          width: 80%;\
          transform: translate3d(-50%, -50%, 0);\
          -webkit-transform: translate3d(-50%, -50%, 0);\
        }\
        .winpop-title {\
          display: none;\
        }\
        .winpop-main {\
          text-align: center;\
          flex-grow: 1;\
          font-size: 16px;\
        }\
        .winpop-btns {\
          display: flex;\
        }\
        .pop-btn {\
          flex-grow: 1;\
          color: #333;\
          letter-spacing: 4px;\
          border-radius: 2px;\
          height: 35px;\
          line-height: 35px;\
          text-align: center;\
          margin: 5px 5px 0;\
          padding: 0 15px;\
          text-decoration: none;\
          border: 1px solid #E9E7E7;\
          background-color: #fff;\
        }\
        .alert-btn, .cfm-true {\
          color: #fff;\
          border-color: #1E9FFF;\
          background-color: #1E9FFF;\
        }\
        .content-box {\
          position: absolute;\
          font-size: 14px;\
          left: 50%;\
          top: 50%;\
          box-sizing: border-box;\
          padding: 20px 30px 20px 20px;\
          transform: translateX(-50%) translateY(-50%);\
          -webkit-transform: translateX(-50%) translateY(-50%);\
          -moz-transform: translateX(-50%) translateY(-50%);\
          -ms-transform: translateX(-50%) translateY(-50%);\
          -o-transform: translateX(-50%) translateY(-50%);\
          background-color: #fff;\
          border-radius: 4px;\
        }\
        .close-btn {\
          position: absolute;\
          right: 5px;\
          top: 5px;\
          cursor: pointer;\
          padding: 10px;\
          line-height: 1;\
          border-radius: 4px;\
          transition: background-color ease .2s;\
        }\
        .loading-cont {\
          position: fixed;\
          z-index: 999;\
          top: 50%;\
          left: 50%;\
          width: 60%;\
          border-radius: 10px;\
          background-color: rgba(0, 0, 0, .5);\
          transform: translateX(-50%) translateY(-50%) scale(.5);\
          -webkit-transform: translateX(-50%) translateY(-50%) scale(.5);\
          -moz-transform: translateX(-50%) translateY(-50%) scale(.5);\
          -ms-transform: translateX(-50%) translateY(-50%) scale(.5);\
          -o-transform: translateX(-50%) translateY(-50%) scale(.5);\
        }\
      '
      styleEle.innerHTML = utils.isPc() ? commonStyle + pcStyle : commonStyle + mobileStyle
      document.body.appendChild(styleEle)
    },
    toast: function (str) {
      var $J_CompToast = utils.select('.J_CompToast')
      if ($J_CompToast) {
        utils.remove('.J_CompToast')
        this.toastFunc(str)
      } else {
        this.toastFunc(str)
      }
    },
    toastFunc: function (str) {
      w.clearTimeout(this.timer)
      this.get('body').appendChildAdvanced(HTMLS.toast)
      var $J_CompToast = utils.select('.J_CompToast')
      $J_CompToast.innerHTML = str
      this.timer = setTimeout(function () {
        utils.remove('.J_CompToast')
      }, 2000)
    },
    confirm: function (str) { // 确认组件层
      var confirmLayer = utils.select('.J_MaskCont')
      this.get('body').appendChildAdvanced(HTMLS.popup)
      utils.select('.J_WinpopMain').innerHTML = str
      utils.select('.J_WinpopBtns').appendChildAdvanced(HTMLS.confirm)
      confirmLayer = utils.select('.J_MaskCont')
      this.set('confirmLayer', confirmLayer)
      this.addConfirmEvent()
    },
    addConfirmEvent: function () { // 确认层添加确认事件
      var _this = this
      var confirmLayerBtn = utils.select('.J_AltBtn')
      confirmLayerBtn.addEventListener('click', function () {
        utils.remove('.J_MaskCont')
      })
    },
    prompt: function (str, cb) {
      var confirmLayer = utils.select('.J_MaskCont')
      this.get('body').appendChildAdvanced(HTMLS.popup)
      utils.select('.J_WinpopMain').innerHTML = str
      utils.select('.J_WinpopBtns').appendChildAdvanced(HTMLS.prompt)
      promptLayer = utils.select('.J_MaskCont')
      this.set('promptLayer', promptLayer)
      this.addPromptEvent(cb)
    },
    addPromptEvent: function (cb) {
      var _this = this
      var promptFalseBtn = utils.select('.J_CfmFalse')
      var promptTrueBtn = utils.select('.J_CfmTrue')
      promptFalseBtn.addEventListener('click', function () {
        utils.remove('.J_MaskCont')
        cb && cb(false)
      })
      promptTrueBtn.addEventListener('click', function () {
        utils.remove('.J_MaskCont')
        cb && cb(true)
      })
    },
    content: function (params) {
      var confirmLayer = utils.select('.J_InnerContent')
      var content, width, height
      if (!params) {
        content = '请输入参数对象，如{content: \'我是内容\', width: \'200px\', height: \'160px\'}'
      } else if (typeof params === 'string') {
        content = params
        width = '260px'
        height = '160px'
      } else {
        content = params.content
        width = params.width || '260px'
        height = params.height || '160px'
      }
      this.get('body').appendChildAdvanced(HTMLS.content)
      utils.select('.J_InnerContent').innerHTML = content
      utils.select('.J_ContentBox').style.width = width
      utils.select('.J_ContentBox').style.height = height
      this.addContentEvent()
    },
    addContentEvent: function () {
      utils.select('.J_ContentBox').addEventListener('click', function (e) {
        e.stopPropagation()
      })
      utils.select('.J_CloseBtn').addEventListener('click', function () {
        utils.remove('.J_MaskCont')
      })
      utils.select('.J_MaskCont').addEventListener('click', function () {
        utils.remove('.J_MaskCont')
      })
    },
    startLoading: function () {
      this.get('body').appendChildAdvanced(HTMLS.loading)
    },
    endLoading: function () {
      utils.remove('.J_LoadingCont')
    }
  }

  var layer = new Layer()
  w.layer = layer
})(window);
