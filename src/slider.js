import { css, isOver, toDate, line, circle, boundaries } from './utils'

const HEIGHT = 40
const DPI_HEIGHT = HEIGHT * 2

export function sliderChart(root, data, DPI_WIDTH) {
    const WIDTH = DPI_WIDTH / 2
    const canvas = root.querySelector('canvas')
    canvas.width = DPI_WIDTH
    canvas.height = DPI_HEIGHT
    const ctx = canvas.getContext('2d');
    css(canvas, {
        width: WIDTH + 'px',
        height: HEIGHT + 'px'
    })

    const [yMin, yMax] = boundaries(data)
    const yRatio = VIEW_HEIGHT / (yMax - yMin)
    const xRatio = VIEW_WIDTH / (data.columns[0].length - 2)

    const yData = data.columns.filter(col => data.types[col[0]] === 'line')
    const xData = data.columns.filter(col => data.types[col[0]] !== 'line')[0]

    yData.map(toCoords(xRatio, yRatio)).forEach((coords, idx) => {
        const color = data.colors[yData[idx][0]]
        line(ctx, coords, { color })

        for (const [x, y] of coords) {
            if (isOver(proxy.mouse, x, coords.length, DPI_WIDTH)) {
                circle(ctx, [x, y], color)
                break
            }
        }
    })
}