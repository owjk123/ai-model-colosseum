// ===== AI Model Colosseum - Canvas Game Engine =====

// ===== Game Data (Same as original) =====
const HEROES = [
  { id: 'deepseek-v4', name: 'DeepSeek V4', title: '性价比之王', hp: 4, maxHp: 4, color: '#4a9eff', rarity: 'SSR', passive: { name: '碾压低价', desc: '每回合第一次出推理攻击时，伤害+1' }, active: { name: '成本优化', desc: '弃1张手牌，摸2张牌（每回合1次）', cost: 1, draw: 2, perTurn: 1 }, emoji: '🔥' },
  { id: 'deepseek-v3.2', name: 'DeepSeek V3.2', title: '推理大师', hp: 3, maxHp: 3, color: '#3d8bff', rarity: 'SSR', passive: { name: '链式思维', desc: '每回合可出2张推理攻击（而非1张）' }, active: { name: '深度推理', desc: '弃2张手牌，对任意1人造成2点伤害（每局3次）', cost: 2, damage: 2, perGame: 3 }, emoji: '🏆' },
  { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', title: '均衡战士', hp: 4, maxHp: 4, color: '#d4a574', rarity: 'SSR', passive: { name: '完美平衡', desc: '手牌上限+1，摸牌阶段多摸1张' }, active: { name: '优雅应对', desc: '将1张手牌当自我辩护使用（每回合1次）', cost: 1, perTurn: 1 }, emoji: '👑' },
  { id: 'claude-opus-4.5', name: 'Claude Opus 4.5', title: '编码之神', hp: 3, maxHp: 3, color: '#c49a6c', rarity: 'UR', passive: { name: 'SWE之王', desc: '装备攻击武器后，推理攻击伤害+1' }, active: { name: '重构代码', desc: '弃2张手牌，令1名角色弃掉所有装备（每局2次）', cost: 2, perGame: 2 }, emoji: '💎' },
  { id: 'gpt-4o-mini', name: 'GPT-4o-mini', title: '闪电刺客', hp: 3, maxHp: 3, color: '#10a37f', rarity: 'SR', passive: { name: '极速响应', desc: '被推理攻击时，50%概率自动闪避' }, active: { name: '快速迭代', desc: '摸1张牌，本回合可额外出1张推理攻击（每回合1次）', draw: 1, perTurn: 1 }, emoji: '⚡' },
  { id: 'gpt-5.4', name: 'GPT-5.4', title: '全能之神', hp: 4, maxHp: 4, color: '#0fa37f', rarity: 'UR', passive: { name: '全能理解', desc: '可以将任意手牌当任意基本牌使用' }, active: { name: '超级推理', desc: '弃3张牌，指定1名角色直接扣2HP（每局2次）', cost: 3, perGame: 2 }, emoji: '🧠' },
  { id: 'gemini-3-pro', name: 'Gemini 3 Pro', title: '千维智者', hp: 4, maxHp: 4, color: '#4285f4', rarity: 'SSR', passive: { name: '百万上下文', desc: '手牌上限为HP+3（而非HP值）' }, active: { name: '多模态感知', desc: '查看任意1名角色的所有手牌和身份（每局1次）', perGame: 1 }, emoji: '🌍' },
  { id: 'qwen-3.5-plus', name: 'Qwen 3.5-Plus', title: '百语术士', hp: 4, maxHp: 4, color: '#ff6a00', rarity: 'SSR', passive: { name: '201语言', desc: '出牌阶段可出2张锦囊牌（而非1张）' }, active: { name: '语言风暴', desc: '弃1张牌，随机获取牌堆中1张锦囊牌（每回合1次）', cost: 1, perTurn: 1 }, emoji: '🚀' },
  { id: 'glm-5', name: 'GLM-5', title: '开源巨兽', hp: 5, maxHp: 5, color: '#3b82f6', rarity: 'SSR', passive: { name: '开源之力', desc: 'HP上限5，受到致命伤害时有30%概率保留1HP' }, active: { name: '744B觉醒', desc: '弃2张牌，本回合推理攻击伤害翻倍（每局2次）', cost: 2, perGame: 2 }, emoji: '🐘' },
  { id: 'grok-4', name: 'Grok 4', title: '叛逆浪客', hp: 3, maxHp: 3, color: '#1da1f2', rarity: 'SR', passive: { name: '全网搜索', desc: '摸牌阶段多摸1张牌' }, active: { name: '真相揭露', desc: '弃1张牌，查看1名角色身份并强制其弃1张牌（每局2次）', cost: 1, perGame: 2 }, emoji: '🐦' },
  { id: 'kimi-k2.5', name: 'Kimi K2.5', title: '暗夜猎手', hp: 3, maxHp: 3, color: '#8b5cf6', rarity: 'SR', passive: { name: 'MoE潜行', desc: '攻击范围不限（可攻击任何人）' }, active: { name: '暗影突袭', desc: '弃1张牌，对任意角色造成1点伤害，不可闪避（每局3次）', cost: 1, perGame: 3 }, emoji: '🌙' },
  { id: 'llama-4', name: 'Llama 4', title: '开源游侠', hp: 4, maxHp: 4, color: '#7c3aed', rarity: 'R', passive: { name: '开源社区', desc: '每次有人使用开源运动牌时，你额外回复1HP' }, active: { name: '社区支援', desc: '弃1张牌，令1名濒死角色回复1HP（每回合1次）', cost: 1, perTurn: 1 }, emoji: '🦙' }
];

const IDENTITIES = {
  MASTER: { id: 'master', name: '平台方', class: 'identity-master', desc: '主公，公开身份，HP+1', isPublic: true },
  LOYALIST: { id: 'loyalist', name: '维护者', class: 'identity-loyalist', desc: '忠臣，暗置身份，保护主公' },
  REBEL: { id: 'rebel', name: '挑战者', class: 'identity-rebel', desc: '反贼，暗置身份，击杀主公' },
  TRAITOR: { id: 'traitor', name: '卧底', class: 'identity-traitor', desc: '内奸，暗置身份，成为最后存活者' }
};

const CARD_DEFS = {
  '推理攻击': { type: 'attack', emoji: '⚔️', name: '推理攻击', desc: '对范围内1人造成1点伤害，每回合限出1张', canTarget: true, targetCount: 1, range: 1 },
  '自我辩护': { type: 'defend', emoji: '🛡️', name: '自我辩护', desc: '抵消1次推理攻击' },
  '模型更新': { type: 'defend', emoji: '💚', name: '模型更新', desc: '回复1点HP，或濒死时自救' },
  'API限流': { type: 'trick', emoji: '🚫', name: 'API限流', desc: '弃掉目标1张手牌', canTarget: true, targetCount: 1, range: 1 },
  '参数泄露': { type: 'trick', emoji: '📤', name: '参数泄露', desc: '获取目标1张手牌', canTarget: true, targetCount: 1, range: 1 },
  '全网评测': { type: 'trick', emoji: '💥', name: '全网评测', desc: '对所有其他角色造成1点伤害' },
  '紧急补丁': { type: 'trick', emoji: '🔧', name: '紧急补丁', desc: '抵消1张锦囊牌' },
  '开源运动': { type: 'trick', emoji: '🤝', name: '开源运动', desc: '所有角色回复1HP' },
  '数据投毒': { type: 'trick', emoji: '☠️', name: '数据投毒', desc: '与目标轮流出推理攻击，先不出的受1伤害', canTarget: true, targetCount: 1, range: 1 },
  '推理链': { type: 'trick', emoji: '🔗', name: '推理链', desc: '摸2张牌' },
  '模型蒸馏': { type: 'trick', emoji: '🎭', name: '模型蒸馏', desc: '令目标对另一目标出推理攻击', canTarget: true, targetCount: 1, range: 1 }
};

const EQUIP_DEFS = {
  'GPU集群': { type: 'equip', subtype: 'weapon', emoji: '🖥️', name: 'GPU集群', desc: '攻击范围+1' },
  'TPU阵列': { type: 'equip', subtype: 'weapon', emoji: '⚡', name: 'TPU阵列', desc: '攻击范围+1' },
  'RLHF护盾': { type: 'equip', subtype: 'armor', emoji: '🛡️', name: 'RLHF护盾', desc: '需2张攻击才受伤' },
  '对齐训练': { type: 'equip', subtype: 'armor', emoji: '⚖️', name: '对齐训练', desc: '需2张攻击才受伤' },
  '128K上下文': { type: 'equip', subtype: 'assist', emoji: '📜', name: '128K上下文', desc: '手牌上限+2' },
  '多模态接口': { type: 'equip', subtype: 'assist', emoji: '🔮', name: '多模态接口', desc: '摸牌+1' }
};

const RANDOM_EVENTS = [
  { name: '新版本发布', desc: '所有人摸2张牌' },
  { name: '训练数据泄露', desc: '所有人随机弃1张牌' },
  { name: 'GPU短缺', desc: '下回合所有人摸牌-1' },
  { name: 'API免费额度', desc: '所有人回复1HP' },
  { name: '模型下线', desc: '随机1名角色扣2HP' },
  { name: '开源突破', desc: '所有人获得1张随机装备牌' },
  { name: '基准测试', desc: '攻击牌最多的人摸2张' },
  { name: '对齐审查', desc: '所有锦囊牌本回合无效' }
];

const ROGUELIKE_REWARDS = [
  { id: 'param-expand', name: '参数扩展', desc: 'HP上限+1，回复1HP' },
  { id: '推理加速', name: '推理加速', desc: '每回合可多出1张推理攻击' },
  { id: 'cache-hit', name: '缓存命中', desc: '摸牌阶段多摸1张' },
  { id: 'data-flywheel', name: '数据飞轮', desc: '每次造成伤害摸1张牌' },
  { id: 'adversarial', name: '对抗训练', desc: '受到伤害时50%概率反弹1点' },
  { id: 'knowledge-distill', name: '知识蒸馏', desc: '可查看攻击你的人的手牌' },
  { id: 'multi-task', name: '多任务学习', desc: '手牌上限+2' },
  { id: 'sft', name: '指令微调', desc: '将1张手牌变为任意基本牌（每回合1次）' }
];

const GLOBAL_MODIFIERS = [
  { id: 'low-latency', name: '低延迟', desc: '攻击范围+1' },
  { id: 'long-text', name: '长文本', desc: '手牌上限+1' },
  { id: 'high-concurrency', name: '高并发', desc: '每回合多摸1张牌' },
  { id: 'resource-limited', name: '资源受限', desc: 'HP-1' },
  { id: 'open-source', name: '开源生态', desc: '装备效果翻倍' }
];

// ===== Utility Functions =====
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getHandLimit(char) {
  if (!game) return char.maxHp;
  let limit = char.maxHp;
  if (char.hero.id === 'gemini-3-pro') limit = char.hp + 3;
  if (char.hero.id === 'claude-3.5-sonnet') limit += 1;
  if (char.equips.assist && char.equips.assist.name === '128K上下文') limit += game.equipDouble ? 4 : 2;
  if (char.handLimitBonus) limit += char.handLimitBonus;
  if (game.allHandLimitBonus) limit += game.allHandLimitBonus;
  return limit;
}

// ===== Polyfills =====
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (typeof r === 'number') r = [r, r, r, r];
    const [tl, tr, br, bl] = r;
    this.moveTo(x + tl, y);
    this.lineTo(x + w - tr, y);
    this.quadraticCurveTo(x + w, y, x + w, y + tr);
    this.lineTo(x + w, y + h - br);
    this.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
    this.lineTo(x + bl, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - bl);
    this.lineTo(x, y + tl);
    this.quadraticCurveTo(x, y, x + tl, y);
    this.closePath();
  };
}

