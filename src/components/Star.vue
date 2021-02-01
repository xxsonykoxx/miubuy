<script>
export default {
  name: 'MyRate',
  props: {
    score: {
      type: Number,
      default: 0,
      // required: true
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showText: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      curScore: '',
      width: '',
    };
  },
  created() {
    this.getDecimal();
  },
  methods: {
    getClass(i) {
      if (this.curScore === '') {
        return i <= this.score ? 'icon-star' : 'icon-star-o';
      }
      return i <= this.curScore ? 'icon-star' : 'icon-star-o';
    },
    getDecimal() {
      this.width = `${Number(this.score * 100 - Math.floor(this.score) * 100)}%`;
    },
    setScore(i) {
      this.$emit('update:score', i);// 使用`.sync`修饰符，对score 进行“双向绑定
    },
  },
};
</script>
