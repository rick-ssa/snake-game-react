export function snakeIsInTheArea(
    snakeBody,
    area,
    offsetLeft = 0, 
    offsetTop = 0, 
    marginTop = 0, 
    marginRight = 0, 
    marginBottom = 0, 
    marginLeft= 0, 
) {
    return snakeBody.reduce((t,point)=>{
        if(t===true) {
            return true
        }
        if(
            (point.left + offsetLeft >= area.left - marginLeft && point.left + offsetLeft  <= area.left + area.width + marginRight && 
            point.top + offsetTop >= area.top - marginTop && point.top + offsetTop <= area.top + area.height + marginBottom) ||
            (point.left + 16 + offsetLeft>= area.left - marginLeft && point.left + 16 + offsetLeft <= area.left + area.width + marginRight && 
            point.top + offsetTop >= area.top - marginTop && point.top + offsetTop <= area.top + area.height + marginBottom) ||
            (point.left + offsetLeft>= area.left - marginLeft && point.left + offsetLeft <= area.left + area.width + marginRight && 
            point.top + 16 + offsetTop >= area.top - marginTop && point.top + 16 + offsetTop <= area.top + area.height + marginBottom) ||
            (point.left + 16 + offsetLeft>= area.left - marginLeft  && point.left + 16 + offsetLeft <= area.left + area.width + marginRight && 
            point.top + 16 + offsetTop >= area.top - marginTop && point.top + 16 + offsetTop <= area.top + area.height + marginBottom)
        ){
               return true;
        }

        return false
    },false)
}