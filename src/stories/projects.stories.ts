import { Meta, moduleMetadata } from '@storybook/angular';
import { PortfolioModule } from 'src/lib/portfolio.module';
import { ProjectsComponent } from 'src/lib/projects/projects.component';


export default {
	title: 'MyComponents/Projects',
	component: ProjectsComponent,
	decorators: [
		moduleMetadata({
			imports: [
				PortfolioModule,
			]
		})
	]
} as Meta;

const Template = (args: ProjectsComponent) => ({
	component: ProjectsComponent,
	props: args
})

export const Projects = Template.bind({});