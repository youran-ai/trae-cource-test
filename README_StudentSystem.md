# 🎓 学生信息管理系统

一个基于Node.js的简单学生信息管理系统，使用内存数组存储数据。

## 📋 功能特点

- ✅ **添加学生**：录入学生基本信息（姓名、学号、年龄、专业）
- ✅ **查询学生**：根据学号快速查找学生信息
- ✅ **修改信息**：更新学生的年龄和专业信息
- ✅ **删除学生**：根据学号删除学生记录
- ✅ **查看全部**：显示所有学生信息列表
- ✅ **数据验证**：完整的输入验证和错误处理

## 🚀 快速开始

### 方式1：交互式命令行
```bash
node studentSystem.js
```

### 方式2：自动化测试
```bash
node testStudentSystem.js
```

## 📁 文件说明

| 文件名 | 功能描述 |
|--------|----------|
| `studentSystem.js` | 主系统文件，包含完整功能 |
| `testStudentSystem.js` | 自动化测试脚本 |
| `README_StudentSystem.md` | 使用说明文档 |

## 🎯 使用示例

### 1. 添加学生
```javascript
const manager = new StudentManager();
const result = manager.addStudent('张三', '2024001', 20, '计算机科学');
console.log(result.message); // "学生 张三 (学号: 2024001) 添加成功"
```

### 2. 查询学生
```javascript
const result = manager.findStudentById('2024001');
if (result.success) {
    console.log(result.student.displayInfo());
    // "姓名: 张三, 学号: 2024001, 年龄: 20, 专业: 计算机科学"
}
```

### 3. 修改学生信息
```javascript
const result = manager.updateStudent('2024001', { age: 21, major: '数据科学' });
console.log(result.message); // "学生 张三 信息更新成功"
```

### 4. 删除学生
```javascript
const result = manager.deleteStudent('2024001');
console.log(result.message); // "学生 张三 (学号: 2024001) 删除成功"
```

## 🔧 技术特点

- **纯Node.js实现**：无需额外依赖
- **内存存储**：使用数组存储学生信息
- **面向对象设计**：清晰的类结构
- **完整错误处理**：友好的错误提示
- **输入验证**：防止无效数据
- **模块化设计**：可复用的代码结构

## 📊 数据验证规则

| 字段 | 验证规则 |
|------|----------|
| 姓名 | 必填，非空字符串 |
| 学号 | 必填，唯一标识 |
| 年龄 | 必填，0-100之间的数字 |
| 专业 | 必填，非空字符串 |

## 🎮 交互式操作指南

1. **启动系统**：运行 `node studentSystem.js`
2. **选择功能**：输入对应数字选择操作
3. **按提示输入**：根据系统提示输入相关信息
4. **查看结果**：系统会显示操作结果

## 📝 开发说明

### 类结构
- `Student`：学生类，包含基本信息和显示方法
- `StudentManager`：管理类，包含所有CRUD操作

### 错误处理
- 重复学号检测
- 年龄范围验证
- 必填字段检查
- 学号存在性验证

## 🔄 扩展建议

- 添加数据持久化（文件存储）
- 增加更多查询条件（按姓名、专业等）
- 添加成绩管理功能
- 实现分页查询
- 添加用户认证系统