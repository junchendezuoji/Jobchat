export function getRedirectPath ({type,avatar}) {
    //根据用户信息返回路由
    let url = (type == 'publisher') ? '/publisher' : 'hunter';//判断发布者或者求职者
    if(!avatar) {
        url += 'info'
    }//没有头像就去设置用户信息
    return url;
}