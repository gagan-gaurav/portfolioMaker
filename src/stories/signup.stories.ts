import { Meta, moduleMetadata } from '@storybook/angular';
import { SignupComponent } from 'src/lib/auth/signup/signup.component';
import { PortfolioModule } from 'src/lib/portfolio.module';

export default {
	title: 'MyComponents/Signup',
	component: SignupComponent,
	decorators: [
		moduleMetadata({
			imports: [
				PortfolioModule,
			]
		})
	]
} as Meta;

const Template = (args: SignupComponent) => ({
	componet: SignupComponent,
	props: args
})

export const Signup = Template.bind({});