import { Meta, moduleMetadata } from '@storybook/angular';
import { LoginComponent } from 'src/lib/auth/login/login.component';
import { PortfolioModule } from 'src/lib/portfolio.module';
import { CookieService } from 'ngx-cookie-service';


export default {
	title: 'MyComponents/Login',
	component: LoginComponent,
	decorators: [
		moduleMetadata({
			imports: [
				PortfolioModule,
			],
			// providers: [CookieService],
		}),
		
	]
} as Meta;

const Template = (args: LoginComponent) => ({
	componet: LoginComponent,
	props: args
})

export const Login = Template.bind({});