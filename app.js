// ===== AI Model Three Kingdoms Kill - Game Engine =====

// ===== Global State =====
let game = null;

// ===== Game Data =====
const HEROES = [
  {
    id: 'deepseek-v4',
    name: 'DeepSeek V4',
    title: '性价比之王',
    hp: 4,
    maxHp: 4,
    color: '#4a9eff',
    rarity: 'SSR',
    passive: { name: '碾压低价', desc: '每回合第一次出推理攻击时，伤害+1' },
    active: { name: '成本优化', desc: '弃1张手牌，摸2张牌（每回合1次）', cost: 1, draw: 2, perTurn: 1 },
    emoji: '🔥'
  },
  {
    id: 'deepseek-v3.2',
    name: 'DeepSeek V3.2',
    title: '推理大师',
    hp: 3,
    maxHp: 3,
    color: '#3d8bff',
    rarity: 'SSR',
    passive: { name: '链式思维', desc: '每回合可出2张推理攻击（而非1张）' },
    active: { name: '深度推理', desc: '弃2张手牌，对任意1人造成2点伤害（每局3次）', cost: 2, damage: 2, perGame: 3 },
    emoji: '🏆'
  },
  {
    id: 'claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    title: '均衡战士',
    hp: 4,
    maxHp: 4,
    color: '#d4a574',
    rarity: 'SSR',
    passive: { name: '完美平衡', desc: '手牌上限+1，摸牌阶段多摸1张' },
    active: { name: '优雅应对', desc: '将1张手牌当自我辩护使用（每回合1次）', cost: 1, perTurn: 1 },
    emoji: '👑'
  },
  {
    id: 'claude-opus-4.5',
    name: 'Claude Opus 4.5',
    title: '编码之神',
    hp: 3,
    maxHp: 3,
    color: '#c49a6c',
    rarity: 'UR',
    passive: { name: 'SWE之王', desc: '装备攻击武器后，推理攻击伤害+1' },
    active: { name: '重构代码', desc: '弃2张手牌，令1名角色弃掉所有装备（每局2次）', cost: 2, perGame: 2 },
    emoji: '💎'
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o-mini',
    title: '闪电刺客',
    hp: 3,
    maxHp: 3,
    color: '#10a37f',
    rarity: 'SR',
    passive: { name: '极速响应', desc: '被推理攻击时，50%概率自动闪避' },
    active: { name: '快速迭代', desc: '摸1张牌，本回合可额外出1张推理攻击（每回合1次）', draw: 1, perTurn: 1 },
    emoji: '⚡'
  },
  {
    id: 'gpt-5.4',
    name: 'GPT-5.4',
    title: '全能之神',
    hp: 4,
    maxHp: 4,
    color: '#0fa37f',
    rarity: 'UR',
    passive: { name: '全能理解', desc: '可以将任意手牌当任意基本牌使用' },
    active: { name: '超级推理', desc: '弃3张牌，指定1名角色直接扣2HP（每局2次）', cost: 3, perGame: 2 },
    emoji: '🧠'
  },
  {
    id: 'gemini-3-pro',
    name: 'Gemini 3 Pro',
    title: '千维智者',
    hp: 4,
    maxHp: 4,
    color: '#4285f4',
    rarity: 'SSR',
    passive: { name: '百万上下文', desc: '手牌上限为HP+3（而非HP值）' },
    active: { name: '多模态感知', desc: '查看任意1名角色的所有手牌和身份（每局1次）', perGame: 1 },
    emoji: '🌍'
  },
  {
    id: 'qwen-3.5-plus',
    name: 'Qwen 3.5-Plus',
    title: '百语术士',
    hp: 4,
    maxHp: 4,
    color: '#ff6a00',
    rarity: 'SSR',
    passive: { name: '201语言', desc: '出牌阶段可出2张锦囊牌（而非1张）' },
    active: { name: '语言风暴', desc: '弃1张牌，随机获取牌堆中1张锦囊牌（每回合1次）', cost: 1, perTurn: 1 },
    emoji: '🚀'
  },
  {
    id: 'glm-5',
    name: 'GLM-5',
    title: '开源巨兽',
    hp: 5,
    maxHp: 5,
    color: '#3b82f6',
    rarity: 'SSR',
    passive: { name: '开源之力', desc: 'HP上限5，受到致命伤害时有30%概率保留1HP' },
    active: { name: '744B觉醒', desc: '弃2张牌，本回合推理攻击伤害翻倍（每局2次）', cost: 2, perGame: 2 },
    emoji: '🐘'
  },
  {
    id: 'grok-4',
    name: 'Grok 4',
    title: '叛逆浪客',
    hp: 3,
    maxHp: 3,
    color: '#1da1f2',
    rarity: 'SR',
    passive: { name: '全网搜索', desc: '摸牌阶段多摸1张牌' },
    active: { name: '真相揭露', desc: '弃1张牌，查看1名角色身份并强制其弃1张牌（每局2次）', cost: 1, perGame: 2 },
    emoji: '🐦'
  },
  {
    id: 'kimi-k2.5',
    name: 'Kimi K2.5',
    title: '暗夜猎手',
    hp: 3,
    maxHp: 3,
    color: '#8b5cf6',
    rarity: 'SR',
    passive: { name: 'MoE潜行', desc: '攻击范围不限（可攻击任何人）' },
    active: { name: '暗影突袭', desc: '弃1张牌，对任意角色造成1点伤害，不可闪避（每局3次）', cost: 1, perGame: 3 },
    emoji: '🌙'
  },
  {
    id: 'llama-4',
    name: 'Llama 4',
    title: '开源游侠',
    hp: 4,
    maxHp: 4,
    color: '#7c3aed',
    rarity: 'R',
    passive: { name: '开源社区', desc: '每次有人使用开源运动牌时，你额外回复1HP' },
    active: { name: '社区支援', desc: '弃1张牌，令1名濒死角色回复1HP（每回合1次）', cost: 1, perTurn: 1 },
    emoji: '🦙'
  }
];

