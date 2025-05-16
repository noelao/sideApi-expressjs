const fs = require('fs');


// cek apakaha folder data ada
// jika tidak ada maka buat folder data
const dirPath = './data/';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}
const dirData = './data/ini.json';
if(!fs.existsSync(dirData)){
    fs.writeFileSync(dirData, '[{"ini":"empty","kosong":"yup"}]', 'utf-8');
}


const loadIni = () => {
    const ini = fs.readFileSync(dirData); // text
    const data = JSON.parse(ini);  // jadi json
    return data;
}
const simpanIni = (data) => {
    fs.writeFileSync(dirData, JSON.stringify(data));
}

const tambahData = (data) => {
    const datas = loadIni();
    datas.push(data);
    simpanIni(datas);
}


module.exports = { loadIni, tambahData };