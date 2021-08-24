let friendlyDate = function (dateStr) {
  let formatDate = dateStr instanceof Object ? dateStr : Date.parse(dateStr)
  let now = Date.parse(new Date())
  let space = now - formatDate
  let display = '刚才'

  switch (true) {
    case space < 1000 * 60:
      display = '刚刚'
      break;
    case space < 1000 * 60 * 60:
      display = Math.floor(space / (1000 * 60)) + "分钟前"
      break;
    case space < 1000 * 60 * 60 * 24:
      display = Math.floor(space / (1000 * 60 * 60)) + "小时前"
      break;
    case space < 1000 * 60 * 60 * 24 * 30:
      display = Math.floor(space / (1000 * 60 * 60 * 24)) + "天前"
      break;
    case space < 1000 * 60 * 60 * 24 * 30 * 12:
      display = Math.floor(space / (1000 * 60 * 60 * 24 * 30)) + "月前"
      break;
    case space > 1000 * 60 * 60 * 24 * 30 * 12:
      display = Math.floor(space / (1000 * 60 * 60 * 24 * 30 * 12) )+ "年前"
      break;
  }
  return display
}

export default friendlyDate
