/**
 * 学生信息管理系统
 * 功能：添加、查询、修改、删除学生信息
 * 存储：内存数组
 * 作者：Trae AI Assistant
 */

// 学生信息存储数组
const students = [];

// 学生类定义
class Student {
    constructor(name, id, age, major) {
        this.name = name;
        this.id = id;
        this.age = age;
        this.major = major;
    }

    // 显示学生信息
    displayInfo() {
        return `姓名: ${this.name}, 学号: ${this.id}, 年龄: ${this.age}, 专业: ${this.major}`;
    }
}

// 学生管理系统类
class StudentManager {
    constructor() {
        this.students = students;
    }

    /**
     * 添加学生
     * @param {string} name - 学生姓名
     * @param {string} id - 学号
     * @param {number} age - 年龄
     * @param {string} major - 专业
     * @returns {object} - 操作结果
     */
    addStudent(name, id, age, major) {
        // 参数验证
        if (!name || !id || !age || !major) {
            return { success: false, message: "所有字段都是必填的" };
        }

        if (typeof age !== 'number' || age < 0 || age > 100) {
            return { success: false, message: "年龄必须是0-100之间的数字" };
        }

        // 检查学号是否已存在
        const existingStudent = this.students.find(student => student.id === id);
        if (existingStudent) {
            return { success: false, message: `学号 ${id} 已存在` };
        }

        // 创建新学生并添加到数组
        const newStudent = new Student(name, id, age, major);
        this.students.push(newStudent);
        
        return { 
            success: true, 
            message: `学生 ${name} (学号: ${id}) 添加成功`,
            student: newStudent
        };
    }

    /**
     * 根据学号查询学生
     * @param {string} id - 学号
     * @returns {object} - 查询结果
     */
    findStudentById(id) {
        if (!id) {
            return { success: false, message: "学号不能为空" };
        }

        const student = this.students.find(student => student.id === id);
        if (!student) {
            return { success: false, message: `未找到学号为 ${id} 的学生` };
        }

        return { 
            success: true, 
            message: "查询成功",
            student: student
        };
    }

    /**
     * 根据学号修改学生信息
     * @param {string} id - 学号
     * @param {object} updates - 要更新的字段
     * @returns {object} - 操作结果
     */
    updateStudent(id, updates) {
        if (!id) {
            return { success: false, message: "学号不能为空" };
        }

        const studentIndex = this.students.findIndex(student => student.id === id);
        if (studentIndex === -1) {
            return { success: false, message: `未找到学号为 ${id} 的学生` };
        }

        const student = this.students[studentIndex];
        let updated = false;

        // 更新年龄（如果提供）
        if (updates.age !== undefined) {
            if (typeof updates.age !== 'number' || updates.age < 0 || updates.age > 100) {
                return { success: false, message: "年龄必须是0-100之间的数字" };
            }
            student.age = updates.age;
            updated = true;
        }

        // 更新专业（如果提供）
        if (updates.major !== undefined) {
            if (typeof updates.major !== 'string' || updates.major.trim() === '') {
                return { success: false, message: "专业不能为空" };
            }
            student.major = updates.major;
            updated = true;
        }

        if (!updated) {
            return { success: false, message: "没有提供要更新的字段" };
        }

        return { 
            success: true, 
            message: `学生 ${student.name} 信息更新成功`,
            student: student
        };
    }

    /**
     * 根据学号删除学生
     * @param {string} id - 学号
     * @returns {object} - 操作结果
     */
    deleteStudent(id) {
        if (!id) {
            return { success: false, message: "学号不能为空" };
        }

        const studentIndex = this.students.findIndex(student => student.id === id);
        if (studentIndex === -1) {
            return { success: false, message: `未找到学号为 ${id} 的学生` };
        }

        const deletedStudent = this.students.splice(studentIndex, 1)[0];
        
        return { 
            success: true, 
            message: `学生 ${deletedStudent.name} (学号: ${id}) 删除成功`,
            student: deletedStudent
        };
    }

    /**
     * 获取所有学生
     * @returns {array} - 所有学生列表
     */
    getAllStudents() {
        return {
            success: true,
            message: `共找到 ${this.students.length} 名学生`,
            students: this.students
        };
    }

    /**
     * 显示系统菜单
     */
    showMenu() {
        console.log("\n=== 学生信息管理系统 ===");
        console.log("1. 添加学生");
        console.log("2. 查询学生");
        console.log("3. 修改学生信息");
        console.log("4. 删除学生");
        console.log("5. 显示所有学生");
        console.log("6. 退出系统");
        console.log("======================");
    }
}

// 创建系统实例
const studentManager = new StudentManager();

// 导出供测试使用
module.exports = { StudentManager, Student, studentManager };

// 如果直接运行此文件，启动交互式命令行
if (require.main === module) {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function promptUser() {
        studentManager.showMenu();
        rl.question('\n请选择操作 (1-6): ', (choice) => {
            switch (choice.trim()) {
                case '1':
                    rl.question('请输入学生姓名: ', (name) => {
                        rl.question('请输入学号: ', (id) => {
                            rl.question('请输入年龄: ', (age) => {
                                rl.question('请输入专业: ', (major) => {
                                    const ageNum = parseInt(age);
                                    const result = studentManager.addStudent(name.trim(), id.trim(), ageNum, major.trim());
                                    console.log(result.success ? '\n✅ ' : '\n❌ ', result.message);
                                    if (result.success) {
                                        console.log('学生信息:', result.student.displayInfo());
                                    }
                                    promptUser();
                                });
                            });
                        });
                    });
                    break;

                case '2':
                    rl.question('请输入要查询的学号: ', (id) => {
                        const result = studentManager.findStudentById(id.trim());
                        console.log(result.success ? '\n✅ ' : '\n❌ ', result.message);
                        if (result.success) {
                            console.log('学生信息:', result.student.displayInfo());
                        }
                        promptUser();
                    });
                    break;

                case '3':
                    rl.question('请输入要修改的学号: ', (id) => {
                        rl.question('请输入新的年龄 (不修改请直接回车): ', (age) => {
                            rl.question('请输入新的专业 (不修改请直接回车): ', (major) => {
                                const updates = {};
                                if (age.trim()) updates.age = parseInt(age);
                                if (major.trim()) updates.major = major.trim();
                                
                                const result = studentManager.updateStudent(id.trim(), updates);
                                console.log(result.success ? '\n✅ ' : '\n❌ ', result.message);
                                if (result.success) {
                                    console.log('更新后信息:', result.student.displayInfo());
                                }
                                promptUser();
                            });
                        });
                    });
                    break;

                case '4':
                    rl.question('请输入要删除的学号: ', (id) => {
                        const result = studentManager.deleteStudent(id.trim());
                        console.log(result.success ? '\n✅ ' : '\n❌ ', result.message);
                        if (result.success) {
                            console.log('被删除学生:', result.student.displayInfo());
                        }
                        promptUser();
                    });
                    break;

                case '5':
                    const result = studentManager.getAllStudents();
                    console.log('\n📋 ', result.message);
                    if (result.students.length > 0) {
                        result.students.forEach((student, index) => {
                            console.log(`${index + 1}. ${student.displayInfo()}`);
                        });
                    } else {
                        console.log('暂无学生信息');
                    }
                    promptUser();
                    break;

                case '6':
                    console.log('\n👋 感谢使用学生信息管理系统！');
                    rl.close();
                    break;

                default:
                    console.log('\n❌ 无效选择，请输入1-6之间的数字');
                    promptUser();
                    break;
            }
        });
    }

    console.log('🎓 欢迎使用学生信息管理系统！');
    promptUser();
}