import { Meta, moduleMetadata } from '@storybook/angular';
import { WindowComponent } from 'src/lib/window/window.component';
import { PortfolioModule } from 'src/lib/portfolio.module';

export default {
	title: 'MyComponents/Window',
	component: WindowComponent,
	decorators: [
		moduleMetadata({
			imports: [
				PortfolioModule,
			]
		})
	]
} as Meta;

const Template = (args: WindowComponent) => ({
	componet: WindowComponent,
	props: args
})

export const Window = Template.bind({});