export const Tree = (arr) => {
    let tree = function (data, root) {
        var r = [], o = {};
        data.forEach(function (a) {
            let obj = {
                "id": a._id,
                "label": a.memberName,
                "parentId": a.parentId || null
            }
            r.push(obj)
        });
        return r;
    }(arr, arr[0]);
    console.log('Tree===>',tree)
    return tree;

}