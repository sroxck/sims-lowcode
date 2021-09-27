export function useMenuDrag(containerRef,data){
    let currentComponent = null
    const dragstart = (e,component)=>{
        // dargenter 进入元素中
        // dragover 在目标元素经过,必须阻止默认行为
        // dragleave 离开元素的时候增加一个禁用标识
        // drop 松手的时候,根据拖拽的数据,生成组件
        containerRef.value.addEventListener('dragenter',dragenter)
        containerRef.value.addEventListener('dragover',dragover)
        containerRef.value.addEventListener('dragleave',dragleave)
        containerRef.value.addEventListener('drop',drop)
        currentComponent = component
      }
      const dragend = (e)=>{
        containerRef.value.removeEventListener('dragenter',dragenter)
        containerRef.value.removeEventListener('dragover',dragover)
        containerRef.value.removeEventListener('dragleave',dragleave)
        containerRef.value.removeEventListener('drop',drop)
      }
      const dragenter = (e) => {
        e.dataTransfer.dropEffect = 'move' // h5 拖动的图标
      }
      const dragover = (e) => {
        e.preventDefault();
      }
      const dragleave = (e) => {
        e.dataTransfer.dropEffect = 'none'
      }
      const drop = (e) => {
        // 内部原有的已经渲染的组件
        let blocks = data.value.blocks
        data.value  = {...data.value,blocks:[...blocks,{
          top:e.offsetY,
          left:e.offsetX,
          zIndex:1,
          key:currentComponent.key,
          alignCenter:true// 希望松手的时候居中
        }]}
        currentComponent = null
      }
      return {dragstart,dragend}
}