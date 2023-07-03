import { Meta, moduleMetadata } from '@storybook/angular';
import { PortfolioModule } from 'src/lib/portfolio.module';
import { SkillsComponent } from 'src/lib/skills/skills.component';


export default {
	title: 'MyComponents/Skills',
	component: SkillsComponent,
	decorators: [
		moduleMetadata({
			imports: [
				PortfolioModule,
			]
		})
	]
} as Meta;

const Template = (args: SkillsComponent) => ({
	component: SkillsComponent,
	props: args
})

export const Skills = Template.bind({});