import { Meta, moduleMetadata } from '@storybook/angular';
import { WallComponent } from 'src/lib/wall/wall.component';
import { PortfolioModule } from 'src/lib/portfolio.module';


export default {
	title: 'MyComponents/Wall',
	component: WallComponent,
	decorators: [
		moduleMetadata({
			imports: [
				PortfolioModule,
			]
		})
	]
} as Meta;

const Template = (args: WallComponent) => ({
	component: WallComponent,
	props: args
})

export const Wall = Template.bind({});