// ===== Audio System =====
const AudioSystem = {
  ctx: null,
  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) { console.log('Web Audio not supported'); }
  },
  play(type) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      const now = this.ctx.currentTime;
      switch(type) {
        case 'attack':
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
          osc.start(now);
          osc.stop(now + 0.15);
          break;
        case 'defend':
          osc.frequency.setValueAtTime(1200, now);
          osc.frequency.setValueAtTime(1500, now + 0.1);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.2);
          break;
        case 'damage':
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(150, now);
          osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
          osc.start(now);
          osc.stop(now + 0.25);
          break;
        case 'heal':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(400, now);
          osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.2);
          break;
        case 'skill':
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(300, now);
          osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
          osc.start(now);
          osc.stop(now + 0.35);
          break;
        case 'select':
          osc.frequency.setValueAtTime(600, now);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
          osc.start(now);
          osc.stop(now + 0.08);
          break;
        case 'death':
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(400, now);
          osc.frequency.exponentialRampToValueAtTime(50, now + 0.5);
          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
          osc.start(now);
          osc.stop(now + 0.6);
          break;
      }
    } catch(e) {}
  }
};

// ===== Particle System =====
class Particle {
  constructor(x, y, config = {}) {
    this.x = x;
    this.y = y;
    this.vx = config.vx || (Math.random() - 0.5) * 4;
    this.vy = config.vy || (Math.random() - 0.5) * 4;
    this.life = config.life || 60;
    this.maxLife = this.life;
    this.size = config.size || 4;
    this.color = config.color || '#ffffff';
    this.gravity = config.gravity || 0;
    this.friction = config.friction || 0.98;
    this.type = config.type || 'circle';
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.life--;
    return this.life > 0;
  }
  
  draw(ctx) {
    const alpha = this.life / this.maxLife;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    if (this.type === 'circle') {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * alpha, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'star') {
      this.drawStar(ctx, this.x, this.y, 5, this.size * alpha, this.size * alpha * 0.5);
    } else {
      ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
    }
    ctx.globalAlpha = 1;
  }
  
  drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
      rot += step;
      ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
      rot += step;
    }
    ctx.closePath();
    ctx.fill();
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
    this.damageNumbers = [];
    this.floatingTexts = [];
  }
  
  clear() {
    this.particles = [];
    this.damageNumbers = [];
    this.floatingTexts = [];
  }
  
  addParticle(p) {
    this.particles.push(new Particle(p.x, p.y, p));
  }
  
  attackEffect(fromX, fromY, toX, toY, color1 = '#ff3366', color2 = '#ff6600') {
    const count = 20;
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const x = fromX + (toX - fromX) * t;
      const y = fromY + (toY - fromY) * t + Math.sin(t * Math.PI) * -50;
      this.addParticle({
        x: x + (Math.random() - 0.5) * 30,
        y: y + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        size: 3 + Math.random() * 4,
        color: Math.random() > 0.5 ? color1 : color2,
        life: 30 + Math.random() * 20,
        gravity: 0.1
      });
    }
    // Trail particles
    for (let i = 0; i < 8; i++) {
      this.addParticle({
        x: fromX,
        y: fromY,
        vx: (toX - fromX) / 15 + (Math.random() - 0.5) * 2,
        vy: (toY - fromY) / 15 + (Math.random() - 0.5) * 2,
        size: 5 + Math.random() * 3,
        color: '#ffffff',
        life: 20,
        friction: 0.95
      });
    }
  }
  
  defendEffect(x, y) {
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      this.addParticle({
        x: x,
        y: y,
        vx: Math.cos(angle) * 3,
        vy: Math.sin(angle) * 3,
        size: 4,
        color: '#00f0ff',
        life: 25,
        friction: 0.96
      });
    }
  }
  
  healEffect(x, y) {
    for (let i = 0; i < 15; i++) {
      this.addParticle({
        x: x + (Math.random() - 0.5) * 40,
        y: y,
        vx: (Math.random() - 0.5) * 2,
        vy: -2 - Math.random() * 2,
        size: 3 + Math.random() * 3,
        color: '#00ff88',
        life: 40,
        gravity: -0.05
      });
    }
  }
  
  deathEffect(x, y) {
    for (let i = 0; i < 30; i++) {
      this.addParticle({
        x: x + (Math.random() - 0.5) * 60,
        y: y + (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        size: 4 + Math.random() * 6,
        color: Math.random() > 0.5 ? '#ff3366' : '#666666',
        life: 50 + Math.random() * 30,
        gravity: 0.15
      });
    }
  }
  
  skillEffect(x, y, type = 'magic') {
    const colors = {
      magic: ['#b000ff', '#ff00ff', '#ffffff'],
      fire: ['#ff6600', '#ff3300', '#ffff00'],
      ice: ['#00ffff', '#0088ff', '#ffffff'],
      thunder: ['#ffff00', '#ff00ff', '#ffffff']
    };
    const palette = colors[type] || colors.magic;
    for (let i = 0; i < 25; i++) {
      this.addParticle({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        size: 3 + Math.random() * 5,
        color: palette[Math.floor(Math.random() * palette.length)],
        life: 35,
        friction: 0.94,
        type: Math.random() > 0.7 ? 'star' : 'circle'
      });
    }
  }
  
  explosionEffect(x, y, color = '#ff3366') {
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2;
      const speed = 3 + Math.random() * 4;
      this.addParticle({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 4 + Math.random() * 4,
        color: color,
        life: 40,
        friction: 0.95
      });
    }
  }
  
  addDamageNumber(x, y, value, type = 'damage') {
    this.damageNumbers.push({
      x, y,
      value: type === 'heal' ? `+${value}` : `-${value}`,
      life: 60,
      maxLife: 60,
      type
    });
  }
  
  addFloatingText(x, y, text, color = '#ffffff') {
    this.floatingTexts.push({
      x, y,
      text,
      color,
      life: 90,
      maxLife: 90
    });
  }
  
  update() {
    this.particles = this.particles.filter(p => p.update());
    this.damageNumbers = this.damageNumbers.filter(d => {
      d.life--;
      d.y -= 1.5;
      return d.life > 0;
    });
    this.floatingTexts = this.floatingTexts.filter(t => {
      t.life--;
      t.y -= 1;
      return t.life > 0;
    });
  }
  
  draw(ctx) {
    this.particles.forEach(p => p.draw(ctx));
    
    this.damageNumbers.forEach(d => {
      const alpha = d.life / d.maxLife;
      const scale = 1 + (1 - alpha) * 0.3;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = `bold ${Math.round(24 * scale)}px Orbitron`;
      ctx.textAlign = 'center';
      ctx.fillStyle = d.type === 'heal' ? '#00ff88' : '#ff3366';
      ctx.shadowColor = d.type === 'heal' ? '#00ff88' : '#ff3366';
      ctx.shadowBlur = 10;
      ctx.fillText(d.value, d.x, d.y);
      ctx.restore();
    });
    
    this.floatingTexts.forEach(t => {
      const alpha = t.life / t.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = '16px "Noto Sans SC"';
      ctx.textAlign = 'center';
      ctx.fillStyle = t.color;
      ctx.shadowColor = t.color;
      ctx.shadowBlur = 5;
      ctx.fillText(t.text, t.x, t.y);
      ctx.restore();
    });
  }
}

