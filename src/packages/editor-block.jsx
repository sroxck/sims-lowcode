import { defineComponent ,computed, inject,onMounted,ref} from "vue"
export default defineComponent({
  props:{
    block:{type:Object}
  },
  setup(props) {
    const config = inject('config')
    console.log(config);
    const blockStyles = computed(()=>({
      top:`${props.block.top}px`,
      left:`${props.block.left}px`,
      zIndex:`${props.block.zIndex}`,
    }))
    const blockRef = ref(null)
    onMounted(() => {
      let {offsetWidth,offsetHeight} = blockRef.value
      if(props.block.alignCenter){ // 拖拽松手的时候才渲染的,其他默认渲染到页面上的内容不居中
        props.block.left = props.block.left - offsetWidth/2
        props.block.top = props.block.top - offsetHeight/2
        props.block.alignCenter = false
      }
    })
    return ()=>{
      // 通过bloock的key属性 直接获取对应的组件,
        const component = config.componentMap[props.block.key]
        // 获取render函数
        const RenderComponent = component.render()
        return <div style={blockStyles.value} class="block" ref={blockRef}>
          {RenderComponent}
        </div>
    }   
  }
})