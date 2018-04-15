<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
      <scroll class="shortcut" ref="shortcut" :data="shortcut" :refreshDelay="refreshDelay">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" v-for="item in hotKey" :key="item.id"
                  @click="addQuery(item.k)">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
            <i class="icon-clear">
            </i>
          </span>
          </h1>
          <search-list :searches="searchHistory" @select="addQuery" @delete="delQuery">
          </search-list>
        </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchWrap">
      <suggest :query="query" @listScroll="blurInput"
               ref="searchRes" @select="saveSearch"
      ></suggest>
    </div>
    <confirm ref="confirm" text="是否清楚所有搜索记录" confirmBtnText="清空"
              @confirm="clearSearchHistory"
    ></confirm>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import Confirm from 'base/confirm/confirm'
import SearchBox from 'base/search-box/search-box'
import SearchList from 'base/search-list/search-list'
import Suggest from 'components/suggest/suggest'
import {getHotKey} from 'api/search'
import {ERR_OK} from 'api/config'
import {playlistMixin, searchMixin} from 'common/js/mixin'
import Scroll from 'base/scroll/scroll'
import {mapActions} from 'vuex'

export default {
  mixins: [playlistMixin, searchMixin],
  created () {
    this._getHotKey()
  },
  computed: {
    shortcut () {
      return this.hotKey.concat(this.searchHistory)
    }
  },
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll
  },
  data () {
    return {
      hotKey: []
    }
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  methods: {
    delQuery(query) {
      this.deleteSearchHistory(query)
    },
    showConfirm () {
      this.$refs.confirm.show()
      // this.clearSearchHistory()
    },
    handlePlayList (playList) {
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.searchWrap.style.bottom = bottom
      this.$refs.searchRes.refresh()
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()
    },
    _getHotKey () {
      getHotKey().then((res) => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    ...mapActions([
      'clearSearchHistory'
    ])
  }
}
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-d
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: absolute
      width: 100%
      top: 178px
      bottom: 0
</style>
