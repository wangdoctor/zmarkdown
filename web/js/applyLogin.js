//申请弹层界面功能
function apply() {
    openMask();                                            //弹层背景、内容显示
    $('.applyUseClass').css('display','block');         //点击申请时，申请模块内容显示
    $('.applyShow').css('display','block');             //申请试用内容显示
    $('.applyResult').css('display','none');            //申请试用结果隐藏
    $('.applySuccessImg').css('display','none');       //申请试用错误提示信息显示
    $('.applyErrorImg').css('display','none');         //申请试用错误提示信息显示
};
// --------申请试用界面功能--------
//立即申请
function immediateApply() {
    var applyInputList = ['applyName','applyCompany','applyDepart','applyEmail','applyTelNum','applyReason']; //定义申请界面输入框id
    for(var i=0;i<applyInputList.length;i++){
        applyNullData(applyInputList[i]);                       //输入框字段校验
    }
    for(var i=0;i<applyInputList.length;i++){               //校验不通过时，禁止调用接口
        if(getValue(applyInputList[i]) == ''){return;}
    }
    var paramData = {                                       //提交的入参数据
        applicant:getValue('applyName'),                  //申请人
        company:getValue('applyCompany'),                 //公司名称
        department:getValue('applyDepart'),               //所属部门
        email:getValue('applyEmail'),                     //联系邮箱
        tel:getValue('applyTelNum'),                      //手机号码
        reason:getValue('applyReason'),                   //申请理由
    };
    $('.alertLoad').css('display','block');               //加载中显示
    //本地测试接口
    /*$.ajax({
        type:"get",                                        //提交数据的类型 POST、GET
        url:"http://localhost:60268/home/Rancher",      //提交的本地代理地址
        headers:{
            accept:'application/json',
        },
        contentType:"application/json",
        data:{
            url:'https://baas-test.jd.com/clustertools/trial/application', //提交的请求接口地址
            type:'post',
            postData:JSON.stringify(paramData)
        },
        datatype: "json",                                 //返回数据的格式
        success:function(data){                               //成功返回之后回调的函数
            var data = eval('(' + data + ')');
            if(data.code == '200'){
                $('.alertLoad').css('display','none');          //加载中隐藏
                var successMsg = '申请成功，我们将尽快处理...';  //成功提示信息
                $('.applyShow').css('display','none');          //申请试用内容隐藏
                $('.applyResult').css('display','block');       //申请试用结果显示
                $('#applyResultTipId').text(successMsg);          //申请试用成功结果提示信息
                $('.applySuccessImg').css('display','inline-block');   //成功提示信息显示
            }else{
                var errorMsg = '您的请求我们已经收到，请耐心等待处理...'; //错误提示信息
                $('.alertLoad').css('display','none');          //加载中隐藏
                $('.applyShow').css('display','none');          //申请试用内容隐藏
                $('.applyResult').css('display','block');       //申请试用结果显示
                $('#applyResultTipId').text(errorMsg);           //申请试用错误结果提示信息
                $('.applyErrorImg').css('display','inline-block');     //申请试用错误提示信息显示
            }
            console.log('接口返回数据信息：');
            console.log(data);
        },
        error: function(){                                       //调用出错执行的函数
            $('.alertLoad').css('display','none');             //加载中隐藏
            alertTip('error','0');                              //提示信息
        }
    });*/
    //线上环境接口
    $.ajax({
        type:"post",                                        //提交数据的类型 POST、GET
        url:'https://baas-test.jd.com/clustertools/trial/application',       //提交的请求接口地址
        headers:{
            accept:'application/json',
            'content-type': 'application/json',
            'cookie':document.cookie,
            'X-Api-Csrf':document.cookie.match(new RegExp("(^| )CSRF=([^;]*)(;|$)"))!=null&&document.cookie.match(new RegExp("(^| )CSRF=([^;]*)(;|$)"))[2]
        },
        data:JSON.stringify(paramData),
        datatype: "json",                                     //返回数据的格式
        success:function(data){                               //成功返回之后回调的函数
            $('.alertLoad').css('display','none');          //加载中隐藏
            if(data.code == '200'){
                var successMsg = '申请成功，我们将尽快处理...';  //成功提示信息
                $('.applyShow').css('display','none');          //申请试用内容隐藏
                $('.applyResult').css('display','block');       //申请试用结果显示
                $('#applyResultTipId').text(successMsg);          //申请试用成功结果提示信息
                $('.applySuccessImg').css('display','inline-block');   //成功提示信息显示
            }else{
                var errorMsg = '您的请求我们已经收到，请耐心等待处理...'; //错误提示信息
                $('.applyShow').css('display','none');          //申请试用内容隐藏
                $('.applyResult').css('display','block');       //申请试用结果显示
                $('#applyResultTipId').text(errorMsg);           //申请试用错误结果提示信息
                $('.applyErrorImg').css('display','inline-block');     //申请试用错误提示信息显示
            }
            console.log('接口返回数据信息：');
            console.log(data);
        },
        error: function(){                                       //调用出错执行的函数
            $('.alertLoad').css('display','none');             //加载中隐藏
            alertTip('error','0');                              //提示信息
        }
    });
};
//申请结果确定
function applyResultSure() {
    cancleMask('0');             //取消弹层
}
// --------登录界面功能--------
//控制台登录
function consoleLogin() {
    //线上环境接口
    $.ajax({
        type:"get",                                          //提交数据的类型 POST、GET
        url:'https://baas-test.jd.com/userstatus',        //提交的请求接口地址
        headers:{
            accept:'application/json',
            'content-type': 'application/json',
            'cookie':document.cookie,
            'X-Api-Csrf':document.cookie.match(new RegExp("(^| )CSRF=([^;]*)(;|$)"))!=null&&document.cookie.match(new RegExp("(^| )CSRF=([^;]*)(;|$)"))[2]
        },
        data:'',
        datatype: "json",                                 //返回数据的格式
        success:function(data){                           //成功返回之后回调的函数
            if(data.code == '200'){
                var loginUrl = data.message;              //登录成功之后跳转的路径地址
                window.location.href = loginUrl;          //用户信息账号登录
            }else{
                openMask();                                             //弹层背景、内容显示
                $('.loginPageClass').css('display','block');        //点击控制台登录时，登录模块内容显示
            }
        },
        error: function(data){                             //调用出错执行的函数
            console.log('控制台登录信息：');
            console.log(data);
        }
    });
};
//登录
function userLogin() {
    var loginInputList = ['userName','userPassword'];    //定义登录界面输入框id
    for(var i=0;i<loginInputList.length;i++){
        loginNullData(loginInputList[i]);                      //输入框字段校验
    }
    for(var i=0;i<loginInputList.length;i++){               //校验不通过时，禁止调用接口
        if(getValue(loginInputList[i]) == ''){return;}
    }
    var paramData = {                                       //提交的入参数据
        userName:getValue('userName'),                    //登录用户名
        passWd:getValue('userPassword'),                  //登录密码
    };
    $('.alertLoad').css('display','block');               //加载中显示
    //本地测试接口
    /*$.ajax({
        type:"get",                                        //提交数据的类型 POST、GET
        url:"http://localhost:60268/home/Rancher",      //提交的本地代理地址
        headers:{
            accept:'application/json',
        },
        contentType:"application/json",
        data:{
            url:'http://baas-test.jd.com/local-login', //提交的请求接口地址
            type:'post',
            postData:JSON.stringify(paramData)
        },
        datatype: "json",                               //返回数据的格式
        success:function(data){                         //成功返回之后回调的函数
            var data = eval('(' + data + ')');
            var loginUrl = data.message;                 //登录成功之后跳转的路径地址
            closeMask();                                  //弹层背景、内容隐藏
            $('.loginPageClass').css('display','none'); //登录模块内容隐藏
            window.location.href = loginUrl;             //用户信息账号登录
        },
        error: function(){                              //调用出错执行的函数
            alertTip('error','1');                      //提示信息
        }
    });*/
    //线上环境接口
    $.ajax({
        type:"post",                                        //提交数据的类型 POST、GET
        url:'https://baas-test.jd.com/local-login',       //提交的请求接口地址
        headers:{
            accept:'application/json',
            'content-type': 'application/json',
            'cookie':document.cookie,
            'X-Api-Csrf':document.cookie.match(new RegExp("(^| )CSRF=([^;]*)(;|$)"))!=null&&document.cookie.match(new RegExp("(^| )CSRF=([^;]*)(;|$)"))[2]
        },
        data:JSON.stringify(paramData),
        datatype: "json",                                 //返回数据的格式
        success:function(data){                           //成功返回之后回调的函数
            $('.alertLoad').css('display','none');      //加载中隐藏
            var loginUrl = data.message;                  //登录成功之后跳转的路径地址
            closeMask();                                   //弹层背景、内容隐藏
            $('.loginPageClass').css('display','none'); //登录模块内容隐藏
            window.location.href = loginUrl;              //用户信息账号登录
        },
        error: function(){                                //调用出错执行的函数
            $('.alertLoad').css('display','none');      //加载中隐藏
            alertTip('error','1');                        //提示信息
        }
    });
};
//使用京东账号登录
function userJDLogin() {
    window.location.href = 'http://baas-test.jd.com/login'; //京东账号登录
    closeMask();                                           //弹层背景、内容隐藏
    $('.loginPageClass').css('display','none');         //登录模块内容隐藏
};
//修改密码
function goModifyPassword() {
    $('.loginPageClass').css('display','none');         //登录模块内容隐藏
    $('.modifyPwdClass').css('display','block');        //修改密码模块内容显示
    $('#userName').val('');                               //登录用户名清空
    $('#userPassword').val('');                           //登录密码清空
};
// --------修改BaaS密码界面功能--------
//确认修改密码
function modifyPassword(){
    var passwordInputList = ['userPwdName','oldPassword','newPassword','surePassword']; //定义修改密码界面输入框id
    for(var i=0;i<passwordInputList.length;i++){
        loginNullData(passwordInputList[i]);                   //输入框字段校验
    }
    for(var i=0;i<passwordInputList.length;i++){            //校验不通过时，禁止调用接口
        if(getValue(passwordInputList[i]) == ''){return;}
        if(getValue(passwordInputList[2]) != '' && getValue(passwordInputList[3]) != ''){
            if(getValue(passwordInputList[2]) != getValue(passwordInputList[3])){
                $('#surePassword').next().next().css('display','block');  //新密码与确认密码不一致时，提示语显示
                return;
            }                                               //新密码与校验密码不一致时，禁止调用接口
        }
    }
    var paramData = {                                      //提交的入参数据
        userName:getValue('userPwdName'),                //修改密码用户名
        passWd:getValue('oldPassword'),                  //修改密码旧密码
        newPasswd:getValue('newPassword'),               //修改密码新密码
    };
    $('.alertLoad').css('display','block');                 //加载中显示
    /*$.ajax({
        type:"get",
        url:"http://localhost:60268/home/Rancher",         //提交的本地代理地址
        headers:{
            accept:'application/json',
        },
        contentType:"application/json",
        data:{
            url:'http://baas-test.jd.com/local-pw-change',//提交的请求接口地址
            type:'post',                                     //提交数据的类型 POST、GET
            postData:JSON.stringify(paramData)
        },
        datatype: "json",                                    //返回数据的格式
        success:function(data){                               //成功返回之后回调的函数
            $('.alertLoad').css('display','none');          //加载中隐藏
            $('.loginPageClass').css('display','block');   //登录模块内容显示
            $('.modifyPwdClass').css('display','none');    //修改密码模块内容隐藏
            alertTip('success','2');                         //提示信息
        },
        error: function(){                                    //调用出错执行的函数
            alertTip('error','2');                            //提示信息
        }
    });*/
    //线上环境接口
    $.ajax({
        type:"post",                                            //提交数据的类型 POST、GET
        url:'https://baas-test.jd.com/local-pw-change',      //提交的请求接口地址
        headers:{
            accept:'application/json',
            'content-type': 'application/json',
            'cookie':document.cookie,
            'X-Api-Csrf':document.cookie.match(new RegExp("(^| )CSRF=([^;]*)(;|$)"))!=null&&document.cookie.match(new RegExp("(^| )CSRF=([^;]*)(;|$)"))[2]
        },
        data:JSON.stringify(paramData),
        datatype: "json",                                     //返回数据的格式
        success:function(data){                               //成功返回之后回调的函数
            $('.alertLoad').css('display','none');          //加载中隐藏
            $('.loginPageClass').css('display','block');   //登录模块内容显示
            $('.modifyPwdClass').css('display','none');    //修改密码模块内容隐藏
            alertTip('success','2');                         //提示信息
        },
        error: function(){                                    //调用出错执行的函数
            $('.alertLoad').css('display','none');          //加载中隐藏
            alertTip('error','2');                            //提示信息
        }
    });
};
//取消修改密码
function cancleModify() {
    $('.loginPageClass').css('display','block');        //登录模块内容显示
    $('.modifyPwdClass').css('display','none');         //修改密码模块内容隐藏
    var passwordInputList = ['userPwdName','oldPassword','newPassword','surePassword']; //定义修改密码界面输入框id
    for(var i=0;i<passwordInputList.length;i++){          //数据清空
        $('#'+passwordInputList[i]).val('');
    }
};
// --------公用功能--------
//弹层背景、内容显示
function openMask() {
    $('.maskLayerBg').css('display','block');           //弹层背景显示
    $('.maskContent').css('display','block');           //弹层内容显示
    $('body').css('overflow', 'hidden');                 //当遮盖层隐藏时,body的滚动属性禁止
};
//弹层背景、内容隐藏
function closeMask() {
    $('.maskLayerBg').css('display','none');           //弹层背景隐藏
    $('.maskContent').css('display','none');           //弹层内容隐藏
    $('body').css('overflow', 'auto');                 //当遮盖层隐藏时,body的滚动属性开启
};
//通过ID获取相应值
function getValue(id){
    return $('#'+id).val();
};
//输入框键盘弹起事件校验非空数据
function inputKeyUp(id){
    $('#'+id).next().css('display','none');                   //输入框不为空时，提示语隐藏
    dataValidat(id);                                            //输入框数据合法性校验
};
//点击登录，修改密码非空数据校验
function loginNullData(id){
    if(getValue(id) == ''){
        $('#'+id).next().css('display','block');             //输入框为空时，提示语显示
        if(id == 'surePassword'){
            $('#'+id).next().next().css('display','none');   //输入框数据不合法提示语隐藏
        }
    }else{
        $('#'+id).next().css('display','none');             //输入框不为空时，提示语隐藏
        dataValidat(id);                                      //输入框数据合法性校验
    }
};
//输入框数据合法性校验
function dataValidat(id){
    if(id == 'surePassword'){
        if(getValue('newPassword') != getValue('surePassword')){
            $('#surePassword').next().next().css('display','block');  //新密码与确认密码不一致时，提示语显示
        }else{
            $('#surePassword').next().next().css('display','none');   //新密码与确认密码不一致时，提示语隐藏
        }
    }
};
//提示信息
function alertTip(tipState,idx,errorMsg){
    var successTip,errorTip;                              //成功，错误提示语
    if(tipState == 'success'){
        $('.alertTip').css('display','block');          //成功提示内容显示
        if(idx == '0'){
            successTip = '申请试用成功！';
        }else if(idx == '2'){
            successTip = '修改密码成功！';
        }
        $('#successAlertId').text(successTip);
    }else if(tipState == 'error'){
        $('.alertError').css('display','block');        //错误提示内容显示
        if(idx == '0'){
            errorTip = '申请试用失败！';
        }else if(idx == '1'){
            errorTip = '登录失败！';
        }else if(idx == '2'){
            errorTip = '修改密码失败！';
        }else if(idx == '3'){
            errorTip = errorMsg;
        }
        $('#errorAlertId').text(errorTip);
    }
    setTimeout( 'cancleAlert()',2000);                     //2秒之后，提示内容隐藏
};
//成功,失败提示内容隐藏
function cancleAlert(){
    $('.alertTip').css('display','none');
    $('.alertError').css('display','none');
};
//关闭申请提示内容隐藏
function closeApply() {
    closeMask();                                  //弹层背景、内容隐藏
    $('.applyUseClass').css('display','none'); //立即申请模块内容隐藏
};
//关闭取消弹层
function cancleMask(idx) {
    closeMask();                                   //弹层背景、内容隐藏
    $('.applyUseClass').css('display','none');  //立即申请模块内容隐藏
    $('.loginPageClass').css('display','none'); //登录模块内容隐藏
    $('.modifyPwdClass').css('display','none'); //修改密码模块内容隐藏
    var applyInputList = ['applyName','applyCompany','applyDepart','applyEmail','applyTelNum','applyReason']; //定义申请界面输入框id
    var loginInputList = ['userName','userPassword'];    //定义登录界面输入框id
    var passwordInputList = ['userPwdName','oldPassword','newPassword','surePassword']; //定义修改密码界面输入框id
    var inputList = [];                           //定义输入框列表数组
    if(idx == '0'){
        inputList = applyInputList;
    }else if(idx == '1'){
        inputList = loginInputList;
    }else if(idx == '2'){
        inputList = passwordInputList;
    }
    for(var i=0;i<inputList.length;i++){         //数据清空
        $('#'+inputList[i]).val('');
    }
};
//回车键--申请试用
function immediateApplyEnter(){
    if (event.keyCode==13) {            //回车键的键值为13
        immediateApply();               //按取回车键申请试用
    }
};
//回车键--登录
function userLoginEnter(){
    if (event.keyCode==13) {           //回车键的键值为13
        userLogin();                    //按取回车键登录
    }
};
//回车键--确认修改密码
function modifyPasswordEnter(){
    if (event.keyCode==13) {           //回车键的键值为13
        modifyPassword();               //按取回车键确认修改密码
    }
};
//输入框键盘弹起事件校验非空数据
function inputKeyUpa(id){
    $('#'+id).parent().next().css('display','none');                  //输入框不为空时，提示语隐藏
    dataValidata(id);                                                   //输入框数据合法性校验
};
//点击申请试用非空数据校验
function applyNullData(id){
    if(getValue(id) == ''){
        $('#'+id).parent().next().css('display','block');             //输入框为空时，提示语显示
        if(id == 'applyEmail'){
            $('#'+id).parent().next().next().css('display','none');   //输入框数据不合法提示语隐藏
        }
        if(id == 'applyTelNum'){
            $('#'+id).parent().next().next().css('display','none');   //输入框数据不合法提示语隐藏
        }
    }else{
        $('#'+id).parent().next().css('display','none');             //输入框不为空时，提示语隐藏
        dataValidata(id);                                              //输入框数据合法性校验
    }
};
//输入框数据合法性校验
function dataValidata(id){
    var emailReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;     //邮箱正则校验格式
    /*var phoneNumReg = /^1[3|4|5|7|8][0-9]{9}$/;                                //手机号码正则校验格式*/
    var phoneNumReg = /^1[0-9]{10}$/;                                           //手机号码正则校验格式
    if(id == 'applyEmail'){                                                    //申请人邮箱格式校验
        if(emailReg.test(getValue(id))){
            $('#'+id).parent().next().next().css('display','none');            //输入框数据合法时，提示语隐藏
        }else{
            $('#'+id).parent().next().next().css('display','block');           //输入框数据不合法时，提示语显示
        }
    }
    if(id == 'applyTelNum'){                                                    //申请人手机号码格式校验
        if(phoneNumReg.test(getValue(id))){
            $('#'+id).parent().next().next().css('display','none');            //输入框数据合法时，提示语隐藏
        }else{
            $('#'+id).parent().next().next().css('display','block');           //输入框数据不合法时，提示语显示
        }
    }
};
