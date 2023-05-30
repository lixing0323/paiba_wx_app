import MescrollMixin from 'mescroll-uni/mescroll-mixins.js';

export default {
  mixins: [MescrollMixin],
  props: {},
  data() {
    return {
      listQuery: {
        page: 1,
        perPage: 10
      },
      list: [],
      page: {},
      // 上拉加载的配置(可选, 绝大部分情况无需配置)
      upOption: {
        textNoMore: '暂无更多数据',
        noMoreSize: 5,
        empty: {
          icon: require('@/static/icon/mescroll-empty.png'),
          tip: '暂无相关数据'
        },
        toTop: {
          bottom: 220,
          right: 50
        }
      },
      canReset: false
    }
  },
  computed: {},
  created() {},
  methods: {
    resetList() {
      this.canReset && this.mescroll.resetUpScroll() // 重置列表数据为第一页
      this.canReset && this.mescroll.scrollTo(0, 0) // 重置列表数据为第一页时,建议把滚动条也重置到顶部,避免无法再次翻页的问题
      this.canReset = true // 过滤第一次的onShow事件,避免初始化界面时重复触发upCallback, 无需配置auto:false
    },
    initList() {
      this.page = {
        num: 1
      }
      this.listQuery = {
          page: 1,
          perPage: 10
        },
        this.list = []
      this.search()
    },
    setObjectAfterList() {
      const res = {
        items: [''],
        page: {
          totalPages: 1
        }
      }
      this.afterGetList(res)
    },
    processListQuery() {},
    beforeGetList(page = null) {
      if (page) {
        this.listQuery.page = page.num;
      }
      this.processListQuery();
    },
    afterGetList(response = null, page = null) {
      if (response) {
        this.page = page;
        if (page && page.num == 1) {
          this.list = [];
        }

        this.list = this.list.concat(response.items);
        if (this.mescroll) {
          this.mescroll.endByPage(response.items.length, response.page.totalPages);
        }
      }
    },
    getList() {},
    filterSearch() {
      Object.keys(this.listQuery).map(item => {
        if (this['listQuery'][item] === '') {
          this['listQuery'][item] = undefined
        }
      })
    },
    search() {
      this.page.num = 1;
      this.list = [];
      this.filterSearch()
      this.refresh()
    },
    clear(refresh = true) {
      Object.keys(this.listQuery).forEach(el => {
        if (el === 'page') {
          this.listQuery[el] = 1;
        } else if (el !== 'perPage') {
          delete this.listQuery[el];
          delete this.listQuery[el];
        }
      });
      if (refresh) {
        this.page.num = 1;
        this.list = [];
        this.getList(this.page);
      }
    },
    errorList() {
      if (this.mescroll) {
        this.mescroll.endErr();
      }
    },
    refresh() {
      if (this.mescroll) {
        this.mescroll.resetUpScroll();
      }
    },
    endList() {
      this.mescroll.endByPage(0, 0);
    },
    //点击空布局按钮的回调
    emptyClick() {}
  }
}