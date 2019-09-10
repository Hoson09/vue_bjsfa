<template>
  <div class="progress-pie">
    <div class="label">{{ val }}<span v-if="percent">%</span></div>
    <div id="pie" ref="pie_wrap"></div>
    <h3>{{ title }}</h3>
  </div>
</template>
<script>
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入饼状图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
export default {
  name: 'progress-pie',
  data() {
    return {};
  },
  props: {
    title: {
      required: true,
      type: String
    },
    val: {
      type: Number,
      required: true
    },
    percent: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  watch: {
    //监控当val发生变化的时候，可以及时变换数值。
    val: function() {
      this.initCircle();
    }
  },
  mounted() {
    this.initCircle();
  },
  methods: {
    initCircle() {
      //处理echarts图的data
      let data = [];
      if (this.percent) {
        data.push({ value: this.val, name: '' });
        data.push({ value: 100 - this.val, name: '' });
      } else {
        data.push({ value: 0, name: '' });
        data.push({ value: 100, name: '' });
      }
      // 基于准备好的dom，初始化echarts实例 (必须设置好大小，否则无法显示)
      let myChart = echarts.init(this.$refs.pie_wrap); //给dom元素设置ref就是在这里使用的。然后就可以在这里使用Vue对象调用dom元素了。
      // 绘制图表
      let option = {
        color: ['rgb(23, 129, 47)', 'rgb(223,223,223)'],
        series: [
          {
            name: this.title,
            type: 'pie',
            radius: ['80%', '85%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>
<style scoped lang="scss">
@mixin hwdata() {
  width: px2rem(175);
  height: px2rem(175);
}
.progress-pie {
  position: relative;
  color: #000;
  #pie {
    @include hwdata();
  }
  .label {
    position: absolute;
    @include hwdata();
    top: 0;
    left: 0;
    text-align: center;
    line-height: px2rem(175);
    font-size: $text-size-biggest;
    span {
      vertical-align: super;
      font-size: $text-size-bot;
    }
  }
  h3 {
    text-align: center;
    font-size: $text-size-mid;
    line-height: $text-size-mid;
    padding: px2rem(28) 0 px2rem(52);
  }
}
</style>