const IDENTITIES = {
  MASTER: { id: 'master', name: '平台方', class: 'identity-master', desc: '主公，公开身份，HP+1', isPublic: true },
  LOYALIST: { id: 'loyalist', name: '维护者', class: 'identity-loyalist', desc: '忠臣，暗置身份，保护主公' },
  REBEL: { id: 'rebel', name: '挑战者', class: 'identity-rebel', desc: '反贼，暗置身份，击杀主公' },
  TRAITOR: { id: 'traitor', name: '卧底', class: 'identity-traitor', desc: '内奸，暗置身份，成为最后存活者' }
};

const CARD_TYPES = {
  ATTACK: 'attack',
  DEFEND: 'defend',
  TRICK: 'trick',
  EQUIP: 'equip'
};

const CARD_DEFS = {
  '推理攻击': {
    type: 'attack', emoji: '⚔️', name: '推理攻击',
    desc: '对范围内1人造成1点伤害，每回合限出1张',
    canTarget: true, targetCount: 1, range: 1
  },
  '自我辩护': {
    type: 'defend', emoji: '🛡️', name: '自我辩护',
    desc: '抵消1次推理攻击'
  },
  '模型更新': {
    type: 'defend', emoji: '💚', name: '模型更新',
    desc: '回复1点HP，或濒死时自救'
  },
  'API限流': {
    type: 'trick', emoji: '🚫', name: 'API限流',
    desc: '弃掉目标1张手牌',
    canTarget: true, targetCount: 1, range: 1
  },
  '参数泄露': {
    type: 'trick', emoji: '📤', name: '参数泄露',
    desc: '获取目标1张手牌',
    canTarget: true, targetCount: 1, range: 1
  },
  '全网评测': {
    type: 'trick', emoji: '💥', name: '全网评测',
    desc: '对所有其他角色造成1点伤害'
  },
  '紧急补丁': {
    type: 'trick', emoji: '🔧', name: '紧急补丁',
    desc: '抵消1张锦囊牌'
  },
  '开源运动': {
    type: 'trick', emoji: '🤝', name: '开源运动',
    desc: '所有角色回复1HP'
  },
  '数据投毒': {
    type: 'trick', emoji: '☠️', name: '数据投毒',
    desc: '与目标轮流出推理攻击，先不出的受1伤害',
    canTarget: true, targetCount: 1, range: 1
  },
  '推理链': {
    type: 'trick', emoji: '🔗', name: '推理链',
    desc: '摸2张牌'
  },
  '模型蒸馏': {
    type: 'trick', emoji: '🎭', name: '模型蒸馏',
    desc: '令目标对另一目标出推理攻击',
    canTarget: true, targetCount: 1, range: 1
  }
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
  
  if (char.hero.id === 'gemini-3-pro') {
    limit = char.hp + 3;
  }
  
  if (char.hero.id === 'claude-3.5-sonnet') {
    limit += 1;
  }
  
  if (char.equips.assist && char.equips.assist.name === '128K上下文') {
    limit += game.equipDouble ? 4 : 2;
  }
  
  if (char.handLimitBonus) {
    limit += char.handLimitBonus;
  }
  
  if (game.allHandLimitBonus) {
    limit += game.allHandLimitBonus;
  }
  
  return limit;
}

// ===== Game Class =====
class Game {
  constructor(playerCount, playerHero) {
    this.playerCount = playerCount;
    this.playerHero = playerHero;
    this.currentTurnIndex = 0;
    this.round = 1;
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
    this.globalModifier = null;
    this.allRangeBonus = 0;
    this.allHandLimitBonus = 0;
    this.allDrawBonus = 0;
    this.allHpPenalty = 0;
    this.equipDouble = false;
    this.attacker = null;
  }
  
  init() {
    // Create deck
    this.deck = this.createDeck();
    
    // Assign identities
    this.assignIdentities();
    
    // Apply global modifier
    if (this.globalModifier) {
      this.globalModifier.effect(this);
    }
    
    // Deal initial cards
    this.characters.forEach(char => {
      this.drawCards(char, 4);
    });
    
    this.gamePhase = 'playing';
    this.log(`游戏开始！全局修饰：${this.globalModifier.name}`, 'event');
  }
  
