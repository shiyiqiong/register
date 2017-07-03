var mysql=require("mysql");

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '111111',
    database: 'user',
    port: 3306
});

var query=function(sql,options,callback){  
    pool.getConnection(function(err,conn){  
        if(err){  
            callback(err,null,null);  
        }else{  
            conn.query(sql,options,function(err,results,fields){  
                //释放连接  
                conn.release();  
                //事件驱动回调  
                callback(err,results,fields);  
            });  
        }  
    });  
};  

module.exports=query;

