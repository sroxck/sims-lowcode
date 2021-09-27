// 提供一个列表区,可以显示所有的物料
// 需要一个映射关系,key对应的组件
import {ElButton, ElInput,ElRate,ElSlider,ElDatePicker} from 'element-plus'
function createEditorConfig(){
    const componentList = []
    const componentMap = {}

    return {
        componentList,
        componentMap,
        register:(component)=>{
            componentList.push(component)
            componentMap[component.key] = component
        }
    }
}
export let registerConfig = createEditorConfig()
registerConfig.register({
    label:"文本",
    perview:()=>'预览文本',
    render:()=>'渲染文本',
    key:'text'
})
registerConfig.register({
    label:"按钮",
    perview:()=><ElButton>预览按钮</ElButton>,
    render:()=><ElButton>渲染按钮</ElButton>,
    key:'button'
})
registerConfig.register({
    label:"文本",
    perview:()=><ElInput placeholder="预览输入框"></ElInput>,
    render:()=><ElInput placeholder="渲染输入框"></ElInput>,
    key:'input'
})
registerConfig.register({
    label:"评分",
    perview:()=><ElRate ></ElRate>,
    render:()=><ElRate ></ElRate>,
    key:'rate'
})
registerConfig.register({
    label:"滑块",
    perview:()=><ElSlider  style="width:100px" ></ElSlider>,
    render:()=><ElSlider style="width:100px"></ElSlider>,
    key:'slider'
})
registerConfig.register({
    label:"日期",
    perview:()=><ElDatePicker type="date" placeholder="Pick a day"></ElDatePicker>,
    render:()=><ElDatePicker type="date" placeholder="Pick a day"></ElDatePicker>,
    key:'date'
})