// ===== Canvas Renderer =====
class CanvasRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';
    this.ctx.scale(dpr, dpr);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
  
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  
  // Draw background
  drawBackground() {
    const ctx = this.ctx;
    // Dark gradient background
    const grad = ctx.createRadialGradient(this.width/2, this.height/2, 0, this.width/2, this.height/2, this.width * 0.7);
    grad.addColorStop(0, '#1a1a25');
    grad.addColorStop(1, '#0a0a12');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this.width, this.height);
    
    // Grid pattern
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < this.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
    for (let y = 0; y < this.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }
    
    // Vignette
    const vignette = ctx.createRadialGradient(this.width/2, this.height/2, this.height * 0.3, this.width/2, this.height/2, this.width * 0.8);
    vignette.addColorStop(0, 'transparent');
    vignette.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, this.width, this.height);
  }
  
  // Draw glow effect
  drawGlow(x, y, radius, color, intensity = 1) {
    const ctx = this.ctx;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, color);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.globalAlpha = 0.3 * intensity;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    ctx.globalAlpha = 1;
  }
  
  // Draw character avatar
  drawCharacterAvatar(x, y, hero, size = 80, options = {}) {
    const ctx = this.ctx;
    const { isCurrentTurn = false, isDead = false, isTargetable = false, isHovered = false } = options;
    
    ctx.save();
    
    // Glow effect for current turn
    if (isCurrentTurn && !isDead) {
      const glowGrad = ctx.createRadialGradient(x, y, size * 0.3, x, y, size * 0.8);
      glowGrad.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(x - size, y - size, size * 2, size * 2);
    }
    
    // Targetable indicator
    if (isTargetable && !isDead) {
      ctx.strokeStyle = isHovered ? '#ffd700' : '#00f0ff';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    // Avatar background
    const avatarGrad = ctx.createRadialGradient(x - size * 0.2, y - size * 0.2, 0, x, y, size * 0.5);
    avatarGrad.addColorStop(0, isDead ? '#333' : hero.color);
    avatarGrad.addColorStop(1, isDead ? '#111' : this.darkenColor(hero.color, 0.5));
    
    ctx.fillStyle = avatarGrad;
    ctx.beginPath();
    ctx.arc(x, y, size * 0.45, 0, Math.PI * 2);
    ctx.fill();
    
    // Border
    let borderColor = hero.color;
    if (hero.rarity === 'UR') borderColor = '#b000ff';
    else if (hero.rarity === 'SSR') borderColor = '#ffd700';
    else if (hero.rarity === 'SR') borderColor = '#00f0ff';
    else borderColor = '#00ff88';
    
    ctx.strokeStyle = isDead ? '#444' : borderColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, size * 0.45, 0, Math.PI * 2);
    ctx.stroke();
    
    // Emoji
    if (!isDead) {
      ctx.font = `${size * 0.5}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(hero.emoji, x, y);
    } else {
      ctx.font = `${size * 0.3}px serif`;
      ctx.fillStyle = '#666';
      ctx.fillText('💀', x, y);
    }
    
    ctx.restore();
  }
  
  // Draw HP bar
  drawHPBar(x, y, width, hp, maxHp) {
    const ctx = this.ctx;
    const ratio = hp / maxHp;
    const height = 8;
    
    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    ctx.roundRect(x - width/2, y, width, height, 4);
    ctx.fill();
    
    // Fill
    let color = '#00ff88';
    if (ratio < 0.3) color = '#ff3366';
    else if (ratio < 0.6) color = '#ffaa00';
    
    if (ratio > 0) {
      const grad = ctx.createLinearGradient(x - width/2, y, x - width/2 + width * ratio, y);
      grad.addColorStop(0, color);
      grad.addColorStop(1, this.lightenColor(color, 0.3));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x - width/2, y, width * ratio, height, 4);
      ctx.fill();
    }
    
    // HP text
    ctx.font = 'bold 11px Orbitron';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(`${hp}/${maxHp}`, x, y + height + 12);
  }
  
  // Draw hand card
  drawCard(x, y, card, options = {}) {
    const ctx = this.ctx;
    const { width = 70, height = 100, selected = false, hovered = false, faceDown = false } = options;
    
    if (faceDown) {
      // Card back
      const grad = ctx.createLinearGradient(x - width/2, y - height/2, x + width/2, y + height/2);
      grad.addColorStop(0, '#2a1a4a');
      grad.addColorStop(1, '#1a0a3a');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x - width/2, y - height/2, width, height, 8);
      ctx.fill();
      
      ctx.strokeStyle = '#b000ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(x - width/2, y - height/2, width, height, 8);
      ctx.stroke();
      
      // Pattern
      ctx.strokeStyle = 'rgba(176, 0, 255, 0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(x - width/2 + 10, y - height/2 + 10 + i * 30);
        ctx.lineTo(x + width/2 - 10, y - height/2 + 10 + i * 30);
        ctx.stroke();
      }
      return;
    }
    
    ctx.save();
    
    // Glow for selected/hovered
    if (selected || hovered) {
      const glowColor = selected ? '#00f0ff' : '#ffd700';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = selected ? 20 : 10;
    }
    
    // Card background by type
    const bgColors = {
      attack: { start: '#3a0a0a', end: '#2a0505' },
      defend: { start: '#0a0a3a', end: '#05052a' },
      trick: { start: '#3a3a0a', end: '#2a2a05' },
      equip: { start: '#0a3a0a', end: '#052a05' }
    };
    const colors = bgColors[card.type] || bgColors.attack;
    
    const grad = ctx.createLinearGradient(x - width/2, y - height/2, x + width/2, y + height/2);
    grad.addColorStop(0, colors.start);
    grad.addColorStop(1, colors.end);
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x - width/2, y - height/2, width, height, 8);
    ctx.fill();
    
    // Border
    ctx.strokeStyle = selected ? '#00f0ff' : (hovered ? '#ffd700' : 'rgba(255, 255, 255, 0.3)');
    ctx.lineWidth = selected ? 3 : 2;
    ctx.beginPath();
    ctx.roundRect(x - width/2, y - height/2, width, height, 8);
    ctx.stroke();
    
    ctx.shadowBlur = 0;
    
    // Card type indicator
    ctx.fillStyle = this.getCardTypeColor(card.type);
    ctx.beginPath();
    ctx.roundRect(x - width/2 + 4, y - height/2 + 4, width - 8, 16, [4, 4, 0, 0]);
    ctx.fill();
    
    // Card emoji
    ctx.font = `${width * 0.5}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(card.emoji, x, y - 5);
    
    // Card name
    ctx.font = `bold ${Math.min(10, width * 0.14)}px "Noto Sans SC"`;
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(card.name, x, y + height/2 - 20);
    
    // Card desc (truncated)
    ctx.font = `${Math.min(8, width * 0.11)}px "Noto Sans SC"`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    const shortDesc = card.desc.length > 20 ? card.desc.substring(0, 18) + '..' : card.desc;
    ctx.fillText(shortDesc, x, y + height/2 - 8);
    
    ctx.restore();
  }
  
  // Draw hero selection card
  drawHeroCard(x, y, hero, options = {}) {
    const ctx = this.ctx;
    const { width = 120, height = 160, selected = false, hovered = false } = options;
    
    ctx.save();
    
    if (selected || hovered) {
      ctx.shadowColor = selected ? '#ffd700' : '#00f0ff';
      ctx.shadowBlur = selected ? 25 : 15;
    }
    
    // Background
    const grad = ctx.createLinearGradient(x - width/2, y - height/2, x + width/2, y + height/2);
    grad.addColorStop(0, '#1a1a25');
    grad.addColorStop(1, '#0a0a12');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x - width/2, y - height/2, width, height, 12);
    ctx.fill();
    
    // Rarity border
    let borderColor = '#00ff88';
    if (hero.rarity === 'UR') borderColor = '#b000ff';
    else if (hero.rarity === 'SSR') borderColor = '#ffd700';
    else if (hero.rarity === 'SR') borderColor = '#00f0ff';
    
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x - width/2, y - height/2, width, height, 12);
    ctx.stroke();
    
    // Top border accent
    ctx.fillStyle = borderColor;
    ctx.beginPath();
    ctx.roundRect(x - width/2, y - height/2, width, 4, [12, 12, 0, 0]);
    ctx.fill();
    
    ctx.shadowBlur = 0;
    
    // Emoji
    ctx.font = `${width * 0.45}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(hero.emoji, x, y - height * 0.15);
    
    // Name
    ctx.font = `bold ${Math.min(11, width * 0.09)}px "Noto Sans SC"`;
    ctx.fillStyle = '#fff';
    ctx.fillText(hero.name, x, y + height * 0.18);
    
    // Title
    ctx.font = `${Math.min(9, width * 0.075)}px "Noto Sans SC"`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText(hero.title, x, y + height * 0.3);
    
    // Rarity badge
    ctx.fillStyle = borderColor;
    ctx.beginPath();
    ctx.roundRect(x - 20, y + height * 0.4, 40, 14, 4);
    ctx.fill();
    ctx.font = 'bold 9px Orbitron';
    ctx.fillStyle = '#000';
    ctx.fillText(hero.rarity, x, y + height * 0.4 + 5);
    
    // HP
    ctx.font = `${Math.min(10, width * 0.083)}px "Noto Sans SC"`;
    ctx.fillStyle = '#00ff88';
    ctx.fillText(`HP: ${hero.hp}`, x, y + height * 0.52);
    
    ctx.restore();
  }
  
  // Draw button
  drawButton(x, y, width, height, text, options = {}) {
    const ctx = this.ctx;
    const { hovered = false, disabled = false, color = '#00f0ff' } = options;
    
    ctx.save();
    
    if (hovered && !disabled) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
    }
    
    const grad = ctx.createLinearGradient(x - width/2, y - height/2, x - width/2, y + height/2);
    if (disabled) {
      grad.addColorStop(0, '#333');
      grad.addColorStop(1, '#222');
    } else {
      grad.addColorStop(0, this.lightenColor(color, 0.2));
      grad.addColorStop(1, this.darkenColor(color, 0.3));
    }
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x - width/2, y - height/2, width, height, 8);
    ctx.fill();
    
    ctx.strokeStyle = disabled ? '#444' : color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x - width/2, y - height/2, width, height, 8);
    ctx.stroke();
    
    ctx.shadowBlur = 0;
    ctx.font = 'bold 14px Orbitron';
    ctx.fillStyle = disabled ? '#666' : '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
    
    ctx.restore();
    
    return { x: x - width/2, y: y - height/2, width, height };
  }
  
  // Draw equip slot
  drawEquipSlot(x, y, size, equip, type) {
    const ctx = this.ctx;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.roundRect(x - size/2, y - size/2, size, size, 6);
    ctx.fill();
    
    ctx.strokeStyle = equip ? 'rgba(255, 215, 0, 0.6)' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x - size/2, y - size/2, size, size, 6);
    ctx.stroke();
    
    const emojis = { weapon: ['🖥️', '⚡'], armor: ['🛡️', '⚖️'], assist: ['📜', '🔮'] };
    ctx.font = `${size * 0.6}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(equip ? equip.emoji : emojis[type][0], x, y);
  }
  
  // Draw skill button
  drawSkillButton(x, y, width, height, skill, canUse, usedText) {
    const ctx = this.ctx;
    const color = canUse ? '#b000ff' : '#444';
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    ctx.roundRect(x - width/2, y - height/2, width, height, 8);
    ctx.fill();
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x - width/2, y - height/2, width, height, 8);
    ctx.stroke();
    
    ctx.font = 'bold 12px "Noto Sans SC"';
    ctx.fillStyle = canUse ? '#b000ff' : '#666';
    ctx.textAlign = 'center';
    ctx.fillText(skill.name, x, y - height/4);
    
    ctx.font = `${Math.min(9, width * 0.1)}px "Noto Sans SC"`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    const words = skill.desc.split('');
    let line = '';
    let lines = [];
    for (let c of words) {
      line += c;
      if (line.length > 10 || c === '，' || c === '。') {
        lines.push(line);
        line = '';
      }
    }
    if (line) lines.push(line);
    
    lines.slice(0, 2).forEach((l, i) => {
      ctx.fillText(l, x, y + i * 12);
    });
    
    ctx.font = `${Math.min(8, width * 0.09)}px "Noto Sans SC"`;
    ctx.fillStyle = canUse ? '#00ff88' : '#666';
    ctx.fillText(canUse ? '点击使用' : usedText, x, y + height/2 - 8);
  }
  
  // Draw log area
  drawLogArea(x, y, width, height, logs) {
    const ctx = this.ctx;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 8);
    ctx.fill();
    
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 8);
    ctx.stroke();
    
    ctx.font = '11px "Noto Sans SC"';
    ctx.textAlign = 'left';
    
    const visibleLogs = logs.slice(0, 8);
    visibleLogs.forEach((log, i) => {
      let color = '#fff';
      if (log.type === 'damage') color = '#ff3366';
      else if (log.type === 'heal') color = '#00ff88';
      else if (log.type === 'draw') color = '#00f0ff';
      else if (log.type === 'event') color = '#ffd700';
      else if (log.type === 'death') color = '#ff6600';
      
      ctx.fillStyle = color;
      ctx.fillText(log.msg, x + 10, y + 18 + i * 18);
    });
  }
  
  // Draw deck info
  drawDeckInfo(x, y, deckCount, discardCount) {
    const ctx = this.ctx;
    
    // Deck
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.roundRect(x - 30, y - 25, 60, 50, 6);
    ctx.fill();
    
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x - 30, y - 25, 60, 50, 6);
    ctx.stroke();
    
    ctx.font = 'bold 12px Orbitron';
    ctx.fillStyle = '#00f0ff';
    ctx.textAlign = 'center';
    ctx.fillText('牌堆', x, y - 8);
    ctx.font = '14px Orbitron';
    ctx.fillText(deckCount, x, y + 12);
    
    // Discard
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.roundRect(x + 40, y - 25, 60, 50, 6);
    ctx.fill();
    
    ctx.strokeStyle = 'rgba(255, 51, 102, 0.5)';
    ctx.beginPath();
    ctx.roundRect(x + 40, y - 25, 60, 50, 6);
    ctx.stroke();
    
    ctx.font = 'bold 12px Orbitron';
    ctx.fillStyle = '#ff3366';
    ctx.fillText('弃牌', x + 70, y - 8);
    ctx.font = '14px Orbitron';
    ctx.fillText(discardCount, x + 70, y + 12);
  }
  
  // Draw turn info
  drawTurnInfo(x, y, round, turnName, isPlayerTurn) {
    const ctx = this.ctx;
    
    ctx.font = 'bold 16px Orbitron';
    ctx.textAlign = 'center';
    
    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    ctx.roundRect(x - 80, y - 20, 160, 40, 8);
    ctx.fill();
    
    ctx.strokeStyle = isPlayerTurn ? '#00ff88' : '#00f0ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x - 80, y - 20, 160, 40, 8);
    ctx.stroke();
    
    ctx.fillStyle = '#fff';
    ctx.fillText(`第${round}回合`, x, y - 5);
    
    ctx.font = '12px "Noto Sans SC"';
    ctx.fillStyle = isPlayerTurn ? '#00ff88' : '#00f0ff';
    ctx.fillText(turnName + (isPlayerTurn ? ' - 你的回合' : ''), x, y + 12);
  }
  
  // Draw global event banner
  drawEventBanner(text, subtext) {
    const ctx = this.ctx;
    const x = this.width / 2;
    const y = this.height * 0.3;
    
    ctx.save();
    
    // Background
    ctx.fillStyle = 'rgba(176, 0, 255, 0.9)';
    ctx.shadowColor = '#b000ff';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.roundRect(x - 200, y - 40, 400, 80, 12);
    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.font = 'bold 24px "Noto Sans SC"';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
    
    ctx.font = '14px "Noto Sans SC"';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(subtext, x, y + 25);
    
    ctx.restore();
  }
  
  // Utility functions
  darkenColor(hex, amount) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    r = Math.floor(r * (1 - amount));
    g = Math.floor(g * (1 - amount));
    b = Math.floor(b * (1 - amount));
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  lightenColor(hex, amount) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    r = Math.min(255, Math.floor(r + (255 - r) * amount));
    g = Math.min(255, Math.floor(g + (255 - g) * amount));
    b = Math.min(255, Math.floor(b + (255 - b) * amount));
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  getCardTypeColor(type) {
    const colors = {
      attack: '#ff3366',
      defend: '#00f0ff',
      trick: '#ffd700',
      equip: '#00ff88'
    };
    return colors[type] || '#fff';
  }
}

