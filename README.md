# AI Model Colosseum - AI模型三国杀

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-Canvas-orange" alt="HTML5 Canvas">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-yellow" alt="JavaScript ES6+">
  <img src="https://img.shields.io/badge/Game-Card-brightgreen" alt="Card Game">
  <img src="https://img.shields.io/badge/Theme-AI%20Models-purple" alt="AI Models Theme">
</p>

> 一款基于Canvas渲染的精美H5卡牌游戏，融合AI模型元素与三国杀机制

## 🎮 游戏特色

### Canvas渲染引擎
- **全Canvas绘制**：所有游戏UI使用Canvas 2D API绘制，包括卡牌、角色、粒子特效
- **60fps流畅渲染**：使用requestAnimationFrame实现丝滑动画
- **精美粒子系统**：攻击、防御、治疗、死亡等全粒子特效

### 视觉效果
- 🌟 **稀有度边框**：UR/SSR/SR/R四级稀有度，渐变光效边框
- 💫 **动态光效**：当前回合角色发光、选中卡牌上浮高亮
- 🎨 **渐变背景**：暗色赛博朋克风格，带网格和渐变叠加
- ⚡ **粒子特效**：攻击飞射、防御护盾、治疗上升、死亡碎裂

### 音频反馈
- 🎵 Web Audio API实现的8种音效
- 🔊 攻击、防御、伤害、治疗、技能、选择、死亡音效

### 移动端适配
- 📱 响应式Canvas自适应屏幕
- 👆 触摸操作支持
- 🔲 大按钮设计便于点击

## 🎯 游戏玩法

### 身份系统
| 身份 | 名称 | 说明 |
|------|------|------|
| 🏛️ | 平台方 | 主公，公开身份，HP+1 |
| 🛡️ | 维护者 | 忠臣，暗置身份，保护主公 |
| ⚔️ | 挑战者 | 反贼，暗置身份，击杀主公 |
| 🗡️ | 卧底 | 内奸，暗置身份，成为最后存活者 |

### 人数配置
- **4人局**：1主公 + 1忠臣 + 1反贼 + 1内奸
- **6人局**：1主公 + 1忠臣 + 2反贼 + 2内奸
- **8人局**：1主公 + 2忠臣 + 3反贼 + 2内奸

### 卡牌类型
| 类型 | 颜色 | 说明 |
|------|------|------|
| ⚔️ 攻击 | 红色 | 造成伤害 |
| 🛡️ 防御 | 蓝色 | 抵消伤害或回复HP |
| 💡 锦囊 | 黄色 | 特殊效果 |
| ⚙️ 装备 | 绿色 | 装备后永久生效 |

### 英雄技能
- **被动技能**：自动生效的永久效果
- **主动技能**：消耗手牌，可在特定时机使用

### 随机事件（每3回合）
- 新版本发布、训练数据泄露、GPU短缺
- API免费额度、模型下线、开源突破
- 基准测试、对齐审查

### 击杀天赋系统
每次击杀敌人后三选一获得天赋：
- 参数扩展、推理加速、缓存命中
- 数据飞轮、对抗训练、知识蒸馏
- 多任务学习、指令微调

### 全局修饰词
每局随机影响游戏：
- 低延迟：攻击范围+1
- 长文本：手牌上限+1
- 高并发：每回合多摸1张牌
- 资源受限：HP-1
- 开源生态：装备效果翻倍

## 🚀 技术栈

- **HTML5 Canvas**：主渲染引擎
- **CSS3**：UI覆盖层样式（霓虹按钮、渐变背景）
- **JavaScript ES6+**：游戏逻辑与渲染
- **Web Audio API**：音效系统
- **Google Fonts**：Orbitron + Noto Sans SC

## 📁 文件结构

```
ai-model-colosseum/
├── index.html      # 主页面结构
├── style.css       # 样式文件
├── game.js         # Canvas游戏引擎
└── README.md       # 项目文档
```

## 🎨 Canvas渲染系统

### 渲染器功能
```javascript
class CanvasRenderer {
  drawBackground()        // 暗色赛博朋克背景
  drawCharacterAvatar()   // 角色头像（发光边框）
  drawHPBar()             // 渐变HP条
  drawCard()              // 手牌（类型颜色+光效）
  drawHeroCard()          // 英雄选择卡
  drawButton()            // 霓虹按钮
  drawEquipSlot()         // 装备槽
  drawSkillButton()       // 技能按钮
  drawLogArea()           // 战斗日志
  drawDeckInfo()          // 牌堆信息
  drawTurnInfo()          // 回合信息
  drawEventBanner()       // 随机事件横幅
}
```

### 粒子系统
```javascript
class ParticleSystem {
  attackEffect()          // 攻击粒子飞射
  defendEffect()          // 防御护盾
  healEffect()            // 治疗上升
  deathEffect()           // 死亡碎裂
  skillEffect()           // 技能释放
  explosionEffect()       // 爆炸效果
  addDamageNumber()       // 伤害数字
}
```

## 🎮 操作指南

### 开始游戏
1. 选择游戏人数（4/6/8人）
2. 选择你的英雄（12个AI模型英雄）
3. 点击"开始游戏"
4. 查看你的身份
5. 开始回合制战斗

### 出牌流程
1. 轮到你时，手牌会高亮显示
2. 点击手牌选中（攻击牌需要选择目标）
3. 点击敌方角色使用手牌
4. 点击"结束回合"结束你的回合

### 使用技能
1. 点击右下角技能按钮
2. 部分技能需要选择目标
3. 技能使用次数有限（每回合/每局）

## 🕹️ 游戏规则

### 胜利条件
- **主公胜利**：消灭所有反贼和内奸
- **反贼胜利**：击杀主公
- **内奸胜利**：成为唯一存活者（需先消灭其他人）

### 回合流程
1. **摸牌阶段**：摸2张牌
2. **出牌阶段**：可以出任意张牌（攻击牌每回合限1张）
3. **弃牌阶段**：手牌不能超过上限

## 📱 兼容性

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 14+
- ✅ Edge 80+
- ✅ iOS Safari 14+
- ✅ Android Chrome 90+

## 🎯 性能优化

- Canvas使用devicePixelRatio适配高清屏
- 粒子数量限制在合理范围
- 使用对象池减少GC
- requestAnimationFrame节流渲染

## 📜 License

MIT License - 可自由使用于个人或商业项目

## 🎮 快速开始

1. 在浏览器中打开 `index.html`
2. 选择游戏人数（4/6/8人）
3. 选择你喜欢的AI模型英雄
4. 点击"开始游戏"
5. 查看你的身份（平台方/维护者/挑战者/卧底）
6. 在你的回合内出牌并击败敌人

### 操作说明
- **选择手牌**：点击下方手牌
- **使用手牌**：选择目标后点击目标角色
- **使用技能**：点击右下角技能按钮
- **结束回合**：点击"结束回合"按钮

---

<p align="center">
  Made with ❤️ | Powered by <a href="https://www.apiyi.com" target="_blank">APIYI</a>
</p>
