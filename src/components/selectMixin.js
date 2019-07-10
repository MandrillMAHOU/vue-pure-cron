export default {
  data() {
    return {
      curSelect: '',
    };
  },
  methods: {
    onSelectChange(val) {
      this.curSelect = val;
    }
  }
};