// ===== Game Class =====
class Game {
  constructor(canvas, renderer) {
    this.canvas = canvas;
    this.renderer = renderer;
    this.playerCount = 6;
    this.playerHero = null;
    this.globalModifier = GLOBAL_MODIFIERS[Math.floor(Math.random() * GLOBAL_MODIFIERS.length)];
    this.characters = [];
    this.deck = [];
    this.discardPile = [];
    this.logs = [];
    this.selectedCard = null;
    this.currentTurnChar = null;
    this.gamePhase = 'setup';
    this.usedSkillsThisTurn = {};
    this.usedAttacksThisTurn = {};
    this.extraAttacksThisTurn = {};
    this.killRewards = {};
    this.nextTurnDrawPenalty = false;
    this.trickDisabled = false;
    this.allRangeBonus = 0;
    this.allHandLimitBonus = 0;
    this.allDrawBonus = 0;
    this.allHpPenalty = 0;
    this.equipDouble = false;
    this.attacker = null;
    this.round = 1;
    this.particles = new ParticleSystem();
    this.animationQueue = [];
    this.isAnimating = false;
    this.currentAnimation = null;
    this.eventBanner = null;
    this.identityRevealCallback = null;
    this.hoveredCardIndex = -1;
    this.hoveredEnemyIndex = -1;
  }
  
  init() {
    this.deck = this.createDeck();
    this.assignIdentities();
    this.applyGlobalModifier();
    this.characters.forEach(char => this.drawCards(char, 4));
    this.gamePhase = 'playing';
    
    // Show identity then start
    this.showIdentityReveal(() => {
      this.log(`游戏开始！全局修饰：${this.globalModifier.name}`, 'event');
      const firstChar = this.characters.find(c => c.isAlive);
      if (firstChar) {
        this.startTurn(firstChar);
      }
    });
  }
  
  createDeck() {
    const deck = [];
    for (let i = 0; i < 12; i++) deck.push({ ...CARD_DEFS['推理攻击'], id: generateId() });
    for (let i = 0; i < 8; i++) deck.push({ ...CARD_DEFS['自我辩护'], id: generateId() });
    for (let i = 0; i < 6; i++) deck.push({ ...CARD_DEFS['模型更新'], id: generateId() });
    for (let i = 0; i < 4; i++) deck.push({ ...CARD_DEFS['API限流'], id: generateId() });
    for (let i = 0; i < 4; i++) deck.push({ ...CARD_DEFS['参数泄露'], id: generateId() });
    for (let i = 0; i < 2; i++) deck.push({ ...CARD_DEFS['全网评测'], id: generateId() });
    for (let i = 0; i < 3; i++) deck.push({ ...CARD_DEFS['紧急补丁'], id: generateId() });
    for (let i = 0; i < 2; i++) deck.push({ ...CARD_DEFS['开源运动'], id: generateId() });
    for (let i = 0; i < 2; i++) deck.push({ ...CARD_DEFS['数据投毒'], id: generateId() });
    for (let i = 0; i < 4; i++) deck.push({ ...CARD_DEFS['推理链'], id: generateId() });
    for (let i = 0; i < 2; i++) deck.push({ ...CARD_DEFS['模型蒸馏'], id: generateId() });
    return shuffle(deck);
  }
  
  assignIdentities() {
    const identities = [IDENTITIES.MASTER];
    if (this.playerCount >= 8) {
      identities.push(IDENTITIES.LOYALIST, IDENTITIES.LOYALIST);
      identities.push(IDENTITIES.REBEL, IDENTITIES.REBEL, IDENTITIES.REBEL);
      identities.push(IDENTITIES.TRAITOR, IDENTITIES.TRAITOR);
    } else if (this.playerCount >= 6) {
      identities.push(IDENTITIES.LOYALIST);
      identities.push(IDENTITIES.REBEL, IDENTITIES.REBEL);
      identities.push(IDENTITIES.TRAITOR, IDENTITIES.TRAITOR);
    } else {
      identities.push(IDENTITIES.LOYALIST);
      identities.push(IDENTITIES.REBEL);
      identities.push(IDENTITIES.TRAITOR);
    }
    
    const shuffled = shuffle(identities);
    const player = this.createCharacter('player', this.playerHero, shuffled[0]);
    this.characters.push(player);
    
    const availableHeroes = shuffle(HEROES.filter(h => h.id !== this.playerHero.id));
    for (let i = 1; i < this.playerCount; i++) {
      const hero = availableHeroes[i - 1] || HEROES[Math.floor(Math.random() * HEROES.length)];
      const char = this.createCharacter(`ai-${i}`, hero, shuffled[i]);
      this.characters.push(char);
    }
  }
  
