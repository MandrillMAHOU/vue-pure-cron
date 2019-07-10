const utils = {};

utils.install = (Vue) => {
  Vue.mixin({
    methods: {
      limitNum(number, min, max) {
        let res = Number(number);
        if (res || res === 0) {
          if (res < min) {
            res = min;
          }
          if (res > max) {
            res = max;
          }
          return res;
        }
        return min;
      },
      sortSpecifiedValues(str, min, max) {
        if (str) {
          const arr = str.split(',');
          const set = new Set();
          for (let i = 0; i < arr.length; i += 1) {
            arr[i] = arr[i].replace(/\s*/g, '');
            if (arr[i] && Number(arr[i])) {
              arr[i] = Number(arr[i]);
              arr[i] = this.limitNum(arr[i], min, max);
            }
            if (typeof arr[i] === 'number') {
              set.add(arr[i]);
            }
          }
          const res = [];
          set.forEach((item) => {
            res.push(item);
          });
          res.sort((a, b) => (a - b));
          return res.join(',');
        }
        return str;
      }
    }
  });
};

export default utils;
