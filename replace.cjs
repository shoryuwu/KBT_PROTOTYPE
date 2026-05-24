const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('e:/Coding/KBT/src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Save payment method lines by changing them temporarily to something else
  // ShopeePay
  content = content.replace(/{ name: 'ShopeePay', color: 'from-orange-500 to-red-500',  short: 'SPay'    }/g, 
                            "__SHOPEEPAY__");
  content = content.replace(/{ name: 'ShopeePay', color: 'from-orange-500 to-red-500',    short: 'SPay' },/g, 
                            "__SHOPEEPAY2__");
  // BNI
  content = content.replace(/{ name: 'BNI',        color: 'from-orange-600 to-orange-700', short: 'BNI'  }/g, 
                            "__BNI__");
  content = content.replace(/{ name: 'BNI',     color: 'from-orange-600 to-orange-700', short: 'BNI' },/g, 
                            "__BNI2__");

  // Perform replacements
  content = content.replace(/orange/g, 'blue');
  content = content.replace(/Orange/g, 'Blue');
  
  content = content.replace(/#f97316/g, '#3b82f6');
  content = content.replace(/#ea580c/g, '#2563eb');
  content = content.replace(/#fb923c/g, '#60a5fa');
  content = content.replace(/#c2410c/g, '#1d4ed8');

  // Restore payment methods
  content = content.replace(/__SHOPEEPAY__/g, 
                            "{ name: 'ShopeePay', color: 'from-orange-500 to-red-500',  short: 'SPay'    }");
  content = content.replace(/__SHOPEEPAY2__/g, 
                            "{ name: 'ShopeePay', color: 'from-orange-500 to-red-500',    short: 'SPay' },");
  
  content = content.replace(/__BNI__/g, 
                            "{ name: 'BNI',        color: 'from-orange-600 to-orange-700', short: 'BNI'  }");
  content = content.replace(/__BNI2__/g, 
                            "{ name: 'BNI',     color: 'from-orange-600 to-orange-700', short: 'BNI' },");

  fs.writeFileSync(file, content, 'utf8');
  console.log('Processed ' + file);
});
