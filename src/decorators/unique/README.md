## Unique


Basic usage

``` ts
class Test {
  @Unique() a = [1, 2, 1]
  @Unique('id') b = [{id:1}, {id:1}]

  @Unique({prop: 'list', unique: 'id'}) c = {list: [{id:1}, {id:1}]}

  @Unique.fn
  counts(@Unique() counts: number[]) {
    console.log(counts)
    console.log(this.a)
  }
}

var test = new Test()
test.counts([2,2,3])
// logs
// [2,3] [1,2]
```