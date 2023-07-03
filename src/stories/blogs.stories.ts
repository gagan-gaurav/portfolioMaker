import { Meta, moduleMetadata } from '@storybook/angular';
import { BlogsComponent } from 'src/lib/blogs/blogs.component';
import { PortfolioModule } from 'src/lib/portfolio.module';

export default {
	title: 'MyComponents/Blogs',
	component: BlogsComponent,
	decorators: [
		moduleMetadata({
			imports: [
				PortfolioModule,
			]
		})
	]
} as Meta;

const Template = (args: BlogsComponent) => ({
	componet: BlogsComponent,
	props: args
})

export const Blogs = Template.bind({});