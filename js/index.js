var app = new Vue({
  el: "#player",
  data: {
    // 搜索关键字
    keywords: "",
    // 歌曲数组
    musicList: [],
    // 歌曲地址
    musicUrl: "",
    // 歌曲热评
    hotComments: [],
    // 唱片状态
    isPlaying: false,
    // 遮罩层的显示状态
    isShow: false,
    // mv地址
    mvUrl: ""
  },
  methods: {
    // 歌曲搜索
    searchMusic: function () {
      axios.get("https://autumnfish.cn/search?keywords=" + this.keywords).then(
        response => {
          //console.log(response);
          this.musicList = response.data.result.songs;
        },
        err => { }
      );
    },

    // 歌曲信息获取
    playMusic: function (musicId) {
      // 歌曲地址
      // axios.get("http://music.163.com/song/media/outer/url?id=" + musicId).then(
      //   response => {
      //     console.log(response);
      //     // this.musicUrl = response.data.data[0].url;
      //   },
      //   err => { }
      // );
      this.musicUrl = "http://music.163.com/song/media/outer/url?id=" + musicId + ".mp3";


      // 歌曲热评
      axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(
        response => {
          // console.log(response);
          this.hotComments = response.data.hotComments;
        },
        err => { }
      );
    },

    // 歌曲播放
    play: function () {
      this.isPlaying = true;
    },

    // 歌曲暂停
    pause: function () {
      this.isPlaying = false;
    },

    // 播放mv
    playMV: function (mvid) {
      axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(
        response => {
          //console.log(response);
          this.isShow = true;
          this.musicUrl = "";
          this.mvUrl = response.data.data.url;
        },
        err => { }
      );
    },

    // 隐藏mv
    hideMV: function () {
      this.isShow = false;
      this.isPlaying = false;
      this.mvUrl = "";
    }
  }
});