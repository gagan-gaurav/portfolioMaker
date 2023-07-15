import { Meta, moduleMetadata } from '@storybook/angular';
import { PortfolioModule } from 'src/lib/portfolio.module';
import { ContentComponent } from 'src/lib/quilandquest/content/content.component';


export default {
	title: 'MyComponents/QuilAndQuest',
	component: ContentComponent,
	decorators: [
		moduleMetadata({
			imports: [
				PortfolioModule,
			]
		})
	]
} as Meta;

const Template = (args: ContentComponent) => ({
	component: ContentComponent,
	props: args
})

export const Content = Template.bind({});