<div align="center">

# 📅 智能日历应用

<p align="center">
  <strong>基于 React + TypeScript 开发的现代化日历应用</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.0-blue?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen" alt="PRs Welcome">
</p>

<p align="center">
  支持多视图切换 · 事件管理 · 农历显示 · iCal 导入导出 · 深色模式 · 番茄钟 · 粒子特效
</p>

</div>

---

## ✨ 功能亮点

<table>
  <tr>
    <td width="50%">
      
### 🎯 核心功能
      
- 📊 **多视图展示** - 月视图、周视图、日视图、日程视图
- ✏️ **事件管理** - 完整的 CRUD 操作（创建、读取、更新、删除）
- ⏰ **智能提醒** - 8种提醒时间选项，浏览器原生通知
- 🎨 **个性化** - 自定义事件颜色，视觉区分不同类型
      
</td>
<td width="50%">

### 🌟 扩展功能
      
- 📤 **iCal 导入导出** - 符合 RFC5545 标准
- 🌐 **网络订阅** - 订阅外部日历（Google、Outlook）
- 🌙 **农历显示** - 农历日期、传统节日、二十四节气
- 💾 **本地存储** - 数据持久化，离线可用
      
</td>
  </tr>
</table>

### 🚀 炫酷特性

<table>
  <tr>
    <td width="50%">

- 🌙 **深色模式** - 护眼暗黑主题
- ⚡ **快速添加** - 一键创建事件
- 📊 **事件统计** - 可视化数据展示
- 💬 **每日一言** - 励志语录激励
- 🏷️ **标签过滤** - 智能分类管理

</td>
<td width="50%">

- 🎯 **今日聚焦** - 专注今日任务
- 🍅 **番茄钟** - 时间管理工具
- ⌨️ **快捷键** - 高效键盘操作
- ✨ **动画效果** - 流畅视觉体验
- 💫 **粒子背景** - 科技感十足

</td>
  </tr>
</table>

---

## 🎬 快速演示

### 主界面预览
> 月视图展示，支持农历显示、今日高亮、事件颜色标记

### 核心功能
- ✅ 点击日期创建事件
- ✅ 点击事件编辑/删除
- ✅ 切换月/周/日/日程视图
- ✅ 显示/隐藏农历
- ✅ 导入导出 .ics 文件
- ✅ 深色模式/粒子特效
- ✅ 番茄钟专注计时
- ✅ 标签分类管理
- ✅ 快捷键操作

---

## ⌨️ 快捷键列表

<table>
  <tr>
    <th>按键</th>
    <th>功能</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><kbd>N</kbd></td>
    <td>创建新事件</td>
    <td>快速创建下一小时的事件</td>
  </tr>
  <tr>
    <td><kbd>T</kbd></td>
    <td>今日聚焦</td>
    <td>打开/关闭今日事件侧边栏</td>
  </tr>
  <tr>
    <td><kbd>P</kbd></td>
    <td>番茄钟</td>
    <td>打开番茄钟计时器</td>
  </tr>
  <tr>
    <td><kbd>S</kbd></td>
    <td>统计面板</td>
    <td>查看事件统计数据</td>
  </tr>
  <tr>
    <td><kbd>D</kbd></td>
    <td>深色模式</td>
    <td>切换浅色/深色主题</td>
  </tr>
  <tr>
    <td><kbd>B</kbd></td>
    <td>粒子背景</td>
    <td>开启/关闭粒子特效</td>
  </tr>
  <tr>
    <td><kbd>?</kbd></td>
    <td>快捷键帮助</td>
    <td>显示所有快捷键</td>
  </tr>
  <tr>
    <td><kbd>Esc</kbd></td>
    <td>关闭面板</td>
    <td>关闭所有打开的面板</td>
  </tr>
</table>

---

## 🚀 快速开始

### 📦 安装

```bash
# 克隆项目
git clone https://github.com/zhulongqihan/Tecent-Calendar.git

# 进入项目目录
cd Tecent-Calendar

# 安装依赖
npm install
```

### ▶️ 运行

```bash
# 启动开发服务器
npm start

# 浏览器自动打开 http://localhost:3000
```

### 🏗️ 构建

```bash
# 构建生产版本
npm run build

# 生成的文件在 build/ 目录
```

---

## 🛠️ 技术栈

<div align="center">

