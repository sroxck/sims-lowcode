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

    const {onMousedown,focusData,containerMouseDown} = useFocus(data,(e)=>{
      mouseHandel(e)
    })
    const {mouseHandel,} = useBlockDrag(focusData)
  
    
    // 3 实现拖拽多个元素
  // 点击容器让选中的组件失去焦点
 

  
    return () => 
    <div class="editor">
    <div class="log">sims-lowcode </div>
      <div class="editor-left">
      <p style="padding:0 10px">基础组件</p>
          {/**根据注册列表,渲染对应的内容 实现h5拖拽*/}
          {config.componentList.map(component=>(
            <div class="editor-left-item" draggable ondragend={dragend}  ondragstart={(e)=>{dragstart(e,component)}}>
              <span style="font-size: 12px; ">{component.label}组件</span>
              <div>{component.perview()}</div>
            </div>
          ))}
        
      </div>
      <div class="editor-top">菜单栏</div>
      <div class="editor-right">控制区</div>
      <div class="editor-container" >
        {/**负责产生滚动条 */}
        <div class="editor-container-canvas">
          {/** 画布 */}
          <div class="editor-container-canvas_content" onMousedown={e=>{containerMouseDown(e)}} style={containerStyles.value} ref={containerRef}>
            {
              data.value.blocks.map((item)=>(
               <EditorBlock class={item.focus?'editor-block-focus':''} block={item} onMousedown={e=>{onMousedown(e,item)}}></EditorBlock>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  }
})
