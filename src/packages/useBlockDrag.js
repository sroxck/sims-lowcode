export function useBlockDrag(focusData){
    let dragState = {
        startX:0,
        startY:0,
      }
     
      const mouseHandel = (e)=>{
        dragState = {
          startX:e.clientX,
          startY:e.clientY,
          startPos:focusData.value.focus.map(({top,left})=>({top,left}))
        }
  
        document.addEventListener('mousemove',mouseMove)
        document.addEventListener('mouseup',mouseup)
      }
      const mouseMove = (e)=>{
        let {clientX:moveX,clientY:moveY} = e
        let durX = moveX - dragState.startX
        let durY = moveY - dragState.startY
        focusData.value.focus.forEach((block,idx)=>{
          block.top = dragState.startPos[idx].top+durY
          block.left = dragState.startPos[idx].left+durX
        })
      }
      const mouseup = (e)=>{
        document.removeEventListener('mousemove',mouseMove)
        document.removeEventListener('mouseup',mouseup)
      }
      return {
        mouseHandel,mouseMove,mouseup
      }
}