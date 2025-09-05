/**
 * 排序算法函数，将数组按照从小到大排列
 * @param {number[]} arr - 需要排序的数组
 * @returns {number[]} - 排序后的数组
 */
function sortArray(arr) {
  // 创建数组副本，避免修改原数组
  const result = [...arr];
  
  // 使用冒泡排序算法
  for (let i = 0; i < result.length - 1; i++) {
    for (let j = 0; j < result.length - 1 - i; j++) {
      // 如果当前元素大于下一个元素，交换它们
      if (result[j] > result[j + 1]) {
        const temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
      }
    }
  }
  
  return result;
}

// 示例：排序数组 [50, 30, 35, 20]
const numbers = [50, 30, 35, 20];
const sortedNumbers = sortArray(numbers);

// 输出结果
console.log("原始数组:", numbers);
console.log("排序后数组:", sortedNumbers);