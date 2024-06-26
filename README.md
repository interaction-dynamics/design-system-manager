<h1 align="center">Design System Manager</h1>

<div align="center">

[[Demo]](https://design-system-manager.vercel.app/example-design-system---with-variants/components/button)

</div>

The only solution to maintain your design system that is developer-friendly AND designer-friendly.

It can replace Storybook and much more.

![image](https://github.com/interaction-dynamics/design-system-manager/assets/4005226/e8118830-1d55-47ff-b248-8c69634ae384)

> It is a work in progress and is not ready for use yet. This is built in public so feel free to check our [wiki](https://github.com/interaction-dynamics/design-system-manager/wiki) for more information.

## Getting started

If you want to start using this tool:

```bash
cd packages/documentation-portal # only this part is started

pnpm install

echo "FIGMA_TOKEN={FIGMA_TOKEN}" >> .env.local
echo "FIGMA_FILE_IDS={FIGMA_FILE_ID}" >> .env.local

pnpm dev

```

## Roadmap

The project is composed of multiple packages:

- [documentation-portal](./packages/documentation-portal/README.md): the website that will host the design systems [STARTED]
- a figma integration to extract the component from figma [STARTED]
- a figma plugin that will help check the code from Figma (see development status, etc) [NOT STARTED]
- a cli to extract the components from the code [STARTED]
- a VS Code plugin to help the developer to use the design system [NOT STARTED]

You can check the roamap [here](https://github.com/orgs/interaction-dynamics/projects/10/views/1).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code practices and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