  createDeck() {
    const deck = [];
    
    // Basic Cards
    for (let i = 0; i < 12; i++) {
      deck.push({ ...CARD_DEFS['推理攻击'], id: generateId() });
    }
    for (let i = 0; i < 8; i++) {
      deck.push({ ...CARD_DEFS['自我辩护'], id: generateId() });
    }
    for (let i = 0; i < 6; i++) {
      deck.push({ ...CARD_DEFS['模型更新'], id: generateId() });
    }
    
    // Trick Cards
    for (let i = 0; i < 4; i++) {
      deck.push({ ...CARD_DEFS['API限流'], id: generateId() });
    }
    for (let i = 0; i < 4; i++) {
      deck.push({ ...CARD_DEFS['参数泄露'], id: generateId() });
    }
    for (let i = 0; i < 2; i++) {
      deck.push({ ...CARD_DEFS['全网评测'], id: generateId() });
    }
    for (let i = 0; i < 3; i++) {
      deck.push({ ...CARD_DEFS['紧急补丁'], id: generateId() });
    }
    for (let i = 0; i < 2; i++) {
      deck.push({ ...CARD_DEFS['开源运动'], id: generateId() });
    }
    for (let i = 0; i < 2; i++) {
      deck.push({ ...CARD_DEFS['数据投毒'], id: generateId() });
    }
    for (let i = 0; i < 4; i++) {
      deck.push({ ...CARD_DEFS['推理链'], id: generateId() });
    }
    for (let i = 0; i < 2; i++) {
      deck.push({ ...CARD_DEFS['模型蒸馏'], id: generateId() });
    }
    
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
    
    // Player
    const player = this.createCharacter('player', this.playerHero, shuffled[0]);
    this.characters.push(player);
    
    // AI characters
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
    
    if (identity.id === 'master') {
      hp += 1;
      maxHp += 1;
    }
    
    if (this.globalModifier?.id === 'resource-limited') {
      hp -= 1;
      maxHp -= 1;
    }
    
    return {
      id,
      hero,
      hp: Math.max(1, hp),
      maxHp: Math.max(1, maxHp),
      handCards: [],
      equips: { weapon: null, armor: null, assist: null },
      identity,
      isPlayer: id === 'player',
      isAlive: true,
      skillsUsed: { active: 0, perGame: {} },
      extraAttacks: 0,
      extraDraws: 0,
      damageDraws: 0,
      retaliate: false,
      handLimitBonus: 0
    };
  }
  
  getAliveCharacters() {
    return this.characters.filter(c => c.isAlive);
  }
  
  getAliveOthers(char) {
    return this.getAliveCharacters().filter(c => c.id !== char.id);
  }
  
  drawCards(char, count) {
    for (let i = 0; i < count; i++) {
      if (this.deck.length === 0) {
        this.deck = shuffle(this.discardPile);
        this.discardPile = [];
      }
      if (this.deck.length > 0) {
        char.handCards.push(this.deck.pop());
      }
    }
  }
  
  dealDamage(source, target, amount, reason) {
    // Check armor
    if (target.equips.armor && amount > 0) {
      const reduction = this.equipDouble ? 2 : 1;
      amount = Math.max(0, amount - reduction);
      if (amount === 0) {
        this.log(`${target.hero.name} 的装备抵挡了攻击！`, 'heal');
        this.renderGame();
        return;
      }
    }
    
    // GPT-4o-mini passive
    if (target.hero.id === 'gpt-4o-mini' && reason === '推理攻击' && Math.random() < 0.5) {
      this.log(`${target.hero.name} 极速响应闪避了攻击！`, 'heal');
      this.renderGame();
      return;
    }
    
    target.hp -= amount;
    this.attacker = source;
    this.showDamageNumber(target, amount);
    
    // Damage draw reward
    if (source && source.damageDraws > 0 && amount > 0) {
      this.drawCards(source, source.damageDraws);
      this.log(`${source.hero.name} 造成伤害，摸${source.damageDraws}张牌`, 'draw');
    }
    
    // Retaliation
    if (target.retaliate && Math.random() < 0.5 && source && source.isAlive) {
      source.hp -= 1;
      this.showDamageNumber(source, 1);
      this.log(`${target.hero.name} 对抗训练反弹1点伤害！`, 'damage');
    }
    
    // GLM-5 passive
    if (target.hero.id === 'glm-5' && target.hp <= 0 && Math.random() < 0.3) {
      target.hp = 1;
      this.log(`${target.hero.name} 开源之力保命！`, 'heal');
    }
    
    if (target.hp <= 0) {
      this.handleDeath(target, source);
    }
    
    this.renderGame();
  }
  
  healCharacter(source, target, amount) {
    const oldHp = target.hp;
    target.hp = Math.min(target.hp + amount, target.maxHp);
    const healed = target.hp - oldHp;
    if (healed > 0) {
      this.showHealNumber(target, healed);
      this.log(`${target.hero.name} 回复${healed}HP`, 'heal');
    }
    this.renderGame();
  }
  
  handleDeath(deadChar, killer) {
    deadChar.isAlive = false;
    deadChar.handCards.forEach(card => this.discardPile.push(card));
    deadChar.handCards = [];
    
    Object.values(deadChar.equips).forEach(equip => {
      if (equip) this.discardPile.push(equip);
    });
    deadChar.equips = { weapon: null, armor: null, assist: null };
    
    this.log(`${deadChar.hero.name} 被击杀！`, 'death');
    
    if (killer && killer.isAlive) {
      this.giveKillReward(killer);
    }
    
    this.renderGame();
    this.checkWinCondition();
  }
  