| 技术 | 说明 | 版本 |
|:---:|:---:|:---:|
| ⚛️ React | 前端框架 | 18.0+ |
| 📘 TypeScript | 开发语言 | 5.0+ |
| 📅 react-big-calendar | 日历组件 | Latest |
| 📆 date-fns / moment | 日期处理 | Latest |
| 🌙 lunar-javascript | 农历计算 | Latest |
| 📋 ical.js | iCal 处理 | Latest |
| 💾 LocalStorage | 数据存储 | - |

</div>

---

## 📖 使用指南

### 1️⃣ 创建事件

```
1. 点击日历上的任意日期
2. 填写事件信息
   - 标题：事件名称
   - 时间：开始和结束时间
   - 地点：活动地点
   - 描述：详细说明
   - 提醒：提前通知时间
   - 颜色：视觉标记
3. 点击"保存"按钮
```

### 2️⃣ 编辑事件

```
1. 点击已存在的事件
2. 修改相关信息
3. 点击"保存"更新，或点击"删除"移除
```

### 3️⃣ 视图切换

<table>
  <tr>
    <td><b>月视图</b></td>
    <td>查看整月事件分布</td>
  </tr>
  <tr>
    <td><b>周视图</b></td>
    <td>专注本周安排</td>
  </tr>
  <tr>
    <td><b>日视图</b></td>
    <td>精确到每小时的日程</td>
  </tr>
  <tr>
    <td><b>日程视图</b></td>
    <td>列表形式查看所有事件</td>
  </tr>
</table>

### 4️⃣ 导入导出

```bash
# 导出
设置 → 导出为 iCal 文件 → 下载 .ics 文件

# 导入  
设置 → 导入 iCal 文件 → 选择 .ics 文件
```

### 5️⃣ 网络订阅

```
设置 → 输入日历 URL → 点击"订阅日历"

支持的格式：
- Google Calendar (.ics)
- Outlook Calendar (.ics)
- Apple Calendar (.ics)
- 任何符合 RFC5545 标准的日历源
```

### 6️⃣ 标签管理

```
创建事件时：
1. 在"标签"区域选择一个或多个标签
2. 支持的标签：工作、学习、生活、运动、娱乐
3. 点击标签可选中/取消

过滤事件：
- 点击顶部标签栏的标签按钮
- 只显示特定标签的事件
- 点击"全部"显示所有事件
```

### 7️⃣ 番茄钟

```
使用番茄工作法：
1. 按 P 键或点击 🍅 按钮打开番茄钟
2. 点击"开始"启动 25 分钟专注时间
3. 休息 5 分钟
4. 完成 4 个番茄后，休息 15 分钟
5. 记录今日完成的番茄数

计时中退出需要确认，避免误操作
```

### 8️⃣ 统计面板

```
查看事件统计：
- 总事件数
- 今日事件
- 本周事件
- 本月事件
- 即将到来的事件

点击 📊 按钮或按 S 键打开
```

### 9️⃣ 粒子背景

```
开启科技感背景：
1. 按 B 键或点击 💫 按钮
2. 看到发光粒子在背景移动
3. 粒子之间有动态连线
4. 适合深色模式下使用

效果特点：
- 100 个发光粒子
- 动态连线效果
- 半透明毛玻璃界面
```

### 🔟 深色模式

```
切换主题：
- 按 D 键快速切换
- 点击右下角 🌙/☀️ 按钮
- 自动保存主题偏好
- 所有组件完美适配
```

---

## 📁 项目结构

