import { computed } from "vue"
export function useFocus(data,callback){ // 获取哪些元素被选中了
    const focusData = computed(()=>{
        let focus =[]
        let unfocused = []
        data.value.blocks.forEach(item=>{
          (item.focus ? focus : unfocused).push(item)
        })
        return {focus,unfocused}
      })
    const clearBlockFocus = ()=>{
        data.value.blocks.forEach(element => {
          element.focus = false
        });
    }
    const containerMouseDown = () => {
        clearBlockFocus()
      }
    const onMousedown = (e,block) => {
        e.preventDefault();
        e.stopPropagation();
        // block上定义一个熟悉 focus,获取焦点后,就将focus变为true,设置选中样式
        if(e.shiftKey){
          block.focus = !block.focus
        }else{
          if(!block.focus){
            clearBlockFocus()
            block.focus = true // 清空其他组件的选中状态
          }else{
            block.focus = false
          }
        }
        callback(e)
      }
    
      return {onMousedown,focusData,containerMouseDown}
}