/**
 * 筛选数组中大于10的数字
 * @param {number[]} numbers - 输入的数字数组
 * @returns {number[]} - 筛选后的数组
 */
function filterGreaterThanTen(numbers) {
  // 使用filter方法筛选出大于10的数字
  return numbers.filter(num => num > 10);
}

// 示例数组
const numbersArray = [5, 12, 8, 15, 3, 20];

// 筛选大于10的数字
const filteredNumbers = filterGreaterThanTen(numbersArray);

// 输出原始数组和筛选结果
console.log('原始数组:', numbersArray);
console.log('筛选后的数组 (大于10的数字):', filteredNumbers);