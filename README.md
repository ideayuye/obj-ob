
# Summary
object observe split from vue


# Usage
监听对象：

    var data = {
        t: 'bilaaa',
        ruby: {
            type: 'dinamic'
        }
    };

    var ob = new Ob(data);

    ob.watch('ruby.type', () => {
        console.log(data.ruby.type);
    });
    ob.ruby.type = 'static';


    //通过getter监听 watch的时候就执行getter函数
    ob.watch(() => {
        var t = data.t;
    });
    ob.t = "xfa";

监听数组：

    var arrayData = {
        grass: [],
        vegetable: []
    };

    var obArray = new Ob(arrayData);

    obArray.watch('vegetable', () => {
        console.log(obArray.vegetable);
    });
    arrayData.vegetable.push('radish');
    arrayData.vegetable.pop();

# API

- watch  添加监听函数
    para:
     {string|function} getter - 要监听的属性 可以通过函数获取
     {function} cb - 当数据变更 执行的回调函数
     {object} options - 配置项 deep-深度监听

     return:
        解绑监听事件函数

- $set 设置某个属性并促发更新事件,为弥补array[1]='xx'不触发更新事件而设计
    para:
     {object} obj - 要设置属性的对象
     {string} key - 属性名称
     {object} val - 属性值
    
    return:
        属性值
    
    example:

        var setData = {
            animal:['human'],
            car:'bmw',
            jobs:{}
        }
        var obSet = new Ob(setData);

        obSet.$set(setData.jobs,'compony','tyb');
        obSet.$set(setData.animal, 0,'lion');

- $del 删除某个属性并促发更新事件
    para:
     {object} obj - 要删除属性的对象
     {string} key - 属性名称

    return:
        undefined
    
    example:
         obSet.$del(setData.jobs,'compony');