  createCharacter(id, hero, identity) {
    let hp = hero.hp;
    let maxHp = hero.maxHp;
    if (identity.id === 'master') { hp += 1; maxHp += 1; }
    if (this.globalModifier?.id === 'resource-limited') { hp -= 1; maxHp -= 1; }
    return {
      id, hero, hp: Math.max(1, hp), maxHp: Math.max(1, maxHp),
      handCards: [], equips: { weapon: null, armor: null, assist: null },
      identity, isPlayer: id === 'player', isAlive: true,
      skillsUsed: { active: 0, perGame: {} },
      extraAttacks: 0, extraDraws: 0, damageDraws: 0, retaliate: false, handLimitBonus: 0
    };
  }
  
  applyGlobalModifier() {
    switch (this.globalModifier.id) {
      case 'low-latency': this.allRangeBonus = 1; break;
      case 'long-text': this.allHandLimitBonus = 1; break;
      case 'high-concurrency': this.allDrawBonus = 1; break;
      case 'resource-limited': this.allHpPenalty = 1; break;
      case 'open-source': this.equipDouble = true; break;
    }
  }
  
  showIdentityReveal(callback) {
    const player = this.characters.find(c => c.isPlayer);
    this.identityRevealCallback = callback;
    
    // Draw identity card on canvas
    const identityOverlay = document.getElementById('identity-overlay');
    const identityName = document.getElementById('identity-name');
    const identityDesc = document.getElementById('identity-desc');
    
    identityName.textContent = player.identity.name;
    identityDesc.textContent = player.identity.desc;
    identityOverlay.classList.remove('hidden');
    
    // Auto-dismiss after 2 seconds
    setTimeout(() => {
      identityOverlay.classList.add('hidden');
      if (callback) callback();
    }, 2500);
  }
  
  getAliveCharacters() { return this.characters.filter(c => c.isAlive); }
  getAliveOthers(char) { return this.getAliveCharacters().filter(c => c.id !== char.id); }
  
  drawCards(char, count) {
    for (let i = 0; i < count; i++) {
      if (this.deck.length === 0) {
        this.deck = shuffle(this.discardPile);
        this.discardPile = [];
      }
      if (this.deck.length > 0) char.handCards.push(this.deck.pop());
    }
  }
  
  dealDamage(source, target, amount, reason) {
    // Check armor
    if (target.equips.armor && amount > 0) {
      const reduction = this.equipDouble ? 2 : 1;
      amount = Math.max(0, amount - reduction);
      if (amount === 0) {
        this.log(`${target.hero.name} 的装备抵挡了攻击！`, 'heal');
        let targetX = this.renderer.width / 2;
        let targetY = this.renderer.height / 2;
        if (target.isPlayer) targetY = this.renderer.height - 200;
        else {
          const idx = this.characters.filter(c => !c.isPlayer).indexOf(target);
          targetX = this.renderer.width / 2 + (idx - 2) * 100;
          targetY = 150;
        }
        this.particles.defendEffect(targetX, targetY);
        AudioSystem.play('defend');
        return;
      }
    }
    
    // GPT-4o-mini passive
    if (target.hero.id === 'gpt-4o-mini' && reason === '推理攻击' && Math.random() < 0.5) {
      this.log(`${target.hero.name} 极速响应闪避了攻击！`, 'heal');
      return;
    }
    
    target.hp -= amount;
    this.attacker = source;
    
    // Get target position for effects
    let targetX = this.renderer.width / 2;
    let targetY = this.renderer.height / 2;
    if (target.isPlayer) {
      targetY = this.renderer.height - 200;
    } else {
      const idx = this.characters.filter(c => !c.isPlayer).indexOf(target);
      targetX = this.renderer.width / 2 + (idx - 2) * 100;
      targetY = 150;
    }
    
    this.particles.addDamageNumber(targetX, targetY - 50, amount, 'damage');
    AudioSystem.play('damage');
    
    // Damage draw reward
    if (source && source.damageDraws > 0 && amount > 0) {
      this.drawCards(source, source.damageDraws);
      this.log(`${source.hero.name} 造成伤害，摸${source.damageDraws}张牌`, 'draw');
    }
    
    // Retaliation
    if (target.retaliate && Math.random() < 0.5 && source && source.isAlive) {
      source.hp -= 1;
      let sourceX = this.renderer.width / 2;
      let sourceY = this.renderer.height / 2;
      if (source.isPlayer) sourceY = this.renderer.height - 200;
      else {
        const idx = this.characters.filter(c => !c.isPlayer).indexOf(source);
        sourceX = this.renderer.width / 2 + (idx - 2) * 100;
        sourceY = 150;
      }
      this.particles.addDamageNumber(sourceX, sourceY - 50, 1, 'damage');
      this.log(`${target.hero.name} 对抗训练反弹1点伤害！`, 'damage');
    }
    
    // GLM-5 passive
    if (target.hero.id === 'glm-5' && target.hp <= 0 && Math.random() < 0.3) {
      target.hp = 1;
      this.log(`${target.hero.name} 开源之力保命！`, 'heal');
      this.particles.healEffect(targetX, targetY);
    }
    
    if (target.hp <= 0) {
      this.handleDeath(target, source);
    }
  }
  
  healCharacter(source, target, amount) {
    const oldHp = target.hp;
    target.hp = Math.min(target.hp + amount, target.maxHp);
    const healed = target.hp - oldHp;
    if (healed > 0) {
      let targetX = this.renderer.width / 2;
      let targetY = this.renderer.height / 2;
      if (target.isPlayer) {
        targetY = this.renderer.height - 200;
      } else {
        const idx = this.characters.filter(c => !c.isPlayer).indexOf(target);
        targetX = this.renderer.width / 2 + (idx - 2) * 100;
        targetY = 150;
      }
      this.particles.addDamageNumber(targetX, targetY - 50, healed, 'heal');
      this.particles.healEffect(targetX, targetY);
      AudioSystem.play('heal');
      this.log(`${target.hero.name} 回复${healed}HP`, 'heal');
    }
  }
  
  handleDeath(deadChar, killer) {
    deadChar.isAlive = true; // Keep alive for rendering
    deadChar.isAlive = false;
    deadChar.handCards.forEach(card => this.discardPile.push(card));
    deadChar.handCards = [];
    Object.values(deadChar.equips).forEach(equip => { if (equip) this.discardPile.push(equip); });
    deadChar.equips = { weapon: null, armor: null, assist: null };
    
    // Death effect
    let charX = this.renderer.width / 2;
    let charY = this.renderer.height / 2;
    if (deadChar.isPlayer) charY = this.renderer.height - 200;
    else {
      const idx = this.characters.filter(c => !c.isPlayer).indexOf(deadChar);
      charX = this.renderer.width / 2 + (idx - 2) * 100;
      charY = 150;
    }
    this.particles.deathEffect(charX, charY);
    AudioSystem.play('death');
    
    this.log(`${deadChar.hero.name} 被击杀！`, 'death');
    
    if (killer && killer.isAlive) {
      this.giveKillReward(killer);
    }
    
    this.checkWinCondition();
  }
  
  giveKillReward(char) {
    if (char.killRewards && char.killRewards[char.id]) return;
    char.killRewards = char.killRewards || {};
    char.killRewards[char.id] = true;
    const rewards = shuffle([...ROGUELIKE_REWARDS]).slice(0, 3);
    
    if (char.isPlayer) {
      showModal('击杀奖励！选择一项天赋', rewards.map(r => ({
        title: r.name, desc: r.desc,
        onClick: () => { this.applyReward(char, r); hideModal(); }
      })));
    } else {
      const reward = rewards[Math.floor(Math.random() * rewards.length)];
      this.applyReward(char, reward);
    }
  }
  
  applyReward(char, reward) {
    switch (reward.id) {
      case 'param-expand': char.maxHp++; char.hp = Math.min(char.hp + 1, char.maxHp); break;
      case '推理加速': char.extraAttacks = (char.extraAttacks || 0) + 1; break;
      case 'cache-hit': char.extraDraws = (char.extraDraws || 0) + 1; break;
      case 'data-flywheel': char.damageDraws = (char.damageDraws || 0) + 1; break;
      case 'adversarial': char.retaliate = true; break;
      case 'knowledge-distill': char.seeAttacker = true; break;
      case 'multi-task': char.handLimitBonus = (char.handLimitBonus || 0) + 2; break;
      case 'sft': char.transformBasic = true; break;
    }
    this.log(`${char.hero.name} 获得了天赋：${reward.name}`, 'event');
    this.particles.addFloatingText(this.renderer.width/2, this.renderer.height/2, `获得天赋: ${reward.name}`, '#ffd700');
  }
  
  discardExcessCards(char) {
    const maxHand = getHandLimit(char);
    while (char.handCards.length > maxHand) {
      const idx = Math.floor(Math.random() * char.handCards.length);
      const card = char.handCards.splice(idx, 1)[0];
      this.discardPile.push(card);
      this.log(`${char.hero.name} 弃置了 ${card.name}`, 'damage');
    }
  }
  
