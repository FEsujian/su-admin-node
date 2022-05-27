const xlsx = require('xlsx');
const filepath = './user.xlsx';

const datas = parseXlsxData(filepath, 0, 1);

// xlsx解析函数，通过路径参数，和表名称(没有名称用Sheet2表示第二张表)参数解析xlsx文件,
// 参数3为无效列数，设置无效列会把生成的数组的行数据从后向前删除字段值
export function parseXlsxData(filepath, sheetName, colNone = 0) {
  const sourceData = xlsx.readFile(filepath, {}); // 通过xlsx库获取源数据
  sheetName = sheetName ? sheetName : Object.keys(sourceData.Sheets).pop();
  const sheetData = sourceData.Sheets[sheetName]; // 获取xlsx表数据，默认获取第一张
  if (!sheetData) return '你访问的数据表不存在';

  // 获取行数col和列数row
  const ref = sheetData['!ref'];
  const refParse = ref.match(/[a-z]+|[0-9]+/gi);
  const col = refParse[3] - refParse[1] + 1;
  const row = refParse[2].charCodeAt() - refParse[0].charCodeAt() + 1;

  // 获取单元格合并数据并建立数组索引
  const merges = sheetData['!merges'];
  const mergesParses = xlsxMergeParse(merges);
  const mergeIndexs = mergeIndex(mergesParses);

  // 根据表的行数和列数创建一个表，在创建每个单元格时插入数据，数据填充普通单元格直接引用sheetData，
  //合并单元格通过映射下标计算引用sheetData
  const datas = [];
  for (let i = 1; i < col + 1; i++) {
    const row = [];
    for (
      let j = refParse[0].charCodeAt();
      j < refParse[2].charCodeAt() + 1 - colNone;
      j++
    ) {
      const letter = String.fromCharCode(j);
      const k = j - 64;
      row.push(
        sheetData[letter + i]
          ? sheetData[letter + i].w
          : autoFill([i, k], mergeIndexs, mergesParses, sheetData),
      );
    }
    datas.push(row);
  }

  return datas;
}

// 解析单元格合并数据方法
// 解析表格单元格合并数据  把参与合并的单元格全部计算并统计位置信息
export function xlsxMergeParse(merges) {
  const arr = [];

  merges.map((v) => {
    const { s, e } = v;
    const result = [];
    const addNum = 1; //使数组下标加一，符合Excel单元格下标
    if (s.c === e.c) {
      for (let i = s.r; i < e.r + 1; i++) {
        result.push([i + addNum, s.c + addNum]);
      }
    } else {
      for (let i = s.c; i < e.c + 1; i++) {
        result.push([s.r + addNum, i + addNum]);
      }
    }
    arr.push(result);
  });

  return arr;
}

// 单元格合并数据建立索引
// 单元格合并数据为三维数组，为了提升数据处理效率，添加索引（变为一维数组，序列化位置信息）
export function mergeIndex(mergesParse) {
  const datas = [];

  mergesParse.map((v, i) => {
    const row = [];
    v.map((v1, i1) => {
      row.push(v1.join(','));
      row.push([i, i1].join('-'));
    });
    datas.push(row);
  });

  return datas.flat(Infinity);
}

// 根据单元格下标计算应该填充的值
export function autoFill(point, index, mergesParses, sheetData) {
  // 判断此单元格是否属于合并单元格
  const isNeed = index.indexOf(point.join(','));
  if (isNeed < 0) return undefined;

  // 通过索引获取映射的合并数据三维数组的下标
  const target = index[isNeed + 1];
  let result = target.split('-')[0];
  result = mergesParses[result][0];

  // 返回合并单元格左上单元格数据
  result = sheetData[String.fromCharCode(result[1] + 64) + result[0]].w;
  return result;
}
