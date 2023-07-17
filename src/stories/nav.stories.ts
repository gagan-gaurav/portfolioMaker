import { Meta, moduleMetadata } from '@storybook/angular';
import { PortfolioModule } from 'src/lib/portfolio.module';
import { NavComponent } from 'src/lib/quilandquest/nav/nav.component';


export default {
	title: 'MyComponents/QuilAndQuest',
	component: NavComponent,
	decorators: [
		moduleMetadata({
			imports: [
				PortfolioModule,
			]
		})
	]
} as Meta;

const Template = (args: NavComponent) => ({
	component: NavComponent,
	props: args
})

export const Nav = Template.bind({});