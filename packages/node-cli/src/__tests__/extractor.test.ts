import path from 'node:path'
import { extractDesignSystem } from '../extractor'
import { DesignSystem } from '../entities/DesignSystem'

describe('extractDesignSystem', () => {
  describe('empty design system', () => {
    const dirPath = path.join(__dirname, '../../../../examples/empty/src')

    it('should return url', async () => {
      const expectedUrl =
        'git@github.com:interaction-dynamics/design-system-manager.git'

      const designSystem = await extractDesignSystem(dirPath)

      expect(designSystem.repository.url).toEqual(expectedUrl)
    })

    it('should return name example-empty', async () => {
      const designSystem = await extractDesignSystem(dirPath)

      expect(designSystem.repository.name).toEqual('example-empty')
    })

    it('should return relative path src', async () => {
      const designSystem = await extractDesignSystem(dirPath)

      expect(designSystem.relativePath).toEqual('examples/empty/src')
    })

    it('should return no components', async () => {
      const designSystem = await extractDesignSystem(dirPath)

      expect(designSystem.components).toEqual([])
    })
  })

  describe('zero config', () => {
    const dirPath = path.join(
      __dirname,
      '../../../../examples/zero-config/src/libs',
    )

    it('should return url', async () => {
      const expectedUrl =
        'git@github.com:interaction-dynamics/design-system-manager.git'

      const designSystem = await extractDesignSystem(dirPath)

      expect(designSystem.repository.url).toEqual(expectedUrl)
    })

    it('should return a name example-zero-config', async () => {
      const designSystem = await extractDesignSystem(dirPath)

      expect(designSystem.repository.name).toEqual('example-zero-config')
    })

    it('should return relative path src', async () => {
      const designSystem = await extractDesignSystem(dirPath)

      expect(designSystem.relativePath).toEqual('examples/zero-config/src/libs')
    })

    describe('components', () => {
      it('should return one component', async () => {
        const designSystem = await extractDesignSystem(dirPath)

        expect(designSystem.components).toHaveLength(2)
      })

      describe('Button', () => {
        const getComponent = (designSystem: DesignSystem) =>
          designSystem.components[0]

        it('should return component with name Button', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).name).toEqual('Button')
        })

        it('should return component with description', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).description).toEqual(
            'A Buttom component',
          )
        })

        it('should return component with 3 properties', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties).toHaveLength(3)
        })

        it('should return component with properties children', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties[0]).toEqual({
            name: 'children',
            type: 'React.ReactNode',
            description: '',
            optional: false,
            defaultValue: undefined,
          })
        })

        it('should return component with properties variant', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties[1]).toEqual({
            name: 'variant',
            type: "'primary' | 'black' | 'basic'",
            description: '',
            optional: false,
            defaultValue: undefined,
          })
        })

        it('should return component with properties onClick', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties[2]).toEqual({
            name: 'onClick',
            type: '() => void | Promise<void>',
            description: '',
            optional: false,
            defaultValue: undefined,
          })
        })
      })

      describe('Input', () => {
        const getComponent = (designSystem: DesignSystem) =>
          designSystem.components[1]

        it('should return component with name Input', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).name).toEqual('Input')
        })

        it('should return component with 3 properties', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties).toHaveLength(3)
        })

        it('should return component with properties children', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties[0]).toEqual({
            name: 'value',
            type: 'string | number',
            description: '',
            optional: false,
            defaultValue: undefined,
          })
        })

        it('should return component with properties variant', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties[1]).toEqual({
            name: 'onChange',
            type: '(value: string) => void',
            description: '',
            optional: false,
            defaultValue: undefined,
          })
        })

        it('should return component with properties onClick', async () => {
          const designSystem = await extractDesignSystem(dirPath)

          expect(getComponent(designSystem).properties[2]).toEqual({
            name: 'placeholder',
            type: 'string',
            description: '',
            optional: false,
            defaultValue: undefined,
          })
        })
      })
    })
  })
})