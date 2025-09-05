/**
 * PID控制器使用示例 - 温度控制系统模拟
 */

// 导入PID控制器
const PIDController = require('./pid');

/**
 * 模拟温度控制系统
 * 这个简单模型模拟了一个加热系统，其中：
 * - 目标温度是我们想要达到的温度
 * - 当前温度会根据加热器功率和环境因素变化
 * - PID控制器调节加热器功率以达到目标温度
 */
class TemperatureControlSystem {
  constructor(initialTemp = 25, ambientTemp = 22) {
    this.currentTemperature = initialTemp; // 当前温度(°C)
    this.ambientTemperature = ambientTemp; // 环境温度(°C)
    this.heaterPower = 0;                  // 加热器功率(0-100%)
    this.coolingFactor = 0.1;              // 冷却系数
    this.heatingFactor = 0.2;              // 加热系数
  }
  
  // 更新系统状态（模拟物理过程）
  update() {
    // 模拟热量损失（向环境温度靠近）
    const heatLoss = this.coolingFactor * (this.currentTemperature - this.ambientTemperature);
    
    // 模拟加热器产生的热量
    const heatGain = this.heatingFactor * this.heaterPower;
    
    // 更新当前温度
    this.currentTemperature += heatGain - heatLoss;
    
    return this.currentTemperature;
  }
  
  // 设置加热器功率
  setHeaterPower(power) {
    // 限制功率在0-100%范围内
    this.heaterPower = Math.min(Math.max(power, 0), 100);
  }
}

// 创建PID控制器实例
// 参数: Kp, Ki, Kd, dt, outputMin, outputMax
const pid = new PIDController(5, 0.1, 1.0, 1, 0, 100);

// 创建温度控制系统实例
const tempSystem = new TemperatureControlSystem(25, 22);

// 设置目标温度
const targetTemperature = 30; // °C

// 模拟运行100个时间步
const timeSteps = 100;
const results = [];

console.log("时间步\t目标温度\t当前温度\t加热功率");
console.log("------\t--------\t--------\t--------");

for (let step = 0; step < timeSteps; step++) {
  // 获取当前温度
  const currentTemperature = tempSystem.currentTemperature;
  
  // 计算PID控制器输出（加热器功率）
  const heaterPower = pid.compute(targetTemperature, currentTemperature);
  
  // 设置加热器功率
  tempSystem.setHeaterPower(heaterPower);
  
  // 更新系统状态
  tempSystem.update();
  
  // 存储结果
  results.push({
    step,
    targetTemp: targetTemperature,
    currentTemp: currentTemperature,
    heaterPower
  });
  
  // 每10步打印一次状态
  if (step % 10 === 0) {
    console.log(`${step}\t${targetTemperature.toFixed(2)}\t${currentTemperature.toFixed(2)}\t${heaterPower.toFixed(2)}`);
  }
}

// 打印最终状态
const finalStep = timeSteps - 1;
console.log(`${finalStep}\t${targetTemperature.toFixed(2)}\t${tempSystem.currentTemperature.toFixed(2)}\t${results[finalStep].heaterPower.toFixed(2)}`);

console.log("\n温度控制模拟完成！");
console.log(`最终温度: ${tempSystem.currentTemperature.toFixed(2)}°C (目标: ${targetTemperature}°C)`);
console.log(`最终加热功率: ${results[finalStep].heaterPower.toFixed(2)}%`);

// 计算稳定性指标
let sumError = 0;
let sumAbsError = 0;
const stabilizationPoint = Math.floor(timeSteps * 0.7); // 假设后30%的时间步为稳定阶段

for (let i = stabilizationPoint; i < timeSteps; i++) {
  const error = targetTemperature - results[i].currentTemp;
  sumError += error;
  sumAbsError += Math.abs(error);
}

const avgError = sumError / (timeSteps - stabilizationPoint);
const avgAbsError = sumAbsError / (timeSteps - stabilizationPoint);

console.log(`\n稳定阶段平均误差: ${avgError.toFixed(4)}°C`);
console.log(`稳定阶段平均绝对误差: ${avgAbsError.toFixed(4)}°C`);