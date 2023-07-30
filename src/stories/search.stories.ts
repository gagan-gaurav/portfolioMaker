import { Meta, moduleMetadata } from '@storybook/angular';
import { SearchComponent } from 'src/lib/search/search.component';
import { PortfolioModule } from 'src/lib/portfolio.module';

export default {
	title: 'MyComponents/Search',
	component: SearchComponent,
	decorators: [
		moduleMetadata({
			imports: [
				PortfolioModule,
			]
		})
	]
} as Meta;

const Template = (args: SearchComponent) => ({
	componet: SearchComponent,
	props: args
})

export const Search = Template.bind({});