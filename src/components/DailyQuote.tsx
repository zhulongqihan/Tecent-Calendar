import React, { useState, useEffect } from 'react';
import './DailyQuote.css';

const quotes = [
  { text: "今天的努力，是为了明天的精彩", author: "未来的你" },
  { text: "每一个不曾起舞的日子，都是对生命的辜负", author: "尼采" },
  { text: "时间是让人猝不及防的东西，过去已去，未来已来", author: "佚名" },
  { text: "不要让昨天占用今天太多的时间", author: "威尔·罗杰斯" },
  { text: "成功就是把复杂的问题简单化，然后狠狠去做", author: "佚名" },
  { text: "你的时间有限，不要浪费在重复别人的生活上", author: "乔布斯" },
  { text: "最好的时间是十年前，其次是现在", author: "中国谚语" },
  { text: "人生没有白走的路，每一步都算数", author: "李宗盛" },
  { text: "做自己喜欢的事，让喜欢的事有价值", author: "佚名" },
  { text: "别在该奋斗的年纪选择安逸", author: "佚名" },
  { text: "时间会证明一切，因为以后的事谁也说不清楚", author: "佚名" },
  { text: "生活不是等待暴风雨过去，而是学会在雨中跳舞", author: "佚名" },
];

export const DailyQuote: React.FC = () => {
  const [quote, setQuote] = useState(quotes[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 根据日期选择语录（确保每天相同）
    const today = new Date().toDateString();
    const hash = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    setQuote(quotes[hash % quotes.length]);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="daily-quote">
      <button className="quote-close" onClick={() => setIsVisible(false)}>×</button>
      <div className="quote-icon">💭</div>
      <p className="quote-text">"{quote.text}"</p>
      <p className="quote-author">— {quote.author}</p>
    </div>
  );
};
