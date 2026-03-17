const fs = require('fs');
const content = fs.readFileSync('src/app/dashboard/admin/page.tsx', 'utf8');

// Simplificando un parser:
let stack = [];
let lines = content.split('\n');
let insideReturn = false;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  if (line.includes('return (')) insideReturn = true;
  if (!insideReturn) continue;
  
  // Clean up self-closing tags and strings to avoid false positives (very simple heuristic)
  let cleanLine = line.replace(/<[^>]*?\/>/g, '').replace(/<input[^>]*?>/g, '').replace(/<img[^>]*?>/g, '');
  
  // Track specific tags to see where it breaks
  let openMatches = cleanLine.match(/<(div|AuthGuard|h1|h2|h3|p|span|table|thead|tbody|tr|td|button|style)[^>]*?(?<!\/)>/g);
  if (openMatches) {
    openMatches.forEach(m => {
       let tag = m.match(/<([A-Za-z0-9]+)/)[1];
       stack.push(`${tag} (line ${i+1})`);
    });
  }
  
  let closeMatches = cleanLine.match(/<\/(div|AuthGuard|h1|h2|h3|p|span|table|thead|tbody|tr|td|button|style)>/g);
  if (closeMatches) {
    closeMatches.forEach(m => {
       let tag = m.match(/<\/([A-Za-z0-9]+)/)[1];
       let top = stack[stack.length - 1];
       if (top && top.startsWith(tag)) {
         stack.pop();
       } else {
         console.log(`MISMATCH at line ${i+1}: expected to close ${top}, but found </${tag}>`);
       }
    });
  }
}
console.log("Remaining stack:");
console.log(stack);
