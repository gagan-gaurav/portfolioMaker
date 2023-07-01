import { Meta, moduleMetadata } from '@storybook/angular';
import { PortfolioModule } from 'src/lib/portfolio.module';
import { ProfileComponent } from 'src/lib/profile/profile.component';


export default {
	title: 'MyComponents/Profile',
	component: ProfileComponent,
	decorators: [
		moduleMetadata({
			imports: [
				PortfolioModule,
			]
		})
	]
} as Meta;

const Template = (args: ProfileComponent) => ({
	component: ProfileComponent,
	props: args
})

export const Profile = Template.bind({});