import deepcopy from "deepcopy"
import { defineComponent,computed ,inject,ref} from "vue"
import EditorBlock from "./editor-block"
import './editor.scss'
import { useBlockDrag } from "./useBlockDrag"
import { useFocus } from "./useFocus"
import { useMenuDrag } from "./useMenuDrag"
export default defineComponent({
  props:{
    modelValue:{type:Object}
  },
  emits:['update:modelValue'],
  setup(props,ctx) {
    const config = inject('config')
    const containerRef = ref(null)
    const data = computed({
      get(){
        return props.modelValue
      },
      set(newValue){
        ctx.emit('update:modelValue',deepcopy(newValue))
      }
    })

    const containerStyles = computed(()=>({
      width:data.value.container.width+'px',
      height:data.value.container.height+'px' 
    }))
   
    // 1 实现菜单的拖拽功能
    const {dragstart,dragend} = useMenuDrag(containerRef,data)

    // 2 实现画布组件获取焦点,选中后直接进行拖拽
    const {onMousedown,focusData,containerMouseDown} = useFocus(data,(e)=> mouseHandel(e))
    const {mouseHandel} = useBlockDrag(focusData)
    
    // 3 实现拖拽多个元素
 
  
    return () => 
      <div class="editor">
        {/** logo区域 */}
        <div class="log">sims-lowcode </div>
        {/** 左侧物料区 */}
        <div class="editor-left">
          <p style="padding:0 10px">基础组件</p>
          {/**根据预设注册列表,渲染对应的内容 通过实现h5拖拽*/}
          {config.componentList.map(component=>(
            <div class="editor-left-item" draggable ondragend={dragend}  ondragstart={(e)=>{dragstart(e,component)}}>
              <span style="font-size: 12px; ">{component.label}组件</span>
              <div>{component.perview()}</div>
            </div>
          ))}
        </div>
        {/** 菜单区 */}
        <div class="editor-top">菜单栏</div>
        {/** 右侧属性控制区 */}
        <div class="editor-right">控制区</div>
        {/** 中间画布区域 */}
        <div class="editor-container" >
            {/**负责产生滚动条的辅助div */}
          <div class="editor-container-canvas">
            {/** 主画布 start*/}
            <div class="editor-container-canvas_content" onMousedown={e=>{containerMouseDown(e)}} style={containerStyles.value} ref={containerRef}>
              {/** 根据数组循环生成组件,每次拖动物料到画布,数组长度+1 */}
              {
                data.value.blocks.map((item)=>(
                  <EditorBlock class={item.focus?'editor-block-focus':''} block={item} onMousedown={e=>{onMousedown(e,item)}}></EditorBlock>
                ))
              }
            </div>
            {/** 主画布 end*/}
          </div>
        </div>
      </div>
    }
})
