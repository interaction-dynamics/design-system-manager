import { parseFigmaStyle } from '../parse-figma-style'
import figmaStyles from '../__fixtures__/figma-styles.json'
import figmaNodes from '../__fixtures__/figma-nodes.json'

describe('parseFigmaStyle', () => {
  it('should return a color style', async () => {
    const [figmaStyle] = figmaStyles.meta.styles
    const { nodes } = figmaNodes

    const style = await parseFigmaStyle(figmaStyle, nodes)

    expect(style).toEqual({
      id: '',
      metadata: {
        color: 'rgba(29, 0, 7, 1)',
      },
      name: 'black',
      providers: {
        figma: {
          description: '',
          fileKey: 'zTNDlw3P1z5pjm9mOFzB62',
          key: 'd83f29075064e934ed92e12007ba2bd035144c31',
          nodeId: '2131:3',
          thumbnailUrl:
            'https://s3-alpha.figma.com/checkpoints/dbG/twQ/DtgbHM1GZ7Yq4aKK/2131_3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ4GOSFWC5YUK2IUR%2F20240620%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240620T000000Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=33b9cd8f119cd6798ed1d64d5e01dd8a97c0748826f46d2b5f904b9de8742111',
          width: 100,
          height: 100,
        },
      },
      type: 'color',
    })
  })

  it('should return a typograph style', async () => {
    const figmaStyle = figmaStyles.meta.styles[1]
    const { nodes } = figmaNodes

    const style = await parseFigmaStyle(figmaStyle, nodes)

    expect(style).toEqual({
      id: '',
      metadata: {
        fontFamily: 'Geist',
        fontWeight: 600,
        fontSize: 30.0,
        lineHeight: 1,
        letterSpacing: 0.0,
      },
      name: 'h2',
      providers: {
        figma: {
          description: 'For subtitles',
          fileKey: 'zTNDlw3P1z5pjm9mOFzB62',
          key: '394cefeceb5e38e7dbf43980fb8923477be02332',
          nodeId: '2135:21',
          thumbnailUrl:
            'https://s3-alpha.figma.com/checkpoints/FDO/hOX/yLugVSfaqvu069eF/2135_21.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ4GOSFWC5YUK2IUR%2F20240620%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240620T000000Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=eae41adbb877e318e29910334fce9b0177e05220e23de378b9df7621138f23dc',
          width: 114,
          height: 37,
        },
      },
      type: 'typography',
    })
  })

  it('should return a elevation style', async () => {
    const figmaStyle = figmaStyles.meta.styles[2]
    const { nodes } = figmaNodes

    const style = await parseFigmaStyle(figmaStyle, nodes)

    expect(style).toEqual({
      id: '',
      metadata: {
        type: 'drop-shadow',
        color: 'rgba(0, 0, 0, 0.25)',
        offsetX: 0,
        offsetY: 4,
        blurRadius: 4,
        spreadRadius: 0,
      },
      name: 'raised',
      providers: {
        figma: {
          description: '',
          fileKey: 'zTNDlw3P1z5pjm9mOFzB62',
          key: '5d094cc885bde2502be05cc6909707599577164a',
          nodeId: '2135:28',
          thumbnailUrl:
            'https://s3-alpha.figma.com/checkpoints/iG2/fL1/zRdaVFGE7tAEdGMI/2135_28.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ4GOSFWC5YUK2IUR%2F20240620%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240620T000000Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=d4e10965a2a70a2a5f04cdb20f2552af37b10a37c54cede728aeb436ae0b88bf',
          width: 100,
          height: 100,
        },
      },
      type: 'elevation',
    })
  })
  it('should return a spacing style', async () => {
    const figmaStyle = figmaStyles.meta.styles[8]
    const { nodes } = figmaNodes

    const style = await parseFigmaStyle(figmaStyle, nodes)

    expect(style).toEqual({
      id: '',
      metadata: {
        spacing: 10,
      },
      name: 'small',
      providers: {
        figma: {
          description: '',
          fileKey: 'zTNDlw3P1z5pjm9mOFzB62',
          key: 'dafdf550196c92dd44c28bf8092ba71bc2aaae2f',
          nodeId: '2135:42',
          thumbnailUrl:
            'https://s3-alpha.figma.com/checkpoints/XwE/Eha/UnL7tq6GwA5hIg6a/2135_42.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ4GOSFWC5YUK2IUR%2F20240620%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240620T000000Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=ab24bca1a6bf24e012653421fb2299ea80febddbe2b1d047e3a719eb26e189ac',
          width: 100,
          height: 100,
        },
      },
      type: 'spacing',
    })
  })
})
