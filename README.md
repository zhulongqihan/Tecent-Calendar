# 🛡️ Cyber-Tech Life OS (PWA)

> **"Not just a calendar, it's your life's tactical command center."**

这是一个基于 **React + TypeScript** 构建的现代化 PWA 日历应用，现已全面升级为 **v2.0 赛博战术指挥系统**。专为极客、大学生和追求极致效率的用户打造，采用沉浸式游戏化 HUD 界面。

![Life OS Screenshot](public/screenshot.png)

## ⚡ 核心特性 (Core Features)

### 1. 🎮 游戏化战术界面 (Gamified HUD)
*   **三栏式指挥中心**：左侧情报板、中央战场地图、右侧武器库。
*   **角色成长系统**：
    *   **Level Up**：完成任务获取 XP，从 Lv.1 系统管理员开始晋升。
    *   **HEX-5 战术雷达**：自动分析任务类型，生成智力/力量/魅力/耐力/精神五维属性图。
    *   **活跃度热力图**：GitHub 风格的每日战斗记录，可视化你的努力轨迹。
    *   **勋章墙**：达成特定成就（如"任务狂"、"战术大师"）自动解锁荣誉徽章。
*   **全息视觉**：深色赛博朋克风格，霓虹光效，Glitch 故障艺术，动态粒子背景，**透视战术网格**。

### 2. 📅 战术日历 (Tactical Calendar)
*   **高亮显示**：拖拽创建事件，全息能量条风格的任务展示。
*   **情报接入 (Network Feed)**：支持订阅外部 iCal 日历（如学校课表、公共假期），自动合并到战术地图。
*   **农历支持**：内置中国农历算法，重要节日不遗漏。
*   **多维视图**：月/周/日/议程视图无缝切换。
*   **每日战术简报 (Daily Briefing)**：每天首次登录展示全屏打字机风格的任务简报，如同接受任务指派。

### 3. 🍅 专注终端 (Focus Terminal)
*   **常驻挂件**：右侧常驻番茄钟，随时进入心流状态。
*   **神经元降噪 (Neural Soundscapes)**：内置白噪音/雨声生成器，屏蔽外界干扰。
*   **Red Alert 模式**：全屏沉浸式红色警戒倒计时。
*   **高危任务预警**：自动计算 Deadline 剩余时间，红色倒计时提醒。
*   **战术大屏 (Tactical Dashboard)**：闲置状态下自动进入全屏数据监控屏保。
*   **生物节律 (Biorhythm Sync)**：18:00-06:00 自动切换夜间战术红/橙色调，保护视力。

### 4. ⚡ 快速指令 (Quick Actions)
*   **点击反馈 (Click Feedback)**：全局鼠标点击触发青色电火花爆炸特效。
*   **全息时钟 (Cyber Clock)**：顶栏毫秒级战术时钟，掌握每一瞬间。
*   **键盘优先**：支持 Vim 式快捷键操作（`N` 新建, `P` 番茄钟, `S` 统计）。
*   **PWA 离线能力**：支持安装到桌面，断网依然可用。
*   **本地加密存储**：数据完全存储在本地 `localStorage`，隐私绝对安全。

## 🛠️ 技术栈 (Tech Stack)

*   **Core**: React 18, TypeScript
*   **Build**: Create React App (CRA)
*   **Calendar Engine**: react-big-calendar, moment.js
*   **Styling**: CSS3 Variables, Flexbox/Grid, Animations
*   **PWA**: Workbox

## 🚀 快速开始 (Quick Start)

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm start
```
访问 `http://localhost:3000` 即可进入指挥系统。

### 构建部署
```bash
npm run build
```

## ⌨️ 战术快捷键 (Shortcuts)

| 按键 | 指令 |
|------|------|
| **N** | 新建任务 (New Mission) |
| **P** | 开启/关闭番茄钟 (Pomodoro) |
| **T** | 专注模式 (Today Focus) |
| **S** | 查看统计 (Statistics) |
| **B** | 切换粒子特效 (Background FX) |
| **D** | 切换深色模式 (Dark Mode) |
| **?** | 帮助菜单 |
| **ESC**| 关闭所有弹窗 |

## 📄 开源协议
MIT License
