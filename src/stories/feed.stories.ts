import { Meta, moduleMetadata } from '@storybook/angular';
import { PortfolioModule } from 'src/lib/portfolio.module';
import { FeedComponent } from 'src/lib/quilandquest/feed/feed.component';


export default {
	title: 'MyComponents/QuilAndQuest',
	component: FeedComponent,
	decorators: [
		moduleMetadata({
			imports: [
				PortfolioModule,
			]
		})
	]
} as Meta;

const Template = (args: FeedComponent) => ({
	component: FeedComponent,
	props: args
})

export const Feed = Template.bind({});