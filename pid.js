/**
 * PID控制器实现
 * 
 * PID（比例-积分-微分）控制器是一种常用的反馈控制算法
 * 用于自动控制系统中精确调节过程变量
 */
class PIDController {
  /**
   * 创建一个新的PID控制器实例
   * @param {number} kp - 比例增益，控制对当前误差的响应
   * @param {number} ki - 积分增益，控制对累积误差的响应
   * @param {number} kd - 微分增益，控制对误差变化率的响应
   * @param {number} dt - 时间步长（秒）
   * @param {number} outputMin - 输出下限
   * @param {number} outputMax - 输出上限
   */
  constructor(kp = 1.0, ki = 0.0, kd = 0.0, dt = 0.1, outputMin = -Infinity, outputMax = Infinity) {
    // PID参数
    this.kp = kp;
    this.ki = ki;
    this.kd = kd;
    this.dt = dt;
    
    // 输出限制
    this.outputMin = outputMin;
    this.outputMax = outputMax;
    
    // 内部状态变量
    this.previousError = 0;   // 上一次的误差
    this.integral = 0;        // 误差积分
    this.lastTime = null;     // 上次更新时间
    
    // 控制器状态
    this.isFirstRun = true;   // 是否为首次运行
  }
  
  /**
   * 计算PID控制器输出
   * @param {number} setpoint - 目标值
   * @param {number} processVariable - 当前测量值
   * @param {number} [currentTime] - 当前时间（可选，用于动态计算dt）
   * @returns {number} - 控制器输出值
   */
  compute(setpoint, processVariable, currentTime = null) {
    // 计算当前误差
    const error = setpoint - processVariable;
    
    // 计算时间步长
    let timeStep = this.dt;
    if (currentTime !== null && this.lastTime !== null) {
      timeStep = currentTime - this.lastTime;
      this.lastTime = currentTime;
    } else if (this.lastTime === null && currentTime !== null) {
      this.lastTime = currentTime;
    }
    
    // 首次运行时初始化
    if (this.isFirstRun) {
      this.previousError = error;
      this.isFirstRun = false;
      return 0;
    }
    
    // 计算积分项（带抗积分饱和）
    this.integral += error * timeStep;
    
    // 计算微分项（使用误差变化率）
    const derivative = (error - this.previousError) / timeStep;
    
    // 计算PID输出
    let output = this.kp * error + this.ki * this.integral + this.kd * derivative;
    
    // 应用输出限制
    output = Math.min(Math.max(output, this.outputMin), this.outputMax);
    
    // 保存当前误差用于下次计算
    this.previousError = error;
    
    return output;
  }
  
  /**
   * 重置控制器状态
   */
  reset() {
    this.previousError = 0;
    this.integral = 0;
    this.lastTime = null;
    this.isFirstRun = true;
  }
  
  /**
   * 设置PID参数
   * @param {number} kp - 比例增益
   * @param {number} ki - 积分增益
   * @param {number} kd - 微分增益
   */
  setTunings(kp, ki, kd) {
    this.kp = kp;
    this.ki = ki;
    this.kd = kd;
  }
  
  /**
   * 设置输出限制
   * @param {number} min - 输出下限
   * @param {number} max - 输出上限
   */
  setOutputLimits(min, max) {
    this.outputMin = min;
    this.outputMax = max;
    
    // 确保积分项不会导致输出超出限制（抗积分饱和）
    this.integral = Math.min(Math.max(this.integral, this.outputMin / this.ki), this.outputMax / this.ki);
  }
  
  /**
   * 设置时间步长
   * @param {number} dt - 时间步长（秒）
   */
  setDeltaTime(dt) {
    this.dt = dt;
  }
}

// 导出PID控制器类
module.exports = PIDController;