```
calendar-pwa/
│
├── public/                 # 静态资源
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── components/        # React 组件
│   │   ├── CalendarView.tsx       # 日历主视图
│   │   ├── CalendarView.css       # 日历样式
│   │   ├── EventEditor.tsx        # 事件编辑器
│   │   ├── EventEditor.css        # 编辑器样式
│   │   ├── Settings.tsx           # 设置面板
│   │   ├── Settings.css           # 设置样式
│   │   ├── ThemeToggle.tsx        # 深色模式切换
│   │   ├── ThemeToggle.css        # 主题切换样式
│   │   ├── QuickAdd.tsx           # 快速添加按钮
│   │   ├── QuickAdd.css           # 快速添加样式
│   │   ├── StatsPanel.tsx         # 统计面板
│   │   ├── StatsPanel.css         # 统计面板样式
│   │   ├── DailyQuote.tsx         # 每日一言
│   │   ├── DailyQuote.css         # 每日一言样式
│   │   ├── TagFilter.tsx          # 标签过滤
│   │   ├── TagFilter.css          # 标签过滤样式
│   │   ├── TodayFocus.tsx         # 今日聚焦
│   │   ├── TodayFocus.css         # 今日聚焦样式
│   │   ├── ShortcutHelp.tsx       # 快捷键帮助
│   │   ├── ShortcutHelp.css       # 快捷键帮助样式
│   │   ├── PomodoroTimer.tsx      # 番茄钟
│   │   ├── PomodoroTimer.css      # 番茄钟样式
│   │   ├── ParticleBackground.tsx # 粒子背景
│   │   └── ParticleBackground.css # 粒子背景样式
│   │
│   ├── services/          # 业务逻辑层
│   │   ├── StorageService.ts      # 本地存储服务
│   │   └── ICalService.ts         # iCal 导入导出
│   │
│   ├── utils/             # 工具函数
│   │   └── lunarUtils.ts          # 农历计算
│   │
│   ├── types/             # TypeScript 类型
│   │   └── index.ts               # 类型定义
│   │
│   ├── App.tsx            # 应用主组件
│   ├── App.css            # 应用样式
│   └── index.tsx          # 应用入口
│
├── package.json           # 依赖配置
├── tsconfig.json          # TypeScript 配置
└── README.md             # 项目文档
```

---

## 🎯 功能实现详解

### 📋 RFC5545 标准支持

```typescript
// 使用 ical.js 库实现
- VCALENDAR 组件封装
- VEVENT 事件处理
- VALARM 提醒设置
- 兼容主流日历应用
```

### ⏰ 提醒系统

```typescript
提醒时间选项：
- 事件开始时
- 提前 5 分钟
- 提前 15 分钟
- 提前 30 分钟
- 提前 1 小时
- 提前 2 小时
- 提前 1 天
- 提前 1 周

技术实现：
- Notification API
- setTimeout 定时器
- LocalStorage 持久化
```

### 🌙 农历算法

```typescript
功能特性：
- 1900-2100 年农历计算
- 农历日期显示
- 传统节日识别（春节、端午、中秋等）
- 二十四节气显示（立春、春分、冬至等）

优先级：
节日 > 节气 > 农历日期
```

---

## 🎨 界面设计

### 配色方案

```css
主题色：紫色渐变 (#667eea → #764ba2)
今日高亮：蓝色 (#1a73e8)
文字颜色：深灰 (#333)
边框颜色：浅灰 (#e0e0e0)
背景颜色：白色/浅灰 (#fff / #f5f5f5)
```

### 响应式设计

- 📱 移动端适配（< 768px）
- 💻 桌面端优化（≥ 768px）
- 🖥️ 大屏幕支持（≥ 1200px）

---

## 🌐 浏览器兼容性

<div align="center">

| 浏览器 | 版本要求 | 状态 |
|:---:|:---:|:---:|
| Chrome | 90+ | ✅ 完全支持 |
| Firefox | 88+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 90+ | ✅ 完全支持 |

</div>

---

## 📝 开发计划

### 已完成 ✅
- [x] 深色模式
- [x] 番茄钟计时器
- [x] 事件标签分类
- [x] 事件统计面板
- [x] 今日聚焦功能
- [x] 快捷键系统
- [x] 粒子背景特效
- [x] 动画效果优化
- [x] 每日一言
- [x] 快速添加功能

### 计划中 🚧
- [ ] 添加事件搜索功能
- [ ] 支持事件重复规则（每日/每周/每月）
- [ ] 支持多人协作（共享日历）
- [ ] 支持附件上传
- [ ] PWA 离线支持增强
- [ ] 多语言支持（中/英）
- [ ] 数据云同步
- [ ] 日历打印功能

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

```bash
# Fork 项目
# 创建功能分支
git checkout -b feature/AmazingFeature

# 提交更改
git commit -m 'Add some AmazingFeature'

# 推送到分支
git push origin feature/AmazingFeature

# 提交 Pull Request
```

---

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源

---

## 👨‍💻 作者

**zhulongqihan**

- GitHub: [@zhulongqihan](https://github.com/zhulongqihan)

---

## 🙏 致谢

感谢以下开源项目：

- [React](https://reactjs.org/)
- [react-big-calendar](https://github.com/jquense/react-big-calendar)
- [ical.js](https://github.com/kewisch/ical.js)
- [lunar-javascript](https://github.com/6tail/lunar-javascript)
- [date-fns](https://date-fns.org/)

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给一个星标！**

Made with ❤️ by zhulongqihan

</div>