  giveKillReward(char) {
    if (char.killRewards && char.killRewards[char.id]) return;
    
    char.killRewards = char.killRewards || {};
    char.killRewards[char.id] = true;
    
    const rewards = shuffle([...ROGUELIKE_REWARDS]).slice(0, 3);
    
    if (char.isPlayer) {
      showModal('击杀奖励！选择一项天赋', rewards.map(r => ({
        title: r.name,
        desc: r.desc,
        onClick: () => {
          this.applyReward(char, r);
          hideModal();
        }
      })));
    } else {
      const reward = rewards[Math.floor(Math.random() * rewards.length)];
      this.applyReward(char, reward);
    }
  }
  
  applyReward(char, reward) {
    switch (reward.id) {
      case 'param-expand':
        char.maxHp++;
        char.hp = Math.min(char.hp + 1, char.maxHp);
        break;
      case '推理加速':
        char.extraAttacks = (char.extraAttacks || 0) + 1;
        break;
      case 'cache-hit':
        char.extraDraws = (char.extraDraws || 0) + 1;
        break;
      case 'data-flywheel':
        char.damageDraws = (char.damageDraws || 0) + 1;
        break;
      case 'adversarial':
        char.retaliate = true;
        break;
      case 'knowledge-distill':
        char.seeAttacker = true;
        break;
      case 'multi-task':
        char.handLimitBonus = (char.handLimitBonus || 0) + 2;
        break;
      case 'sft':
        char.transformBasic = true;
        break;
    }
    
    this.log(`${char.hero.name} 获得了天赋：${reward.name}`, 'event');
    this.renderGame();
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
    
    // Handle different card types
    switch (card.name) {
      case '推理攻击':
        if (targets.length > 0) {
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
        this.getAliveOthers(char).forEach(c => {
          this.dealDamage(char, c, 1, '全网评测');
        });
        break;
        
      case '开源运动':
        this.getAliveCharacters().forEach(c => {
          this.healCharacter(char, c, 1);
        });
        // Llama passive
        const llama = this.getAliveCharacters().find(c => c.hero.id === 'llama-4');
        if (llama && Math.random() < 0.5) {
          this.healCharacter(char, llama, 1);
          this.log(`${llama.hero.name} 开源之力额外回复1HP`, 'heal');
        }
        break;
        
      case '推理链':
        this.drawCards(char, 2);
        break;
        
      case '数据投毒':
        if (targets.length > 0) {
          const target = targets[0];
          const charAttacks = char.handCards.filter(c => c.name === '推理攻击').length;
          const targetAttacks = target.handCards.filter(c => c.name === '推理攻击').length;
          
          if (charAttacks === 0) {
            this.dealDamage(target, char, 1, '数据投毒');
          } else if (targetAttacks === 0) {
            this.dealDamage(char, target, 1, '数据投毒');
          }
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
    
    // Remove from hand
    const idx = char.handCards.findIndex(c => c.id === card.id);
    if (idx !== -1) {
      char.handCards.splice(idx, 1);
    }
    
    // Add to discard (unless equip)
    if (card.type !== 'equip') {
      this.discardPile.push(card);
    }
    
    this.renderGame();
  }
  
  equipItem(char, card) {
    const subtype = card.subtype;
    
    if (char.equips[subtype]) {
      this.discardPile.push(char.equips[subtype]);
    }
    
    char.equips[subtype] = card;
    
    const idx = char.handCards.findIndex(c => c.id === card.id);
    if (idx !== -1) {
      char.handCards.splice(idx, 1);
    }
    
    this.log(`${char.hero.name} 装备了 ${card.name}`, 'draw');
    this.renderGame();
  }
  
  // ===== Turn System =====
  startTurn(char) {
    this.currentTurnChar = char;
    this.usedSkillsThisTurn[char.id] = 0;
    this.usedAttacksThisTurn[char.id] = this.usedAttacksThisTurn[char.id] || 0;
    this.extraAttacksThisTurn[char.id] = char.extraAttacks || 0;
    this.trickDisabled = false;
    
    let drawCount = 2;
    
    if (char.hero.id === 'claude-3.5-sonnet') drawCount += 1;
    if (char.hero.id === 'grok-4') drawCount += 1;
    if (char.equips.assist && char.equips.assist.name === '多模态接口') {
      drawCount += this.equipDouble ? 2 : 1;
    }
    if (char.extraDraws) drawCount += char.extraDraws;
    if (this.allDrawBonus) drawCount += this.allDrawBonus;
    if (this.nextTurnDrawPenalty) {
      drawCount = Math.max(1, drawCount - 1);
      this.nextTurnDrawPenalty = false;
    }
    
    this.drawCards(char, drawCount);
    this.discardExcessCards(char);
    
    this.log(`${char.hero.name} 开始了回合，摸${drawCount}张牌`, 'draw');
    this.renderGame();
    
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
      this.updateTurnInfo();
      
      if (this.round % 3 === 0) {
        this.triggerRandomEvent();
      }
    }
    
    const nextChar = this.characters[nextIdx];
    if (nextChar && nextChar.isAlive) {
      this.startTurn(nextChar);
    }
  }
  
  triggerRandomEvent() {
    const event = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
    
    switch (event.name) {
      case '新版本发布':
        this.getAliveCharacters().forEach(c => this.drawCards(c, 2));
        break;
      case '训练数据泄露':
        this.getAliveCharacters().forEach(c => {
          if (c.handCards.length > 0) {
            const idx = Math.floor(Math.random() * c.handCards.length);
            const card = c.handCards.splice(idx, 1)[0];
            this.discardPile.push(card);
          }
        });
        break;
      case 'GPU短缺':
        this.nextTurnDrawPenalty = true;
        break;
      case 'API免费额度':
        this.getAliveCharacters().forEach(c => this.healCharacter(null, c, 1));
        break;
      case '模型下线':
        const targets = this.getAliveCharacters();
        const target = targets[Math.floor(Math.random() * targets.length)];
        this.dealDamage(null, target, 2, '模型下线');
        break;
      case '开源突破':
        const equipKeys = Object.keys(EQUIP_DEFS);
        this.getAliveCharacters().forEach(c => {
          const equipKey = equipKeys[Math.floor(Math.random() * equipKeys.length)];
          c.handCards.push({ ...EQUIP_DEFS[equipKey], id: generateId() });
        });
        break;
      case '基准测试':
        const chars = this.getAliveCharacters();
        let maxAttack = 0, bestChar = null;
        chars.forEach(c => {
          const count = c.handCards.filter(card => card.name === '推理攻击').length;
          if (count > maxAttack) {
            maxAttack = count;
            bestChar = c;
          }
        });
        if (bestChar) this.drawCards(bestChar, 2);
        break;
      case '对齐审查':
        this.trickDisabled = true;
        break;
    }
    
    this.showGlobalEvent(event.name, event.desc);
    this.updateTurnInfo();
  }
  
  // ===== AI Logic =====
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
    
    // Use active skill first
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
    
    // Check attack cards
    const attackCards = char.handCards.filter(c => c.name === '推理攻击');
    const attackCount = this.usedAttacksThisTurn[char.id] || 0;
    const maxAttacks = 1 + (char.extraAttacks || 0);
    
    if (attackCards.length > 0 && attackCount < maxAttacks) {
      let target = null;
      
      if (identity === 'rebel' && master) {
        target = master;
      } else if (identity === 'master' || identity === 'loyalist') {
        target = aliveChars
          .filter(c => c.identity.id !== 'master')
          .sort((a, b) => {
            if (a.hp !== b.hp) return a.hp - b.hp;
            return b.handCards.length - a.handCards.length;
          })[0];
      } else if (identity === 'traitor' && Math.random() < 0.3) {
        target = aliveChars[Math.floor(Math.random() * aliveChars.length)];
      }
      
      if (target) {
        return { type: 'attack', card: attackCards[0], target };
      }
    }
    
    // Use trick cards
    const trickCards = char.handCards.filter(c => c.type === 'trick');
    if (trickCards.length > 0 && !this.trickDisabled) {
      const drawCard = trickCards.find(c => c.name === '推理链');
      if (drawCard) return { type: 'play', card: drawCard, targets: [] };
      
      const healCard = trickCards.find(c => c.name === '开源运动');
      if (healCard && char.hp < char.maxHp) return { type: 'play', card: healCard, targets: [] };
      
      const otherTrick = trickCards[0];
      if (otherTrick.canTarget && aliveChars.length > 0) {
        return { type: 'play', card: otherTrick, targets: [aliveChars[0]] };
      }
      return { type: 'play', card: otherTrick, targets: [] };
    }
    
    // Equip weapons
    const weapons = char.handCards.filter(c => c.subtype === 'weapon');
    if (weapons.length > 0 && !char.equips.weapon) {
      return { type: 'equip', card: weapons[0] };
    }
    
    // Use heal if needed
    const healCards = char.handCards.filter(c => c.name === '模型更新');
    if (healCards.length > 0 && char.hp <= 2) {
      return { type: 'play', card: healCards[0], targets: [char] };
    }
    
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
          const dodge = defender.handCards.splice(dodgeIdx, 1)[0];
          this.discardPile.push(dodge);
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
    
    this.renderGame();
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
    
    // Discard cost cards
    if (skill.cost) {
      for (let i = 0; i < skill.cost; i++) {
        if (char.handCards.length > 0) {
          const idx = Math.floor(Math.random() * char.handCards.length);
          const card = char.handCards.splice(idx, 1)[0];
          this.discardPile.push(card);
        }
      }
    }
    
    // Execute skill
    if (skill.draw) {
      this.drawCards(char, skill.draw);
    }
    
    if (skill.damage) {
      const target = aliveOthers[Math.floor(Math.random() * aliveOthers.length)];
      this.dealDamage(char, target, skill.damage, skill.name);
    }
    
    if (skill.name === '快速迭代') {
      this.extraAttacksThisTurn[char.id]++;
    }
    
    // Track usage
    this.usedSkillsThisTurn[char.id] = (this.usedSkillsThisTurn[char.id] || 0) + 1;
    if (skill.perGame) {
      char.skillsUsed.perGame[skill.name] = (char.skillsUsed.perGame[skill.name] || 0) + 1;
    }
    
    this.log(`${char.hero.name} 使用了技能：${skill.name}`, 'event');
    this.renderGame();
    
    return true;
  }
  
  // ===== Win Condition =====
  checkWinCondition() {
    const aliveChars = this.getAliveCharacters();
    
    if (aliveChars.length <= 1) {
      this.endGame(aliveChars[0]);
      return true;
    }
    
    const master = aliveChars.find(c => c.identity.id === 'master');
    
    if (!master) {
      const rebels = aliveChars.filter(c => c.identity.id === 'rebel');
      const loyalists = aliveChars.filter(c => c.identity.id === 'loyalist');
      
      if (rebels.length > 0 && loyalists.length === 0) {
        this.endGame(rebels[0]);
        return true;
      }
      
      if (aliveChars.length === 1 && aliveChars[0].identity.id === 'traitor') {
        this.endGame(aliveChars[0]);
        return true;
      }
    }
    
    const enemiesOfMaster = aliveChars.filter(c => 
      c.identity.id !== 'master' && c.identity.id !== 'loyalist'
    );
    
    if (master && enemiesOfMaster.length === 0) {
      this.endGame(master);
      return true;
    }
    
    return false;
  }
  
  endGame(winner) {
    this.gamePhase = 'ended';
    
    const isPlayerWinner = winner?.isPlayer;
    showResultScreen(isPlayerWinner, winner, this);
  }
  
  // ===== UI Helpers =====
  log(msg, type = '') {
    this.logs.push({ msg, type, time: Date.now() });
    const logContent = document.getElementById('log-content');
    if (logContent) {
      logContent.innerHTML = `<div class="log-entry ${type}">${msg}</div>` + logContent.innerHTML;
      if (logContent.children.length > 50) {
        logContent.removeChild(logContent.lastChild);
      }
    }
  }
  
  showDamageNumber(target, amount) {
    const container = target.isPlayer 
      ? document.getElementById('player-area') 
      : document.getElementById('enemies-area');
    const field = document.getElementById('battle-field');
    
    if (!container || !field) return;
    
    const dmgEl = document.createElement('div');
    dmgEl.className = 'damage-number';
    dmgEl.textContent = `-${amount}`;
    dmgEl.style.left = '50%';
    dmgEl.style.top = '50%';
    dmgEl.style.transform = 'translate(-50%, -50%)';
    
    field.appendChild(dmgEl);
    setTimeout(() => dmgEl.remove(), 1000);
  }
  
  showHealNumber(target, amount) {
    const container = target.isPlayer 
      ? document.getElementById('player-area') 
      : document.getElementById('enemies-area');
    const field = document.getElementById('battle-field');
    
    if (!container || !field) return;
    
    const healEl = document.createElement('div');
    healEl.className = 'damage-number heal';
    healEl.textContent = `+${amount}`;
    healEl.style.left = '50%';
    healEl.style.top = '50%';
    healEl.style.transform = 'translate(-50%, -50%)';
    
    field.appendChild(healEl);
    setTimeout(() => healEl.remove(), 1000);
  }
  
  showGlobalEvent(title, desc) {
    const eventEl = document.createElement('div');
    eventEl.className = 'global-event';
    eventEl.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
    document.body.appendChild(eventEl);
    setTimeout(() => eventEl.remove(), 2500);
  }
  
  updateTurnInfo() {
    const turnInfo = document.getElementById('turn-info');
    const roundEvent = document.getElementById('round-event');
    
    if (turnInfo) turnInfo.textContent = `回合: ${this.round}`;
    if (roundEvent) {
      roundEvent.textContent = '⚡ 随机事件触发！';
      setTimeout(() => { if (roundEvent) roundEvent.textContent = ''; }, 3000);
    }
  }
  
  renderGame() {
    renderEnemies(this);
    renderPlayer(this);
    renderHandCards(this);
    updateDeckInfo(this);
  }
}

// ===== UI Render Functions =====
function renderEnemies(g) {
  const container = document.getElementById('enemies-area');
  if (!container || !g) return;
  
  const enemies = g.characters.filter(c => !c.isPlayer);
  container.innerHTML = enemies.map(char => {
    const isCurrentTurn = g.currentTurnChar?.id === char.id;
    const isDead = !char.isAlive;
    const isTargetable = g.selectedCard && g.selectedCard.canTarget;
    
    return `
      <div class="character-card ${isCurrentTurn ? 'current-turn' : ''} ${isDead ? 'dead' : ''} ${isTargetable && !isDead ? 'targetable' : ''}"
           data-id="${char.id}"
           ${!isDead && isTargetable ? `onclick="selectTarget('${char.id}')"` : ''}>
        <span class="char-emoji">${char.hero.emoji}</span>
        <div class="char-name">${char.hero.name}</div>
        ${!isDead ? `
          <div class="hp-bar-container">
            <div class="hp-bar">
              <div class="hp-fill ${getHpClass(char)}" style="width: ${(char.hp / char.maxHp) * 100}%"></div>
            </div>
            <div class="hp-text">${char.hp}/${char.maxHp}</div>
          </div>
          <div class="equip-slots">
            ${renderEquipSlots(char)}
          </div>
        ` : '<div style="color: #999; font-size: 0.7rem; margin-top: 8px;">已阵亡</div>'}
      </div>
    `;
  }).join('');
}

function renderPlayer(g) {
  const player = g?.characters.find(c => c.isPlayer);
  const container = document.getElementById('player-area');
  if (!container || !player) return;
  
  container.innerHTML = `
    <div class="player-info">
      <div class="player-hero-icon" style="border-color: ${player.hero.color}">
        <span class="emoji">${player.hero.emoji}</span>
        <span class="name">${player.hero.name}</span>
      </div>
      <div class="player-details">
        <span class="player-identity ${player.identity.class}">${player.identity.name}</span>
        <div class="player-hp-bar">
          <div class="player-hp-fill ${getHpClass(player)}" style="width: ${(player.hp / player.maxHp) * 100}%"></div>
        </div>
        <div class="player-stats">
          <span>HP: ${player.hp}/${player.maxHp}</span>
          <span>手牌: ${player.handCards.length}</span>
          <span>上限: ${getHandLimit(player)}</span>
        </div>
      </div>
    </div>
    <div class="player-equips">
      ${renderPlayerEquips(player)}
    </div>
    <div class="player-skills">
      ${renderPlayerSkills(player, g)}
    </div>
  `;
}

function renderEquipSlots(char) {
  const weaponEmojis = ['🖥️', '⚡'];
  const armorEmojis = ['🛡️', '⚖️'];
  const assistEmojis = ['📜', '🔮'];
  
  let html = '';
  
  if (char.equips.weapon) {
    html += `<div class="equip-slot filled" title="${char.equips.weapon.name}">${char.equips.weapon.emoji}</div>`;
  } else {
    html += `<div class="equip-slot" title="武器槽">${weaponEmojis[Math.floor(Math.random() * weaponEmojis.length)]}</div>`;
  }
  
  if (char.equips.armor) {
    html += `<div class="equip-slot filled" title="${char.equips.armor.name}">${char.equips.armor.emoji}</div>`;
  } else {
    html += `<div class="equip-slot" title="防具槽">${armorEmojis[Math.floor(Math.random() * armorEmojis.length)]}</div>`;
  }
  
  if (char.equips.assist) {
    html += `<div class="equip-slot filled" title="${char.equips.assist.name}">${char.equips.assist.emoji}</div>`;
  } else {
    html += `<div class="equip-slot" title="辅助槽">${assistEmojis[Math.floor(Math.random() * assistEmojis.length)]}</div>`;
  }
  
  return html;
}

function renderPlayerEquips(player) {
  const equipNames = { weapon: '武器', armor: '防具', assist: '辅助' };
  return Object.entries(player.equips).map(([type, equip]) => `
    <div class="player-equip ${equip ? '' : 'empty'}" title="${equipNames[type]}: ${equip?.name || '空'}">
      ${equip ? equip.emoji : '—'}
    </div>
  `).join('');
}

function renderPlayerSkills(player, g) {
  const skill = player.hero.active;
  if (!skill) return '';
  
  const usedThisTurn = g.usedSkillsThisTurn[player.id] || 0;
  const usedPerGame = player.skillsUsed.perGame[skill.name] || 0;
  
  let canUse = true;
  let useText = '点击使用';
  
  if (skill.perTurn && usedThisTurn >= skill.perTurn) {
    canUse = false;
    useText = '本回合已用';
  } else if (skill.perGame && usedPerGame >= skill.perGame) {
    canUse = false;
    useText = '本局已用完';
  } else if (skill.cost && player.handCards.length < skill.cost) {
    canUse = false;
    useText = '手牌不足';
  }
  
  return `
    <button class="skill-btn" ${!canUse ? 'disabled' : ''} onclick="usePlayerSkill()">
      <div class="skill-name">${skill.name}</div>
      <div class="skill-desc">${skill.desc}</div>
      <div style="font-size: 0.6rem; margin-top: 3px;">${useText}</div>
    </button>
  `;
}

function renderHandCards(g) {
  const player = g?.characters.find(c => c.isPlayer);
  const container = document.getElementById('hand-cards-area');
  if (!container || !player) return;
  
  const isMyTurn = g.currentTurnChar?.id === player.id;
  const usedAttacks = g.usedAttacksThisTurn[player.id] || 0;
  const maxAttacks = 1 + (player.extraAttacks || 0);
  
  container.innerHTML = player.handCards.map(card => {
    const isDisabled = !isMyTurn;
    const isAttack = card.name === '推理攻击';
    const attackDisabled = isAttack && usedAttacks >= maxAttacks;
    const isSelected = g.selectedCard?.id === card.id;
    const typeClass = `card-type-${card.type}`;
    
    const clickHandler = !isDisabled && !attackDisabled ? `onclick="selectCard('${card.id}')"` : '';
    
    return `
      <div class="hand-card ${typeClass} ${isDisabled || attackDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''}"
           ${clickHandler}>
        <div class="card-type-indicator"></div>
        <span class="card-emoji">${card.emoji}</span>
        <div class="card-name">${card.name}</div>
        <div class="card-desc">${card.desc.substring(0, 15)}...</div>
      </div>
    `;
  }).join('');
}

function getHpClass(char) {
  const ratio = char.hp / char.maxHp;
  if (ratio > 0.6) return 'high';
  if (ratio > 0.3) return 'medium';
  return '';
}

function updateDeckInfo(g) {
  const deckCount = document.getElementById('deck-count');
  const discardCount = document.getElementById('discard-count');
  if (deckCount) deckCount.textContent = g?.deck.length || 0;
  if (discardCount) discardCount.textContent = g?.discardPile.length || 0;
}

// ===== Game Actions =====
function selectCard(cardId) {
  if (!game) return;
  
  const player = game.characters.find(c => c.isPlayer);
  const card = player.handCards.find(c => c.id === cardId);
  
  if (!card) return;
  
  if (game.selectedCard?.id === cardId) {
    game.selectedCard = null;
  } else {
    game.selectedCard = card;
    if (card.canTarget) {
      game.log(`${player.hero.name} 选择了 ${card.name}，请选择目标`, 'event');
    }
  }
  
  game.renderGame();
}

function selectTarget(targetId) {
  if (!game || !game.selectedCard) return;
  
  const player = game.characters.find(c => c.isPlayer);
  const target = game.characters.find(c => c.id === targetId);
  
  if (!target || !target.isAlive) return;
  
  game.useCard(player, game.selectedCard, [target]);
  
  if (game.selectedCard.name === '推理攻击') {
    game.usedAttacksThisTurn[player.id] = (game.usedAttacksThisTurn[player.id] || 0) + 1;
  }
  
  game.log(`${player.hero.name} 对 ${target.hero.name} 使用了 ${game.selectedCard.name}`, 'damage');
  game.selectedCard = null;
  
  game.renderGame();
}

function usePlayerSkill() {
  if (!game) return;
  
  const player = game.characters.find(c => c.isPlayer);
  const skill = player.hero.active;
  
  if (!skill || !game.canUseSkill(player, skill)) return;
  
  game.useActiveSkill(player, skill);
}

function endPlayerTurn() {
  if (!game) return;
  
  const player = game.characters.find(c => c.isPlayer);
  if (game.currentTurnChar?.id !== player.id) return;
  
  game.endTurn(player);
}

// ===== Modal Functions =====
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
  