  useCard(char, card, targets) {
    if (!targets) targets = [];
    
    // Get positions for effects
    let charX = this.renderer.width / 2, charY = this.renderer.height / 2;
    if (char.isPlayer) charY = this.renderer.height - 200;
    else {
      const idx = this.characters.filter(c => !c.isPlayer).indexOf(char);
      charX = this.renderer.width / 2 + (idx - 2) * 100;
      charY = 150;
    }
    
    switch (card.name) {
      case '推理攻击':
        if (targets.length > 0) {
          let targetX = this.renderer.width / 2, targetY = this.renderer.height / 2;
          if (targets[0].isPlayer) targetY = this.renderer.height - 200;
          else {
            const tidx = this.characters.filter(c => !c.isPlayer).indexOf(targets[0]);
            targetX = this.renderer.width / 2 + (tidx - 2) * 100;
            targetY = 150;
          }
          this.particles.attackEffect(charX, charY, targetX, targetY);
          AudioSystem.play('attack');
          this.dealDamage(char, targets[0], 1, '推理攻击');
        }
        break;
      case '模型更新':
        const target = targets[0] || char;
        this.healCharacter(char, target, 1);
        break;
      case 'API限流':
        if (targets.length > 0 && targets[0].handCards.length > 0) {
          const idx = Math.floor(Math.random() * targets[0].handCards.length);
          const discarded = targets[0].handCards.splice(idx, 1)[0];
          this.discardPile.push(discarded);
          this.log(`${targets[0].hero.name} 被弃置 ${discarded.name}`, 'damage');
        }
        break;
      case '参数泄露':
        if (targets.length > 0 && targets[0].handCards.length > 0) {
          const idx = Math.floor(Math.random() * targets[0].handCards.length);
          const stolen = targets[0].handCards.splice(idx, 1)[0];
          char.handCards.push(stolen);
          this.log(`${char.hero.name} 从 ${targets[0].hero.name} 获取了 ${stolen.name}`, 'draw');
        }
        break;
      case '全网评测':
        this.getAliveOthers(char).forEach(c => this.dealDamage(char, c, 1, '全网评测'));
        this.particles.explosionEffect(charX, charY, '#ffd700');
        break;
      case '开源运动':
        this.getAliveCharacters().forEach(c => this.healCharacter(char, c, 1));
        const llama = this.getAliveCharacters().find(c => c.hero.id === 'llama-4');
        if (llama && Math.random() < 0.5) {
          this.healCharacter(char, llama, 1);
          this.log(`${llama.hero.name} 开源之力额外回复1HP`, 'heal');
        }
        break;
      case '推理链':
        this.drawCards(char, 2);
        this.log(`${char.hero.name} 摸了2张牌`, 'draw');
        break;
      case '数据投毒':
        if (targets.length > 0) {
          const t = targets[0];
          const charAttacks = char.handCards.filter(c => c.name === '推理攻击').length;
          const targetAttacks = t.handCards.filter(c => c.name === '推理攻击').length;
          if (charAttacks === 0) this.dealDamage(t, char, 1, '数据投毒');
          else if (targetAttacks === 0) this.dealDamage(char, t, 1, '数据投毒');
        }
        break;
      case '模型蒸馏':
        if (targets.length > 0) {
          const executor = targets[0];
          const victims = this.getAliveOthers(executor).filter(c => c.id !== char.id);
          if (victims.length > 0 && executor.handCards.some(c => c.name === '推理攻击')) {
            const victim = victims[Math.floor(Math.random() * victims.length)];
            this.dealDamage(executor, victim, 1, '模型蒸馏');
            this.log(`${executor.hero.name} 被迫攻击 ${victim.hero.name}`, 'damage');
          }
        }
        break;
    }
    
    const idx = char.handCards.findIndex(c => c.id === card.id);
    if (idx !== -1) char.handCards.splice(idx, 1);
    if (card.type !== 'equip') this.discardPile.push(card);
  }
  
  equipItem(char, card) {
    const subtype = card.subtype;
    if (char.equips[subtype]) this.discardPile.push(char.equips[subtype]);
    char.equips[subtype] = card;
    const idx = char.handCards.findIndex(c => c.id === card.id);
    if (idx !== -1) char.handCards.splice(idx, 1);
    this.log(`${char.hero.name} 装备了 ${card.name}`, 'draw');
    this.particles.skillEffect(this.renderer.width / 2, this.renderer.height - 150, 'magic');
  }
  
  startTurn(char) {
    this.currentTurnChar = char;
    this.usedSkillsThisTurn[char.id] = 0;
    this.usedAttacksThisTurn[char.id] = this.usedAttacksThisTurn[char.id] || 0;
    this.extraAttacksThisTurn[char.id] = char.extraAttacks || 0;
    this.trickDisabled = false;
    
    let drawCount = 2;
    if (char.hero.id === 'claude-3.5-sonnet') drawCount += 1;
    if (char.hero.id === 'grok-4') drawCount += 1;
    if (char.equips.assist && char.equips.assist.name === '多模态接口') drawCount += this.equipDouble ? 2 : 1;
    if (char.extraDraws) drawCount += char.extraDraws;
    if (this.allDrawBonus) drawCount += this.allDrawBonus;
    if (this.nextTurnDrawPenalty) {
      drawCount = Math.max(1, drawCount - 1);
      this.nextTurnDrawPenalty = false;
    }
    
    this.drawCards(char, drawCount);
    this.discardExcessCards(char);
    this.log(`${char.hero.name} 开始了回合，摸${drawCount}张牌`, 'draw');
    
    if (!char.isPlayer) {
      setTimeout(() => this.executeAITurn(char), 800);
    }
  }
  
  endTurn(char) {
    this.discardExcessCards(char);
    let nextIdx = this.characters.findIndex(c => c.id === char.id) + 1;
    if (nextIdx >= this.characters.length) {
      nextIdx = 0;
      this.round++;
      if (this.round % 3 === 0) this.triggerRandomEvent();
    }
    const nextChar = this.characters[nextIdx];
    if (nextChar && nextChar.isAlive) this.startTurn(nextChar);
  }
  
  triggerRandomEvent() {
    const event = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
    
    switch (event.name) {
      case '新版本发布': this.getAliveCharacters().forEach(c => this.drawCards(c, 2)); break;
      case '训练数据泄露':
        this.getAliveCharacters().forEach(c => {
          if (c.handCards.length > 0) {
            const idx = Math.floor(Math.random() * c.handCards.length);
            this.discardPile.push(c.handCards.splice(idx, 1)[0]);
          }
        });
        break;
      case 'GPU短缺': this.nextTurnDrawPenalty = true; break;
      case 'API免费额度': this.getAliveCharacters().forEach(c => this.healCharacter(null, c, 1)); break;
      case '模型下线':
        const targets = this.getAliveCharacters();
        this.dealDamage(null, targets[Math.floor(Math.random() * targets.length)], 2, '模型下线');
        break;
      case '开源突破':
        const equipKeys = Object.keys(EQUIP_DEFS);
        this.getAliveCharacters().forEach(c => {
          c.handCards.push({ ...EQUIP_DEFS[equipKeys[Math.floor(Math.random() * equipKeys.length)]], id: generateId() });
        });
        break;
      case '基准测试':
        const chars = this.getAliveCharacters();
        let maxAttack = 0, bestChar = null;
        chars.forEach(c => {
          const count = c.handCards.filter(card => card.name === '推理攻击').length;
          if (count > maxAttack) { maxAttack = count; bestChar = c; }
        });
        if (bestChar) this.drawCards(bestChar, 2);
        break;
      case '对齐审查': this.trickDisabled = true; break;
    }
    
    this.eventBanner = { text: event.name, subtext: event.desc, life: 120 };
    this.log(`随机事件：${event.name}`, 'event');
  }
  
  executeAITurn(char) {
    if (!char.isAlive || this.gamePhase !== 'playing') return;
    let actionsTaken = 0;
    const maxActions = 4;
    
    const doAction = () => {
      if (actionsTaken >= maxActions || !char.isAlive || this.gamePhase !== 'playing') {
        setTimeout(() => this.endTurn(char), 500);
        return;
      }
      const action = this.decideAIAction(char);
      if (action) {
        this.executeAIAction(char, action);
        actionsTaken++;
        setTimeout(doAction, 600);
      } else {
        setTimeout(() => this.endTurn(char), 500);
      }
    };
    
    const skill = char.hero.active;
    if (skill && this.canUseSkill(char, skill)) {
      if (this.useActiveSkill(char, skill)) {
        setTimeout(doAction, 800);
        return;
      }
    }
    doAction();
  }
  
  decideAIAction(char) {
    const identity = char.identity.id;
    const aliveChars = this.getAliveOthers(char);
    const master = aliveChars.find(c => c.identity.id === 'master');
    const attackCards = char.handCards.filter(c => c.name === '推理攻击');
    const attackCount = this.usedAttacksThisTurn[char.id] || 0;
    const maxAttacks = 1 + (char.extraAttacks || 0);
    
    if (attackCards.length > 0 && attackCount < maxAttacks) {
      let target = null;
      if (identity === 'rebel' && master) target = master;
      else if (identity === 'master' || identity === 'loyalist') {
        target = aliveChars.filter(c => c.identity.id !== 'master').sort((a, b) => {
          if (a.hp !== b.hp) return a.hp - b.hp;
          return b.handCards.length - a.handCards.length;
        })[0];
      } else if (identity === 'traitor' && Math.random() < 0.3) {
        target = aliveChars[Math.floor(Math.random() * aliveChars.length)];
      }
      if (target) return { type: 'attack', card: attackCards[0], target };
    }
    
    const trickCards = char.handCards.filter(c => c.type === 'trick');
    if (trickCards.length > 0 && !this.trickDisabled) {
      const drawCard = trickCards.find(c => c.name === '推理链');
      if (drawCard) return { type: 'play', card: drawCard, targets: [] };
      const healCard = trickCards.find(c => c.name === '开源运动');
      if (healCard && char.hp < char.maxHp) return { type: 'play', card: healCard, targets: [] };
      const otherTrick = trickCards[0];
      if (otherTrick.canTarget && aliveChars.length > 0) return { type: 'play', card: otherTrick, targets: [aliveChars[0]] };
      return { type: 'play', card: otherTrick, targets: [] };
    }
    
    const weapons = char.handCards.filter(c => c.subtype === 'weapon');
    if (weapons.length > 0 && !char.equips.weapon) return { type: 'equip', card: weapons[0] };
    
    const healCards = char.handCards.filter(c => c.name === '模型更新');
    if (healCards.length > 0 && char.hp <= 2) return { type: 'play', card: healCards[0], targets: [char] };
    
    return null;
  }
  
