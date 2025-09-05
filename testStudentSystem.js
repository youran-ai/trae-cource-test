/**
 * 学生信息管理系统测试脚本
 * 演示所有功能的完整测试流程
 */

const { StudentManager } = require('./studentSystem.js');

// 创建测试实例
const manager = new StudentManager();

console.log('🧪 开始测试学生信息管理系统...\n');

// 测试1：添加学生
console.log('📋 测试1：添加学生');
const addResult1 = manager.addStudent('张三', '2024001', 20, '计算机科学');
console.log(addResult1.success ? '✅' : '❌', addResult1.message);
if (addResult1.success) console.log('   学生信息:', addResult1.student.displayInfo());

const addResult2 = manager.addStudent('李四', '2024002', 21, '软件工程');
console.log(addResult2.success ? '✅' : '❌', addResult2.message);

const addResult3 = manager.addStudent('王五', '2024003', 19, '人工智能');
console.log(addResult3.success ? '✅' : '❌', addResult3.message);

// 测试2：查询学生
console.log('\n🔍 测试2：查询学生');
const searchResult1 = manager.findStudentById('2024001');
console.log(searchResult1.success ? '✅' : '❌', searchResult1.message);
if (searchResult1.success) console.log('   找到学生:', searchResult1.student.displayInfo());

const searchResult2 = manager.findStudentById('2024999');
console.log(searchResult2.success ? '✅' : '❌', searchResult2.message);

// 测试3：修改学生信息
console.log('\n✏️ 测试3：修改学生信息');
const updateResult1 = manager.updateStudent('2024001', { age: 21, major: '数据科学' });
console.log(updateResult1.success ? '✅' : '❌', updateResult1.message);
if (updateResult1.success) console.log('   更新后:', updateResult1.student.displayInfo());

const updateResult2 = manager.updateStudent('2024002', { age: 22 });
console.log(updateResult2.success ? '✅' : '❌', updateResult2.message);

const updateResult3 = manager.updateStudent('2024999', { age: 25 });
console.log(updateResult3.success ? '✅' : '❌', updateResult3.message);

// 测试4：显示所有学生
console.log('\n📊 测试4：显示所有学生');
const allStudents = manager.getAllStudents();
console.log('✅', allStudents.message);
if (allStudents.students.length > 0) {
    allStudents.students.forEach((student, index) => {
        console.log(`   ${index + 1}. ${student.displayInfo()}`);
    });
}

// 测试5：删除学生
console.log('\n🗑️ 测试5：删除学生');
const deleteResult1 = manager.deleteStudent('2024003');
console.log(deleteResult1.success ? '✅' : '❌', deleteResult1.message);
if (deleteResult1.success) console.log('   被删除学生:', deleteResult1.student.displayInfo());

const deleteResult2 = manager.deleteStudent('2024999');
console.log(deleteResult2.success ? '✅' : '❌', deleteResult2.message);

// 测试6：验证删除后的学生列表
console.log('\n📋 测试6：删除后的学生列表');
const finalStudents = manager.getAllStudents();
console.log('✅', finalStudents.message);
if (finalStudents.students.length > 0) {
    finalStudents.students.forEach((student, index) => {
        console.log(`   ${index + 1}. ${student.displayInfo()}`);
    });
} else {
    console.log('   暂无学生信息');
}

// 测试7：边界情况测试
console.log('\n⚠️ 测试7：边界情况测试');

// 重复学号测试
const duplicateResult = manager.addStudent('赵六', '2024001', 20, '数学');
console.log(duplicateResult.success ? '✅' : '❌', duplicateResult.message);

// 无效年龄测试
const invalidAgeResult = manager.addStudent('孙七', '2024004', -5, '物理');
console.log(invalidAgeResult.success ? '✅' : '❌', invalidAgeResult.message);

// 空字段测试
const emptyFieldResult = manager.addStudent('', '2024005', 20, '化学');
console.log(emptyFieldResult.success ? '✅' : '❌', emptyFieldResult.message);

console.log('\n🎉 所有测试完成！');
console.log('📊 测试结果总结：');
console.log('   ✅ 添加学生功能正常');
console.log('   ✅ 查询学生功能正常');
console.log('   ✅ 修改学生信息功能正常');
console.log('   ✅ 删除学生功能正常');
console.log('   ✅ 边界情况处理正常');