  // Bind click handlers
  content.querySelectorAll('.choice-btn').forEach((btn, i) => {
    btn.onclick = () => {
      if (choices[i] && choices[i].onClick) {
        choices[i].onClick();
      }
    };
  });
}

function hideModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('hidden');
}

// ===== Result Screen =====
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
  
  resultScreen.classList.add('active');
}

// ===== Game Initialization =====
function initGame() {
  // Hero selector
  const selector = document.getElementById('hero-selector');
  selector.innerHTML = HEROES.map(hero => `
    <div class="hero-card" data-hero-id="${hero.id}" onclick="selectHero('${hero.id}')">
      <span class="hero-emoji">${hero.emoji}</span>
      <div class="hero-name">${hero.name}</div>
      <div class="hero-title">${hero.title}</div>
      <span class="hero-rarity ${hero.rarity}">${hero.rarity}</span>
      <div class="hero-hp">HP: ${hero.hp}</div>
    </div>
  `).join('');
  
  // Player count buttons
  document.querySelectorAll('.count-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  
  // Start game button
  document.getElementById('start-game-btn').addEventListener('click', startGame);
  
  // End turn button
  document.getElementById('end-turn-btn').addEventListener('click', endPlayerTurn);
  
  // Play again button
  document.getElementById('play-again-btn').addEventListener('click', () => {
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('start-screen').classList.add('active');
  });
  
  // Select first hero by default
  selectHero(HEROES[0].id);
}

function selectHero(heroId) {
  document.querySelectorAll('.hero-card').forEach(card => {
    card.classList.toggle('selected', card.dataset.heroId === heroId);
  });
  window.selectedHeroId = heroId;
}

function startGame() {
  const playerCount = parseInt(document.querySelector('.count-btn.active').dataset.count);
  const playerHero = HEROES.find(h => h.id === window.selectedHeroId) || HEROES[0];
  
  // Select global modifier
  const modifier = GLOBAL_MODIFIERS[Math.floor(Math.random() * GLOBAL_MODIFIERS.length)];
  
  // Create game
  game = new Game(playerCount, playerHero);
  game.globalModifier = modifier;
  modifier.effect(game);
  game.init();
  
  // Show game screen
  document.getElementById('start-screen').classList.remove('active');
  document.getElementById('game-screen').classList.add('active');
  
  // Log identities
  game.characters.forEach(c => {
    const identity = c.identity.isPublic ? c.identity.name + '（公开）' : '身份暗置';
    game.log(`${c.hero.name} - ${identity}`, 'draw');
  });
  
  // Start first turn
  game.renderGame();
  game.startTurn(game.characters[0]);
}

// Expose functions to window
window.selectCard = selectCard;
window.selectTarget = selectTarget;
window.usePlayerSkill = usePlayerSkill;
window.endPlayerTurn = endPlayerTurn;
window.selectHero = selectHero;
window.showModal = showModal;
window.hideModal = hideModal;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initGame);
