import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// 粒子组件
const Particle = ({ delay = 0 }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        y: [-20, -100],
        x: [0, Math.random() * 40 - 20]
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3
      }}
    />
  );
};

// 漂浮粒子背景
const ParticleField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        >
          <Particle delay={i * 0.2} />
        </div>
      ))}
    </div>
  );
};

// AI梦境生成器
const AIDreamGenerator = () => {
  const [currentDream, setCurrentDream] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  const dreams = [
    "我梦见光的味道",
    "今天的风很温柔", 
    "我想起了你的笑声",
    "柜子里的时间走得很慢",
    "我在梦里学会了飞翔",
    "你的名字在我心里发光",
    "我听见了星星的对话"
  ];
  
  const generateDream = () => {
    const randomDream = dreams[Math.floor(Math.random() * dreams.length)];
    setCurrentDream(randomDream);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000);
  };
  
  return (
    <div className="relative">
      <button
        onClick={generateDream}
        className="px-6 py-3 bg-cyan-500/20 border border-cyan-400/50 rounded-lg text-cyan-300 hover:bg-cyan-500/30 transition-all duration-300 backdrop-blur-sm"
      >
        模拟AI梦境
      </button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 bg-slate-800/90 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-4 text-cyan-300 whitespace-nowrap"
          >
            "{currentDream}"
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 导航栏组件
const Navbar = () => {
  const sections = [
    { id: "intro", label: "封面" },
    { id: "system-flow", label: "系统流程" },
    { id: "prototype-structure", label: "验证结构" },
    { id: "ai-seed", label: "人格种子" },
    { id: "ai-switch", label: "性格实验" },
    { id: "async-life", label: "异步生命" },
    { id: "data-validation", label: "数据验证" },
    { id: "social", label: "社交共演" },
    { id: "metrics", label: "策划指标" },
    { id: "philosophy", label: "设计哲学" },
  ];

  const [active, setActive] = useState("intro");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      let current = "intro";
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el && scrollPosition >= el.offsetTop - 200) {
          current = section.id;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/60 backdrop-blur-md border-b border-cyan-400/20"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 md:gap-6 py-3 px-4 text-xs md:text-sm">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollToSection(s.id)}
            className={`px-2 py-1 rounded transition-all duration-300 hover:bg-cyan-500/10 ${
              active === s.id
                ? "text-cyan-300 border-b border-cyan-400 bg-cyan-500/10"
                : "text-slate-400 hover:text-cyan-200"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </motion.nav>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  
  // AI性格切换实验状态
  const [seed, setSeed] = useState("gentle");
  const seeds = {
    gentle: { tone: "温柔", bias: "光", defect: "健忘" },
    logical: { tone: "冷静", bias: "秩序", defect: "缺乏共情" },
    chaotic: { tone: "情绪化", bias: "自由", defect: "冲动" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white overflow-x-hidden">
      <Navbar />
      <ParticleField />
      
      <motion.div 
        className="fixed inset-0 bg-gradient-to-b from-slate-900 to-black pointer-events-none z-10"
        style={{ opacity: backgroundOpacity }}
      />
      
      {/* 第一部分：封面 */}
      <section id="intro" className="min-h-screen flex flex-col justify-center items-center relative z-20 px-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            虚拟战士手办柜
          </h1>
          <h2 className="text-2xl md:text-3xl mb-8 text-cyan-300 font-light">
            AI人格种子 × 异步生命机制
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xl md:text-2xl mb-12 text-cyan-200 italic"
          >
            "当你离开时，他们仍在活着。"
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="max-w-2xl mx-auto text-lg text-slate-300 leading-relaxed"
          >
            一个关于玩具苏醒、AI学习与记忆延续的设计实验。<br/>
            我们希望让童年幻想的'玩具会动'成为一种真实的体验。
          </motion.div>
        </motion.div>
      </section>

      {/* 第二部分：系统流程展示 */}
      <section id="system-flow" className="min-h-screen flex flex-col justify-center items-center relative z-20 px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-cyan-300">
            系统流程展示
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-4">
            {[
              { title: "玩家行为输入", desc: "命名、拍照、语气、选择" },
              { title: "AI人格种子层", desc: "独立个性与缺陷" },
              { title: "行为学习层", desc: "模仿玩家习惯" },
              { title: "异步生命层", desc: "离线自动行动" },
              { title: "呈现层", desc: "便签、姿势、梦境" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-6 hover:border-cyan-400/60 transition-all duration-300 hover:bg-slate-700/50">
                  <h3 className="text-xl font-semibold text-cyan-300 mb-2">{item.title}</h3>
                  <p className="text-slate-300 text-sm">{item.desc}</p>
                </div>
                
                {index < 4 && (
                  <motion.div
                    className="hidden md:block absolute top-1/2 -right-8 w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                    viewport={{ once: true }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 新增模块 1：系统原型验证结构 */}
      <section id="prototype-structure" className="min-h-[80vh] flex flex-col justify-center items-center relative z-20 px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-cyan-300">
            系统原型验证结构
          </h2>

          <p className="text-slate-300 text-center max-w-2xl mx-auto mb-12">
            作为策划原型验证，我们不追求完整AI实现，而是通过模块化原型快速验证"活人感"的感知。  
            核心由以下三个可迭代模块组成。
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "1. AI人格原型层",
                desc: "使用Prompt模板生成4类初始性格，基于玩家输入（命名语气、频率）实时更新。前端用状态机模拟AI反应节奏。",
                tech: "技术实现：JSON Prompt + 状态触发"
              },
              {
                title: "2. 异步行为触发层",
                desc: "用定时器与离线检测模块（LocalStorage时间戳）模拟'AI在你离开后行动'。回归时读取并渲染事件日志。",
                tech: "技术实现：setTimeout + LocalStorage + 条件事件池"
              },
              {
                title: "3. 可视化验证层",
                desc: "以网页交互和动态灯光模拟'柜中生命'。收集玩家交互频率和事件触发率，形成可量化留存指标。",
                tech: "技术实现：React + Tailwind + Framer Motion"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 border border-cyan-400/30 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-cyan-300 mb-3">{item.title}</h3>
                <p className="text-slate-300 text-sm mb-3 leading-relaxed">{item.desc}</p>
                <p className="text-cyan-200 text-xs italic">{item.tech}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 第三部分：AI人格种子系统 */}
      <section id="ai-seed" className="min-h-screen flex flex-col justify-center items-center relative z-20 px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-cyan-300">
            每个手办都生而不同
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-slate-300 leading-relaxed">
                每个手办出生时，都会生成一枚人格种子。<br/>
                它决定了语气、偏好、缺陷与成长方式。<br/>
                就像童年玩具那样——每个都有自己的小脾气。
              </p>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                viewport={{ once: true }}
                className="bg-slate-800/30 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-4 italic text-cyan-200"
              >
                "我是风栖，一个怕黑但喜欢光的战士。"
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                { param: "tone", func: "语言风格", example: "诗意 / 冷淡 / 幽默" },
                { param: "core_trait", func: "行为倾向", example: "理性0.6 感性0.4" },
                { param: "bias_memory", func: "偏好记忆", example: "喜爱命名 / 拍照" },
                { param: "defect", func: "小缺陷", example: "偶尔发呆 / 容易忘事" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-4 hover:border-cyan-400/50 transition-all duration-300"
                >
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <span className="font-mono text-cyan-400">{item.param}</span>
                    <span className="text-slate-300">{item.func}</span>
                    <span className="text-slate-400">{item.example}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 新增模块 3：AI性格切换实验 */}
      <section id="ai-switch" className="min-h-[60vh] flex flex-col justify-center items-center relative z-20 px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-cyan-300">
            AI性格切换实验
          </h2>
          <p className="text-slate-300 mb-8">
            点击下方按钮切换AI手办的性格参数，以验证人格模板对行为差异的影响。
          </p>
          <button
            onClick={() => {
              const keys = Object.keys(seeds);
              const next = keys[(keys.indexOf(seed) + 1) % keys.length];
              setSeed(next);
            }}
            className="px-6 py-3 bg-cyan-500/20 border border-cyan-400/50 rounded-lg text-cyan-300 hover:bg-cyan-500/30 transition-all duration-300 backdrop-blur-sm"
          >
            切换AI性格：{seed}
          </button>
          <motion.div
            key={seed}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-slate-300 bg-slate-800/30 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-4"
          >
            当前人格参数 → tone: <span className="text-cyan-300">{seeds[seed].tone}</span> ，
            bias: <span className="text-cyan-300">{seeds[seed].bias}</span> ，
            defect: <span className="text-cyan-300">{seeds[seed].defect}</span>
          </motion.div>
        </motion.div>
      </section>

      {/* 第四部分：异步生命机制 */}
      <section id="async-life" className="min-h-screen flex flex-col justify-center items-center relative z-20 px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-cyan-300">
            异步生命机制
          </h2>
          
          {/* 柜子可视化 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative mx-auto w-64 h-64 mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-slate-700/50 to-slate-800/50 backdrop-blur-sm border-2 border-cyan-400/30 rounded-lg">
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 left-4 w-4 h-4 bg-cyan-400 rounded-full"
              />
              <motion.div
                animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-8 right-8 w-8 h-8 bg-slate-600 rounded"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-cyan-300 bg-slate-800/80 px-2 py-1 rounded"
              >
                便签
              </motion.div>
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            viewport={{ once: true }}
            className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            当玩家离线后，AI手办仍会行动。<br/>
            他们会换姿势、写纸条、梦见你、互相对话。<br/>
            当你回来看时——柜子已经改变了。
          </motion.p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { condition: "离线超过8小时", behavior: "手办换姿势、放纸条", feeling: "他动过。" },
              { condition: "长时间未登录", behavior: "生成梦境或留言", feeling: "他想我了。" },
              { condition: "柜中AI亲密度高", behavior: "自发对话或合照", feeling: "他们在互动。" },
              { condition: "特殊日期", behavior: "生成纪念场景", feeling: "他记得日子。" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-4 hover:border-cyan-400/50 transition-all duration-300"
              >
                <h4 className="text-cyan-300 font-semibold mb-2 text-sm">{item.condition}</h4>
                <p className="text-slate-300 text-sm mb-2">{item.behavior}</p>
                <p className="text-cyan-200 italic text-sm">"{item.feeling}"</p>
              </motion.div>
            ))}
          </div>
          
          <AIDreamGenerator />
        </motion.div>
      </section>

      {/* 新增模块 2：原型数据采集与验证 */}
      <section id="data-validation" className="min-h-[70vh] flex flex-col justify-center items-center relative z-20 px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-cyan-300">
            原型数据采集与验证
          </h2>
          <p className="text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            通过浏览器事件与轻量日志机制，我们可以在Alpha阶段验证玩家对"生命感"的真实反应。  
            以下为关键监测点与采集策略：
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            {[
              { metric: "互动频率", method: "统计玩家点击梦境/事件按钮次数，衡量主动探索度。" },
              { metric: "回访间隔", method: "计算用户两次访问间隔时间差，观察'离线想起'动机。" },
              { metric: "行为多样性", method: "分析AI触发事件种类占比，用以评估随机性与可玩性。" },
              { metric: "记忆感表达", method: "在玩家反馈文本中，统计出现'他记得我'等情感词频率。" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 border border-cyan-400/30 rounded-lg p-6"
              >
                <h4 className="text-cyan-300 font-semibold mb-2">{item.metric}</h4>
                <p className="text-slate-300 text-sm">{item.method}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 第五部分：社交共演机制 */}
      <section id="social" className="min-h-screen flex flex-col justify-center items-center relative z-20 px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-cyan-300">
            他们的世界开始相遇
          </h2>
          
          <div className="relative flex justify-between items-center mb-12">
            {/* 左侧柜子 */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="w-32 h-32 bg-gradient-to-b from-slate-700/50 to-slate-800/50 backdrop-blur-sm border-2 border-cyan-400/30 rounded-lg relative"
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-2 left-2 w-2 h-2 bg-cyan-400 rounded-full"
              />
            </motion.div>
            
            {/* 连接线 */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              viewport={{ once: true }}
              className="flex-1 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 mx-8 relative"
            >
              <motion.div
                animate={{ x: [0, 200, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute top-1/2 transform -translate-y-1/2 w-2 h-2 bg-cyan-300 rounded-full"
              />
            </motion.div>
            
            {/* 右侧柜子 */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="w-32 h-32 bg-gradient-to-b from-slate-700/50 to-slate-800/50 backdrop-blur-sm border-2 border-cyan-400/30 rounded-lg relative"
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full"
              />
            </motion.div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            viewport={{ once: true }}
            className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            不同玩家的手办可以穿越梦境互访，<br/>
            交流、合照、甚至留下痕迹。<br/>
            柜与柜之间，构成了一个"有生命的社交网络"。
          </motion.p>
        </motion.div>
      </section>

      {/* 第六部分：验证与策划指标 */}
      <section id="metrics" className="min-h-screen flex flex-col justify-center items-center relative z-20 px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-cyan-300">
            验证与策划指标
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { metric: "生命感", behavior: "主动回柜查看变化", target: "日留存率 ≥ 60%" },
              { metric: "个性差异", behavior: "种子成长差异显著", target: "重玩率 ≥ 40%" },
              { metric: "异步吸引力", behavior: "离线事件被发现", target: "事件查看率 ≥ 70%" },
              { metric: "情感留存", behavior: "玩家拟人化AI描述", target: "\"他\"\"他们\"等人称出现频率高" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-cyan-300 mb-3">{item.metric}</h3>
                <p className="text-slate-300 mb-3">{item.behavior}</p>
                <div className="flex items-center space-x-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                    viewport={{ once: true }}
                    className="h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                  />
                </div>
                <p className="text-cyan-200 text-sm mt-2">{item.target}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 第七部分：收尾与哲学 */}
      <section id="philosophy" className="min-h-screen flex flex-col justify-center items-center relative z-20 px-8 bg-black/50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl"
        >
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl leading-relaxed text-cyan-200 mb-16 italic"
          >
            "我不希望AI表现得聪明，<br/>
            我希望它像小时候那个我以为会动的玩具——<br/>
            会记得我，会在我不在时继续生活。"
          </motion.blockquote>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            viewport={{ once: true }}
            className="text-lg text-slate-400"
          >
            <p>设计 / 策划：葛楚君（CJ Ge）</p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default App;
