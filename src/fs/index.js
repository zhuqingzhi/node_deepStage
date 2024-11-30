const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');

// XLSX 文件路径
const xlsxFilePath = path.join(__dirname, '../data/深超总BIM加载路径.xlsx');

// 读取 XLSX 文件
fs.readFile(xlsxFilePath, (err, data) => {
    if (err) {
        console.error('读取文件出错:', err);
        return;
    }

    // 解析 XLSX 文件
    const workSheets = xlsx.parse(data);
    const workSheet = workSheets[0].data;
    workSheet.shift()
    // 提取所需数据
    const res = {
        //groupId:[]
    }
    workSheet.map(row => {
        const row3Arr = row[3].split('/')
        const groupId = `${row3Arr[2]}-${row3Arr[3]}`
        if (!res[groupId]) res[groupId] = []
        res[groupId].push({
            id: row[2].split('.')[0], // 假设图层列内容在第二列，去掉.3dt
            path: '@' + row[3], // 假设路径列内容在第四列
            location: JSON.parse(row[4]), // 假设 location 列内容在第五列
            groupId, // 假设内容列内容在第七列
        })
    });


    // 将数据转换为 JSON 字符串
    const jsonData = JSON.stringify(res);

    // 写入文件
    fs.writeFile('output.json', jsonData, 'utf8', (err) => {
        if (err) {
            console.error('文件写入出错:', err);
            return;
        }
        console.log('文件写入成功:', 'output.json');
    });
});