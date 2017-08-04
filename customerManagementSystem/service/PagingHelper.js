/**
 * Created by 詹 on 2017/8/4.
 */
module.exports = {
    calculatePagingParamService:function (totalCount, currentPage, pageSize) {
        var totalPage = pageSize == 0?0:(totalCount % pageSize > 0)?(totalCount / pageSize)+1:totalCount/pageSize;
        if(totalPage == 0){
            totalPage = 1;
        }
        if(currentPage > totalPage){
            currentPage = totalPage;
        }
        return totalPage;
    }
};