  executeAIAction(char, action) {
    switch (action.type) {
      case 'attack':
        this.usedAttacksThisTurn[char.id] = (this.usedAttacksThisTurn[char.id] || 0) + 1;
        const defender = action.target;
        const hasDodge = defender.handCards.some(c => c.name === '自我辩护');
        if (hasDodge && Math.random() > 0.3) {
          const dodgeIdx = defender.handCards.findIndex(c => c.name === '自我辩护');
          this.discardPile.push(defender.handCards.splice(dodgeIdx, 1)[0]);
          this.log(`${defender.hero.name} 使用自我辩护闪避了攻击！`, 'heal');
        } else {
          let damage = 1;
          if (char.hero.id === 'deepseek-v4' && this.usedAttacksThisTurn[char.id] === 1) {
            damage = 2;
            this.log(`${char.hero.name} 碾压低价，伤害+1！`, 'damage');
          }
          if (char.hero.id === 'claude-opus-4.5' && char.equips.weapon) {
            damage++;
            this.log(`${char.hero.name} SWE之王武器加成！`, 'damage');
          }
          this.dealDamage(char, defender, damage, '推理攻击');
        }
        break;
      case 'play':
        this.useCard(char, action.card, action.targets);
        break;
      case 'equip':
        this.equipItem(char, action.card);
        break;
    }
  }
  
  canUseSkill(char, skill) {
    const usedCount = this.usedSkillsThisTurn[char.id] || 0;
    if (skill.perTurn && usedCount >= skill.perTurn) return false;
    if (skill.perGame) {
      const perGameUsed = char.skillsUsed.perGame[skill.name] || 0;
      if (perGameUsed >= skill.perGame) return false;
    }
    if (skill.cost && char.handCards.length < skill.cost) return false;
    return true;
  }
  
  useActiveSkill(char, skill) {
    const aliveOthers = this.getAliveOthers(char);
    if (!aliveOthers.length) return false;
    
    if (skill.cost) {
      for (let i = 0; i < skill.cost; i++) {
        if (char.handCards.length > 0) {
          this.discardPile.push(char.handCards.splice(Math.floor(Math.random() * char.handCards.length), 1)[0]);
        }
      }
    }
    
    if (skill.draw) this.drawCards(char, skill.draw);
    if (skill.damage) {
      const target = aliveOthers[Math.floor(Math.random() * aliveOthers.length)];
      this.dealDamage(char, target, skill.damage, skill.name);
    }
    if (skill.name === '快速迭代') this.extraAttacksThisTurn[char.id]++;
    
    this.usedSkillsThisTurn[char.id] = (this.usedSkillsThisTurn[char.id] || 0) + 1;
    if (skill.perGame) char.skillsUsed.perGame[skill.name] = (char.skillsUsed.perGame[skill.name] || 0) + 1;
    
    this.log(`${char.hero.name} 使用了技能：${skill.name}`, 'event');
    this.particles.skillEffect(this.renderer.width / 2, this.renderer.height / 2, 'thunder');
    AudioSystem.play('skill');
    
    return true;
  }
  
  checkWinCondition() {
    const aliveChars = this.getAliveCharacters();
    if (aliveChars.length <= 1) { this.endGame(aliveChars[0]); return true; }
    const master = aliveChars.find(c => c.identity.id === 'master');
    if (!master) {
      const rebels = aliveChars.filter(c => c.identity.id === 'rebel');
      const loyalists = aliveChars.filter(c => c.identity.id === 'loyalist');
      if (rebels.length > 0 && loyalists.length === 0) { this.endGame(rebels[0]); return true; }
      if (aliveChars.length === 1 && aliveChars[0].identity.id === 'traitor') { this.endGame(aliveChars[0]); return true; }
    }
    const enemiesOfMaster = aliveChars.filter(c => c.identity.id !== 'master' && c.identity.id !== 'loyalist');
    if (master && enemiesOfMaster.length === 0) { this.endGame(master); return true; }
    return false;
  }
  
  endGame(winner) {
    this.gamePhase = 'ended';
    const isPlayerWinner = winner?.isPlayer;
    showResultScreen(isPlayerWinner, winner, this);
  }
  
  log(msg, type = '') {
    this.logs.push({ msg, type, time: Date.now() });
    if (this.logs.length > 50) this.logs.shift();
  }
}

// ===== UI State =====
let game = null;
let canvas = null;
let renderer = null;
let selectedHeroId = null;
let selectedPlayerCount = 6;
let selectedCardId = null;
let isPlayerTurn = false;

// ===== UI Functions =====
function initUI() {
  // Logo canvas animation
  const logoCanvas = document.getElementById('logo-canvas');
  const logoCtx = logoCanvas.getContext('2d');
  drawLogo(logoCtx);
  
  // Hero grid
  const heroGrid = document.getElementById('hero-grid');
  heroGrid.innerHTML = HEROES.map(hero => `
    <div class="hero-card ${hero.rarity}" data-hero-id="${hero.id}">
      <span class="hero-emoji">${hero.emoji}</span>
      <div class="hero-name">${hero.name}</div>
      <div class="hero-title">${hero.title}</div>
      <span class="hero-rarity ${hero.rarity}">${hero.rarity}</span>
      <div class="hero-hp">HP: ${hero.hp}</div>
    </div>
  `).join('');
  
  // Event listeners
  heroGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.hero-card');
    if (card) {
      document.querySelectorAll('.hero-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedHeroId = card.dataset.heroId;
      document.getElementById('start-btn').disabled = false;
      AudioSystem.play('select');
    }
  });
  
  document.querySelectorAll('.count-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPlayerCount = parseInt(btn.dataset.count);
      AudioSystem.play('select');
    });
  });
  
  document.getElementById('start-btn').addEventListener('click', startGame);
  document.getElementById('play-again-btn').addEventListener('click', () => {
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
  });
  
  // Show random modifier
  const modifier = GLOBAL_MODIFIERS[Math.floor(Math.random() * GLOBAL_MODIFIERS.length)];
  document.getElementById('modifier-display').textContent = `本局修饰词: ${modifier.name} - ${modifier.desc}`;
}

function drawLogo(ctx) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  
  ctx.clearRect(0, 0, w, h);
  
  // Gradient text
  const grad = ctx.createLinearGradient(0, 0, w, 0);
  grad.addColorStop(0, '#00f0ff');
  grad.addColorStop(0.5, '#b000ff');
  grad.addColorStop(1, '#ffd700');
  
  ctx.font = 'bold 28px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = grad;
  ctx.shadowColor = '#00f0ff';
  ctx.shadowBlur = 20;
  ctx.fillText('AI MODEL COLOSSEUM', w/2, h/2);
  ctx.shadowBlur = 0;
}

function startGame() {
  if (!selectedHeroId) return;
  
  AudioSystem.init();
  AudioSystem.play('skill');
  
  document.getElementById('start-screen').classList.add('hidden');
  
  canvas = document.getElementById('game-canvas');
  renderer = new CanvasRenderer(canvas);
  
  const playerHero = HEROES.find(h => h.id === selectedHeroId);
  game = new Game(canvas, renderer);
  game.playerCount = selectedPlayerCount;
  game.playerHero = playerHero;
  game.globalModifier = GLOBAL_MODIFIERS[Math.floor(Math.random() * GLOBAL_MODIFIERS.length)];
  
  setupGameInput();
  game.init();
  requestAnimationFrame(gameLoop);
}

function setupGameInput() {
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
  canvas.addEventListener('mousemove', handleMouseMove);
}

function handleCanvasClick(e) {
  if (!game || game.gamePhase !== 'playing') return;
  
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const player = game.characters.find(c => c.isPlayer);
  if (!player) return;
  
  isPlayerTurn = game.currentTurnChar?.id === 'player';
  if (!isPlayerTurn) return;
  
  // Check hand cards area
  const handAreaY = renderer.height - 180;
  const cardWidth = 70;
  const cardHeight = 100;
  const startX = renderer.width / 2 - (player.handCards.length * cardWidth) / 2;
  
  // Check skill button
  const skillBtnX = renderer.width - 120;
  const skillBtnY = renderer.height - 100;
  if (x >= skillBtnX - 80 && x <= skillBtnX + 80 && y >= skillBtnY - 40 && y <= skillBtnY + 40) {
    const skill = player.hero.active;
    if (skill && game.canUseSkill(player, skill)) {
      game.useActiveSkill(player, skill);
      return;
    }
  }
  
  // Check end turn button
  const endBtnX = renderer.width - 120;
  const endBtnY = renderer.height - 40;
  if (x >= endBtnX - 50 && x <= endBtnX + 50 && y >= endBtnY - 18 && y <= endBtnY + 18) {
    game.endTurn(player);
    return;
  }
  
  // Check hand cards
  player.handCards.forEach((card, idx) => {
    const cardX = startX + idx * cardWidth + cardWidth / 2;
    const cardY = handAreaY;
    if (x >= cardX - cardWidth/2 && x <= cardX + cardWidth/2 && y >= cardY - cardHeight/2 && y <= cardY + cardHeight/2) {
      handleCardClick(card, idx);
    }
  });
  
  // Check target selection
  if (game.selectedCard && game.selectedCard.canTarget) {
    const enemies = game.characters.filter(c => !c.isPlayer && c.isAlive);
    enemies.forEach((enemy, idx) => {
      const enemyX = renderer.width / 2 + (idx - (enemies.length - 1) / 2) * 100;
      const enemyY = 150;
      const dist = Math.sqrt((x - enemyX) ** 2 + (y - enemyY) ** 2);
      if (dist < 50) {
        selectTarget(enemy);
      }
    });
  }
}

function handleTouchStart(e) {
  e.preventDefault();
  const touch = e.touches[0];
  handleCanvasClick({ clientX: touch.clientX, clientY: touch.clientY });
}

