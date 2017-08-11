/**
 * excel处理
 * Created by 詹 on 2017/8/7.
 */
var node_xlsx = require('node-xlsx');
var checkImportMsg = '';
module.exports = {
    excelParse:function(title,path){
        var obj = node_xlsx.parse(path);
        var excelObj = obj[0].data; // 只取第一个表的数据
        var rowNum = 0; //统计记录条数
        var customerInfoList = new Array(); //存用户记录的数组

        for(let i=1;i<excelObj.length;i++){ //遍历excel 的一行记录,跳过标题
            var rdata = excelObj[i];
            var arr = new Array(); //临时存一行用户记录
            for(let j=0;j<rdata.length;j++){ //遍历单元格
                arr.push(rdata[j]==null?"":rdata[j]);
            }
            customerInfoList.push(arr);
            rowNum++;
        }
        console.log("共有"+rowNum+"条数据/n");
        return customerInfoList;
    },
    checkCustomerInfoExcelData:function (excel) {
        var resultsMap = {};
        if(excel == undefined || excel.length <= 0 || excel[0].length <= 0){
            checkImportMsg = "导入的excel文件为空数据文件";
            resultsMap.checkImportMsg = checkImportMsg;
            resultsMap.flag = false;
            return resultsMap;
        }
        var titleList = new Array('用户账号','公司名称','成交时间','联系时间','产品名称','是否成交','成交次数','店铺','是否重复','重复名');
        var excelObj = excel[0].data; // 只取第一个表的数据
        var excelTitile = excelObj[0];
        if(!checkExcelTitle(titleList,excelTitile)){
            resultsMap.checkImportMsg = checkImportMsg;
            resultsMap.flag = false;
            return resultsMap;
        }
        if(excelObj.length < 2){
            checkImportMsg = "导入的excel文件除标题行外无数据导入";
            resultsMap.checkImportMsg = checkImportMsg;
            resultsMap.flag = false;
        }else if(excelObj.length > 1001){
            checkImportMsg = "当前支持导入的excel文件数据不能超过1000行";
            resultsMap.checkImportMsg = checkImportMsg;
            resultsMap.flag = false;
            return resultsMap;
        }
        checkImportMsg = "验证通过";
        resultsMap.checkImportMsg = checkImportMsg;
        resultsMap.flag = true;
        return resultsMap;

    }
};
var checkExcelTitle = function (titleList, excelTitle) {
    let flag = true;
    if(titleList.length != excelTitle.length){
        flag = false;
        checkImportMsg = "导入excel文件与规定模板标题项数不一致";
        return flag;
    }
    let index = 0;
    checkImportMsg = "";
    for(let title of excelTitle){
        if(title !== titleList[index]){
            checkImportMsg += "导入excel文件标题列名["+title+"]与规定模板标题["+titleList[index]+"]不一致<br>";
        }
        index++;
    }
    if("" !== checkImportMsg){
        flag = false;
    }
    return flag;
};