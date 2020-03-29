var Haniboi;
Haniboi = function() {
  function Haniboi() {
    var t;
    t = this,
    this.setSize(),
    this.preloadImages(),
    this.init(),
    this.prepareAndSave(!1),
    this.groupChosen = "0"
  }
  return Haniboi.prototype.setSize = function(t) {
    var i;
    return i = t,
    null == t && (t = "facebook"),
    this.size = t,
    "facebook" === t ? this.dimensions = {
      canvas: {
        w: 850,
        h: 315
      },
      start: {
        image: {
          x: 310,
          y: -30
        },
        text: {
          x: 53,
          y: -55.5
        }
      },
      image: {
        gapX: 63,
        gapY: 24,
        w: 90,
        h: 177
      },
      text: {
        gapX: 44,
        gapY: -1.5,
        scaleX: 1.3,
        scaleY: 1,
        skewH: .635,
        skewV: -1.5,
        moveX: 190,
        moveY: 33,
        fontSizeZh: 25,
        fontSizeEn: 27
      },
      linebreak: {
        image: {
          x: -60,
          y: 44
        },
        text: {
          x: .4,
          y: 42.3
        }
      }
    } : "square" === t && (this.dimensions = {
      canvas: {
        w: 1000,
        h: 1000
      },
      start: {
        image: {
          x: 120,
          y: 40
        },
        text: {
          x: 4,
          y: 34.5
        }
      },
      image: {
        gapX: 50,
        gapY: 22,
        w: 76,
        h: 149
      },
      text: {
        gapX: 37.7,
        gapY: 1.4,
        scaleX: 1.3,
        scaleY: 1,
        skewH: .6,
        skewV: -1.5,
        moveX: 191,
        moveY: 32,
        fontSizeZh: 20,
        fontSizeEn: 23
      },
      linebreak: {
        image: {
          x: -52,
          y: 36
        },
        text: {
          x: -.8,
          y: 35.5
        }
      }
    }),
    i ? $("#save").click() : void 0
  }
  ,
  Haniboi.prototype.init = function() {
    return this.base = {},
    this.base.ix = this.dimensions.start.image.x,
    this.base.iy = this.dimensions.start.image.y,
    this.base.tx = this.dimensions.start.text.x,
    this.base.ty = this.dimensions.start.text.y,
    this.img = $("#output"),
    (this.watermark = new Image).src = "./materials/watermark.png",
    (this.booksWatermark = new Image).src = "./materials/books.png",
    this.peopleCanvas = $("#canvas-people").get(0),
    this.people = this.peopleCanvas.getContext("2d"),
    this.textCanvas = $("#canvas-text").get(0),
    this.text = this.textCanvas.getContext("2d"),
    this.bgCanvas = $("#canvas-bg").get(0),
    this.bg = this.bgCanvas.getContext("2d"),
    this.markCanvas = $("#canvas-mark").get(0),
    this.mark = this.markCanvas.getContext("2d"),
    this.markCanvas.width = this.peopleCanvas.width = this.textCanvas.width = this.bgCanvas.width = this.dimensions.canvas.w,
    this.markCanvas.height = this.peopleCanvas.height = this.textCanvas.height = this.bgCanvas.height = this.dimensions.canvas.h,
    this.transformed || (this.text.transform(this.dimensions.text.scaleX, this.dimensions.text.skewH, this.dimensions.text.skewV, this.dimensions.text.scaleY, this.dimensions.text.moveX, this.dimensions.text.moveY),
    this.text.rotate(-3 * Math.PI / 180),
    this.transformed = !0),
    this.ix = this.base.ix,
    this.iy = this.base.iy,
    this.tx = this.base.tx,
    this.ty = this.base.ty
  }
  ,
  Haniboi.prototype.clearCanvas = function() {
    return this.people.clearRect(0, 0, this.peopleCanvas.width, this.peopleCanvas.height),
    this.bg.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height),
    this.mark.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height),
    this.text.setTransform(1, 0, 0, 1, 0, 0),
    this.text.clearRect(0, 0, this.textCanvas.width, this.textCanvas.height),
    this.transformed = !1,
    this.init()
  }
  ,
  Haniboi.prototype.processWords = function() {
    var t;
    return this.clearCanvas(),
    this.words = $("#words").val().toUpperCase().replace(/\n/g, "£"),
    t = this,
    this.lines = 1,
    $.each(this.words.split(""), function(i, e) {
      return "£" === e ? (t.ix = t.base.ix + t.dimensions.linebreak.image.x * t.lines,
      t.iy = t.base.iy + t.dimensions.linebreak.image.y * t.lines,
      t.tx = t.base.tx + t.dimensions.linebreak.text.x * t.lines,
      t.ty = t.base.ty + t.dimensions.linebreak.text.y * t.lines,
      t.lines = t.lines + 1) : t.createUnit(e)
    })
  }
  ,
  Haniboi.prototype.setBackground = function(bg, clicker) {
    var hex, hnb, img;
    return null == clicker && (clicker = !1),
    null == bg && (bg = "#fff"),
    hnb = this,
    this.bgChosen = bg,
    clicker && (this.text.setTransform(1, 0, 0, 1, 0, 0),
    this.text.clearRect(0, 0, this.textCanvas.width, this.textCanvas.height),
    this.text.transform(this.dimensions.text.scaleX, this.dimensions.text.skewH, this.dimensions.text.skewV, this.dimensions.text.scaleY, this.dimensions.text.moveX, this.dimensions.text.moveY),
    this.text.rotate(-3 * Math.PI / 180),
    this.transformed = !0),
    bg.match(/^#/) ? hex = bg : bg && (img = bg + "_" + this.size),
    hex ? (this.bg.fillStyle = this.bgChosen,
    this.bg.fillRect(0, 0, this.bgCanvas.width, this.bgCanvas.height)) : img && (bg = eval("hnb.backgrounds." + img),
    this.bg.drawImage(bg, 0, 0, this.dimensions.canvas.w, this.dimensions.canvas.h)),
    this.watermarking(),
    this.prepareAndSave()
  }
  ,
  Haniboi.prototype.setGroup = function(t) {
    return null == t && (t = 1),
    this.groupChosen = t
  }
  ,
  Haniboi.prototype.shuffle = function(t) {
    return t.sort(function() {
      return .5 - Math.random()
    }),
    t[0]
  }
  ,
  Haniboi.prototype.getFileNames = function(t) {
    var i;
    return i = $.map(t, function(t) {
      var i;
      return i = t.toString().length,
      1 === i ? t = "00" + t.toString() : 2 === i && (t = "0" + t.toString()),
      "./materials/" + t + ".png"
    })
  }
  ,
  Haniboi.prototype.preloadImages = function() {
    var t, i, e, s, a, n, o, r, h, c, g, l, m;
    for (this.imgs = [],
    this.groups = {},
    g = [],
    e = {
      0: function() {
        for (m = [],
        n = 404; 426 >= n; n++)
          m.push(n);
        return m
      }
      .apply(this)
    },
    e[0] = e[0].concat([401, 402]),
    t = this.getFileNames(g),
    o = 0,
    h = t.length; h > o; o++)
      l = t[o],
      a = new Image,
      a.src = l,
      this.imgs.push(a);
    for (s in e)
      for (i = e[s],
      t = this.getFileNames(i),
      this.groups[s] = [],
      r = 0,
      c = t.length; c > r; r++)
        l = t[r],
        a = new Image,
        a.src = l,
        this.groups[s].push(a);
    return this.backgrounds = {}
  }
  ,
  Haniboi.prototype.randImg = function() {
    var t;
    return t = this.groupChosen ? this.groups[this.groupChosen] : this.imgs,
    this.shuffle(t)
  }
  ,
  Haniboi.prototype.createUnit = function(t) {
    return this.createMan(" " === t),
    this.createText(t)
  }
  ,
  Haniboi.prototype.createText = function(t) {
    var i;
    return this.tx = this.tx + this.dimensions.text.gapX,
    this.ty = this.ty + this.dimensions.text.gapY,
    i = "♥" === t ? "#ca2626" : "❤" === t ? "#d92b6d" : "#40210f",
    this.text.fillStyle = i,
    this.text.textAlign = "center",
    this.text.beginPath(),
    this.text.webkitImageSmoothingEnabled = !1,
    encodeURIComponent(t).length > 1 ? this.text.font = "900 " + this.dimensions.text.fontSizeZh + "px 'LiHei Pro','微軟正黑體','Microsoft JhengHei'" : this.text.font = "bold " + this.dimensions.text.fontSizeEn + "px 'Conv_ITC Avant Garde Gothic LT Bold', 'Ariel Black', 'Ariel'",
    this.text.fillText(t, this.tx, this.ty),
    this.text.closePath()
  }
  ,
  Haniboi.prototype.createMan = function(t) {
    var i;
    return this.ix = this.ix + this.dimensions.image.gapX,
    this.iy = this.iy + this.dimensions.image.gapY,
    this.people.beginPath(),
    t ? (i = new Image).src = "./materials/000.png" : i = this.randImg(),
    this.people.drawImage(i, this.ix, this.iy, this.dimensions.image.w, this.dimensions.image.h)
  }
  ,
  Haniboi.prototype.watermarking = function() {
    // return this.mark.beginPath(),
    // this.mark.drawImage(this.watermark, 10, 8, 101, 45),
    // this.mark.closePath()
  }
  ,
  Haniboi.prototype.booksWatermarking = function() {
    return this.mark.beginPath(),
    this.mark.drawImage(this.booksWatermark, this.bgCanvas.width - 61 - 10, 8, 61, 48),
    this.mark.closePath()
  }
  ,
  Haniboi.prototype.prepareAndSave = function(t) {
    var i, e, s;
    return null == t && (t = !0),
    this.watermarking(),
    this.bg.save(),
    this.text.save(),
    this.people.save(),
    this.mark.drawImage(this.textCanvas, 0, 0),
    this.people.drawImage(this.markCanvas, 0, 0),
    this.bg.drawImage(this.peopleCanvas, 0, 0),
    s = this.bgCanvas.toDataURL("image/jpg"),
    t ? (this.img.attr("src", s),
    e = $("#output").attr("src"),
    i = navigator.userAgent.match(/(iPad|Android|iPhone|iPod)/g) ? e : e.replace("image/png", "image/octet-stream"),
    $("#download").attr("href", i),
    [].push([])) : void 0
  }
  ,
  Haniboi.prototype.setLang = function(t) {
    var i;
    return i = {
      english: {
        your_message_here: "YOUR MESSAGE HERE",
        background_colors: "BACKGROUND COLORS",
        facebook_cover: "FACEBOOK COVER",
        square: "SQUARE",
        choose_your_team: "CHOOSE YOUR TEAM",
        download_this_pic: "DOWNLOAD THIS PIC",
        or_share_it_on: " or share it on"
      },
      chinese: {
        your_message_here: "寫些想說的話",
        background_colors: "背景顏色",
        facebook_cover: "臉書封面",
        square: "方形",
        choose_your_team: "選擇你的隊伍",
        download_this_pic: "下載圖片",
        or_share_it_on: " or 分享你的圖片到"
      },
      japan: {
        your_message_here: "何か書く",
        background_colors: "背景色",
        facebook_cover: "フェイスブックカバー",
        square: "四角形",
        choose_your_team: "チームを選択してください",
        download_this_pic: "下載圖片",
        or_share_it_on: " or シェア"
      }
    },
    $("[data-lang]").each(function() {
      return $(this).text(i[t][$(this).data("lang")])
    })
  }
  ,
  Haniboi
}(),
jQuery(function() {
  return window.haniboi = new Haniboi,
  // $("#download").click(function() {
  //   return _gaq.push(["_trackEvent", "Download Image", "Clicked", $("textarea").val().length + " words. " + haniboi.size + " size", "Color: " + haniboi.bgChosen])
  // }),
  $("#save").click(function() {
    return "" !== $("textarea").val() ? (haniboi.processWords(),
    haniboi.setBackground(haniboi.bgChosen)) : $("textarea").focus()
  }),
  $("#share").click(function() {
    var t, i;
    return i = {
      method: "feed",
      redirect_uri: "http://upuptoyou.com",
      link: "http://upuptoyou.com",
      picture: "http://upuptoyou.com/images/upup.png",
      name: "UPUP - Haniboi",
      caption: "Haniboi的UPUP舉牌小人生產器",
      description: "製作屬於你的加油小人！"
    },
    t = function(t) {
      return t.post_id ? alert("分享成功 ♥") : void 0
    }
    ,
    FB.ui(i, t)
  }),
  window.val = $("textarea").val(),
  setInterval(function() {
    return $("textarea").is(":focus") && window.val !== $("textarea").val() ? (window.val = $("textarea").val(),
    $("#save").click()) : void 0
  }, 1e3),
  $("[data-color]").each(function(t, i) {
    return $(i).attr("style", "background-color: " + $(i).attr("data-color"))
  }),
  $("[data-bgimg]").each(function(t, i) {
    return $(i).attr("style", "background-image: url('./materials/bg-" + $(i).attr("data-bgimg") + "-square.png')")
  }),
  $("[data-bgimg]").click(function() {
    var t;
    return t = $(this).data("bgimg"),
    haniboi.setBackground(t, !0)
  }),
  $("[data-group]").click(function() {
    var t;
    return t = $(this).data("group"),
    haniboi.setGroup(t),
    $("#save").click()
  }),
  $("[data-size]").click(function() {
    var t;
    return t = $(this).attr("data-size"),
    haniboi.setSize(t)
  }),
  $("[data-color]").click(function() {
    var t;
    return t = $(this).attr("data-color"),
    haniboi.setBackground(t, !0)
  }),
  $("[data-lang-color]").click(function() {
    var t;
    return t = $(this).data("lang-color"),
    $(".main").css("background-color", t),
    $("#corner").css("background-color", t),
    haniboi.setLang($(this).attr("id"))
  }),
  $("#english").click(function() {
    return $("#corner").css("border-left", "6px solid #000").css("left", "-21px")
  }),
  $("#chinese").click(function() {
    return $("#corner").css("border-left", "none").css("left", "79px")
  }),
  $("#japan").click(function() {
    return $("#corner").css("border-left", "none").css("left", "173px")
  })
});
