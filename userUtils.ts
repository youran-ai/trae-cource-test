interface User {
    id: string;
    name: string;
    age: number;
}
/**
 * 根据用户邮箱获取用户信息
 * @param email 用户邮箱
 * @param users 用户列表
 * @returns {User | undefined} 用户对象
 */
async function getUserById(id: string, users: User[]): Promise<User> {
    return users.find(user => user.id === id);
}
// 根据用户名获取用户信息
function getUserByName(name: string, users: User[]): User | undefined {
    return users.find(user => user.name === name);
}