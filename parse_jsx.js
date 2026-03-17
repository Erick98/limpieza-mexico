const fs = require('fs');
const content = fs.readFileSync('src/app/dashboard/admin/page.tsx', 'utf8');
const lines = content.split('\n');

// Extraer sólo la parte problemática
let startIdx = lines.findIndex(l => l.includes('{showQuoteViewer && activeQuote && ('));
let endIdx = lines.findIndex((l, i) => i > startIdx && l.includes('</>'));

let stack = [];
for (let i = startIdx; i <= endIdx; i++) {
  let line = lines[i];
  
  let openMatches = line.match(/<div[^>]*?(?<!\/)>/g);
  if (openMatches) {
    openMatches.forEach(() => stack.push(`div (line ${i+1})`));
  }
  
  let closeMatches = line.match(/<\/div>/g);
  if (closeMatches) {
    closeMatches.forEach(() => stack.pop());
  }

  if (line.match(/<>/)) stack.push(`<> (line ${i+1})`);
  if (line.match(/<\/>/)) stack.pop();

}
console.log("Stack restante tras terminar showQuoteViewer:");
console.log(stack);
