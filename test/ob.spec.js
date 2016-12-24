
var process = {
    env: {
        NODE_ENV: 'dev'
    }
}

import * as h from '../src/main.js';


var data = {
    t: 'bilaaa',
    ruby: {
        type: 'dinamic'
    }
};
var ob = new Ob(data);

describe('watch object', () => {
    it('data', (done) => {
        var count = 0;
        var t = data.t;
        ob.watch(() => {
            count++;
            var t = data.t;
            if (count == 2) {
                expect(data.t).toEqual("xfa");
                done();
            }
        });

        data.t = "xfa";
    });

    it('teardown watcher', () => {
        var teardown = ob.watch(() => {});
        expect(ob._watchers.length).toEqual(2);
        teardown();
        expect(ob._watchers.length).toEqual(1);
    });

    it('watch attribute', (done) => {
        ob.watch('ruby.type', () => {
            expect(data.ruby.type).toEqual('static');
            done();
        });
        ob.ruby.type = 'static';
    })
});


var arrayData = {
    grass: [],
    vegetable: []
};
var obArray = new Ob(arrayData);

describe('watch array in object', () => {
    it('watch array getter', (done) => {
        var count = 0;
        obArray.watch(() => {
            count++;
            var t = arrayData.grass;
            if (count == 2) {
                expect(arrayData.grass.length).toEqual(1);
                expect(arrayData.grass[0]).toEqual('xfa');
                done();
            }
        });
        arrayData.grass.push("xfa");
    });

    it('watch array push', (done) => {
        var teardown = obArray.watch('vegetable', () => {
            expect(obArray.vegetable.length).toEqual(1);
            expect(obArray.vegetable[0]).toEqual('radish');
            teardown();
            done();
        });
        arrayData.vegetable.push('radish');
    });

    it('watch pop',(done)=>{
        var teardown = obArray.watch('vegetable',()=>{
            expect(obArray.vegetable.length).toEqual(0);
            teardown();
            done();
        });
        arrayData.vegetable.pop();
    });

    it('watch splice',(done)=>{
        arrayData.vegetable.push('cabbage');
        arrayData.vegetable.push('pumpkin');
        var teardown = obArray.watch('vegetable',()=>{
            expect(obArray.vegetable.length).toEqual(1);
            expect(obArray.vegetable[0]).toEqual('pumpkin');
            teardown();
            done();
        });
        arrayData.vegetable.splice(0,1);
    });

    it('watch unshift',(done)=>{
        var teardown = obArray.watch('vegetable',()=>{
            expect(obArray.vegetable.length).toEqual(2);
            expect(obArray.vegetable[0]).toEqual('cabbage');
            teardown();
            done();
        });
        arrayData.vegetable.unshift('cabbage');
    });

});

describe('set attribute', () => {
    it('set ', (done) => {
        obArray.$set('car', 'bmw');
        var teardown = obArray.watch('car', () => {
            expect(obArray.car).toEqual('benze');
            teardown();
            done();
        });
        obArray.car = 'benze';
    });

    it('del',()=>{
        expect(obArray.car).toEqual('benze');
        obArray.$del('car');
        expect(obArray.car).toEqual(undefined);
    });

    it('set array',()=>{
        var setData = {
            animal:['human']
        }
        var obSet = new Ob(setData);
        obSet.watch('animal',()=>{
            expect(setData.animal[0]).toEqual('lion');
        });
        obSet.$set(0,'lion')
    })
});

describe('watch deep',()=>{
    var deepData = {
            film:"1980年带爱情",
            songs:{
                singer:'sun yanzi'
            },
            phone:{
                brand:[{
                    name:'apple'
                }]
            }
        }
    var obDeep = new Ob(deepData);

    it('deep data',(done)=>{
        obDeep.watch('songs',()=>{
            expect(deepData.songs.singer).toEqual('tyb2');
            done();
        },{deep:true});
        deepData.songs.singer = "tyb2";
    });

    it('deep array',()=>{
        var count = 0;
        obDeep.watch('film',()=>{
            count ++ ;
            if(count == 1){
                expect(deepData.film.length).toEqual(1);
                expect(deepData.film[0].star).toEqual('9.8');
            }
            if(count == 2){
                expect(deepData.film[0].star).toEqual('9.9');
                done();
            }
        });
        deepData.film = [{name:'1980年带爱情',star:'9.8'}];
        deepData.film[0].star = '9.9';
    });

    it('deep array 1',()=>{
        obDeep.watch('phone',()=>{
            expect(deepData.phone.brand[0].name).toEqual('mi');
        },{deep:true})
        deepData.phone.brand[0].name = "mi";
    });

});



describe('observe array false', () => {
    it("can't observe pure array", () => {
        var arrayData1 = ['lichens'];
        var obArray1 = new Ob(arrayData1);
        expect(obArray1.isInited).toEqual(false);
    });
});
