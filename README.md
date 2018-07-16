# catblog
一只猫的博客？

## CatSlide

**猫在哪？**

猫是固体还是液体？它在哪？它要去哪？这是个问题！

Html template
```html
<cat-slide
    :cat-x='Boolean' :cat-y='Boolean'
    :cat-default-x='Number' :cat-default-y='Number'
    :cat-move-x='Number' :cat-move-y='Number'
    @cat-x='function(Number data)' @cat-x='function(Number data)'
    ref="catSlide">
</cat-slide>
```
引入 CatSlide
```javascript
import CatSlide from "@/components/CatSlide"
```
- **:cat-xy** 在不知道猫要往哪里走的时候可以设置它的行动方式 x轴 or y轴
- **:cat-default-xy** 你第一次看见它的时候是在哪里？😳
- **:cat-move-xy** 将它引诱到某个地方 (大雾！)
- **@cat-xy** 它在哪？找到它！😎
- **ref**
    - ref.catRefresh 获得最新的猫咪的活动空间
    - ref.catMove 用逗猫棒😻将它引诱到某个地方并给它小鱼干😏 (正确方式！)