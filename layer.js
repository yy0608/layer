;(function (w) {
  var HTMLS = {
    toast: '<div class="J_CompToast comp-toast"></div>',
    popup: '<div class="J_MaskCont mask-cont mask-animate"><div class="J_WinpopBox winpop-box"><div class="J_WinpopTitle winpop-title">提示</div><div class="J_WinpopMain winpop-main"></div><div class="J_WinpopBtns winpop-btns"></div></div>',
    confirm: '<a href="javascript:;" class="J_AltBtn pop-btn alert-btn">确定</a>',
    prompt: '<a href="javascript:;" class="J_CfmFalse pop-btn cfm-false">取消</a><a href="javascript:;" class="J_CfmTrue pop-btn cfm-true">确定</a>',
    content: '<div class="J_MaskCont mask-cont"><div class="J_ContentBox content-box"><span class="J_CloseBtn close-btn"></span><div class="J_InnerContent inner-content"></div></div></div>',
    loading: '<div class="J_MaskCont mask-cont"><div class="J_LoadingCont loading-cont"><div class="loading-content"></div><div class="J_LoadingText loading-text">加载中</div></div></div>',
    input: '<a href="javascript:;" class="J_CfmFalse pop-btn cfm-false">取消</a><a href="javascript:;" class="J_CfmTrue pop-btn cfm-true">确定</a>'
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
        input, textarea{outline:0;}\
        .comp-toast{position:fixed;z-index:999;padding:10px 20px;left:50%;font-size:16px;line-height:25px;border-radius:4px;background-color:#fff;pointer-events:none;}\
        .mask-cont{position:fixed;z-index:999;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);}\
        .winpop-box{position:absolute;height:160px;left:50%;top:50%;border-radius:2px;background-color:#fff;font-size:14px;}\
        .winpop-title{padding:0 80px 0 20px;height:42px;line-height:42px;border:1px solid #eee;color:#666;background-color:#F8F8F8;}\
        .winpop-main{padding:20px;line-height:24px;overflow:hidden;overflow-x:hidden;overflow-y:auto;}\
        .winpop-btns{padding:5px 10px 10px;text-align:right;}\
        .input-item{position:relative;display:flex;align-items:center;margin-bottom:15px;}\
        .input-item .label{margin-right:10px;flex-shrink:0;}\
        .label-click{display:flex;margin-right:15px;align-items:center;}\
        .label-click .option{flex-shrink:0;}\
        .input-context{display:flex;flex-grow:1;flex-wrap:wrap;}\
        .input-context select{outline:0;flex-grow:1;height:32px;line-height:32px;}\
        .input-item .input{padding:0;outline:0;text-indent:10px;height:28px;flex-grow:1;}\
        .input-item .textarea{resize:none;width:100%;padding:10px;box-sizing:border-box;}\
        .require-star{position:absolute;color:red;left:-10px;}\
        .require-star.dis-none{display:none;}\
        .require-star.dis-block{display:block;}\
        .one-input{width:100%;padding:10px 0;outline:0;height:80px;resize:none;text-indent:10px;}\
        .loading-content{margin:100px auto;font-size:25px;width:1em;height:1em;border-radius:50%;position:relative;text-indent:-9999em;-webkit-animation:loading 1.1s infinite ease;animation:loading 1.1s infinite ease;-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);}\
        .content-box{position:absolute;font-size:14px;left:50%;top:50%;box-sizing:border-box;background-color:#fff;border-radius:4px;overflow:hidden;visibility:hidden;}\
        .close-btn{position:absolute;right:0;top:0;width:60px;height:60px;overflow:hidden;z-index:100000;cursor:pointer;}\
        .close-btn:hover::before,.close-btn:hover::after{background:#333;}\
        .close-btn::before,.close-btn::after{content:\'\';position:absolute;height:2px;width:50%;top:50%;left:50%;margin-top:-1px;margin-left:-25%;background-color:#888;}\
        .close-btn::before{-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg);}\
        .close-btn::after{-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-ms-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg);}\
        .loading-cont{position:fixed;z-index:999;top:50%;left:50%;width:240px;border-radius:10px;background-color:rgba(0,0,0,.5);}\
        .loading-text{display:none;text-align:center;color:#eaeaea;font-size:28px;margin-top:-30px;line-height:60px;}\
        .mask-hide{background:rgba(0,0,0,0);}\
        .mask-animate{opacity:0;animation:maskAnimate .2s ease forwards;-webkit-animation:maskAnimate .2s ease forwards;}\
        @keyframes maskAnimate{\
          0%{opacity:0;}\
          100%{opacity:1;}\
        }\
        .layer-pc-animate{opacity:0;animation:layerPcAnimate .2s ease forwards;-webkit-animation:layerPcAnimate .2s ease forwards;}\
        .layer-phone-animate{opacity:0;animation:layerPhoneAnimate .2s ease forwards;-webkit-animation:layerPhoneAnimate .2s ease forwards;}\
        @keyframes layerPcAnimate{\
          0%{opacity:0;transform:translateY(-30px);}\
          100%{opacity:1;transform:translateY(0);}\
        }\
        @keyframes layerPhoneAnimate{\
          0%{opacity:0;transform:translate3d(-50%,-50%,0) scale(.5);}\
          100%{opacity:1;transform:translate3d(-50%,-50%,0) scale(1);}\
        }\
        @-webkit-keyframes layerPcAnimate{\
          0%{opacity:0;transform:translateY(-30px);}\
          100%{opacity:1;transform:translateY(0);}\
        }\
        @-webkit-keyframes layerPhoneAnimate{\
          0%{opacity:0;transform:translate3d(-50%,-50%,0) scale(.5);}\
          100%{opacity:1;transform:translate3d(-50%,-50%,0) scale(1);}\
        }\
        @-webkit-keyframes loading{\
          0%,\
          100%{box-shadow:0em -2.6em 0em 0em #ffffff,1.8em -1.8em 0 0em rgba(255,255,255,0.2),2.5em 0em 0 0em rgba(255,255,255,0.2),1.75em 1.75em 0 0em rgba(255,255,255,0.2),0em 2.5em 0 0em rgba(255,255,255,0.2),-1.8em 1.8em 0 0em rgba(255,255,255,0.2),-2.6em 0em 0 0em rgba(255,255,255,0.5),-1.8em -1.8em 0 0em rgba(255,255,255,0.7);}\
          12.5%{box-shadow:0em -2.6em 0em 0em rgba(255,255,255,0.7),1.8em -1.8em 0 0em #ffffff,2.5em 0em 0 0em rgba(255,255,255,0.2),1.75em 1.75em 0 0em rgba(255,255,255,0.2),0em 2.5em 0 0em rgba(255,255,255,0.2),-1.8em 1.8em 0 0em rgba(255,255,255,0.2),-2.6em 0em 0 0em rgba(255,255,255,0.2),-1.8em -1.8em 0 0em rgba(255,255,255,0.5);}\
          25%{box-shadow:0em -2.6em 0em 0em rgba(255,255,255,0.5),1.8em -1.8em 0 0em rgba(255,255,255,0.7),2.5em 0em 0 0em #ffffff,1.75em 1.75em 0 0em rgba(255,255,255,0.2),0em 2.5em 0 0em rgba(255,255,255,0.2),-1.8em 1.8em 0 0em rgba(255,255,255,0.2),-2.6em 0em 0 0em rgba(255,255,255,0.2),-1.8em -1.8em 0 0em rgba(255,255,255,0.2);}\
          37.5%{box-shadow:0em -2.6em 0em 0em rgba(255,255,255,0.2),1.8em -1.8em 0 0em rgba(255,255,255,0.5),2.5em 0em 0 0em rgba(255,255,255,0.7),1.75em 1.75em 0 0em #ffffff,0em 2.5em 0 0em rgba(255,255,255,0.2),-1.8em 1.8em 0 0em rgba(255,255,255,0.2),-2.6em 0em 0 0em rgba(255,255,255,0.2),-1.8em -1.8em 0 0em rgba(255,255,255,0.2);}\
          50%{box-shadow:0em -2.6em 0em 0em rgba(255,255,255,0.2),1.8em -1.8em 0 0em rgba(255,255,255,0.2),2.5em 0em 0 0em rgba(255,255,255,0.5),1.75em 1.75em 0 0em rgba(255,255,255,0.7),0em 2.5em 0 0em #ffffff,-1.8em 1.8em 0 0em rgba(255,255,255,0.2),-2.6em 0em 0 0em rgba(255,255,255,0.2),-1.8em -1.8em 0 0em rgba(255,255,255,0.2);}\
          62.5%{box-shadow:0em -2.6em 0em 0em rgba(255,255,255,0.2),1.8em -1.8em 0 0em rgba(255,255,255,0.2),2.5em 0em 0 0em rgba(255,255,255,0.2),1.75em 1.75em 0 0em rgba(255,255,255,0.5),0em 2.5em 0 0em rgba(255,255,255,0.7),-1.8em 1.8em 0 0em #ffffff,-2.6em 0em 0 0em rgba(255,255,255,0.2),-1.8em -1.8em 0 0em rgba(255,255,255,0.2);}\
          75%{box-shadow:0em -2.6em 0em 0em rgba(255,255,255,0.2),1.8em -1.8em 0 0em rgba(255,255,255,0.2),2.5em 0em 0 0em rgba(255,255,255,0.2),1.75em 1.75em 0 0em rgba(255,255,255,0.2),0em 2.5em 0 0em rgba(255,255,255,0.5),-1.8em 1.8em 0 0em rgba(255,255,255,0.7),-2.6em 0em 0 0em #ffffff,-1.8em -1.8em 0 0em rgba(255,255,255,0.2);}\
          87.5%{box-shadow:0em -2.6em 0em 0em rgba(255,255,255,0.2),1.8em -1.8em 0 0em rgba(255,255,255,0.2),2.5em 0em 0 0em rgba(255,255,255,0.2),1.75em 1.75em 0 0em rgba(255,255,255,0.2),0em 2.5em 0 0em rgba(255,255,255,0.2),-1.8em 1.8em 0 0em rgba(255,255,255,0.5),-2.6em 0em 0 0em rgba(255,255,255,0.7),-1.8em -1.8em 0 0em #ffffff;}\
        }\
        @keyframes loading{\
          0%,\
          100%{box-shadow:0em -2.6em 0em 0em #ffffff,1.8em -1.8em 0 0em rgba(255,255,255,0.2),2.5em 0em 0 0em rgba(255,255,255,0.2),1.75em 1.75em 0 0em rgba(255,255,255,0.2),0em 2.5em 0 0em rgba(255,255,255,0.2),-1.8em 1.8em 0 0em rgba(255,255,255,0.2),-2.6em 0em 0 0em rgba(255,255,255,0.5),-1.8em -1.8em 0 0em rgba(255,255,255,0.7);}\
          12.5%{box-shadow:0em -2.6em 0em 0em rgba(255,255,255,0.7),1.8em -1.8em 0 0em #ffffff,2.5em 0em 0 0em rgba(255,255,255,0.2),1.75em 1.75em 0 0em rgba(255,255,255,0.2),0em 2.5em 0 0em rgba(255,255,255,0.2),-1.8em 1.8em 0 0em rgba(255,255,255,0.2),-2.6em 0em 0 0em rgba(255,255,255,0.2),-1.8em -1.8em 0 0em rgba(255,255,255,0.5);}\
          25%{box-shadow:0em -2.6em 0em 0em rgba(255,255,255,0.5),1.8em -1.8em 0 0em rgba(255,255,255,0.7),2.5em 0em 0 0em #ffffff,1.75em 1.75em 0 0em rgba(255,255,255,0.2),0em 2.5em 0 0em rgba(255,255,255,0.2),-1.8em 1.8em 0 0em rgba(255,255,255,0.2),-2.6em 0em 0 0em rgba(255,255,255,0.2),-1.8em -1.8em 0 0em rgba(255,255,255,0.2);}\
          37.5%{box-shadow:0em -2.6em 0em 0em rgba(255,255,255,0.2),1.8em -1.8em 0 0em rgba(255,255,255,0.5),2.5em 0em 0 0em rgba(255,255,255,0.7),1.75em 1.75em 0 0em #ffffff,0em 2.5em 0 0em rgba(255,255,255,0.2),-1.8em 1.8em 0 0em rgba(255,255,255,0.2),-2.6em 0em 0 0em rgba(255,255,255,0.2),-1.8em -1.8em 0 0em rgba(255,255,255,0.2);}\
          50%{box-shadow:0em -2.6em 0em 0em rgba(255,255,255,0.2),1.8em -1.8em 0 0em rgba(255,255,255,0.2),2.5em 0em 0 0em rgba(255,255,255,0.5),1.75em 1.75em 0 0em rgba(255,255,255,0.7),0em 2.5em 0 0em #ffffff,-1.8em 1.8em 0 0em rgba(255,255,255,0.2),-2.6em 0em 0 0em rgba(255,255,255,0.2),-1.8em -1.8em 0 0em rgba(255,255,255,0.2);}\
          62.5%{box-shadow:0em -2.6em 0em 0em rgba(255,255,255,0.2),1.8em -1.8em 0 0em rgba(255,255,255,0.2),2.5em 0em 0 0em rgba(255,255,255,0.2),1.75em 1.75em 0 0em rgba(255,255,255,0.5),0em 2.5em 0 0em rgba(255,255,255,0.7),-1.8em 1.8em 0 0em #ffffff,-2.6em 0em 0 0em rgba(255,255,255,0.2),-1.8em -1.8em 0 0em rgba(255,255,255,0.2);}\
          75%{box-shadow:0em -2.6em 0em 0em rgba(255,255,255,0.2),1.8em -1.8em 0 0em rgba(255,255,255,0.2),2.5em 0em 0 0em rgba(255,255,255,0.2),1.75em 1.75em 0 0em rgba(255,255,255,0.2),0em 2.5em 0 0em rgba(255,255,255,0.5),-1.8em 1.8em 0 0em rgba(255,255,255,0.7),-2.6em 0em 0 0em #ffffff,-1.8em -1.8em 0 0em rgba(255,255,255,0.2);}\
          87.5%{box-shadow:0em -2.6em 0em 0em rgba(255,255,255,0.2),1.8em -1.8em 0 0em rgba(255,255,255,0.2),2.5em 0em 0 0em rgba(255,255,255,0.2),1.75em 1.75em 0 0em rgba(255,255,255,0.2),0em 2.5em 0 0em rgba(255,255,255,0.2),-1.8em 1.8em 0 0em rgba(255,255,255,0.5),-2.6em 0em 0 0em rgba(255,255,255,0.7),-1.8em -1.8em 0 0em #ffffff;}\
        }\
      '
      var pcStyle = '\
        .comp-toast{width:240px;top:60px;margin-left:-140px;text-align:justify;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);border:1px solid #ebeef5;background-color:#fff;}\
        .winpop-box{width:260px;margin-left:-130px;margin-top:-178px;}\
        .winpop-box-input{width:360px;margin-left:-180px;height:auto;}\
        .pop-btn{display:inline-block;color:#333;border-radius:2px;height:28px;line-height:28px;margin:5px 5px 0;padding:0 15px;text-decoration:none;border:1px solid #E9E7E7;background-color:#fff;}\
        .alert-btn,.cfm-true{color:#fff;border-color:#1E9FFF;background-color:#1E9FFF;}\
        .loading-cont{transform:translateX(-50%) translateY(-50%) scale(.5);-webkit-transform:translateX(-50%) translateY(-50%) scale(.5);-moz-transform:translateX(-50%) translateY(-50%) scale(.5);-ms-transform:translateX(-50%) translateY(-50%) scale(.5);-o-transform:translateX(-50%) translateY(-50%) scale(.5);}\
      '
      var mobileStyle = '\
        .comp-toast{text-align:center;max-width:60%;transform:translate3d(-50%,-50%,0);-webkit-transform:translate3d(-50%,-50%,0);box-sizing:border-box;top:50%;color:#fff;background-color:rgba(0,0,0,.65);}\
        .winpop-box{display:flex;flex-direction:column;width:80%;transform:translate3d(-50%,-50%,0);-webkit-transform:translate3d(-50%,-50%,0);}\
        .winpop-box-input{margin-top:0;height:auto;top:50%;transform:translate3d(-50%,-50%,0);-webkit-transform:translate3d(-50%,-50%,0);}\
        .winpop-box-input .label{text-align:left;}\
        .winpop-title{display:none;}\
        .winpop-main{text-align:center;flex-grow:1;font-size:16px;}\
        .winpop-btns{display:flex;}\
        .pop-btn{flex-grow:1;color:#333;letter-spacing:4px;border-radius:2px;height:35px;line-height:35px;text-align:center;margin:5px 5px 0;padding:0 15px;text-decoration:none;border:1px solid #E9E7E7;background-color:#fff;}\
        .alert-btn,.cfm-true{color:#fff;border-color:#1E9FFF;background-color:#1E9FFF;}\
        .content-box{transform:translate3d(-50%,-50%,0);-webkit-transform:translate3d(-50%,-50%,0);-moz-transform:translate3d(-50%,-50%,0);-ms-transform:translate3d(-50%,-50%,0);-o-transform:translate3d(-50%,-50%,0);}\
        .close-btn{width:30px;height:30px;}\
        .loading-cont{transform:translate3d(-50%,-50%,0) scale(.5);-webkit-transform:translate3d(-50%,-50%,0) scale(.5);-moz-transform:translate3d(-50%,-50%,0) scale(.5);-ms-transform:translate3d(-50%,-50%,0) scale(.5);-o-transform:translate3d(-50%,-50%,0) scale(.5);}\
      '
      styleEle.innerHTML = utils.isPc() ? commonStyle + pcStyle : commonStyle + mobileStyle
      document.body.appendChild(styleEle)
    },
    toast: function (params) {
      var content = typeof params === 'string' ? params : params ? params.content : '(未传参)'
      var interval = params ? params.interval : 1500
      var cb = params && params.callback
      var $J_CompToast = utils.select('.J_CompToast')
      if ($J_CompToast) {
        utils.remove('.J_CompToast')
      }
      this.toastFunc(content, interval, cb)
    },
    toastFunc: function (content, interval, cb) {
      w.clearTimeout(this.timer)
      this.get('body').appendChildAdvanced(HTMLS.toast)
      var plat = utils.isPc() ? 'layer-pc-animate' : 'layer-phone-animate'
      var $J_CompToast = utils.select('.J_CompToast')
      $J_CompToast.className = 'J_CompToast comp-toast ' + plat
      $J_CompToast.innerHTML = content
      this.timer = setTimeout(function () {
        utils.remove('.J_CompToast')
        cb && cb()
      }, interval || 1500)
    },
    confirm: function (params) { // 确认组件层
      var content = typeof params === 'string' ? params : params ? params.content : '(未传参)'
      var title = params ? params.title : '提示'
      var cfmTxt = params ? params.confirmText : '确定'
      var cb = params ? params.callback : null
      var confirmLayer = utils.select('.J_MaskCont')
      this.get('body').appendChildAdvanced(HTMLS.popup)
      utils.select('.J_WinpopMain').innerHTML = content
      utils.select('.J_WinpopBtns').appendChildAdvanced(HTMLS.confirm)
      var plat = utils.isPc() ? 'layer-pc-animate' : 'layer-phone-animate'
      utils.select('.J_WinpopBox').className = 'J_WinpopBox winpop-box ' + plat
      utils.select('.J_WinpopTitle').innerHTML = title || '提示'
      utils.select('.J_AltBtn').innerHTML = cfmTxt || '确定'
      confirmLayer = utils.select('.J_MaskCont')
      this.set('confirmLayer', confirmLayer)
      this.addConfirmEvent(cb)
    },
    addConfirmEvent: function (cb) { // 确认层添加确认事件
      var _this = this
      var confirmLayerBtn = utils.select('.J_AltBtn')
      confirmLayerBtn.addEventListener('click', function () {
        utils.remove('.J_MaskCont')
        cb && cb()
      })
    },
    prompt: function (str, cb) {
      var confirmLayer = utils.select('.J_MaskCont')
      this.get('body').appendChildAdvanced(HTMLS.popup)
      utils.select('.J_WinpopMain').innerHTML = str
      utils.select('.J_WinpopBtns').appendChildAdvanced(HTMLS.prompt)
      var plat = utils.isPc() ? 'layer-pc-animate' : 'layer-phone-animate'
      utils.select('.J_WinpopBox').className = 'J_WinpopBox winpop-box ' + plat
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
      var content, width, height, clickMaskHide
      var cb = params && params.callback
      if (!params) {
        content = '请输入参数对象，如{content: \'我是内容\', width: \'200px\', height: \'160px\'}'
      } else if (typeof params === 'string') {
        content = params
        width = '260px'
        height = '160px'
      } else {
        content = params.content
        width = params.width || '260px'
        height = params.height || '160px',
        clickMaskHide = params.clickMaskHide || false
      }
      this.get('body').appendChildAdvanced(HTMLS.content)
      var plat = utils.isPc() ? 'layer-pc-animate' : 'layer-phone-animate'
      utils.select('.J_InnerContent').innerHTML = content
      utils.select('.J_ContentBox').style.width = width
      utils.select('.J_ContentBox').style.height = height
      if (utils.isPc()) {
        utils.select('.J_ContentBox').style.marginLeft = - (utils.select('.J_ContentBox').offsetWidth / 2) + 'px'
        utils.select('.J_ContentBox').style.marginTop = - (utils.select('.J_ContentBox').offsetHeight / 2)  + 'px'
      }
      utils.select('.J_ContentBox').style.visibility = 'visible'
      utils.select('.J_ContentBox').className = 'J_ContentBox content-box ' + plat
      this.addContentEvent(clickMaskHide, cb)
    },
    contentRemove: function () {
      utils.remove('.J_MaskCont')
    },
    addContentEvent: function (clickMaskHide, cb) {
      utils.select('.J_ContentBox').addEventListener('click', function (e) {
        e.stopPropagation()
      })
      utils.select('.J_CloseBtn').addEventListener('click', function () {
        utils.remove('.J_MaskCont')
        cb && cb()
      })
      if (!clickMaskHide) return
      utils.select('.J_MaskCont').addEventListener('click', function () {
        utils.remove('.J_MaskCont')
        cb && cb()
      })
    },
    startLoading: function (options) {
      this.endLoading()
      this.get('body').appendChildAdvanced(HTMLS.loading)
      var text = (typeof(options) === 'string' && options) || (options && typeof(options) === 'object' && options.text)
      var mask = (options && typeof(options) === 'object' && options.mask)
      var loadingText = utils.select('.J_LoadingText')
      var loadingMask = utils.select('.J_MaskCont')
      if (text) {
        loadingText.innerHTML = text
        loadingText.style.display = 'block';
      } else {
        loadingText.style.display = 'none';
      }
      if (mask) {
        loadingMask.className = 'J_MaskCont mask-cont'
      } else {
        utils.select('.J_MaskCont').className = 'J_MaskCont mask-cont mask-hide'
      }
    },
    endLoading: function () {
      utils.remove('.J_MaskCont')
    },
    input: function (options) {
      this.get('body').appendChildAdvanced(HTMLS.popup)
      var plat = utils.isPc() ? 'layer-pc-animate' : 'layer-phone-animate'
      utils.select('.J_WinpopBox').className = 'J_WinpopBox winpop-box winpop-box-input ' + plat
      var title = options && options.title || '提示'
      var confirmText = options && options.confirmText || '确认'
      var cancelText = options && options.cancelText || '取消'
      var inputs = options && options.inputs
      var cb = options && options.callback
      var labelWidth = options && options.labelWidth
      var inputsStr = ''
      utils.select('.J_WinpopTitle').innerHTML = title
      if (inputs) {
        for (var i = 0; i < inputs.length; i++) {
          switch (inputs[i].type) {
            case undefined:
            case 'text':
              inputsStr += '<div class="input-item"><span class="require-star ' + (inputs[i].required ? 'dis-block' : 'dis-none') + '">*</span><div class="label">' + inputs[i].label + '</div><input class="input" ' + (inputs[i].placeholder ? 'placeholder="' + inputs[i].placeholder + '"' : '') + ' name="' + inputs[i].name + '" value="' + (inputs[i].value || '') + '"></div>'
              break;
            case 'textarea':
              inputsStr += '<div class="input-item"><span class="require-star ' + (inputs[i].required ? 'dis-block' : 'dis-none') + '">*</span><div class="label">' + inputs[i].label + '</div><textarea rows="' +(inputs[i].rows ? inputs[i].rows : 3) + '" class="textarea" ' + (inputs[i].placeholder ? 'placeholder="' + inputs[i].placeholder + '"' : '') + ' name="' + inputs[i].name + '">' + (inputs[i].value || '') + '</textarea></div>'
              break;
            case 'radio':
              inputsStr += '<div class="input-item"><span class="require-star ' + (inputs[i].required ? 'dis-block' : 'dis-none') + '">*</span><div class="label">' + inputs[i].label + '</div><div class="input-context">';
              for (var j = 0; j < inputs[i].options.length; j++) {
                var checked = false
                if (inputs[i].options[j].value === inputs[i].value) {
                  checked = true
                }
                inputsStr += '<label class="label-click"><input type="radio" ' + (checked ? 'checked' : '') + ' name="' + inputs[i].name + '" value="' + inputs[i].options[j].value + '" /><span class="option">' + inputs[i].options[j].label + '</span></label>'
              }
              inputsStr += '</div></div>'
              break;
            case 'checkbox':
              inputsStr += '<div class="input-item"><span class="require-star ' + (inputs[i].required ? 'dis-block' : 'dis-none') + '">*</span><div class="label">' + inputs[i].label + '</div><div class="input-context">';
              for (var j = 0; j < inputs[i].options.length; j++) {
                var checked = false
                if (inputs[i].value.indexOf(inputs[i].options[j].value) !== -1) {
                  checked = true
                }
                inputsStr += '<label class="label-click"><input type="checkbox" ' + (checked ? 'checked' : '') + ' name="' + inputs[i].name + '" value="' + inputs[i].options[j].value + '" /><span class="option">' + inputs[i].options[j].label + '</span></label>'
              }
              inputsStr += '</div></div>'
              break;
            case 'select':
              inputsStr += '<div class="input-item"><span class="require-star ' + (inputs[i].required ? 'dis-block' : 'dis-none') + '">*</span><div class="label">' + inputs[i].label + '</div><div class="input-context"><select name="' + inputs[i].name + '">';
              for (var j = 0; j < inputs[i].options.length; j++) {
                var selected = false
                if (inputs[i].options[j].value === inputs[i].value) {
                  selected = true
                }
                inputsStr += '<option ' + (selected ? 'selected' : '') + ' value="' + inputs[i].options[j].value + '">' + inputs[i].options[j].label + '</option>'
              }
              inputsStr += '</select></div></div>'
              break;
            case 'hidden':
              inputsStr += '<input class="input" type="hidden" name="' + inputs[i].name + '" value="' + (inputs[i].value || '') + '"></div>'
            default:
              break;
          }
        }
      } else {
        inputsStr += '<textarea class="one-input" name="one" rows="5"></textarea>'
      }
      utils.select('.J_WinpopMain').appendChildAdvanced(inputsStr)
      var inputLabel = utils.selectAll('.winpop-box-input .input-item .label')
      if (inputLabel.length) {
        for (var i = 0; i < inputLabel.length; i++) {
          inputLabel[i].style.width = labelWidth || '60px'
        }
      }
      utils.select('.J_WinpopBtns').appendChildAdvanced(HTMLS.input)
      utils.select('.J_CfmFalse').innerHTML = cancelText
      utils.select('.J_CfmTrue').innerHTML = confirmText
      if (utils.isPc()) {
        utils.select('.J_WinpopBox').style.marginTop = -utils.select('.J_WinpopBox').offsetHeight / 2 + 'px'
      }
      this.addInputEvent({
        cb: cb,
        inputs: inputs,
        confirm: options && options.confirm,
        cancel: options && options.cancel
      })
    },
    addInputEvent: function (params) {
      var _this = this
      var cb = params.cb
      var inputs = params.inputs
      var confirm = params.confirm
      var cancel = params.cancel
      var _this = this
      var promptFalseBtn = utils.select('.J_CfmFalse')
      var promptTrueBtn = utils.select('.J_CfmTrue')
      promptFalseBtn.addEventListener('click', function () {
        utils.remove('.J_MaskCont')
        cb && cb(false)
        cancel && cancel(false)
      })
      promptTrueBtn.addEventListener('click', function () {
        var resValue = undefined
        if (inputs) {
          var tempRes = {}
          for (var i = 0; i < inputs.length; i++) {
            var name = inputs[i].name
            switch (inputs[i].type) {
              case undefined:
              case 'text':
              case 'textarea':
                tempRes[name] = utils.select('[name="' + name + '"]').value
                break;
              case 'radio':
                tempRes[name] = utils.select('[name="' + name + '"]:checked') ? utils.select('[name="' + name + '"]:checked').value : ''
                break;
              case 'checkbox':
                var checkedDomArray = utils.selectAll('[name="' + name + '"]:checked')
                var checkedArray = []
                for (var k = 0; k < checkedDomArray.length; k++) {
                  checkedArray.push(checkedDomArray[k].value)
                }
                tempRes[name] = checkedArray
                break;
              case 'select':
                tempRes[name] = utils.select('[name="' + name + '"]').value
                break;
              case 'hidden':
                tempRes[name] = utils.select('[name="' + name + '"]').value
                break;
              default:
                break;
            }
            if (inputs[i].required) {
              if ((typeof tempRes[name] === 'object' && !tempRes[name].length) || (typeof tempRes[name] === 'string' && !tempRes[name])) {
                if (!inputs[i].type || inputs[i].type === 'text' || inputs[i].type === 'textarea') {
                  _this.toast('请填写' + inputs[i].label)
                } else {
                  _this.toast('请选择' + inputs[i].label)
                }
                return;
              }
            }
            // resValue.push(tempRes)
          }
          resValue = tempRes
        } else {
          resValue = utils.select('[name="one"]').value
        }
        utils.remove('.J_MaskCont')
        cb && cb(resValue)
        confirm && confirm(resValue)
      })
    }
  }

  var layer = new Layer()
  w.yjyLayer = layer
})(window);
