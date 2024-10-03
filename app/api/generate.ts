import Image from "image-js"
import { sha512 } from "js-sha512"


function getRectangles(data: Array<number>) {
  const res: Array< Array< number> > = new Array()
  for (let i = 0; i < 8; i += 1) {
    res.push(new Array(8).fill(-1))
  }

  let left = [0, 0]
  let right = [7, 7]
  let currentRect = 100
  let dataIndex = 0;
  let replaced = 0;

  const printRes = () => {
    for (let row of res) {
      console.log(JSON.stringify(row))
    }
    console.log()
  } 

  while (res.some(el => el.some(el => el === -1))) {
    const widthData = data[dataIndex]
    const heightData = data[dataIndex + 1]
    let pos = -1
    let row = -1
    while (pos === -1) {
      row += 1
      pos = res[row].indexOf(-1)
    }
    left = [row, pos]
    right = [7 - row, 7 - pos]

    const newRectPossibleWidth = Math.floor(widthData / 100) + 1
    const newRectPossibleHeight = Math.floor(heightData / 100) + 1
    //console.log(newRectPossibleHeight, newRectPossibleWidth, dataIndex)
    const availabilityGrid = new Array(newRectPossibleWidth).fill(new Array(newRectPossibleHeight).fill(true))
    let falseColumn = 999
    for (let i = 0; i < newRectPossibleWidth; i += 1) {
      let isFalseRow = false
      for (let j = 0; j < newRectPossibleHeight; j += 1) {
        if (isFalseRow || j >= falseColumn || res[left[0] + i][left[1] + j] !== -1) {
          isFalseRow = true
          if (j < falseColumn){
            falseColumn = j
          }
          availabilityGrid[i][j] = false
        }
      }
    }
    //console.log(availabilityGrid)
    //printRes()
    for (let i = 0; i < newRectPossibleWidth; i += 1) {
      for (let j = 0; j < newRectPossibleHeight; j += 1) {

        if (availabilityGrid[i][j]) {
          res[left[0] + i][left[1] + j] = currentRect
          res[right[0] - i][right[1] - j] = currentRect + 1
          //printRes()
        }

      }
    }
    //printRes()

    currentRect += 2
    dataIndex += 2
  }


  return res
}

const WHITE = [255, 255, 255, 255]
const RED = [255, 0, 0, 255]
const BLUE = [0, 0, 255, 255]
const YELLOW = [255, 255, 0, 255]
const BLACK = [0, 0, 0, 255]

const COLORS = [WHITE, WHITE, WHITE, RED, BLUE, YELLOW]

export function generateIdenticon(msg: string = 'hello_world') {
  let arr = sha512.array(msg)
  let img = new Image(128, 128)
  const rects = getRectangles(arr)
  for (let row of rects) {
    console.log(JSON.stringify(row))
  }
  for (let i = 0; i < 128; i += 1) {
    for (let j = 0; j < 128; j += 1) {
      img.setPixelXY(i, j, [0, 0, 0, 255])
    }
  }

  const colorMappings = new Map<number, Array<number>>() 
  
  for (let i = 0; i < 8; i += 1) {
    for (let j = 0; j < 8; j += 1) {
      
      let color = colorMappings.get(rects[i][j])
      if (!color) {
        const sel = arr[(i * 8) + j]
        color = COLORS[sel % COLORS.length]
        colorMappings.set(rects[i][j], color)
        colorMappings.set(rects[i][j] + 1, color)
      }
      
      //const color = [255, 255, 0, 255]
      let vertical = false;
      let horizontal = false;

      if (i !== 0 && rects[i - 1][j] !== rects[i][j]) {
        horizontal = true
      }
      if (j !== 0 && rects[i][j - 1] !== rects[i][j]) {
        vertical = true
      }



      for (let x = horizontal ? i * 16 + 2 : i * 16; x < (i * 16) + 16; x += 1) {
        for (let y = vertical ? j * 16 + 2 : j * 16; y <(j * 16) + 16; y += 1) {
          img.setPixelXY(x, y, color)
          //console.log(x, y, i, j)
        }
      }
    }
  }

  //console.log(colorMappings)
  //img = img.rotateLeft()
  //console.log(prev, after)
  img = img.resize({width: 256})

  return img
}


