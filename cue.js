// 原代码
/**
 * 根据ID获取用户信息
 * @param id 用户ID
 * @param users 用户列表
 * @returns {User} 用户对象
 */
async function getUserById(id, users) {
    // ...函数实现
    //根据邮箱获取用户
    const user = users.find((user) => user.email === id);
    return user;
}
/**
 * 根据邮箱获取用户信息
 * @param email 用户邮箱
 * @param users 用户列表
 * @returns {User} 用户对象
 */
async function getUserByEmail(email, users) {
    // ...函数实现
    //根据邮箱获取用户
    const user = users.find((user) => user.email === email);
    return user;
}