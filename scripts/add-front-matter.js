const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '../source/_posts');

function addFrontMatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // 检查是否已有 front-matter
  if (content.startsWith('---')) {
    console.log(`Skipped (has front-matter): ${path.basename(filePath)}`);
    return;
  }
  
  const fileName = path.basename(filePath, '.md');
  const stats = fs.statSync(filePath);
  const date = stats.birthtime.toISOString().split('T')[0];
  
  // 如果标题包含特殊字符，需要加引号
  const needsQuotes = /[\[\]:{}#&*!|>'"%@`,]/.test(fileName);
  const titleValue = needsQuotes ? `"${fileName}"` : fileName;
  
  const frontMatter = `---
title: ${titleValue}
date: ${date}
tags: []
categories: []
---

`;
  
  const newContent = frontMatter + content;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Updated: ${fileName}`);
}

// 处理所有 markdown 文件
console.log('Processing posts...\n');
fs.readdirSync(postsDir).forEach(file => {
  if (file.endsWith('.md')) {
    addFrontMatter(path.join(postsDir, file));
  }
});
console.log('\nDone!');