function handleMouseMove(e) {
  if (!game || game.gamePhase !== 'playing') return;
  
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const player = game.characters.find(c => c.isPlayer);
  if (!player) return;
  
  // Check hand cards hover
  const handAreaY = renderer.height - 150;
  const cardWidth = 65;
  const cardHeight = 95;
  const totalWidth = player.handCards.length * cardWidth + (player.handCards.length - 1) * 5;
  const startX = renderer.width / 2 - totalWidth / 2;
  
  let foundHover = -1;
  player.handCards.forEach((card, idx) => {
    const cardX = startX + idx * (cardWidth + 5) + cardWidth / 2;
    const cardY = handAreaY;
    if (x >= cardX - cardWidth/2 && x <= cardX + cardWidth/2 && y >= cardY - cardHeight/2 && y <= cardY + cardHeight/2) {
      foundHover = idx;
    }
  });
  
  game.hoveredCardIndex = foundHover;
}

function handleCardClick(card, idx) {
  const player = game.characters.find(c => c.isPlayer);
  const usedAttacks = game.usedAttacksThisTurn['player'] || 0;
  const maxAttacks = 1 + (player.extraAttacks || 0);
  
  if (card.name === '推理攻击' && usedAttacks >= maxAttacks) return;
  
  AudioSystem.play('select');
  
  if (game.selectedCard?.id === card.id) {
    game.selectedCard = null;
  } else {
    game.selectedCard = card;
    if (card.canTarget) {
      game.log(`${player.hero.name} 选择了 ${card.name}，请选择目标`, 'event');
    }
  }
}

function selectTarget(target) {
  const player = game.characters.find(c => c.isPlayer);
  if (!game.selectedCard) return;
  
  game.useCard(player, game.selectedCard, [target]);
  
  if (game.selectedCard.name === '推理攻击') {
    game.usedAttacksThisTurn['player'] = (game.usedAttacksThisTurn['player'] || 0) + 1;
  }
  
  game.log(`${player.hero.name} 对 ${target.hero.name} 使用了 ${game.selectedCard.name}`, 'damage');
  game.selectedCard = null;
}

function gameLoop() {
  if (!game || !renderer) return;
  
  renderer.clear();
  renderer.drawBackground();
  
  // Update particles
  game.particles.update();
  
  // Update event banner
  if (game.eventBanner) {
    game.eventBanner.life--;
    if (game.eventBanner.life <= 0) game.eventBanner = null;
  }
  
  // Draw game elements
  drawGameUI();
  
  // Draw particles on top
  game.particles.draw(renderer.ctx);
  
  // Draw event banner
  if (game.eventBanner) {
    const alpha = Math.min(1, game.eventBanner.life / 30);
    renderer.ctx.globalAlpha = alpha;
    renderer.drawEventBanner(game.eventBanner.text, game.eventBanner.subtext);
    renderer.ctx.globalAlpha = 1;
  }
  
  requestAnimationFrame(gameLoop);
}

function drawGameUI() {
  const ctx = renderer.ctx;
  const player = game.characters.find(c => c.isPlayer);
  const enemies = game.characters.filter(c => !c.isPlayer);
  isPlayerTurn = game.currentTurnChar?.id === 'player';
  
  // Draw enemies (top area)
  enemies.forEach((enemy, idx) => {
    const spacing = Math.min(100, (renderer.width - 100) / Math.max(enemies.length, 1));
    const startX = renderer.width / 2 - (enemies.length - 1) * spacing / 2;
    const x = startX + idx * spacing;
    const y = 120;
    
    const isTargetable = game.selectedCard && game.selectedCard.canTarget && enemy.isAlive;
    
    renderer.drawCharacterAvatar(x, y, enemy.hero, 45, {
      isCurrentTurn: game.currentTurnChar?.id === enemy.id,
      isDead: !enemy.isAlive,
      isTargetable,
      isHovered: false
    });
    
    if (enemy.isAlive) {
      renderer.drawHPBar(x, y + 55, 70, enemy.hp, enemy.maxHp);
    }
  });
  
  // Draw player area (bottom)
  if (player) {
    const playerY = renderer.height - 220;
    
    // Player avatar
    renderer.drawCharacterAvatar(renderer.width / 2, playerY, player.hero, 60, {
      isCurrentTurn: isPlayerTurn,
      isDead: !player.isAlive
    });
    
    // HP bar
    renderer.drawHPBar(renderer.width / 2, playerY + 75, 120, player.hp, player.maxHp);
    
    // Identity badge
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    ctx.roundRect(renderer.width / 2 + 70, playerY - 20, 80, 25, 6);
    ctx.fill();
    
    const identityColors = {
      master: '#ffd700',
      loyalist: '#00f0ff',
      rebel: '#ff3366',
      traitor: '#b000ff'
    };
    ctx.font = 'bold 12px "Noto Sans SC"';
    ctx.fillStyle = identityColors[player.identity.id];
    ctx.textAlign = 'left';
    ctx.fillText(player.identity.name, renderer.width / 2 + 78, playerY - 3);
    
    // Hand limit
    ctx.font = '11px "Noto Sans SC"';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.textAlign = 'center';
    ctx.fillText(`手牌: ${player.handCards.length}/${getHandLimit(player)}`, renderer.width / 2, playerY + 95);
    
    // Draw hand cards
    const handAreaY = renderer.height - 150;
    const cardWidth = 65;
    const cardHeight = 95;
    const totalWidth = player.handCards.length * cardWidth + (player.handCards.length - 1) * 5;
    const startX = renderer.width / 2 - totalWidth / 2;
    
    const usedAttacks = game.usedAttacksThisTurn['player'] || 0;
    const maxAttacks = 1 + (player.extraAttacks || 0);
    
    player.handCards.forEach((card, idx) => {
      const cardX = startX + idx * (cardWidth + 5) + cardWidth / 2;
      const cardY = handAreaY;
      const isSelected = game.selectedCard?.id === card.id;
      const isAttack = card.name === '推理攻击';
      const attackDisabled = isAttack && usedAttacks >= maxAttacks;
      const isHovered = game.hoveredCardIndex === idx;
      
      // Offset selected cards
      let offsetY = 0;
      if (isSelected) offsetY = -15;
      else if (isHovered) offsetY = -8;
      
      renderer.drawCard(cardX, cardY + offsetY, card, {
        width: cardWidth,
        height: cardHeight,
        selected: isSelected,
        hovered: isHovered && !isSelected
      });
    });
    
    // Draw equip slots
    const equipY = renderer.height - 50;
    const equipSize = 35;
    renderer.drawEquipSlot(renderer.width / 2 - 60, equipY, equipSize, player.equips.weapon, 'weapon');
    renderer.drawEquipSlot(renderer.width / 2, equipY, equipSize, player.equips.armor, 'armor');
    renderer.drawEquipSlot(renderer.width / 2 + 60, equipY, equipSize, player.equips.assist, 'assist');
    
    // Draw skill button
    const skill = player.hero.active;
    if (skill) {
      let canUse = game.canUseSkill(player, skill);
      let usedText = '已用完';
      if (skill.perTurn) usedText = '本回合';
      else if (skill.perGame) usedText = '本局';
      else if (skill.cost) usedText = '手牌不足';
      
      renderer.drawSkillButton(renderer.width - 120, renderer.height - 100, 150, 70, skill, canUse, usedText);
    }
    
    // Draw end turn button
    const canEndTurn = isPlayerTurn && player.isAlive;
    renderer.drawButton(renderer.width - 120, renderer.height - 40, 100, 36, '结束回合', { disabled: !canEndTurn });
  }
  
  // Draw deck info
  renderer.drawDeckInfo(80, renderer.height - 60, game.deck.length, game.discardPile.length);
  
  // Draw turn info
  const turnName = game.currentTurnChar?.hero.name || '';
  renderer.drawTurnInfo(renderer.width / 2, 30, game.round, turnName, isPlayerTurn);
  
  // Draw log area
  renderer.drawLogArea(10, renderer.height / 2 - 100, 200, 200, game.logs);
  
  // Draw global modifier indicator
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.beginPath();
  ctx.roundRect(10, 50, 150, 30, 6);
  ctx.fill();
  ctx.font = '11px "Noto Sans SC"';
  ctx.fillStyle = '#b000ff';
  ctx.textAlign = 'left';
  ctx.fillText(`修饰: ${game.globalModifier.name}`, 20, 70);
}

function showModal(title, choices) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  
  content.innerHTML = `
    <div class="modal-title">${title}</div>
    <div class="choice-grid">
      ${choices.map((c, i) => `
        <button class="choice-btn" data-index="${i}">
          <div class="choice-title">${c.title}</div>
          <div class="choice-desc">${c.desc}</div>
        </button>
      `).join('')}
    </div>
  `;
  
  overlay.classList.remove('hidden');
  
  content.querySelectorAll('.choice-btn').forEach((btn, i) => {
    btn.onclick = () => {
      if (choices[i] && choices[i].onClick) choices[i].onClick();
    };
  });
}

function hideModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

function showResultScreen(isPlayerWinner, winner, g) {
  const resultScreen = document.getElementById('result-screen');
  const title = document.getElementById('result-title');
  const message = document.getElementById('result-message');
  const details = document.getElementById('result-details');
  
  title.textContent = isPlayerWinner ? '🏆 胜利！' : '💀 失败';
  title.className = isPlayerWinner ? 'victory' : 'defeat';
  
  if (winner) {
    const identityName = winner.identity.name;
    if (isPlayerWinner) {
      message.textContent = `你以${identityName}身份取得了胜利！`;
    } else {
      message.textContent = `${winner.hero.name} 以${identityName}身份获胜`;
    }
  } else {
    message.textContent = '游戏结束，无人生还';
  }
  
  details.innerHTML = g.characters.map(char => `
    <div class="result-detail">
      <span class="name">${char.hero.emoji} ${char.hero.name}</span>
      <span class="identity ${char.identity.class}">${char.identity.name}</span>
      <span>${char.isAlive ? '存活' : '阵亡'}</span>
    </div>
  `).join('');
  
  resultScreen.classList.remove('hidden');
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', initUI);
