import Image from "image-js";
import { sha512 } from "js-sha512";


export class Identicon {

  private _img: Image;
  private _hash: Array<number>;
  private _partitions: Array< Array<number>>
  private _colorMaps: Map<number, Array<number>>

  private static BLACK = [5, 1, 3, 255]
  private static WHITE = [234, 239, 233, 255]
  private static RED = [231, 5, 3, 255]
  private static YELLOW = [253, 222, 6, 255]
  private static BLUE = [3, 0, 173, 255]


  constructor(text: string) {
    this._img = new Image(128, 128)
    this._hash = sha512.array(text)
    this._partitions = [];
    for (let i = 0; i < 8; i += 1) {
      this._partitions.push(new Array(8).fill(-1))
    }
    this._colorMaps = new Map()
    this.clearIdenticon()
    this.createPartitions()
    this.drawIdenticon()
  }

  createPartitions() {
    let left = [0, 0]
    let right = [7, 7]
    let currentRect = 1
    let dataIndex = 0;

    const centerPieceCheck = this._hash[this._hash.length - 1]
    if (centerPieceCheck % 2 === 0) {
      this._partitions[3][3] = 0
      this._partitions[3][4] = 0
      this._partitions[4][3] = 0
      this._partitions[4][4] = 0
    }

    //aosdoaisd8hi2hiua98
    while (this._partitions.some(el => el.some(el => el === -1))) {
      const widthData = this._hash[dataIndex % 64]
      const heightData = this._hash[(dataIndex + 1) % 64 ]
      let pos = -1
      let row = -1
      while (pos === -1) {
        row += 1
        pos = this._partitions[row].indexOf(-1)
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
          if (isFalseRow || j >= falseColumn || this._partitions[left[0] + i][left[1] + j] !== -1) {
            isFalseRow = true
            if (j < falseColumn){
              falseColumn = j
            }
            availabilityGrid[i][j] = false
          }
        }
      }
      for (let i = 0; i < newRectPossibleWidth; i += 1) {
        for (let j = 0; j < newRectPossibleHeight; j += 1) {
  
          if (availabilityGrid[i][j]) {
            this._partitions[left[0] + i][left[1] + j] = currentRect
            this._partitions[right[0] - i][right[1] - j] = currentRect + 1
          }
  
        }
      }
      currentRect += 2
      dataIndex += 2
    }
  }

  clearIdenticon() {
    for (let i = 0; i < 128; i += 1) {
      for (let j = 0; j < 128; j += 1) {
        this._img.setPixelXY(i, j, Identicon.BLACK)
      }
    }
  }

  drawIdenticon() {
    const COLORS = [
      Identicon.RED,
      Identicon.BLUE,
      Identicon.YELLOW,
      Identicon.BLACK,
    ]

    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        
        let color = this._colorMaps.get(this._partitions[i][j])
        if (!color) {
          const selection = this._hash[(i * 8) + j]
          if (selection < 169   ) {
            color = Identicon.WHITE
          }
          else {
            color = COLORS[selection % COLORS.length]
          }



          this._colorMaps.set(this._partitions[i][j], color)

          if (this._partitions[i][j] !== 0) {
            this._colorMaps.set(this._partitions[i][j] + 1, color)
          }
        }
        //console.log(color)
        //const color2 = [255, 255, 0, 255]
        let vertical = false;
        let horizontal = false;
  
        if (i !== 0 && this._partitions[i - 1][j] !== this._partitions[i][j]) {
          horizontal = true
        }
        if (j !== 0 && this._partitions[i][j - 1] !== this._partitions[i][j]) {
          vertical = true
        }
  
  
  
        for (let x = horizontal ? i * 16 + 2 : i * 16; x < (i * 16) + 16; x += 1) {
          for (let y = vertical ? j * 16 + 2 : j * 16; y <(j * 16) + 16; y += 1) {
            this._img.setPixelXY(x, y, color)
          }
        }
      }
    }
  }

  get img() {
    return this._img
  }
  
}