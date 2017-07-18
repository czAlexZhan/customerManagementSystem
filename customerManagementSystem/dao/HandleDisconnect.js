/**
 * Created by czAlexzhan on 2017/7/18.
 */
module.exports = function handleDisconnect(connection){
        connection.connect((err) => {
            if(err){
                console.log("进行断线重连：" + new Date());
                setTimeout(handleDisconnect(connection),2000);
                return;
            }
            console.log("连接成功");
        });
        connection.on('error',(err) => {
           console.log("db error",err);
           if(err.code === 'PROTOCOL_CONNECTION_LOST'){
               handleDisconnect(connection);
           }else{
               throw err;
           }
        });
};