/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  if (s1.length > s2.length) return false;

  // 处理 s1
  const s1Length = s1.length;
  let s1Hash = {};
  for (let i = 0; i < s1Length; i++) {
    const element = s1[i];
    s1Hash[element] = s1Hash[element] ? s1Hash[element] + 1 : 1;
  }


  const buffer = {};          // 哈希表缓存
  let firstElement = null;    // 第一个要删除的元素

  // 开始遍历 s2
  for (let i = 0, len = s2.length - s1.length + 1; i < len; i++) {
    let flag = true;
    let item = s2.substr(i, s1Length);
    const itemLen = item.length;

    if (i !== 0) {
      // 减掉上一次循环的第一个字母
      if (buffer[firstElement] === 1) {
        delete buffer[firstElement]; // 如果只剩一个了就删除
      } else {
        buffer[firstElement] -= 1;
      }

      firstElement = item[0]; // 下一次开始时要删除当前的第一个
      let nextElement = item[itemLen - 1];    // 下一个要添加的元素
      buffer[nextElement] = buffer[nextElement] ? buffer[nextElement] + 1 : 1;

      inner1: for (let key in s1Hash) {
        if (!buffer[key] || buffer[key] !== s1Hash[key]) {
          flag = false;
          item = null;
          break inner1; // 提前终止
        }
      }
      if (flag) return true;

    } else { // 第一次特殊处理
      firstElement = item[0];

      // 初始化哈希表缓存
      for (let j = 0; j < itemLen; j++) {
        const element = item[j];
        buffer[element] = buffer[element] ? buffer[element] + 1 : 1;
      }

      inner2: for (let key in s1Hash) {
        if (!buffer[key] || buffer[key] !== s1Hash[key]) {
          flag = false;
          item = null;
          break inner2; // 提前终止
        }
      }
      if (flag) return true;
    }

  }

  return flag;
};
