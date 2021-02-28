const mixins = {
  methods: {
    obj2query(obj = {}) {
      const arr = [];
      Object.keys(obj).forEach(key => {
        key && arr.push(`encodeURIComponent(${key})=encodeURIComponent(${obj[key]})`)
      })
      return arr.join('&');
    }
  }
}
