import { Meta, moduleMetadata } from '@storybook/angular';
import { WelcomeComponent } from 'src/lib/welcome/welcome.component';
import { PortfolioModule } from 'src/lib/portfolio.module';

export default {
	title: 'MyComponents/Welcome',
	component: WelcomeComponent,
	decorators: [
		moduleMetadata({
			imports: [
				PortfolioModule,
			]
		})
	]
} as Meta;

const Template = (args: WelcomeComponent) => ({
	componet: WelcomeComponent,
	props: args
})

export const Welcome = Template.bind({});